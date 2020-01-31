function lerp2(a, b, x) 
{
    return a + x * (b - a);
}

/*	 
R1 = (1 - fu) * dot[0] + fu * dot[1];
R2 = (1-fu) * dot[2]+ fu * dot[3];
P = (1-fv) * R1 + fv * R2;*/
function lerp(a, b, x) 
{
    return (1-x)* a + x * b;
}
function fade5t(t)
{
	 return  t*t*t*(t*(t*6-15)+10);
}

function fade3t(t)
{
	return  3*t*t - 2*t*t*t;
}

function fade32t(t)
{
	return  (3 - 2 * t) * t * t;
}

function Vector(i, j, k)
{
	this.i = i;
	this.j = j; 
	this.k = k; 

	this.show = function()
	{
		console.log("i:" + this.i.toFixed(2) + 
		", j:" + this.j.toFixed(2) +  ", k:" + this.k.toFixed(2)); 
	}
}

function Vector_2D(i, j)
{
	this.i = i;
	this.j = j;  

	this.show = function()
	{
		console.log("i:" + this.i.toFixed(2) + 
		", j:" + this.j.toFixed(2)); 
	}
}


function rndInt(min, max) 
{
	return Math.floor(Math.random() * (max - min)) + min;
}

function rndFloat()
{
	return Math.random() *2-1;
}

function dotProduct (v1, v2)
{
	return  v1.i * v2.i + v1.j * v2.j + v1.k * v2.k ;
}

function dotProduct_2D (v1, v2)
{
	return  v1.i * v2.i + v1.j * v2.j ;
}


function distance(p1, p2)
{
	return  Math.sqrt( Math.pow(p1.x - p2.x , 2) + Math.pow(p1.y - p2.y , 2)) ;
}

function rotateGVector_yaw(vec, degrees)  // rotate in chair, about y axis (up), xz plane altered
{	
	var phi = degrees * rad;
	var tmpx = vec.i, tmpz = vec.k;
	vec.i = tmpx * Math.cos(phi) - tmpz * Math.sin(phi);
	vec.k = tmpx * Math.sin(phi) + tmpz * Math.cos(phi);
	return vec;
}

function rotateGVector_pitch(vec, degrees)  // pull up in plane, about x axis (side) yz plane affected
{	
	var theta = degrees * rad;
	var tmpy = vec.j, tmpz = vec.k;
	vec.j = tmpy * Math.cos(theta) - tmpz * Math.sin(theta);
	vec.k = tmpy * Math.sin(theta) + tmpz * Math.cos(theta);
	return vec;
}

function rotateGVector_roll(vec, degrees)  // bank left / right in car, about z axis (forward) xy plane affected
{	
	var psi = degrees * rad;
	var tmpx = vec.i, tmpy = vec.j;
	vec.i = tmpx * Math.cos(psi) - tmpy * Math.sin(psi);
	vec.j = tmpx * Math.sin(psi) + tmpy * Math.cos(psi);
	return vec;
}

function rotateGradientVector(vector, angle)
{
	return rotateGVector_roll(vector, angle); ;
}

function changeVectorAngles(angle)
{
		for(y=0; y<gridSize; y++) 
			for(x=0; x<gridSize; x++) 
				gridOfValues[x][y] = rotateGradientVector(gridOfValues[x][y], angle);	  
}
