
var transaction = false;
var continuous = false;

function alter_mover_position()
{
	if(KBI.forward && KBI.accelerate)  // not accelerate but go fast
	{
		speed += 10;
		calculateFrustrum(1, "move");	 
		return; 
	}	
	
	if(KBI.backward && KBI.accelerate)
	{
		speed += 10;
		calculateFrustrum(-1, "move");
		return;
	}	
	
	if( KBI.accelerate)
	{
		speed += 10;
		calculateFrustrum(0, "");
		return;
	}	

	if(KBI.decelerate)
	{
		speed -= 10;
		calculateFrustrum(0, "");
		return;
	}
	
	if(KBI.forward)
	{ 
		calculateFrustrum(1, "move");	 
		return;
	}
	
	if(KBI.backward)
	{ 
		calculateFrustrum(-1, "move");
		return;
	}	
	
	if(KBI.up)
	{ 
		calculateFrustrum(-1, "lift");
		return;
	}
	
	if(KBI.down)
	{ 
		calculateFrustrum(1, "lift");	
		return;
	}

	if(KBI.left)
	{
		calculateFrustrum(-1, "side");
		return;
	}

	if(KBI.right)
	{ 
		calculateFrustrum(1, "side");
		return;
	}

	if(KBI.yawLeft)
	{ 
		calculateFrustrum(degRad, "yaw");
		return;
	}

	if(KBI.yawRight)
	{ 
		calculateFrustrum(-degRad, "yaw");
		return;
	}

	if(KBI.pitchUp)
	{
		calculateFrustrum(-degRad, "pitch");
		return;
	}

	if(KBI.pitchDown)
	{ 
		calculateFrustrum(degRad, "pitch");
		return;
	}

	if(KBI.rollLeft)
	{ 
		calculateFrustrum(-degRad, "roll");
		return;
	}

	if(KBI.rollRight)
	{ 
		calculateFrustrum(degRad, "roll");
		return;
	}
}

function keyupEvent(event)
{
	var keycode = event.keyCode;

	switch(keycode)
	{	
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

		case 65 : // roll right 	a
		KBI.rollRight = false;
		break;

        case 49 :               //  1
        KBI.yawLeft = false;
        break;
        
        case 51 :           // 		3
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
	} 
}

function keydownEvent(event)
{ 
	var keycode = event.keyCode;     
 
	switch(keycode)
	{	
		case 37 : //left arrow - yaw
		KBI.left = true;
		break;
		
		case 39 : // right arrow - yaw	
		KBI.right = true;
		break;
		    
		case 81 : // lift up
		KBI.up = true;
		break;

		case 90 : // lift down	
		KBI.down = true;
		break;
		
		case 38 : // up arrow  - move forward ++ z translate
		KBI.forward = true;
		//console.log('forward');
		break; 
		
		case 40 : //down arrow  - move backward -- z translate
		KBI.backward = true;
		break;

		case 49 :   // 1
        KBI.yawLeft = true;
        break;
        
        case 51 : // 3
        KBI.yawRight = true;
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
	} 
}

function KeyBoardInput()
{
 
    this.forward = false;
    this.backward = false;
   
    this.up = false;
	this.down = false;
  
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
    
    window.addEventListener("keydown", keydownEvent, false);
    window.addEventListener("keyup",  keyupEvent, false);
	
	this.isUserActive = function ()
	{
		if
		(
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
			this.decelerate
		)
			
			return true;
		else
			return false;
	}
}