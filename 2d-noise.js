function setupTriangleStrips()
{
	var color = 4;
	myObjects = [], triPoints = [];
 
	for(var  y=0; y<usableGridInt -1; y++)
	{ 
		for(var  x=0; x<usableGridInt- 1; x++)
		{ 
				triPoints[0] = calculatedValues[x][y];
				triPoints[1] = calculatedValues[x][y+1];
				triPoints[2] = calculatedValues[x+1][y] 
 
				
				myObjects.push(new Triangle(triPoints, color)); 

				triPoints[0] = calculatedValues[x+1][y];
				triPoints[1] = calculatedValues[x][y+1] 
				triPoints[2] = calculatedValues[x+1][y+1];

				myObjects.push(new Triangle(triPoints, color));  
		}
	}
}

function perlinInit()
{ 
	var vv =0;
	for(y=0; y<gridSize; y++)
		for(x=0; x<gridSize; x++)
		{ 
			if(rndInt(0,2)==1)
				vv = rndFloat();
			else
				vv = 0;

			gridOfValues[x][y] = rotateGradientVector( new Vector_2D(0,vv), rndInt(0, 359) );	
		}
	perlinGrid(); 
}

var maxFrequency = 2, amplitude = 2;

function perlinGrid()
{
	var xCount =0, yCount = 0;
	 //calculatedValues =[ ];
	var pn, newX = moverPoint.x / objectScale, newY = moverPoint.y / objectScale ;
	  var newX =0, newY = 0;
	 
	for(var v=newY; v<newY+usableGrid  ; v+=detail)
	{ 
		for(var u=newX; u<newX+usableGrid  ; u+=detail)
		{		
			pn=0;
			 
			for(var frequency=1; frequency<=maxFrequency; frequency*=2)
			{ 
				//pn = perlinNoise(u,v);
				 pn += perlinNoise(u*frequency, v *frequency) * (amplitude/frequency);
			}	


			if(pn <=0) 	pn = 0;
		 
			calculatedValues[xCount][yCount] = new Point(parseFloat(u.toFixed(3)), parseFloat(pn.toFixed(5) -1), parseFloat(v.toFixed(3))); 
			xCount++;
		}
		xCount=0;
		yCount++;
	}	
}

function perlinGridBasic()
{
	calculatedValues =[];
	var point, pn;
	 
	for(var v=0; v<gridSize -1 ; v+=detail)
		for(var u=0; u<gridSize -1 ; u+=detail)
		{		
			pn = perlinNoise(u, v);
			if(pn <=0)
				pn = 0;
			point = new Point(u, pn, v, pn); 
			calculatedValues.push(point);
		}
}

function colorAssigner(value)
{
	var color =0;
 
	//value /= objectScale;
	//console.log(value);

	if(value>.9 )
		color = 7; //"white";
		
	if(value>.7 && value<=.9)
		color = 4;//"#DEB887";  // blurly wood

	if(value>=.3 && value<=.7)
		color = 2 ; // "green";		

	if(value>0 && value<.3)
		color = 2; // "#FFD700";     // gold

	if(value<=0)
		color = 1; //"#00008B";	
	return color; 

}


function perlinNoise(x, y)
{
	var grad =[], direct = [], dot =[];
	var X = Math.floor(x), Y = Math.floor(y) , x10, x20,  P0 ;

	var u = x-X, v = y-Y;

	grad[0] = gridOfValues[X][Y];
	grad[1] = gridOfValues[X+1][Y];
	grad[2] = gridOfValues[X][Y+1];
	grad[3] = gridOfValues[X+1][Y+1];

	direct[0] = new Vector_2D(u*mag, v*mag);    
	direct[1] = new Vector_2D((u-1)*mag, v*mag);  	    
	direct[2] = new Vector_2D(u*mag, (v-1)*mag, );  	    
	direct[3] = new Vector_2D((u-1)*mag, (v-1)*mag); 
 

	for(a=0; a<4; a++)
	{
		// console.log(a); grad[a].show(); direct[a].show();
		  dot[a] = dotProduct_2D(grad[a], direct[a]);
	}
		
	fu = fade5t(u), fv = fade5t(v) ;
 
	x10 = lerp2(dot[0], dot[1], fu);
	x20 = lerp2(dot[2], dot[3], fu);
 
	P0 = lerp2(x10, x20, fv);

  
	return P0 / 2 + 0.5; 
}