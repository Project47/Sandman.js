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
	twiddle=new Array();
	twiddle=[[1,0],[0.924,-0.387],[0.707,-0.707],[0.387,-0.924],[0,-1],[-0.387,0.924],[-0.707,-0.707],[-0.927,0.387]];
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
	interval=(leng/17);
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
//alert("hi"+samplePt);
//createChainCode();
var sampled2d=new Array();
for(i=0;i<samplePt;i++)
{
	sampled2d[i]=new Array();
	sampled2d[i][0]=sampledX[i];
	sampled2d[i][1]=sampledY[i];
}
for(i=samplePt;i<16;i++)
{
    sampled2d[i]=[0,0];
}
for(i=0;i<samplePt;i++)
{
document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "s1: "+sampled2d[i][0]+"s2: " + sampled2d[i][1] + "<br />";
}
alert("hi"+samplePt);
//output=new Array();
output=fft(sampled2d,16);

for(i=0;i<16;i++)
{
document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "o1: "+output[i][0]+"o2: " + output[i][1] + "<br />";
}
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

function fft(sampled2d,n)
{
	var Aeven=new Array();
	var Aodd=new Array();
	var Veven=new Array();
	var Vodd=new Array();
	var V=new Array();
	if(n==1)
	    return sampled2d;
	for(i=0;i<=n-2;i=i+2)
	{
	    Aeven[i/2]=[sampled2d[i][0],sampled2d[i][1]];
	    Aodd[i/2]=[sampled2d[i+1][0],sampled2d[i+1][1]];
	}
//	alert("Aeven:"+ Aeven[0][0]);
	Veven=fft(Aeven,n/2);
	Vodd=fft(Aodd,n/2);

	for(i=0;i<n/2;i++)
	{
	    V[i]=[(Veven[i][0]+twiddle[i*16/n][0]*Vodd[i][0]-twiddle[i*16/n][1]*Vodd[i][1]),(Veven[i][1]+twiddle[i*16/n][0]*Vodd[i][1]+twiddle[i*16/n][1]*Vodd[i][0])];
	    V[n/2+i]=[(Veven[i][0]-twiddle[i*16/n][0]*Vodd[i][0]+twiddle[i*16/n][1]*Vodd[i][1]),(Veven[i][1]-twiddle[i*16/n][0]*Vodd[i][1]-twiddle[i*16/n][1]*Vodd[i][0])];
	}
	return V;
}
