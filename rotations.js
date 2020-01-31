var deg = 180 / Math.PI;
var rad = Math.PI / 180.0;		// convert to radians, as required by cos, sin, tan etc.
var my360 =  Math.PI*2 ;

function rotateMoverDirection(incDeg, type)
{
	if(type=="yaw")
	{
		moverDirection.phi += incDeg;
		if(moverDirection.phi >359 || moverDirection.phi<-359)
			moverDirection.phi = 0;
	}
	
	if(type=="pitch")
	{
		moverDirection.theta += incDeg;
		if(moverDirection.theta >359 || moverDirection.theta<-359)
			moverDirection.theta = 0;
	}
	
	if(type=="roll")
	{
		moverDirection.psi += incDeg;
		if(moverDirection.psi >359 || moverDirection.psi<-359)
			moverDirection.psi = 0;
	}
}

function rotateVector(vector)
{
	vec = new RVector(vector.i, vector.j, vector.k) ;
	vec = rotateVector_yaw(vec, moverDirection.phi);   
	vec = rotateVector_pitch(vec, moverDirection.theta); 
	vec = rotateVector_roll(vec, moverDirection.psi); 
	return vec;
}

function relativePoint(p1, p2)
{
	return new Point(p2.x - p1.x, p2.y - p1.y,  p2.z - p1.z , 0);
}

function rotate(origin, aPoint, direction, clockwise) // an Object == a coord.
{
	var relPoint = relativePoint(origin, aPoint);
	relPoint = rotate_yaw(relPoint, direction.phi * clockwise);   
	relPoint = rotate_pitch(relPoint, direction.theta * clockwise); 
	relPoint = rotate_roll(relPoint, direction.psi * clockwise); 
	return relPoint;
}


function rotateRelativePoint(origin, aPoint, clockwise) // an Object == a coord.
{
	var relPoint = relativePoint(origin, aPoint);
	relPoint = rotate_yaw(relPoint, moverDirection.phi * clockwise);   
	relPoint = rotate_pitch(relPoint, moverDirection.theta * clockwise); 
	relPoint = rotate_roll(relPoint, moverDirection.psi * clockwise); 
	return relPoint;
}

function rotateObject(pos)
{
	pos = rotate_yaw(pos, moverDirection.phi);   
	pos = rotate_pitch(pos, moverDirection.theta); 
	pos = rotate_roll(pos, moverDirection.psi); 
	return pos; 
}

function rotate_yaw(pos, degrees)  // rotate in chair, about y axis (up), xz plane altered
{	
	var phi = degrees * rad;
	var tmpx = pos.x, tmpz = pos.z;
	pos.x = tmpx * Math.cos(phi) - tmpz * Math.sin(phi);
	pos.z = tmpx * Math.sin(phi) + tmpz * Math.cos(phi);
	return pos;
}

function rotate_pitch(pos, degrees)  // pull up in plane, about x axis (side) yz plane affected
{	
	var theta = degrees * rad;
	var tmpy = pos.y, tmpz = pos.z;
	pos.y = tmpy * Math.cos(theta) - tmpz * Math.sin(theta);
	pos.z = tmpy * Math.sin(theta) + tmpz * Math.cos(theta);
	return pos;
}

function rotate_roll(pos, degrees)  // bank left / right in car, about z axis (forward) xy plane affected
{	
	var psi = degrees * rad;
	var tmpx = pos.x, tmpy = pos.y;
	pos.x = tmpx * Math.cos(psi) - tmpy * Math.sin(psi);
	pos.y = tmpx * Math.sin(psi) + tmpy * Math.cos(psi);
	return pos;
}
  
// TaitBryan angles Yaw-Pitch-Roll. in this case, z is forward, not up.
function rotateVector_yaw(vector, degrees)  // rotate in chair, about y axis (up), xz plane altered
{	
	var vec = new RVector(vector.i, vector.j,vector.k);
	var phi = degrees * rad;
	var tmpx = vec.i, tmpz = vec.k;
	vec.i = tmpx * Math.cos(phi) - tmpz * Math.sin(phi);
	vec.k = tmpx * Math.sin(phi) + tmpz * Math.cos(phi);
	return vec;
}

function rotateVector_pitch(vector, degrees)  // pull up in plane, about x axis (side) yz plane affected
{	
	var vec = new RVector(vector.i, vector.j,vector.k);
	var theta = degrees * rad;
	var tmpy =vec.j, tmpz = vec.k; 

	vec.j = tmpy * Math.cos(theta) - tmpz * Math.sin(theta);
	vec.k = tmpy * Math.sin(theta) + tmpz * Math.cos(theta);
	
	if(Math.abs(moverDirection.phi) > 90 && Math.abs(moverDirection.phi < 270 ) ) vec.j *= -1 ;

	return vec;
}

function rotateVector_roll(vector, degrees)  // bank left / right in car, about z axis (forward) xy plane affected
{	
	var vec = new RVector(vector.i, vector.j,vector.k);
	var psi = degrees * rad;
	var tmpx = vec.i, tmpy = vec.j;
	vec.i = tmpx * Math.cos(psi) - tmpy * Math.sin(psi);
	vec.j = tmpx * Math.sin(psi) + tmpy * Math.cos(psi);
	return vec;
}


