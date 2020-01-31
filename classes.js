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

class Triangle
{ 
	constructor(verts, color)
	{
		this.points = [];
		this.points_org = []; 
		this.visibility = true;
		this.dot;  // ie dot normals
		this.color = color;
		this.distance = 0;  

		for(var v=0; v<3;v++)
			this.points_org[v] = new Point(verts[v].x, verts[v].y, verts[v].z, 0) ;

		this.color = colorAssigner(averageYPoints(this.points_org));

		for(var a=0; a<3; a++)
			 Point_Helper.scale(this.points_org[a], objectScale);
			 
	}
}


class Triangle_Helper
{
	//constructor() {}

	static applyRotation(triangle)
	{
		//this.copyOriginalLocations(); 

		for(var i=0; i<3; i++)
		{ 
			triangle.points[i] = rotateRelativePoint(moverPoint, triangle.points_org[i],  -1);
		}	
		triangle.distance = distanceOpt(theOrigin, triangle.points[0]);	 
	}
/*
	this.copyOriginalLocations = function()
	{
		for(var v=0; v<3;v++)
			this.points[v] = new Point(this.points_org[v].x, this.points_org[v].y, this.points_org[v].z) ;
		 
	}	
*/
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

	static createDotProducts(triangle)
	{
		var foo, a, b, origVec, normal;
	
		foo = triangle.points[0];  // origin ( V0 )
		a = makeVector2(triangle.points[1], foo);
		b = makeVector2(triangle.points[2], foo);
			
		normal = normalise(crossProduct(a, b));
		origVec =  normalise(makeVector(foo, theOrigin)); 
		triangle.dot = dotProduct( origVec, normal);

	}
	
	static drawSelf = function(ctx, triangle)
	{
		var shading;
	
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
				//alert("div 0");
				 this.visibility = false ;
				return;
			}	

			pos.x =   (pos.x / pos.z ) * rendererScale + halfScrWidth;
			pos.y =  -(pos.y / pos.z ) * rendererScale + halfScrHeight;
        }
	}
 
	static show(triangle)
	{
 
		console.log("tri - x:" +  triangle.points[0].x.toFixed(1) +
		", y:" + triangle.points[0].y.toFixed(1) +  ", z:" +   triangle.points[0].z.toFixed(1) );
		
	}

}


class Point
{
	constructor (x, y, z, v)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.value = v;

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

function Square(verts, color)
{
	this.points = [];
	this.points_org = []; 
    this.visibility = true;
	this.dot;  // ie dot normals
	this.color = color;
	this.distance = 0; 
	this.points_org = clone(verts);

	for(var a=0;a<4;a++)
		 this.points_org[a].scale(objectScale);

	this.applyRotation = function()
	{
		this.copyOriginalLocations(); 

		for(var i=0; i<4; i++)
		{ 
			this.points[i] = rotateRelativePoint(moverPoint, this.points[i],  -1);
		}	
		this.distance = distanceOpt(theOrigin, this.points[0]);	 
	}

	this.copyOriginalLocations = function()
	{
		this.points = clone(this.points_org);	
	}	

	this.frustrumCheck = function()
	{
		for(var i=0; i<4; i++)
		{
			if(isInsideFrustrum(this.points[i]))
				continue;
			else
				return false;
		}

		return true; 
	}

	this.createDotProducts = function()
	{
		var foo, a, b, origVec, normal;
	
		foo = this.points[0];  // origin ( V0 )
		a = makeVector2(this.points[1], foo);
		b = makeVector2(this.points[2], foo);
			
		normal = normalise(crossProduct(a, b));
		origVec =  normalise(makeVector(foo, theOrigin)); 
		this.dot = dotProduct( origVec, normal);

	}
	
	this.drawSelf = function(ctx)
	{
		var shading;
		//( ctx, points, i, fillColor, type, shade) 

		if(this.dot>=0)
		{ 
			shading = Math.ceil(this.dot * 255);
			drawQuad(ctx, this.points, 2, "filled", shading);
		}  	
	}

	this.scaleProject = function()
	{
		for(var i=0; i<4; i++)
        {
			pos = this.points[i];
										
			// avoid divide by 0 - frustrum should have cleaned up any objects at z = 0
			if(Math.abs(pos.z) >= 0 && Math.abs(pos.z) <=20)
			{ 
				this.visibility = false ;
				return;
			}	

			pos.x =   (pos.x / pos.z ) * rendererScale  + halfScrWidth;
			pos.y = -(pos.y / pos.z ) * rendererScale    + halfScrHeight;
        }
	}
 
	this.show  = function()
	{
 
		console.log("tri - x:" +  this.points[0].x.toFixed(1) +
		", y:" + this.points[0].y.toFixed(1) +  ", z:" +   this.points[0].z.toFixed(1) );
		
	}

}



function Oblong(p1, size, height, color, d2o)
{
	this.points = [];
	this.points_org = []; 
    this.visibility = true;
	this.dots = [];  // ie dot normals
	this.color = color;
	this.size = size;
	this.distance = d2o; 
	this.height = 1;
 
	for(var i=0; i<4; i++)
	{ 
		this.points_org[i] = new Point(p1.x+ccd[i][0] * size,
                                   0,
								   p1.z+ccd[i][2] * size, 0 );  // rotate around p8 	   
	}
	for(var i=4; i<9; i++)
	{ 
		this.points_org[i] = new Point(p1.x+ccd[i][0] * size,  p1.y + (ccd[i][1]+this.height) * size,   p1.z+ccd[i][2] * size, 0 );  // rotate around p8 	   
	}


	this.applyRotation = function()
	{
		this.copyOriginalLocations(); 

		for(var i=0; i<this.points.length; i++)
			this.points[i] = rotateRelativePoint(moverPoint, this.points[i],  -1);
		 
		this.distance = distanceOpt(theOrigin, this.points[0]);		
	}

	this.copyOriginalLocations = function()
	{
		this.points = clone(this.points_org);	
	}	

	this.frustrumCheck = function()
	{
		for(var i=0; i<9; i++)
		{
			if(isInsideFrustrum(this.points[i]))
				continue;
			else
				return false;
		}

		return true; 
	}

	this.createDotProducts = function()
	{
		var foo, a, b, origVec, normal;
		for(var i=0; i<cfd.length; i++)
		{
			foo = this.points[cfd[i][0]];  // origin ( V0 )
			a = makeVector2(this.points[cfd[i][3]], foo);
			b = makeVector2(this.points[cfd[i][1]], foo);
			 
			normal = normalise(crossProduct(a, b));
			origVec =  normalise(makeVector(foo, theOrigin)); 
			this.dots[i] = dotProduct( origVec, normal);
		}
	}
	
	this.drawSelf = function(ctx)
	{
		var shading;
		for(var i=0; i<cfd.length; i++)
			if(this.dots[i]>=0)
			{ 
				shading = Math.ceil(this.dots[i] * 255);
				drawQuad(ctx, this.points, i, this.color, "filled", shading);
			}  	
	}

	this.scaleProject = function()
	{
		for(var i=0; i<ccd.length; i++)
        {
            pos = this.points[i];
                                         
            // avoid divide by 0 - frustrum should have cleaned up any objects at z = 0
			if(Math.abs(pos.z) >= 0 && Math.abs(pos.z) <=200)
			{ 
				this.visibility = false ;
				return;
			}	
           pos.x =  (pos.x / pos.z ) * rendererScale + halfScrWidth;
           pos.y =  -(pos.y / pos.z ) * rendererScale + halfScrHeight;
        }
	}
}

function Cube(p1, size, color, d2o, type)
{
	this.points = [];
	this.points_org = [];
	//this.normals = [];
    this.visibility = true;
	this.dots = [];  // ie dot normals
	this.color = color;
	this.size = size;
	this.distance = d2o;
	this.type = type;
	//this.spin = new Direction(rndInt(-359, 359), rndInt(-359, 359), rndInt(-359, 359));
	//this.rotatePoint =0;
	//this.vector = new RVector(0,0,0);
	//this.wireFrameOutlineColor = "white";

	if(type == "wireframe")
		this.filltype="wireframe";
	else
		this.filltype = "solid";

	for(var i=0; i<ccd.length; i++)
		this.points_org[i] = new Point(p1.x+ccd[i][0] * size,
                                   p1.y+ccd[i][1] * size,
								   p1.z+ccd[i][2] * size, 0 );  // rotate around p8 	   

	this.applyRotation = function()
	{
		this.copyOriginalLocations(); 

		for(var i=0; i<this.points.length; i++)
			this.points[i] = rotateRelativePoint(moverPoint, this.points[i],  -1);
		 
		this.distance = distanceOpt(theOrigin, this.points[0]);		
	}

	this.copyOriginalLocations = function()
	{
		this.points = clone(this.points_org);	
	}	

	this.frustrumCheck = function()
	{
		for(var i=0; i<9; i++)
		{
			if(isInsideFrustrum(this.points[i]))
				continue;
			else
				return false;
		}

		return true; 
	}

	this.createDotProducts = function()
	{
		var foo, a, b, origVec, normal;
		for(var i=0; i<cfd.length; i++)
		{
			foo = this.points[cfd[i][0]];  // origin ( V0 )
			a = makeVector2(this.points[cfd[i][3]], foo);
			b = makeVector2(this.points[cfd[i][1]], foo);
			
			// this.normals[i] = normalise(crossProduct(a, b));  // unit normal
			normal = normalise(crossProduct(a, b));
			origVec =  normalise(makeVector(foo, theOrigin));
			//this.dots[i] = dotProduct( origVec, this.normals[i]);
			this.dots[i] = dotProduct( origVec, normal);
		}
	}
	
	this.drawSelf = function(ctx)
	{
		if(this.filltype == "wireframe")
		{
			for(var i=0; i<cfd.length; i++) 
				drawQuadOutline( ctx, this.points, i, 2, this.wireFrameOutlineColor); 
			return;

		}	
		else
		{
			var shading;
			for(var i=0; i<cfd.length; i++)
				if(this.dots[i]>=0)
				{ 
					shading = Math.ceil(this.dots[i] * 255);
					drawQuad(ctx, this.points, i, this.color, "filled", shading);
				} 
		}	
	}

	this.scaleProject = function()
	{
		for(var i=0; i<ccd.length; i++)
        {
            pos = this.points[i];
                                         
            // avoid divide by 0 - frustrum should have cleaned up any objects at z = 0
			if(Math.abs(pos.z) >= 0 && Math.abs(pos.z) <=200)
			{ 
				this.visibility = false ;
				return;
			}	
           pos.x =  (pos.x / pos.z ) * rendererScale + halfScrWidth;
           pos.y =  (pos.y / pos.z ) * rendererScale + halfScrHeight;
        }
	}
/*
	this.inputPointData = function (thePoints)
	{
	this.points =[];
	for(var i=0; i<thePoints.length; i++)
		this.points[i] = thePoints[i];
	}

	this.changePosition = function(old, newone)
	{
 
		for(var i=0; i<ccd.length; i++)
		{
			temp = takeawayTwoPositions(old, this.points[i] );
			this.points[i] = addTwoPositions(temp, newone);
		}
	}
	
	this.updateSpinAngles = function()
	{
		this.spin.incrementAngle("psi",  1);
		this.spin.incrementAngle("theta", 1);
		this.spin.incrementAngle("phi",  1);
	}

	this.translate = function()
	{
		for(var i=0; i<this.points.length; i++)
        {
			this.points[i] = addTwoPositions(this.points[i], this.position);
        }
	}

	this.explode = function()
	{
		for(var i=0; i<this.points.length; i++)
        {
			this.points[i] = addPosVec(this.points[i], this.vector);

		} 
		
	}

	this.spinObject = function()
	{
		for(var i=0; i<this.points.length; i++)
			this.points[i] = rotate(this.points[8], this.points[i], this.spin, -1);
	}

    this.show  = function()
   {

       console.log("cube - x:" +  this.points[0].x.toFixed(3) +
       ", y:" + this.points[0].y.toFixed(3) +  ", z:" +   this.points[0].z.toFixed(3) );
       
   }

   this.showPoints = function()
   {
		for(var i=0; i<this.points.length; i++)
			console.log("cube -" + i + " x:" +  this.points[i].x.toFixed(3) + ", y:" + this.points[i].y.toFixed(3) +  ", z:" +   this.points[i].z.toFixed(3) );
   }

    this.showNormals = function()
    {
        console.log("i:" +  this.normals[0].i.toFixed(3) +
        ", j:" + this.normals[0].j.toFixed(3) +  ", k:" +  this.normals[0].k.toFixed(3) + ".n: " + this.dots[0]);
        
	}
	*/
	
}

function Face(p, size, color, cornerPoints, useNormals, outlineColorOn)
{
    this.points = [];
    this.normal;
    this.dots = [];  // ie dot normals
    this.color = color;
    this.size = size;
    this.visibility = true ;
    this.corners = [];
    this.cornerPoints = [];
	this.useNormals = useNormals;
	this.outlineOn = outlineColorOn;
	
    for(var i=0; i<4; i++)
        this.corners[i] = cornerPoints[i];                     // for y elevation
    
    for(var i=0; i<4; i++)
        this.points[i] = new Point(p.x+faceData[i][0] * size,
                                   p.y,                              // always 0 face is in XZ plane
								   p.z+faceData[i][2] * size );      // rotate around p1
	this.distance = distanceOpt(theOrigin, this.points[0]);							   
    
    this.applyRotation = function()
    {
        for(var i=0; i<this.points.length; i++)
			this.points[i] = rotateRelativePoint(moverPoint, this.points[i],  -1);
		this.distance = distanceOpt(theOrigin, this.points[0]);		
    }
    
    this.createNormals = function()
    {
		if(!this.useNormals)
			return;

        var foo, a, b, origVec;

            foo = this.points[0];  // origin ( V0 )
            a = makeVector2(this.points[1], foo);
            b = makeVector2(this.points[2], foo);
            this.normal = normalise(crossProduct(a, b));

            origVec =  normalise(makeVector(foo, theOrigin));
            this.dots[0] = dotProduct( origVec, this.normal);  //this.show(); // Normals();
      
    }
    
    this.showNormals = function()
    {
        console.log("i:" +  this.normals[0].i.toFixed(3) +
        ", j:" + this.normals[0].j.toFixed(3) +  ", k:" +  this.normals[0].k.toFixed(3) + ".n: " + this.dots[0]);
        
    }
    
    this.show = function()
    {
        for(var i=0; i<4; i++)
        console.log("face - x:" +  this.points[i].x.toFixed(3) +
        ", y:" + this.points[i].y.toFixed(3) +  ", z:" +   this.points[i].z.toFixed(3) );
    }
    
	this.drawSelf = function (ctx)
	{
		var shading;
		if(!this.useNormals)
			drawFace(ctx, this.points, this.color, "filled", 255, this.outlineOn);

		if(this.dots[0]>=0)
		{ 
			shading = Math.ceil(this.dots[0] * 255);
			drawFace(ctx, this.points, this.color, "filled", shading, this.outlineOn);
		} 
	}

	this.scaleProject = function()
	{
		for(var i=0; i<4; i++)
		{
			 pos = this.points[i];
										 
			 if(pos.z >= 0 && Math.abs(pos.z) <=0.1)
			  {
				  this.visibility = false ;
				   
			  }
			
		   pos.x =  (pos.x / pos.z ) * scale + halfScrWidth;
		   pos.y =  (pos.y / pos.z ) * scale + halfScrHeight;
		}
	}

	this.frustrumCheck = function()
	{
		for(var i=0; i<4; i++)
		{
			if(isInsideFrustrum(this.points[i]))
				continue;
			else
				return false;
		}

		return true;
	}
}

function Quadrilateral(cornerPoints, color, outlineColorOn)
{
   
    this.normal;
    this.dots = [];  // ie dot normals
    this.color = color;
    this.distance = 0;
    this.visibility = true  ;
    this.points = [];
    this.outlineOn = outlineColorOn;
    
    for(var i=0; i<4; i++)
        this.points[i] = cornerPoints[i];                     // for y elevation
	
	this.distance = distanceOpt(theOrigin, this.points[0]);		
		
    this.applyRotation = function()
    {
        for(var i=0; i<4; i++)
			this.points[i] = rotateRelativePoint(moverPoint, this.points[i],  -1);
		
		this.distance = distanceOpt(theOrigin, this.points[0]);	
    }
    
    this.createNormals = function()
    {
        var foo, a, b, origVec;

            foo = this.points[0];  // origin ( V0 )
            a = makeVector2(this.points[1], foo);
            b = makeVector2(this.points[2], foo);
            this.normal = normalise(crossProduct(a, b));

            origVec =  normalise(makeVector(foo, theOrigin));
            this.dots[0] = dotProduct( origVec, this.normal);  //this.show(); // Normals();
      
    }
    
    this.showNormals = function()
    {
        console.log("i:" +  this.normals[0].i.toFixed(3) +
        ", j:" + this.normals[0].j.toFixed(3) +  ", k:" +  this.normals[0].k.toFixed(3) + ".n: " + this.dots[0]);
        
    }
    
    this.show = function()
    {
        for(var i=0; i<4; i++)
        console.log("face - x:" +  this.points[i].x.toFixed(3) +
        ", y:" + this.points[i].y.toFixed(3) +  ", z:" +   this.points[i].z.toFixed(3) );
    }
    
	this.drawSelf = function (ctx)
	{
		var shading;
		drawFace(ctx, this.points, this.color, "filled", 255, this.outlineOn);
		 if(this.dots[0]>=0)
		{ 
			shading = Math.ceil(this.dots[0] * 255);
			drawFace(ctx, this.points, this.color, "filled", shading, this.outlineOn);
			//drawFace(ctx, this.points, this.color, "filled", 255);
		}   
	}

	this.scaleProject = function()
	{
		for(var i=0; i<4; i++)
		{
			 pos = this.points[i];
										 
			 if(pos.z >= 0 && Math.abs(pos.z) <=0.1)
			  {
				  this.visibility = false ;
				   
			  }
			
		   pos.x =  (pos.x / pos.z ) * scale + halfScrWidth;
		   pos.y =  (pos.y / pos.z ) * scale + halfScrHeight;
		}
	}

	this.frustrumCheck = function()
	{
		for(var i=0; i<4; i++)
		{
			if(isInsideFrustrum(this.points[i]))
				continue;
			else
				return false;
		}

		return true;
	}
}

function perpVector(v)
{
	return new RVector(-v.k, 0, v.i);
}

function ReplayDatum(p, v, d, c)
{
	this.position = p; 
	this.vector = v; // not needed as yet!
	this.moverDirection = d;
	this.cameraPosition = c;
}

function LineTrack (p, mVector, length, color)
{
	this.points = [];
	this.points[0] = new Point(p.x, p.y, p.z);
	this.color = color;
	this.forwardVector = clone(mVector);
	this.moverDirection = clone(moverDirection);
	var nv = normalise(mVector);

	var perpVectorRight = new RVector(-nv.k, nv.j, nv.i); 
	var perpVectorLeft = new RVector( nv.k, nv.j, -nv.i); 
	
	var pUp = new RVector(0, -Math.abs(nv.k), nv.j);
	this.lineVector = resizeVector(perpVectorRight, length); 
	this.lineVectorLeft = resizeVector(perpVectorLeft, length); 
	this.lineVectorUp = resizeVector(pUp, length);
	this.lineVectorUp2 = resizeVector(pUp,  length);

	this.points[1] = addPosVec(this.points[0], this.lineVector );
	this.points[2] = addPosVec(this.points[0], this.lineVectorLeft);
	this.points[3] = addPosVec(this.points[0], this.lineVectorUp);
	this.points[4] = addPosVec(this.points[0], this.lineVectorUp2);
	this.distance = distanceOpt(theOrigin, this.points[0]);		

	this.applyRotation = function()
	{
		for(var i=0; i<this.points.length; i++)
			this.points[i] = rotateRelativePoint(moverPoint, this.points[i],  -1);
	}

	this.drawSelf = function(ctx)
	{ 

		dot(ctx, this.points[0], 3, "blue", "blue");		

		drawLine(ctx, this.points[0], this.points[1], this.color, 3); // line vector
		drawLine(ctx, this.points[0], this.points[2], "green", 3); // left vector
		drawLine(ctx, this.points[0], this.points[3], "red", 3);  // up vector
	}

	 this.createNormals = function()
	 {

	 }

	this.scaleProject = function()
	{
		for(var i=0; i<this.points.length; i++)
        {
            pos = this.points[i];
                                         
            // avoid divide by 0 - frustrum should have cleaned up any objects at z = 0
            if(pos.z >= 0 && Math.abs(pos.z) <=0.1)
			{ 
				this.visibility = false ;
			return;
			}
          
           pos.x =  (pos.x / pos.z ) * scale + halfScrWidth;
           pos.y =  (pos.y / pos.z ) * scale + halfScrHeight;
        }
	}

	this.frustrumCheck = function()
	{
		for(var i=0; i<this.points.length; i++)
		{
			if(isInsideFrustrum(this.points[i]))
				continue;
			else
				return false;
		}

		return true;
	}
}


function RVector(i, j, k)
{
	this.i = i;
	this.j = j;
	this.k = k;
	
	this.reset = function(direction, s)
	{
		this.i = 0;
		this.j = 0;
		this.k = (5 + s) * direction;
	}
	
	this.lift = function(direction, s)
	{
		this.i = 0;
		this.j = (5 + s) * direction  ;
		this.k = 0;
	}
	
    this.side = function(direction, s)
    {
        this.i = (5+s) * direction;
        this.j = 0;
        this.k = 0;
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
