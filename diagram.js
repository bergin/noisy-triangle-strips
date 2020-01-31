 
//https://www.w3schools.com/tags/ref_colornames.asp
// https://www.rapidtables.com/web/color/Yellow_Color.html
function draw_perlin_tiles()
{
	var grey;
	var canvas = document.getElementById('canvas');
 
	 if (canvas.getContext)
	 { 
        var ctx = canvas.getContext('2d');  
		ctx.clearRect(0, 0, canvas.width, canvas.height); 
			
		if(colouringType=="monochrome")
		{
			for(a=0;a<calculatedValues.length; a++)
			{ 
				if( calculatedValues[a].value<100)
						color = "black";
				else
					color = "white";	 
				
				drawSquarePColor(ctx, calculatedValues[a].x * scale+displacement, 
						calculatedValues[a].y * scale+displacement, 
						squareSize,  color);
			}				
				
        }	
        
        if(colouringType=="brownblue-monochrome")
		{
			for(a=0;a<calculatedValues.length; a++)
			{ 
				if( calculatedValues[a].value<100)
						color = "#00008B";
				else
					color = "#556B2F";	 // dark olive green
				
				drawSquarePColor(ctx, calculatedValues[a].x * scale+displacement, 
						calculatedValues[a].y * scale+displacement, 
						squareSize,  color);
			}				
				
        }	
        

		if(colouringType=="colours")
		{
			for(a=0;a<calculatedValues.length; a++)
			{
				if(calculatedValues[a].value>190 )
					color = "white";
				if(calculatedValues[a].value>170 && calculatedValues[a].value<=190)
					color = "#DEB887";  // blurly wood
				if(calculatedValues[a].value>=150 && calculatedValues[a].value<=170)
					color = "#8B4513";		// saddle brown
				if(calculatedValues[a].value>=100 && calculatedValues[a].value<=150)
					color = "green";			
				if(calculatedValues[a].value>=90 && calculatedValues[a].value<100)
					color = "#FFD700";     // gold

				if( calculatedValues[a].value<90)
					color = "#00008B";			// dark blue  */
					
				drawSquarePColor(ctx, calculatedValues[a].x * scale+displacement, 
						calculatedValues[a].y * scale+displacement, 
						squareSize,  color);
			}			
		}	

		if(colouringType=="banded")
		{
			for(a=0;a<calculatedValues.length; a++)
			{
				if(calculatedValues[a].value>190 )
					color = "black";
				if(calculatedValues[a].value>170 && calculatedValues[a].value<=190)
					color = "white";  // blurly wood
				if(calculatedValues[a].value>=150 && calculatedValues[a].value<=170)
					color = "black";		// saddle brown
				if(calculatedValues[a].value>=100 && calculatedValues[a].value<=150)
					color = "white";			
				if(calculatedValues[a].value>=90 && calculatedValues[a].value<100)
					color = "black";     // gold

				if( calculatedValues[a].value<90)
					color = "white";			// dark blue  */
					
				drawSquarePColor(ctx, calculatedValues[a].x * scale+displacement, 
						calculatedValues[a].y * scale+displacement, 
						squareSize,  color);
			}			
		}	

		if(colouringType=="greyscale")
			for(a=0;a<calculatedValues.length; a++)
			{
				grey = calculatedValues[a].value;
				drawSquare(ctx, calculatedValues[a].x * scale+displacement, 
					calculatedValues[a].y * scale+displacement, 
					squareSize,  grey, grey, grey);
			}		
			
		if(colouringType=="yellowblue")
			for(a=0;a<calculatedValues.length; a++)
			{
				red = 	 calculatedValues[a].value;
				green =  calculatedValues[a].value;
				blue =   255 - calculatedValues[a].value;
			
				drawSquare(ctx, calculatedValues[a].x * scale+displacement, 
					calculatedValues[a].y * scale+displacement, 
					squareSize,  red, green, blue);	
				}				
	} 
	if(redVectors)
		drawVectors();

}

function redLine(from, to)
{
	var canvas = document.getElementById('canvas');
 
	if (canvas.getContext)
	{ 
		var ctx = canvas.getContext('2d');  

		ctx.beginPath();
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
		ctx.strokeStyle = '#ff0000';
		ctx.stroke();
	}
}

function redArrow(context, from, to) 
{
	var headlen = 5; // length of head in pixels
	var dx = to.x - from.x;
	var dy = to.y - from.y;
	var angle = Math.atan2(dy, dx);

	context.beginPath();
	context.moveTo(from.x, from.y);
	context.lineTo(to.x, to.y);
	context.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
	context.moveTo(to.x, to.y);
	context.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
	context.strokeStyle = '#ff0000';
	context.stroke();

}

function drawVectors()
{ 
	var canvas = document.getElementById('canvas');
 
	if (canvas.getContext)
	{ 
		var ctx = canvas.getContext('2d');  

		for(var y=0; y<gridSize-2; y++)
		{ 
			for(var x=0; x<gridSize-2; x++)
			{ 
		redArrow(ctx, new Coord(x*scale+displacement, y * scale+displacement, 0 ) , 
		new Coord(scale*(gridOfValues[x][y].i+x) +displacement , scale*(gridOfValues[x][y].j+y)+displacement, 0 ));
			}
		}	
	}	
}

function drawSquare(ctx, x,  y, sqWidth, shadeR, shadeG, shadeB)
{ 	 
	ctx.fillStyle =  'rgb(' + shadeR +',' + shadeG +',' + shadeB+ ' )'; 
	ctx.fillRect(x , y, sqWidth, sqWidth);
	//ctx.strokeStyle = "#FF0000"; ctx.strokeRect(x , y, sqWidth, sqWidth);
}

function drawSquarePColor(ctx, x,  y, sqWidth,  color)
{ 	 
	ctx.fillStyle =  color;
	ctx.fillRect(x , y, sqWidth, sqWidth);
	//ctx.strokeStyle = "#FF0000"; ctx.strokeRect(x , y, sqWidth, sqWidth);
}

function drawASquare(x,y, val)
{

	var canvas = document.getElementById('canvas');
 
	 if (canvas.getContext)
	 { 
        var ctx = canvas.getContext('2d');  
		drawSquare(ctx, x*scale, y*scale, squareSize, val );
	} 
}
