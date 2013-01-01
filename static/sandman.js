

function doFirst (domElement) {

  var eventCalled=0;
  var input2d=new Array ();
  var inputPtr=0;
  var mouseFlag=0;
  var okToSample=1;
  var intervalSet=0;
  var strokeInterval=null;
  var minMax= new Array () ;
  minMax=[-9999,-9999,9999,9999];      //[ maxX, maxY, minX, minY ]

  document.getElementById(domElement).addEventListener("touchmove",touchMoving,false);
  document.getElementById(domElement).addEventListener("touchstart",touchStart ,false);
  document.getElementById(domElement).addEventListener("touchend",sample,false);
  document.getElementById(domElement).addEventListener("mousedown",function (e) {okToSample=0;  minMax=[-9999,-9999,9999,9999];   mouseFlag=1;touchStart (e);
                                                                                }    ,false);
  var event=null;
  document.getElementById(domElement).addEventListener("mousemove",function (e) {

    if (eventCalled===0) {
      eventCalled=1;
      //alert ("inevent");
      event=  document.getElementById(domElement).addEventListener("mouseup",function (e)  {
        mouseFlag=0;

        okToSample=1;

        var breakPoint=inputPtr-1;
        if (intervalSet==0)
        {
          intervalSet=1;
          strokeInterval=setInterval ( function () {

            if (okToSample==1) {

              clearInterval (strokeInterval);
              sample (inputPtr,input2d,minMax,breakPoint);
              intervalSet=0;
              inputPtr=0;
            }

          },500); //alert (input2d [inputPtr]);
        }

      } ,false);
      //alert ("outeventE");
    }
    if (mouseFlag==1) { input2d=mouseMove (e,inputPtr,input2d,minMax);   inputPtr++;
                      }  },false);



  gesture=new Array();
  gestPtr=0;
  x=document.getElementById(domElement);
  context=x.getContext('2d');

  context.beginPath();
  context.arc(200,200, 1, 0, Math.PI, true);
  context.strokeStyle='black';
  context.stroke();}

function touchStart (e) {
  // if(cnt
  // ==1) return;
  // To prevent  default browser scrolling

  //  mouseFlag=1;
  e.preventDefault();

}

function mouseMove(e,ptr,array,minMax)
{

  if(e.clientX<minMax [2]){ minMax [2]=e.clientX;}
  if(e.clientX>minMax [0]) {minMax [0]=e.clientX;}

  if(e.clientY<minMax [3]){ minMax [3]=e.clientY;}
  if(e.clientY>minMax [1]) {minMax [1]=e.clientY;}

  array[ptr]=[e.clientX,e.clientY];

  context.beginPath();
  context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
  context.strokeStyle='cyan';
  context.stroke();


  return array;

}

function touchMoving(e)
{
  // Taking the input points
  //
  mouseFlag=0;
  if(e.touches[0].pageX<minX){ minX=e.touches[0].pageX;}       //[ maxX, maxY, minX, minY ]
  if(e.touches[0].pageX>maxX) {maxX=e.touches[0].pageX;}
  if(e.touches[0].pageY<minY){ minY=e.touches[0].pageY;}
  if(e.touches[0].pageY>maxY) {maxY=e.touches[0].pageY;}
  inputX[inputPtr]=e.touches[0].pageX;
  inputY[inputPtr]=e.touches[0].pageY;
  inputPtr++;

  //[ maxX, maxY, minX, minY ]  context.beginPath();
  context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
  context.strokeStyle='cyan';
  context.stroke();

}

/*
  Sampling the input gesture pixels

  It is possible that the input pixels are not evenly spaced in a gesture. That is they may be denselty situated in
  in some region and sparcely in other.

  In this function we create array of fixed number of  evenly spaced pixels from the input array array using interpolation.
*/
function sample(ptr,array,minMax,breakPoint){

  //INTERPOLATING
  //alert (ptr);

  //alert ("s"+array [0 ] [1]
  //      );
  i=1;
  //alert (minMax [1]);
  var leng=path_length(ptr,array,breakPoint);
  var sampledX = new Array();
  var    sampledY = new Array();//[ maxX, maxY, minX, minY ]
  var   samplePt=0;
  var interval=(leng/15);
  var tempDist=0;
  // mouseFlag=0;
  var add=0;


  var scaleFactor=Math.sqrt((minMax [0]-minMax [2])*(minMax [0]-minMax [2])+(minMax [1]-minMax [3])*(minMax [1]-minMax [3]))/100;
  sampledX[0]=array[0][0];
  sampledY[0]=array[0][1];
  var samplePt=1;

  while(i<ptr)
  {
    add=(array[i] [0]-array[i-1] [0])*(array[i] [0]-array[i-1] [0])+(array[i] [1]-array[i-1] [1])*(array[i] [1]-array[i-1] [1]);
    interPixelDist=Math.sqrt(add);
    if (i===breakPoint)
    {
      i++;

    }
    if((tempDist+interPixelDist)>=interval)
    {
      sampledX[samplePt]=array[i-1] [0]+((interval-tempDist)/interPixelDist)*(array[i] [0]-array[i-1] [0]);
      sampledY[samplePt]=array[i-1] [1]+((interval-tempDist)/interPixelDist)*(array[i] [1]-array[i-1] [1]);
      array[i-1] [0]=sampledX[samplePt];
      array[i-1] [1]=sampledY[samplePt];
      tempDist=0;
      samplePt=samplePt+1;
      i=i-1;
    }
    else
    {   tempDist=tempDist+interPixelDist;
    }
    i=i+1;
  }

  sampledX[samplePt]=array[ptr-1] [0];
  sampledY[samplePt]=array[ptr-1] [1];
  samplePt++;

  var sampled2d=new Array();

  for(i=0;i<samplePt;i++)
  {
    sampled2d[i]=new Array();
    sampled2d[i][0]=Math.round(sampledX[i]);
    sampled2d[i][1]=Math.round(sampledY[i]);
  }

  for(i=0;i<samplePt;i++)
  {
    //document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML +sampled2d[i][0]+"," + sampled2d[i][1] + " | ";
    context.beginPath();
    context.arc(sampled2d[i][0],sampled2d[i][1], 1, 0, Math.PI, true);
    context.strokeStyle='black';
    context.stroke();
  }
  //  document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "<br />";


  /*  var minnX=9999;
      var minnY=9999;
      var startPtr=0;
      var start=-1;
      while(startPtr<samplePt)
      {
      if(sampled2d[startPtr][1]<minnY)
      {
      if(sampled2d[startPtr][0]<minnX)
      {
      minnY=sampled2d[startPtr][1];
      minnX=sampled2d[startPtr][0];
      start=startPtr;
      }
      }
      startPtr++;
      }*/

  var swapVar=0;
  for(j=0;j<15 ;j++)
    for(t=0;t<15-j;t++)
  {
    if(sampled2d[t][1]>sampled2d[t+1][1])
    {
      swapVar=sampled2d[t][1];
      sampled2d[t][1]=sampled2d[t+1][1];
      sampled2d[t+1][1]=swapVar;
    }
    if(sampled2d[t][1]==sampled2d[t+1][1])
    {
      if(sampled2d[t][0]>sampled2d[t+1][0])
      {
        swapVar=sampled2d[t][0];
        sampled2d[t][0]=sampled2d[t+1][0];
        sampled2d[t+1][0]=swapVar;
      }
    }
  }

  var output=fft(sampled2d,16);
  var rounded=output;
  //alert (output [0] [0] + "   "+output [0] [1]);
  var temp=0;
  var k=0;


  //ROUNDING VALUES | SETTING THRESHOLD

  //document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML+"FOURIER DESCRIPTORS:";
  for(i=0;i<16;i++) {
    temp=Math.round(output[i][0]/scaleFactor);
    if(temp<-10000)
    {
      rounded[i][0]=-10000;
    }
    else if(temp>10000)

    {
      rounded[i][0]=10000;
    }
    else if(temp<-1000 || temp>1000 )
    {
      if(temp<-1000)
        temp=temp-100;
      else
        temp=temp+100;
      k=Math.round(temp/200);
      rounded[i][0]=k*200;
    }
    else if(temp<-100 || temp>100)
    {
      if(temp<-100)
        temp=temp-10;
      else
        temp=temp+10;
      k=Math.round(temp/20);
      rounded[i][0]=k*20;
    }
    else if(temp<-10 || temp>10)
    {
      if(temp<-10)
        temp=temp-5;
      else
        temp=temp+5;
      k=Math.round(temp/10);
      rounded[i][0]=k*10;
    }
    else
    {
      rounded[i][0]=Math.round(temp);
    }

    temp=Math.round(output[i][1]/scaleFactor);
    if(temp<-10000)
    {
      rounded[i][1]=-10000;
    }
    else if(temp>10000)
    {
      rounded[i][1]=10000;
    }
    else if(temp<-1000 || temp>1000 )
    {
      if(temp<-1000)
        temp=temp-100;
      else
        temp=temp+100;
      k=Math.round(temp/200);
      rounded[i][1]=k*200;
    }
    else if(temp<-100 || temp>100)
    {
      if(temp<-100)
        temp=temp-10;
      else
        temp=temp+10;
      k=Math.round(temp/20);
      rounded[i][1]=k*20;
    }
    else if(temp<-10 || temp>10)
    {
      if(temp<-10)
        temp=temp-5;
      else
        temp=temp+5;
      k=Math.round(temp/10);
      rounded[i][1]=k*10;
    }
    else
    {
      rounded[i][1]=Math.round(temp);
    }
    // document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "(x: "+ sampled2d[i][0]+" y: " + sampled2d[i][1] + " ) ";
    document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "| x: "+ rounded[i][0]+" y: " + rounded[i][1] + " | ";
  }

  // alert (ptr + "   " + gestPtr );
  gesture[gestPtr]=rounded;
  gestPtr++;
  var resCnt=0;
  if(gestPtr==2)
  {
    var gest1=gesture[0];
    var gest2=gesture[1];
    for(i=0;i<16;i++)
    {
      if(Math.abs(gest1[i][0])==Math.abs(gest2[i][0])) resCnt++;
      if(Math.abs(gest1[i][0])==Math.abs(gest2[i][0])) resCnt++;
      if(resCnt>=16) {alert("Gesture Matched"); break;}
    }
    gestPtr=0;
    if(resCnt<16) alert("Gestures do not match. No. of descriptors matched:" + resCnt);

  }

  document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "<br /><br />";
  chainInputPtr=0;
  samplePt=0;
  ptr=0;
  minMax=[-9999,-9999,9999,9999];      //[ maxX, maxY, minX, minY ]
  // inputPtr=0;
}


/*
  Creation of chain code from the sampled pixels
*/
function createChainCode () {

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

function path_length(ptr, array,breakPoint)
{
  var y=1;
  var len=0;
  var temp=0;

  while(y<ptr)
  {
    if (y-1===breakPoint)
    {
      y++;
    }
    temp=(array[y] [0]-array[y-1] [0])*(array[y] [0]-array[y-1] [0])+(array[y] [1]-array[y-1] [1])*(array[y] [1]-array[y-1] [1]);
    len = len + Math.sqrt(temp);
    y=y+1;

  }
  /*********/
  return len;
}

function fft(sampled2d,n)
{
  var twiddle=new Array();
  twiddle=[[1,0],[0.924,-0.387],[0.707,-0.707],[0.387,-0.924],[0,-1],[-0.387,0.924],[-0.707,-0.707],[-0.927,0.387]];

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
  Veven=fft(Aeven,n/2);
  Vodd=fft(Aodd,n/2);

  for(i=0;i<n/2;i++)
  {
    V[i]=[(Veven[i][0]+twiddle[i*16/n][0]*Vodd[i][0]-twiddle[i*16/n][1]*Vodd[i][1]),(Veven[i][1]+twiddle[i*16/n][0]*Vodd[i][1]+twiddle[i*16/n][1]*Vodd[i][0])];
    V[n/2+i]=[(Veven[i][0]-twiddle[i*16/n][0]*Vodd[i][0]+twiddle[i*16/n][1]*Vodd[i][1]),(Veven[i][1]-twiddle[i*16/n][0]*Vodd[i][1]-twiddle[i*16/n][1]*Vodd[i][0])];
  }
  return V;
}



//Comparison of gesture
function compare(points){
    var partitionEntered= new Array();
    var iterator=0;
    var verticalThreshold=0;
    var verticalLine=0;
    var horizontalLine=0;
    while(iterator<pointCounter){
	//Find vertical line
	if(math.abs(points[iterator][0]-points[iterator+1][0])<verticalThreshold){
	    verticalLine--;
	}
	else{
	    verticalLine=4;
	}
	    
	//Find horizontal line
	if((points[iterator][1]===points[iterator+1][1])&&(horizontalLine>1)){
	    horizontalLine--;
	}
	else{
	    horizontalLine=4;
	}
	//Find blocks in which gesture exists
	if(points[iterator][0]<250){
	    if(points[iterator][1]<250){
		partitionEntered[1]++;
	    }
	    else{
		partitionEntered[3]++;
	    }
	}
	else if(points[iterator][1]<250){
	    partitionEntered[2]++;
	}
	else{
	    partitionEntered[4]++;
	}
	//Find crossover
	var crossoverIterator=0;
	var crossoverCount=0;
	while(crossoverIterator<pointCounter){
	    if((math.abs(points[crossoverIterator][0]-points[iterator][0])<crossoverThreshold)&&(math.abs(points[crossoverIterator][1]-points[iterator][1])<crossoverThreshold)){
		crossoverCount++;
	    }
	    //Increment iterator
	    crossoverIterator++;
	}
	//increment iterator
	iterator++;
    }
    	
}
