function draw()
{
	var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d"); 
 	ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    visibles = 0;
    
    for(var t=0; t < myObjects.length; t++) 
    { 
        // only scale and draw an Object that can be seen i.e inside Frustrum and dot product >=0. Also that no div z = 0
        if(myObjects[t].visibility) 
        { 
			Triangle_Helper.scaleProject(myObjects[t]);   
			
            if(Triangle_Helper.windowCheck(myObjects[t])) 
            { 
                Triangle_Helper.drawSelf(ctx, myObjects[t]);
                visibles++;
            }    
        }    
    }
} 

function dot(ctx, p1, r, color, color1)
{
	ctx.beginPath();
	ctx.arc(p1.x, p1.y, r, 0, my360);
	ctx.fillStyle = color;
	ctx.lineWidth = 2;
	ctx.strokeStyle = color1;
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function drawLine(ctx, p1, p2, color, thickness)
{
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
	ctx.stroke();
}

function drawTri( ctx, points, fillColor, type, shade)  // from cube only
{
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	
    ctx.fillStyle = "rgb("+ 
    colors[fillColor][0] * shade + "," + colors[fillColor][1] * shade + "," + colors[fillColor][2] * shade +")"; //  fillColor;
	ctx.beginPath();
                                         
	ctx.moveTo(points[0].x, points[0].y);

	for(var j=1; j<3; j++) 
		ctx.lineTo(points[j].x, points[j].y);

	ctx.lineTo(points[0].x, points[0].y);
    ctx.closePath();
    
	if(type=="filled")
		ctx.fill();
	 ctx.stroke();
}

/*  0 black= 000
    1 blue = 001
	2 green 010
	3 cyan 011
	4 red 100
	5 mauve 101
	6 yellow = 110
	7 white 111  */

var colors = [[0,0,0],[0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]];
                                         
function randomColor()
{
	return  rndInt(0, colors.length);
}

function updateInfoBox(fps)
{
    moverInfo = document.getElementById("moverInfo") ; 
    gameInfo = document.getElementById("gameInfo") ; 
   
    moverInfo.setAttribute("value", Point_Helper.textValue(moverPoint) + " // " + moverVector.textValue() + " // speed:" + 
    speed);
    
    gameInfo.setAttribute("value",  "objects:" +   myObjects.length + " // visible " + visibles + "// FPS: " + fps  ) ;

}