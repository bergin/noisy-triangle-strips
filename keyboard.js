var hasShot = false;
var transaction = false;
var continuous = false;
function alter_mover_position()
{
 

	if(KBI.forward && KBI.accelerate)  // not accelerate but go fast
	{
		speed += 10;
		calculateFrustrum(1, "move");	  
	}	
	
	if(KBI.backward && KBI.accelerate)
	{
		speed += 10;
		calculateFrustrum(-1, "move");
	}	
	
	if( KBI.accelerate)
	{
		speed += 10;
		calculateFrustrum(0, "");
	}	

	if(KBI.decelerate)
	{
		speed -= 10;
		calculateFrustrum(0, "");
	}
	
	if(KBI.forward)
		calculateFrustrum(1, "move");	  
	
	if(KBI.backward)
		calculateFrustrum(-1, "move");
	
	if(KBI.up)
		calculateFrustrum(-1, "lift");
	
	if(KBI.down)
		calculateFrustrum(1, "lift");	
    
    if(KBI.left)
        calculateFrustrum(-1, "side");
    
    if(KBI.right)
        calculateFrustrum(1, "side");
    
	if(KBI.yawLeft)
		calculateFrustrum(degInc, "yaw");
		
	if(KBI.yawRight)
		calculateFrustrum(-degInc, "yaw");
	 	
	if(KBI.pitchUp)
		calculateFrustrum(-degInc, "pitch");

	if(KBI.pitchDown)
		calculateFrustrum(degInc, "pitch");
		
	if(KBI.rollLeft)
		calculateFrustrum(-degInc, "roll");

	if(KBI.rollRight)
		calculateFrustrum(degInc, "roll");
	/*
	if(KBI.fire)	
	{
		if(!hasFired)  		
			createMissile(1000, 300);   // size , speed

		calculateFrustrum(0, "");  
	}
	*/
}


function keyupEvent(event)
{
	var keycode = event.keyCode;
	// console.log(keycode);
	
	switch(keycode)
	{	

		case 71: // g for grab state
		KBI.saveState = false;
		transaction = false;
		break;
		
		case 220:   //" \ "
		KBI.continuousBlocks = false;
		break;

		case 187:
		KBI.wireframe = false;
		transaction = false;
		break;

		case 219: 		// " [ "
		KBI.placeOrRemoveBlock = false;
		transaction = false;
		break;

		case 189: 		// " - "
		KBI.forwardBlock = false;
		transaction = false;
		break;

		case 222:		// " , "
		KBI.backwardBlock = false;
		transaction = false;
		break;

		case 80:		// p
		KBI.leftBlock = false;
		transaction = false;
		break;

		case 221: 		// ' ] ' 
		KBI.rightBlock = false;
		transaction = false;
		break;

		case 186: 		// ' 0 ' 
		KBI.upBlock = false;
		transaction = false;
		break;

		case 48:		// " ; "
		KBI.downBlock = false;
		transaction = false;
		break;


		case 37 : //left arrow - side left
		KBI.left = false;
		break;
		
		case 39 : // right arrow - sideways right
		KBI.right = false;
		break;
		
		case 81 : // lift up 		q
		KBI.up = false;
		break;

		case 90 : // lift down		z
		KBI.down = false;
		break;
		
		case 38 : // up arrow  - move forward ++ z translate
		KBI.forward = false;
		break; 
		
		case 40 : //down arrow  - move backward -- z translate
		KBI.backward = false;
		break;
		
		case 87 : // pitch up 		w
		KBI.pitchUp = false;
		break;

		case 88 : // pitch down  	x
		KBI.pitchDown = false;
		break;

		case 68 : //roll left  		d
		KBI.rollLeft = false;
		break;

		case 65 : // roll right 		a
		KBI.rollRight = false;
		break;

        case 49 :               // 1
        KBI.yawLeft = false;
        break;
        
        case 51 :           // 3
        KBI.yawRight = false;
        break;
		
		case 82 : // r for reset, speed = 0
		speed = 10;
		moverDirection.reset();
		break;

		case 17 : // go faster!
		KBI.decelerate = false;
		break;
		
		case 16 : // constant speed - shift
		KBI.accelerate = false;
		break;

		case 32:
		KBI.fire = false;
		hasFired= true;
		break;
	} 
	
}



function keydownEvent(event)
{ 
	var keycode = event.keyCode;     
 
	switch(keycode)
	{	
		case 71: 		// 'g'
		KBI.saveState = true;
		break;

		case 187:      // " = "
		KBI.wireframe = true;
		break;

		case 220:   //" \ "
		KBI.continuousBlocks = true;
		break;

		case 219: 		// " [ "
		KBI.placeOrRemoveBlock = true;
		break;

		case 189: 		// " - "
		KBI.forwardBlock = true;
		break;

		case 222:		// " , "
		KBI.backwardBlock = true;
		break;

		case 80:		// p
		KBI.leftBlock = true;
		break;

		case 221: 		// ' ] ' 
		KBI.rightBlock = true;
		break;

		case 186: 		// ' 0 ' 
		KBI.upBlock = true;
		break;

		case 48:		// " ; "
		KBI.downBlock = true;
		break;


		case 37 : //left arrow - yaw
		KBI.left = true;
		break;
		
		case 39 : // right arrow - yaw	
		KBI.right = true;
		break;
		    
        case 49 :   // 1
        KBI.yawLeft = true;
        break;
        
        case 51 : // 3
        KBI.yawRight = true;
        break;
            
		case 81 : // lift up
		KBI.up = true;
		break;

		case 90 : // lift down	
		KBI.down = true;
		break;
		
		case 38 : // up arrow  - move forward ++ z translate
		KBI.forward = true;
		break; 
		
		case 40 : //down arrow  - move backward -- z translate
		KBI.backward = true;
		break;
		
		case 87 : // pitch up
		KBI.pitchUp = true;
		break;

		case 88 : // pitch down  
		KBI.pitchDown = true;
		break;

		case 68 : //roll left
		KBI.rollLeft = true;
		break;

		case 65 : // roll right
		KBI.rollRight = true;
		break;
		
		case 16 : // go faster!
		KBI.accelerate = true;
		break;

		case 16 : // go faster!
		KBI.accelerate = true;
		break;

		case 17 : // go faster!
		KBI.decelerate = true;
		break;


		case 75:			// k for rinematic
		
		if(!replay)
		{
			replay = true;
			tracksCounter = 0;
			drawLines = false;	
			createReplay();
		}	
		else
		{
			replay = false;
		}
		break;

		case 66:			// b for bug
		showAllFacePoints();
		break;

		case 76:			// l 
			if(!drawLines)
			{
				drawLines = true;
			}	
				
			else
			{
				tracksCounter = 0;
				drawLines = false;	
			}
		break;

		case 32:    /// space bar
		KBI.fire = true;
		hasFired= false;
		break;	
	} 
}

function KeyBoardInput()
{
	this.saveState = false;
	this.placeOrRemoveBlock = false;
	this.forwardBlock = false;
	this.backwardBlock = false;
	this.leftBlock = false;
	this.rightBlock = false;
	this.upBlock = false;
	this.downBlock = false;
    this.forward = false;
    this.backward = false;
    this.wireframe = false;
    this.up = false;
	this.down = false;
 
	this.continuousBlocks = false;
 
    
    this.left = false;
    this.right = false;
    
    this.yawLeft = false;
    this.yawRight = false;
    
    this.pitchUp = false;
    this.pitchDown = false;
    
    this.rollLeft = false;
	this.rollRight = false;
	
	this.accelerate = false;
	this.decelerate = false;
	
	this.fire = false;
    
    window.addEventListener("keydown", keydownEvent, false);
    window.addEventListener("keyup",  keyupEvent, false);
	
	
	this.isUserActive = function ()
	{
		if(
			this.forward || 
			 
			this.backward || 
			
			this.up || 
			this.down || 
			
			this.left || 
			this.right || 
			
			this.yawLeft || 
			this.yawRight || 
			
			this.pitchUp || 
			this.pitchDown || 
			
			this.rollLeft || 
			this.rollRight || 
			this.accelerate || 
			this.decelerate ||
			this.fire)
			
			return true;
			else
				return false;
	}
}