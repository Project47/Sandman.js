window.onload=doFirst;

function doFirst()
{
    	count=0;
	document.getElementById("body").addEventListener("touchmove",touchMoving,false);
	document.getElementById("body").addEventListener("touchstart",touchStart,false);
	document.getElementById("body").addEventListener("touchend",sample,false);

	document.getElementById("body").addEventListener("mousemove",touchMoving,false);
    	document.getElementById("body").addEventListener("mousedown",touchStart,false);
	document.getElementById("body").addEventListener("mouseup",sample,false);
     	inputX = new Array();
     	inputY = new Array();
     	sampledX = new Array();
     	sampledY = new Array();
    	samplePt=0;
     	inputPtr=0;
}


function touchStart(e)
{
// To prevent  default browser scrolling

    e.preventDefault();	    
    count=0;
}


function touchMoving(e)
{
// Taking the input points
  
    inputX[inputPtr]=e.touches[0].pageX;
    inputY[inputPtr]=e.touches[0].pageY;
    inputPtr++;
    count=count+1;

}

function sample(e){

/*
Sampling the input gesture pixels

It is possible that the input pixels are not evenly spaced in a gesture. That is they may be denselty situated in
in some region and sparcely in other.

In this function we create array of fixed number of  evenly spaced pixels from the input array array using interpolation. 
*/

	i=1;
	var leng=path_length();
	interval=(leng/21);
	tempDist=0;
    	add=0;
	samplePt=0;
    while(i<inputPtr)
    {
	add=(inputX[i]-inputX[i-1])*(inputX[i]-inputX[i-1])+(inputY[i]-inputY[i-1])*(inputY[i]-inputY[i-1]);
	interPixelDist=Math.sqrt(add);
	if((tempDist+interPixelDist)>=interval)
	{
	    sampledX[samplePt]=inputX[i-1]+((interval-tempDist)/interPixelDist)*(inputX[i]-inputX[i-1]);
	    sampledY[samplePt]=inputY[i-1]+((interval-tempDist)/interPixelDist)*(inputY[i]-inputY[i-1]);
	    inputX[i]=sampledX[samplePt];
	    inputY[i]=sampledY[samplePt];
	    tempDist=0;
	    samplePt=samplePt+1;
	}
	else
	 {   tempDist=tempDist+interPixelDist;}
	i=i+1;
	
    }

createChainCode();
}



function createChainCode()
{

/*
Creation of chain code from the sampled pixels
*/

    chain = new Array();
    chainInputPtr=0;
    var region=0;
    var slope=0;
    i=0;

    while(i<samplePt){
	slope=-1*(sampledY[i+1]-sampledY[i])/(sampledX[i+1]-sampledX[i]);
	if(slope>=2.414 || slope<-2.414)
	{
	    if((sampledY[i+1]-sampledY[i])>=0) chain[chainInputPtr]=6;
	    else chain[chainInputPtr]=2;
	  
	}
	else if (slope>=0.414 && slope<2.414)
	{
	    if((sampledX[i+1]-sampledX[i])>=0) chain[chainInputPtr]=1;
	    else chain[chainInputPtr]=5;
	  
	}
	else if (slope<=0.414 && slope>-0.414)
	{
	    if((sampledX[i+1]-sampledX[i])>=0) chain[chainInputPtr]=0;
	    else chain[chainInputPtr]=4;
	  
	}
	
	else if (slope>=-2.414 && slope<-0.414)
	{
	    if((sampledX[i+1]-sampledX[i])>=0) chain[chainInputPtr]=7;
	    else chain[chainInputPtr]=3;
	  
	}
	i++;
	chainInputPtr++;
    }


// Displaying the result

document.getElementById("temp").innerHTML="Chain code: ";
var k=0;
while(k<chainInputPtr-1)
{
document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML+chain[k];
k=k+1;
}

chainInputPtr=0;
samplePt=0;
     	inputPtr=0;
//fft();
}

function path_length()
{
var y=1;
var len=0;
var temp=0;
while(y<inputPtr)
{
temp=(inputX[y]-inputX[y-1])*(inputX[y]-inputX[y-1])+(inputY[y]-inputY[y-1])*(inputY[y]-inputY[y-1]);
len = len + Math.sqrt(temp);
y=y+1;
}
return len;
}

