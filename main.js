"use strict";

// mover
var KBI, moverVector, moverPoint, moverDirection, moverPointScr, moverSpeed=0, blockPoint; 
var speed = 250; 
// screen 
var xClipping = 600000, yClipping = 600000,  zClipping = 1000000,  minZ=500, halfBoundarySize = 1000000;;
var halfScrWidth, halfScrHeight, requestAnimationFrame;
var scrWidth, scrHeight, info, nearObjects, userInput, counter;

// objects
var myObjects = [], nearObjects = [];
var theOrigin = new Point(0,0,0), rendererScale = 800;
var visibles = 0;
  
var inc = 1, degInc = 1; 

// noise
var maxFrequency = 1, amplitude = 1;


var scale = 200, squareSize = 1, detail = 0.20000;   /// rename to resolution

var mag = 0, gAngles=0; /// pro is the constrast variable. needs a better title



var R1, R2, P, pixel,  displacement = 10;
var toggle = false, toggler = false, looping=true, redVectors = false;
var rad = Math.PI / 180.0;
var startPoint =0, grey = false;
var colouringType = "yellowblue";
var detailer = {};
var myAngle=1;
 


var objectScale =15000;

var gridSize = 50;

var usableGrid = 10;
var rowWidth = (usableGrid-1)/detail;
var gridOfValues = Create2DArray(gridSize), n =[], calculatedValues = [];

var count = 0;


function loops()
{ 
    userInput = KBI.isUserActive();  // look for keyboard input
    alter_mover_position();	         // and calculate frustrum
    if(!userInput)  calculateFrustrum(0, "");	// default view - only run if there is something else moving.
	draw();
    requestAnimationFrame(loops);      
}

function setup()
{
    init();
    perlinInit();
    setupTriangleStrips(); 
	calculateFrustrum(0, "");
	draw();
    loops();
}

function calculateFrustrum(direction, action)
{
	if(action == "yaw" || action == "pitch" || action=="roll")
		rotateMoverDirection(direction, action);  // add incDeg to current phi, psi, th

    if(action)
        alterMoverPointAndVector(direction, action);

	for(var n = 0; n < myObjects.length; n++)
	{	    
            Triangle_Helper.applyRotation(myObjects[n]);

            if( Triangle_Helper.frustrumCheck(myObjects[n]))
            { 
                Triangle_Helper.createDotProducts(myObjects[n]);
                myObjects[n].visibility = true ; 
               // if(myObjects[n].constructor.name == "Triangle")  alert("inside frtusun");
            }   
            else 
                myObjects[n].visibility = false ;     
    }  

    myObjects.sort(function(a, b) /// sorting objects outside of frustrum!! So frustrating
    {
           if(  a.distance>b.distance)
               return -1;
           if( b.distance<a.distance)
               return 1;  
           return 0;
   })       
}

function alterMoverPointAndVector(moveDirection, type)  
{
    if(type=="move")
         moverVector.reset(moveDirection, speed);  
    if(type=="side")     
        moverVector.side(moveDirection, speed);
    if(type=="lift")     
        moverVector.lift(moveDirection, speed);
    if(type == "yaw" || type == "pitch" || type=="roll")    
        moverVector.reset(1, speed);         
    
    moverVector = rotateVector(moverVector); 
    
    if(type=="move" || type =="side" || type =="lift")
        moverPoint = addPosVec(moverPoint, moverVector ); 
}

function init()
{
    requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

    KBI = new KeyBoardInput();	 
    scrWidth = window.innerWidth * .90, scrHeight = window.innerHeight *.85;
    halfScrWidth = scrWidth / 2, halfScrHeight = scrHeight / 2;
	canvas.setAttribute("width", scrWidth), canvas.setAttribute("height", scrHeight);
	
    // where the user is
  
	moverPoint =  new Point(25000,  15500, -17000);
	moverVector = new RVector(0, 0, 5);
    moverDirection = new Direction(0, 0, 0);
    counter = 0;  
}
