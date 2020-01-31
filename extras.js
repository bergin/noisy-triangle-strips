var scaler = {};
scaler.alter = function(element)
{
	objectScale = parseInt(element.value);
	new Audio("snap.m4a").play();
	perlinGrid();
	setupTriangleStrips();
	calculateFrustrum(0, "")
	draw(); 
};
 
var octaver = {};
octaver.alter = function(element)
{
	octave = parseInt(element.value);
	maxFrequency =Math.pow(2, octave); 
	//new Audio("snap.m4a").play();
	perlinGrid();
    draw();
};
 
var contrast = {};

contrast.alter = function(element)
{
	mag = element.value;
	perlinGrid();
	setupTriangleStrips();
	calculateFrustrum(0, "");
	draw();
};

var angler = {};
angler.alter = function(element)
{
	myAngle = parseInt(element.value);
	// new Audio("short-click.wav").play();
	changeVectorAngles(myAngle);
	perlinGrid();
	setupTriangleStrips();
	calculateFrustrum(0, "");
	draw();
};



function Octaves()
{ 
	calculatedValues =[];
	var  frequency = 1, mod = gridWidth, newVal;
	// reset
	for(y=0; y<gridWidth; y++)
	{ 
		for(x=0; x<gridWidth; x++)
		{
			gridOfValues[x][y] = new Coord(x, y, 0);	
		 
		}
	}	

	for(var oct = 0; oct<7; oct++)
	{ 
		mod = gridWidth / frequency; 
		
		for(a=0; a< gridWidth; a+=mod)
		{
			for(b=0; b< gridWidth; b+=mod)
			{
				newVal =  rndInt(0, mod *3) ;
				for(y=a; y<a+mod; y++)
				{ 
					for(x=b; x<b+mod; x++)
					{
						gridOfValues[x][y].value += newVal; 
					}
				}	
			}	
		}	
		console.log ("OCT: " + oct + " mod " +   mod + " frequency: " + frequency + " nV: "+ newVal);
		frequency *= 2;
	
	}

	for(y=0; y<gridWidth; y++)
	{ 
		for(x=0; x<gridWidth; x++)
		{ 	
		 calculatedValues.push( gridOfValues[x][y] );
	
		}
	}	
	squareSize = 24;

	draw();

}

function controlVectors()
{ 
	if(!redVectors)
	{
		redVectors = true;
		perlinGrid();
		draw();
	}
		
	else
	{
		redVectors = false;
		perlinGrid();
		draw();
	}
}

function controlLoop()
{
	if(!looping)
	{
		new Audio("wine-glass.wav").play();	
		looping = true;
		loop();
	}
		
	else
	{
		new Audio("wine-glass.wav").play();	
		looping = false;
		perlinGrid();
		draw();
	}
}

function colouring(type)
{
	colouringType = type; 
		
	perlinGrid();	
	draw();
	new Audio("wine-glass.wav").play();	
}

function Create2DArray(gridWidth)
{
	var arr = [];
  
	for (var i=0;i<gridWidth;i++) 
	{
	   arr[i] = [];
	}
  
	return arr;
}

function Create3DArray(gridWidth)
{
	var arr = Create2DArray(gridWidth);
  
	for (var j=0;j<gridWidth;j++) 
	{ 
		for (var i=0;i<gridWidth;i++) 
		{
			arr[i][j] = [];
		}
		
	}

	return arr;
}

function roughSizeOfObject( object ) {

    var objectList = [];

    var recurse = function( value )
    {
        var bytes = 0;

        if ( typeof value === 'boolean' ) {
            bytes = 4;
        }
        else if ( typeof value === 'string' ) {
            bytes = value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes = 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList[ objectList.length ] = value;

            for( i in value ) {
                bytes+= 8; // an assumed existence overhead
                bytes+= recurse( value[i] )
            }
        }

        return bytes;
    }

    return recurse( object );
}