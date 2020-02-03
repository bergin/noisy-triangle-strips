function Particle(position, color, size)
{
	this.points = [];
	this.points_org = []; 
    this.visibility = true;
	this.dot;  // ie dot normals
	this.color = color;
	this.distance = 0; 
	this.points_org.push(position);
	this.size = size;
	this.points_org[0] = Point_Helper.scale(this.points_org[0], objectScale);

	this.applyRotation = function()
	{
		this.copyOriginalLocations(); 
		this.points[0] = rotateRelativePoint(moverPoint, this.points[0],  -1);
		this.distance = distanceOpt(theOrigin, this.points[0]);	 
	}

	this.copyOriginalLocations = function()
	{
		this.points = clone(this.points_org);	
	}	

	this.frustrumCheck = function()
	{
		return isInsideFrustrum(this.points[0]); 
	}

	this.createDotProducts = function()
	{
		 
		this.dot = 1;

	}
	
	this.drawSelf = function(ctx)
	{
		dot(ctx, this.points[0], this.size, this.color, "black");
	  	
	}

	this.scaleProject = function()
	{
		 
		pos = this.points[0];
									
		// avoid divide by 0 - frustrum should have cleaned up any objects at z = 0
		if(Math.abs(pos.z) >= 0 && Math.abs(pos.z) <=20)
		{ 
			this.visibility = false ;
			//alert("ddiv zero");
			return;
		}	

		pos.x =   (pos.x / pos.z ) * rendererScale  + halfScrWidth;
		pos.y = -(pos.y / pos.z ) * rendererScale    + halfScrHeight;
	}
 
	this.show  = function()
	{
 
		console.log("tri - x:" +  this.points[0].x.toFixed(1) +
		", y:" + this.points[0].y.toFixed(1) +  ", z:" +   this.points[0].z.toFixed(1) );
		
	}

}

function averageYPoints(points)
{
	var total =0;

	for(var a=0;a<3;a++)
		total+= points[a].y;

		return total / 3;
}

//  syntax for object is: myObjects[n].constructor.name == "Triangle")
class Triangle
{ 
	constructor(verts, color)
	{
		this.points = [];
		this.points_org = []; 
		//this.screenPoints = [];
		this.visibility = true;
		this.dot =.5;  // ie dot normals
		this.color = color;
		this.distance = 0;  
		//this.sides = [];

		for(var v=0; v<3;v++)
			this.points_org[v] = new Point(verts[v].x, verts[v].y, verts[v].z) ;

		this.color = colorAssigner(averageYPoints(this.points_org));

		for(var a=0; a<3; a++)
			 Point_Helper.scale(this.points_org[a], objectScale);

			 
		//for(var a=0; a<3; a++)  this.screenPoints[a] = new ScreenPoint(0,0);	 
			 
	}
}


class Triangle_Helper
{
	//constructor() {}

	static applyRotation(triangle)
	{
		for(var i=0; i<3; i++)
		{ 
			triangle.points[i] = rotateRelativePoint(moverPoint, triangle.points_org[i]);
		}	
		 
		//triangle.sides[0] = makeVector2(triangle.points[1], triangle.points[0]);
		// triangle.sides[1] = makeVector2(triangle.points[2], triangle.points[0]);
	}

	static applyTranslation(triangle)
	{

		for(var i=0; i<3; i++)
		{ 
			triangle.points[i] =  addPosVec(triangle.points[i], vectorReverse(moverVector) );  
		}	
	}

	static frustrumCheck(triangle)
	{
		for(var i=0; i<3; i++)
		{
			if(isInsideFrustrum(triangle.points[i]))
				continue;
			else
				return false;
		}
		return true; 
	}

	// if at least one point is inside the window then allow it through
	static windowCheck(triangle)
	{ 
		for(var i=0; i<3; i++)
		{
			if(isInsideDrawingWindow(triangle.points[i]))
				return true;
			else
				continue;
		}
		return false;
	}

	static createDotProducts(triangle)
	{
		var foo, a, b, origVec, normal;
	
		foo = triangle.points[0];  // origin ( V0 )
		a = makeVector2(triangle.points[1], foo);
		b = makeVector2(triangle.points[2], foo);
			
		normal = normalise(crossProduct(a, b));
 
		origVec =  new RVector(-foo.x, -foo.y, -foo.z);  // optimise: was  origVec =  normalise(makeVector(foo, theOrigin)); 
 
		triangle.dot = dotProduct( normalise(origVec), normal);	 
	}
	
	static drawSelf = function(ctx, triangle)
	{
		var shading;
	
		/* this requires clipping to redraw the triangle or quadrilateral.
		if(triangle.points[0].x < -50 || triangle.points[0].x > scrWidth + 50 )
			return;

		if(triangle.points[0].y < -50 || triangle.points[0].y > scrHeight + 250  )
			return;
*/
		if(triangle.dot>=0)
		{ 
			shading = Math.ceil(triangle.dot * 255);
		
			drawTri(ctx, triangle.points, triangle.color, "filled", shading);
		}  	
	}

	static scaleProject = function(triangle)
	{
		for(var i=0; i<3; i++)
        {
			var pos = triangle.points[i];
										
			// avoid divide by 0 - frustrum should have cleaned up any objects at z = 0
			if(pos.z > -1 &&  pos.z <1)
			{ 
				this.visibility = false ;
				return;
			}	

			triangle.points[i].x =   (pos.x / pos.z ) * rendererScale + halfScrWidth;
			triangle.points[i].y =  -(pos.y / pos.z ) * rendererScale + halfScrHeight;
        }
	}
 
	static show(triangle)
	{
 
		console.log("tri - x:" +  triangle.points[0].x.toFixed(1) +
		", y:" + triangle.points[0].y.toFixed(1) +  ", z:" +   triangle.points[0].z.toFixed(1) );
		
	}

}

class ScreenPoint
{
	constructor (x, y)
	{
		this.x = x;
		this.y = y;
	}
}

class Point
{
	constructor (x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		//this.value = v;

	}
}

class Point_Helper
{ 
	static scale(point, amount)
	{
		point.x *= amount;
		point.y *= amount;
		point.z *= amount;
	}

	static reset (point)
	{
		point.x = 0;
		point.y = 0;
		point.z = 0;
	}
	
	static show (point)
	{
		console.log("x:" + point.x.toFixed(2) + 
		", y:" + point.y.toFixed(2) +  ", z:" + point.z.toFixed(2)); 
	}
    
    static textValue (point)
    {
        return "x:" + point.x.toFixed(2) +", y:" + point.y.toFixed(2) +  ", z:" + point.z.toFixed(2);
    }
}


function RVector(i, j, k)
{
	this.i = i;
	this.j = j;
	this.k = k;
	
	this.reset = function(type, direction, s)
	{
		if(type == 'yaw' || type == 'pitch' || type=='roll')
		{
			this.i = 0;
			this.j = 0;
			this.k = (5 + s);
			return;
		}

		if(type=='move')
		{ 
			this.i = 0;
			this.j = 0;
			this.k = (5 + s) * direction;
			return;
		}

		if(type=='lift')
		{ 
			this.i = 0;
			this.j = (5 + s) * direction  ;
			this.k = 0;
			return;
		}

		if(type=='side')
		{ 
			this.i = (5+s) * direction;
			this.j = 0;
			this.k = 0;
			return;
		}

	}
 
    
	this.show = function()
	{
		console.log("i:" + this.i.toFixed(2) + 
		", j:" + this.j.toFixed(2) +  ", k:" + this.k.toFixed(2)); 
	}
    
    this.textValue = function()
    {
        return "i:" + this.i.toFixed(2) +
        ", j:" + this.j.toFixed(2) +  ", k:" + this.k.toFixed(2);
    }
}

function Direction(phi, theta, psi)
{
	this.phi = phi;
	this.theta = theta;
	this.psi = psi;
	
	this.reset = function()
	{
		this.phi = 0;
		this.theta = 0;
		this.psi = 0;
		speed = 1;
		moverVector.reset(1,0);
		moverPoint = Point_Helper.reset(moverPoint);
		KBI = new KeyBoardInput();
	
	}

	this.incrementAngle = function (axis, amount)
	{ 
		if(axis=="phi")
		{
			this.phi += amount;
			if(this.phi >359 || this.phi<-359)
				this.phi = 0;
		}
		
		if(axis=="theta")
		{
			this.theta += amount;
			if(this.theta >359 || this.theta<-359)
				this.theta = 0;
		}
		
		if(axis=="psi")
		{
			this.psi += amount;
			if(this.psi >359 || this.psi<-359)
				this.psi = 0;
		}

	}
	
	this.show = function()
	{
		console.log("PHI:" + this.phi.toFixed(2) + 
		", TH:" + this.theta.toFixed(2) +  ", PSI:" + this.psi.toFixed(2)); 
	}

	this.textValue = function()
    {
        return "PHI:" + this.phi.toFixed(2) + ", TH:" + this.theta.toFixed(2) +  ", PSI:" + this.psi.toFixed(2); 
    }
}
