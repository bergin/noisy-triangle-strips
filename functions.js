// xClipping = 600000, yClipping = 600000,  zClipping = 1000000,  minZ=500, halfBoundarySize = 1000000;

function isInsideFrustrum(candidatePoint)
{
   /* if( candidatePoint.y >-yClipping && candidatePoint.y < yClipping
            && candidatePoint.x > -( xClipping * Math.abs(candidatePoint.z) ) && candidatePoint.x < (xClipping *Math.abs(candidatePoint.z))
                && candidatePoint.z > minZ && candidatePoint.z < zClipping)*/
    var wideningFrustrumX = xClipping * (candidatePoint.z/100);
    
    if(candidatePoint.x > -wideningFrustrumX && candidatePoint.x < wideningFrustrumX     
        && candidatePoint.z > minZ && candidatePoint.z < zClipping)
            return true;
    
    return false;
}
 
function isInsideDrawingWindow(candidatePoint)
{ 
    if( candidatePoint.x >=0 && candidatePoint.x< scrWidth  
         && candidatePoint.y >=0 && candidatePoint.y < scrHeight  )
        return true;

    return false;   
}

function dotProduct(v1, v2)
{
	return v1.i * v2.i + v1.j * v2.j + v1.k * v2.k; 
}

function crossProduct(v1, v2)
{
	return new RVector(v1.j*v2.k - v1.k*v2.j, v1.k*v2.i - v1.i*v2.k, v1.i*v2.j - v1.j*v2.i);
}

function normalise(v1)
{
	var m = magnitude(v1);
	v1.i = v1.i/m;
	v1.j = v1.j/m;
    v1.k = v1.k/m;
  //  if(m > -0.1 && m <.1 )  alert();
	return v1;
}


function magnitude(vec)
{
	return Math.sqrt(vec.i * vec.i + vec.j * vec.j + vec.k * vec.k);
}

function distance(a, b)
{
	var x = a.x - b.x;
	var y = a.y - b.y;
	var z = a.z - b.z;
	return Math.sqrt(x*x + y*y + z*z);
}

function distanceOpt(a, b)
{
	var x = a.x - b.x;
	var y = a.y - b.y;
	var z = a.z - b.z;
	return  x*x + y*y + z*z;
}


function rndInt(min, max) 
{
	return Math.floor(Math.random() * (max - min)) + min;
}

function timer()
{
	return new Date().getTime(); 
}

function addPosVec(p1, vec)
{	
	return new Point(p1.x + vec.i  , p1.y + vec.j  , p1.z + vec.k) ;	
}

function addTwoPositions(p, p1)
{
    return new Point(p1.x + p.x  , p1.y + p.y  , p1.z + p.z ) ;
}

function takeawayTwoPositions(p, p1)
{
    return new Point(p1.x - p.x  , p1.y - p.y  , p1.z - p.z) ;
}

function makeVector(p1, p2)
{
	return new RVector(p2.x - p1.x, p2.y - p1.y,  p2.z - p1.z);
}

function makeVector2(p1, orng)
{
	return new RVector(p1.x - orng.x, p1.y - orng.y,  p1.z - orng.z);
}

function resizeVector(v, length)
{
    return new RVector(v.i * length, v.j * length, v.k * length);	
}

function vectorAddition(v1, v2)
{
    return new RVector (v1.i + v2.i , v1.j + v2.j, v1.k + v2.k);
}

function positionPlusScalar (p, s)
{
    return new Point(p.x + s, p.y + s, p.z +scrollY);
}
    
function negativeVector(v)
{
	return new RVector(v.i*-1, v.j*-1, v.k*-1);
}

function vectorReverse(v)
{
    return new RVector(-v.i, -v.j, -v.k)
}

function findMidRndSlopeVal(a, b)
{
    var halfDiff = Math.ceil(Math.abs(a-b) / 2);
    return Math.min(a, b) + Math.ceil(halfDiff / 2) + rndInt(0, halfDiff);
}
                                      

 