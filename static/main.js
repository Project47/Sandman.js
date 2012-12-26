

function doFirst () {
    count=0;
    document.getElementById("canv").addEventListener("touchmove",touchMoving,false);
    document.getElementById("canv").addEventListener("touchstart",touchStart,false);
    document.getElementById("canv").addEventListener("touchend",sample,false);
    document.getElementById("canv").addEventListener("mousemove",mouseMove,false);
    document.getElementById("canv").addEventListener("mousedown",touchStart,false);
    document.getElementById("canv").addEventListener("mouseup",sample,false);
    inputX = new Array();
    inputY = new Array();
    sampledX = new Array();
    sampledY = new Array();
    twiddle=new Array();
    twiddle=[[1,0],[0.924,-0.387],[0.707,-0.707],[0.387,-0.924],[0,-1],[-0.387,0.924],[-0.707,-0.707],[-0.927,0.387]];
    samplePt=0;
    maxX=-9999;
    maxY=-9999;
    minY=9999;
    minX=9999;


    scaleFactor=0;
    inputPtr=0;
    mouseFlag=0;
    gesture=new Array();
    gestPtr=0;
    x=document.getElementById("canv");
    context=x.getContext('2d');
  }

function touchStart (e) {
  // if(cnt==1) return;
  // To prevent  default browser scrolling
  mouseFlag=1;
  maxX=-9999;
  minX=9999;
  maxY=-9999;
  minY=9999;
  e.preventDefault();
  count=0;
}

function mouseMove(e)
{
  if(mouseFlag==1)
  {
    if(e.clientX<minX){ minX=e.clientX;}
    if(e.clientX>maxX) {maxX=e.clientX;}

    if(e.clientY<minY){ minY=e.clientY;}
    if(e.clientY>maxY) {maxY=e.clientY;}

    inputX[inputPtr]=e.clientX;
    inputY[inputPtr]=e.clientY;
    inputPtr++;
    count=count+1;
    context.beginPath();
    context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    context.strokeStyle='cyan';
    context.stroke();
  }
}

function touchMoving(e)
{
  // Taking the input points
  mouseFlag=0;
  if(e.touches[0].pageX<minX){ minX=e.touches[0].pageX;}
  if(e.touches[0].pageX>maxX) {maxX=e.touches[0].pageX;}
  if(e.touches[0].pageY<minY){ minY=e.touches[0].pageY;}
  if(e.touches[0].pageY>maxY) {maxY=e.touches[0].pageY;}
  inputX[inputPtr]=e.touches[0].pageX;
  inputY[inputPtr]=e.touches[0].pageY;
  inputPtr++;
  count=count+1;
  context.beginPath();
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
function sample(e){

  //INTERPOLATING

  i=1;
  var leng=path_length();
  interval=(leng/15);
  tempDist=0;
  mouseFlag=0;
  add=0;
  samplePt=0;
  scaleFactor=Math.sqrt((maxX-minX)*(maxX-minX)+(maxY-minY)*(maxY-minY))/100;
  sampledX[0]=inputX[0];
  sampledY[0]=inputY[0];
  samplePt=1;

  while(i<inputPtr)
  {
    add=(inputX[i]-inputX[i-1])*(inputX[i]-inputX[i-1])+(inputY[i]-inputY[i-1])*(inputY[i]-inputY[i-1]);
    interPixelDist=Math.sqrt(add);
    if((tempDist+interPixelDist)>=interval)
    {
      sampledX[samplePt]=inputX[i-1]+((interval-tempDist)/interPixelDist)*(inputX[i]-inputX[i-1]);
      sampledY[samplePt]=inputY[i-1]+((interval-tempDist)/interPixelDist)*(inputY[i]-inputY[i-1]);
      inputX[i-1]=sampledX[samplePt];
      inputY[i-1]=sampledY[samplePt];
      tempDist=0;
      samplePt=samplePt+1;
      i=i-1;
    }
    else
    {   tempDist=tempDist+interPixelDist;
    }
    i=i+1;
  }

  sampledX[samplePt]=inputX[inputPtr-1];
  sampledY[samplePt]=inputY[inputPtr-1];
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
  document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "<br />";


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

  output=fft(sampled2d,16);
  rounded=output;
  var temp=0;
  var k=0;


  //ROUNDING VALUES | SETTING THRESHOLD

  document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML+"FOURIER DESCRIPTORS:";
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
    document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "(x: "+ sampled2d[i][0]+" y: " + sampled2d[i][1] + " ) ";
    //document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "| x: "+ rounded[i][0]+" y: " + rounded[i][1] + " | ";
  }

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
  inputPtr=0;
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
  Veven=fft(Aeven,n/2);
  Vodd=fft(Aodd,n/2);

  for(i=0;i<n/2;i++)
  {
    V[i]=[(Veven[i][0]+twiddle[i*16/n][0]*Vodd[i][0]-twiddle[i*16/n][1]*Vodd[i][1]),(Veven[i][1]+twiddle[i*16/n][0]*Vodd[i][1]+twiddle[i*16/n][1]*Vodd[i][0])];
    V[n/2+i]=[(Veven[i][0]-twiddle[i*16/n][0]*Vodd[i][0]+twiddle[i*16/n][1]*Vodd[i][1]),(Veven[i][1]-twiddle[i*16/n][0]*Vodd[i][1]-twiddle[i*16/n][1]*Vodd[i][0])];
  }
  return V;
}

window.onload=doFirst;
