function setupTriangleStrips()
{
	var color = 4, count = 0;
	myObjects = [], triPoints = [];
 
	for(var v=0; v<usableGrid -2  ; v+=detail)
	{
		for(var u=0; u<usableGrid -1 ; u+=detail)
		{		
			if(u<usableGrid-1-detail)
			{ 
				triPoints[0] = calculatedValues[count];
				triPoints[1] = calculatedValues[count+rowWidth];
				triPoints[2] = calculatedValues[count+1];
				myObjects.push(new Triangle(triPoints, color)); 

				triPoints[0] = calculatedValues[count+rowWidth+1 ];
				triPoints[1] = calculatedValues[count+1];
				triPoints[2] = calculatedValues[count+rowWidth];  
				myObjects.push(new Triangle(triPoints, color));   
			}
			count++; 
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

function perlinGrid()
{
	calculatedValues =[];
	var point, pn;
	 
	for(var v=0; v<usableGrid -1 ; v+=detail)
		for(var u=0; u<usableGrid -1 ; u+=detail)
		{		
			pn=0;
			for(var frequency=1; frequency<=maxFrequency; frequency*=2)
			{ 
				//pn = perlinNoise(u,v);
				 pn += perlinNoise(u*frequency, v *frequency) * (amplitude/frequency);
			}	
			if(pn <=0) 	pn = 0;
			point = new Point(parseFloat(u.toFixed(3)), parseFloat(pn.toFixed(3)), parseFloat(v.toFixed(3)), parseFloat(pn.toFixed(3))); 
			calculatedValues.push(point);
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