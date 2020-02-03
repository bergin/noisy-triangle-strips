// Rotations for the Mover Vector
// increment the moverDirection 

function rotateMoverDirection(incRad, type)
{
	if(type=="yaw")
	{
		moverDirection.phi += incRad;
		if(moverDirection.phi >completeTurn || moverDirection.phi<-completeTurn)
			moverDirection.phi = 0;
		return;	
	}
	
	if(type=="pitch")
	{
		moverDirection.theta += incRad;
		if(moverDirection.theta >completeTurn || moverDirection.theta<-completeTurn)
			moverDirection.theta = 0;
		return;	
	}
	
	if(type=="roll")
	{
		moverDirection.psi += incRad;
		if(moverDirection.psi >completeTurn || moverDirection.psi<-completeTurn)
			moverDirection.psi = 0;
		return;	
	}
}

// rotate the moverVector from the resetted 0,0,5 to the moverDirection
function rotateVector(vec)
{
	 rotateVector_yaw(vec, moverDirection.phi);   
	 rotateVector_pitch(vec, moverDirection.theta); 
	 rotateVector_roll(vec, moverDirection.psi); 
}

// TaitBryan angles Yaw-Pitch-Roll. in this case, z is forward, not up.
function rotateVector_yaw(vec, phi)  // rotate in chair, about y axis (up), xz plane altered
{	
	var tmpi = vec.i, tmpk = vec.k;
	vec.i = tmpi * Math.cos(phi) - tmpk * Math.sin(phi);
	vec.k = tmpi * Math.sin(phi) + tmpk * Math.cos(phi);
}

function rotateVector_pitch(vec, theta)  // pull up in plane, about x axis (side) yz plane affected
{	
	var tmpj = vec.j, tmpk = vec.k; 
	vec.j = tmpj * Math.cos(theta) - tmpk * Math.sin(theta);
	vec.k = tmpj * Math.sin(theta) + tmpk * Math.cos(theta);
	
	if(Math.abs(moverDirection.phi) > 1.5708 && Math.abs(moverDirection.phi < 4.71239 ) ) vec.j *= -1 ;
}

function rotateVector_roll(vec, psi)  // bank left / right in car, about z axis (forward) xy plane affected
{	
	var tmpi = vec.i, tmpj = vec.j;
	vec.i = tmpi * Math.cos(psi) - tmpj * Math.sin(psi);
	vec.j = tmpi * Math.sin(psi) + tmpj * Math.cos(psi);
}

// Rotation of points around moverPoint
//rotateRelativePoint(moverPoint, triangle.points_org[i]);

function rotateRelativePoint(origin, aPoint) 
{
	var relPoint = relativePoint(origin, aPoint);
	rotate_yaw(relPoint, -moverDirection.phi);   
	rotate_pitch(relPoint, -moverDirection.theta); 
	rotate_roll(relPoint, -moverDirection.psi); 
	return relPoint;
}

function relativePoint(p1, p2)
{
	return new Point(p2.x - p1.x, p2.y - p1.y,  p2.z - p1.z);
}

function rotate_yaw(pos, phi)  // rotate in chair, about y axis (up), xz plane altered
{	
	var tmpx = pos.x, tmpz = pos.z;
	pos.x = tmpx * Math.cos(phi) - tmpz * Math.sin(phi);
	pos.z = tmpx * Math.sin(phi) + tmpz * Math.cos(phi);
}

function rotate_pitch(pos, theta)  // pull up in plane, about x axis (side) yz plane affected
{	
	var tmpy = pos.y, tmpz = pos.z;
	pos.y = tmpy * Math.cos(theta) - tmpz * Math.sin(theta);
	pos.z = tmpy * Math.sin(theta) + tmpz * Math.cos(theta);
}

function rotate_roll(pos, psi)  // bank left / right in car, about z axis (forward) xy plane affected
{	
	var tmpx = pos.x, tmpy = pos.y;
	pos.x = tmpx * Math.cos(psi) - tmpy * Math.sin(psi);
	pos.y = tmpx * Math.sin(psi) + tmpy * Math.cos(psi);
}
