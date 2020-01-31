function isInsideFrustrum(candidatePoint)
{
    if( candidatePoint.y >-yClipping && candidatePoint.y < yClipping
            && candidatePoint.x >-xClipping && candidatePoint.x < xClipping
                && candidatePoint.z > minZ && candidatePoint.z < zClipping)
            return true;
    
    return false;
}
 

function createMissile(missileSize, missileSpeed)
{

    basicMissileVector = rotateVector( new RVector(0, 0, 5)); 
    
    var missileVector = resizeVector(normalise(basicMissileVector), missileSpeed);
    var missileStartPoint = clone(moverPoint);
    var missile = new Missile(missileStartPoint, missileVector, missileSize, 4, "single" );
    missile.create();  
    missiles.push(missile);
    hasFired= true;
     
    new Audio("../soundEffects/zap.mp3").play();

}

function saveState()
{
   var jsonData =   JSON.stringify(myObjects);
   download(jsonData, 'json.txt', 'text/plain');
}

function loadFile() 
{
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      jsonArray = JSON.parse(lines); 

      for(i=0; i<jsonArray.length;i++)
        {
            myCube = new Cube("", jsonArray[i].size, jsonArray[i].color, 0, "");
            myCube.inputPointData(jsonArray[i].points);
            myObjects.push(myCube);
        }
    }
  }

  var jsonArray;

function download(content, fileName, contentType) 
{
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function resetCollisions()
{
    for (var a=0; a<aliens.length; a++)     
        aliens[a].hasCollided = false;
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
	return v1;
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


function magnitude(vec)
{
	return Math.sqrt(vec.i * vec.i + vec.j * vec.j + vec.k * vec.k);
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
	return new Point(p1.x + vec.i  , p1.y + vec.j  , p1.z + vec.k, 0) ;	
}

function addTwoPositions(p, p1)
{
    return new Point(p1.x + p.x  , p1.y + p.y  , p1.z + p.z , 0) ;
}

function takeawayTwoPositions(p, p1)
{
    return new Point(p1.x - p.x  , p1.y - p.y  , p1.z - p.z , 0) ;
}

function vectorReverse(v)
{
    return new RVector(-v.i, -v.j, -v.k)
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
    return new Point(p.x + s, p.y + s, p.z +s, 0);

}
    
function negativeVector(v)
{
	return new RVector(v.i*-1, v.j*-1, v.k*-1);
}
 
function findMidRndSlopeVal(a, b)

{
    var halfDiff = Math.ceil(Math.abs(a-b) / 2);
    return Math.min(a, b) + Math.ceil(halfDiff / 2) + rndInt(0, halfDiff);
}
                                      
function hasExitedBounds(position)
{

    if(position.x > -halfBoundarySize && position.x < halfBoundarySize)
        if(position.y > -halfBoundarySize && position.y < halfBoundarySize)
             if(position.z > -halfBoundarySize && position.z < halfBoundarySize)
                return false;
    return true;             

}

    // for non referenced copies
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");




}


 
function playSound(type) {
      var sound = document.getElementById(type);
      sound.play()
  }