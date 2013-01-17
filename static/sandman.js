

var Sandman = {

  context:null,
  gesture:null,
  gestPtr:null,
gestureArray:[

  [["P"],[300,-320],[180,140],[180,-40],[120,-30],[90,-50],[70,-40],[60,-40],[60,-50],[50,-50],[30,-50],[30,-50],[30,-50],[20,-60],[20,-50],[0,-50],[7,-60],[3,-50],[-20,-50],[-20,-50],[-20,-50],[-30,-60],[-40,-50],[-40,-50],[-50,-50],[-70,-60],[-80,-40],[-90,-50],[-140,-70],[-200,-20],[-340,-50]],

  [["S"," "],[500,-360],[360,160],[140,80],[160,-2],[100,-20],[60,8],[60,20],[70,20],[80,4],[80,-30],[70,-40],[40,-50],[20,-50],[10,-40],[20,-40],[20,-50],[7,-50],[-5,-60],[-7,-40],[-5,-40],[6,-40],[30,-70],[2,-100],[-30,-100],[-50,-90],[-80,-100],[-80,-90],[-80,-90],[-70,-100],[-240,-320]],

[["O"],[520,-500],[240,30],[140,-30],[120,-30],[90,-30],[70,-30],[60,-30],[50,-40],[30,-50],[30,-60],[40,-60],[40,-60],[40,-50],[40,-40],[30,-50],[20,-20],[10,-60],[9,-50],[9,-40],[-3,-30],[-20,-30],[-30,-30],[-40,-40],[-40,-50],[-50,-60],[-60,-60],[-70,-70],[-90,-70],[-140,-50],[-180,-140]]

],

s21101 : [0],
s20001 : [2],  //O
s10001 : [1],
set : null,

  touchStart: function  (e) {
    e.preventDefault();
  },


  findParameters: function (points,pointCount,avgX,avgY,interval,breakPoint) {

    Sandman.context.beginPath();
    Sandman.context.arc(avgX, avgY, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle='red';
    Sandman.context.stroke();

    // @TODO Prioritized sorting

    var index= [];
    var partitionEntered= [-99,0,0,0,0];           //Partiotion of the block entered
    var xanchorPoint=0;              //Anchored x coordinate value
    var yanchorPoint=0;            //Anchored x coordinate value
    var iterator=0;             //Iterator for the main while loop
    var horizontalThreshold=10;            //Threshold
    var verticalThreshold=10;             //Threshold
    var verticalLine=0;//
    var horizontalLine=0;//
    var xpointCounter=0;//
    var ypointCounter=0;//
    var crossoverIterator=1;
    var crossoverThreshold=interval*3/4;
    var crossoverCount=0;
    var crossoverStart=0;
    var priority= [];
    var portion=[0,0,0,0,0,0];
    var dist=0;
    while(iterator<pointCount-1) {
      //Find vertical line



      if(Math.abs(points[xanchorPoint][0]-points[iterator+1][0])<verticalThreshold) {
        xpointCounter=xpointCounter+1;

      }
      else if(verticalLine<xpointCounter){


        //  @TODO Change the values of priority ( eg. div by some number)


        verticalLine=xpointCounter;
        xpointCounter=0;
        xanchorPoint=iterator;
        priority[0]=verticalLine+0.5;
      }
      else{
        xanchorPoint=iterator;
        xpointCounter=0;
      }
      if (verticalLine<xpointCounter) {
        verticalLine=xpointCounter;

      }
      //Find horizontal line

      if(Math.abs(points[yanchorPoint][1]-points[iterator+1][1])<horizontalThreshold){
        ypointCounter++;
      }
      else if(horizontalLine<ypointCounter){
        horizontalLine=ypointCounter;
        priority[1]=horizontalLine+0.6;
        yanchorPoint=iterator;
        ypointCounter=0;
      }
      else{
        yanchorPoint=iterator;
        ypointCounter=0;
      }
      if (horizontalLine<ypointCounter) {
        horizontalLine=ypointCounter;
      }

      //Find blocks in which gesture exists

      //
      if(points[iterator][0]<( avgX+avgX/10)){
        if(points[iterator][1]<( avgY+avgY/10)){
          partitionEntered[1]++;
        }
        else{
          partitionEntered[3]++;
        }
      }
      else if(points[iterator][1]<avgY){
        partitionEntered[2]++;
      }
      else{
        partitionEntered[4]++;
      }
      /**/

      //Find crossover

      crossoverIterator=iterator+2;

      while (crossoverIterator<=pointCount-2) {
        /*
          1: iterator
          2: crossoverIterator

          var X11=points [iterator] [0];
          var Y11=points [iterator] [1];
          var X12=points [iterator+1] [0];
          var Y12=points [iterator+1] [1];

          var X21=points [crossoverIterator] [0];
          var Y21=points [crossoverIterator] [1];
          var X22=points [crossoverIterator+1] [0];
          var Y22=points [crossoverIterator+1] [1];

          var A1=Y11-Y12;
          var B1=X12-X11;
          var C1=(-1)*B1*Y11+(-1)*A1*X11;

          var A2=Y21-Y22;
          var B2=X22-X21;
          var C2=(-1)*B2*Y21+(-1)*A2*X21;

          var del=A1*B2-A2*B1;
          if (del!==0) {
          var x=(-1)*(B2*C1 - B1*C2)/del;
          var y=(-1)*(A1*C2 - A2*C1)/del;
          }

        */

        var X11=points [iterator] [0];
        var Y11=points [iterator] [1];
        var X12=points [iterator+1] [0];
        var Y12=points [iterator+1] [1];

        var X21=points [crossoverIterator] [0];
        var Y21=points [crossoverIterator] [1];
        var X22=points [crossoverIterator+1] [0];
        var Y22=points [crossoverIterator+1] [1];

        var A1=points [iterator] [1]-points [iterator+1] [1];
        var B1=points [iterator+1] [0]-points [iterator] [0];
        var C1=(-1)*B1*points [iterator] [1]+(-1)*A1*points [iterator] [0];

        var A2=points [crossoverIterator] [1]-points [crossoverIterator+1] [1];
        var B2=points [crossoverIterator+1] [0]-points [crossoverIterator] [0];
        var C2=(-1)*B2*points [crossoverIterator] [1]+(-1)*A2*points [crossoverIterator] [0];

        var del=A1*B2-A2*B1;
        if (del!==0) {
          var x=(-1)*(B2*C1 - B1*C2)/del;
          var y=(-1)*(A1*C2 - A2*C1)/del;
        }

        var dist11=Math.sqrt ((points [iterator] [0]-x)*(points [iterator] [0]-x)+(points [iterator] [1]-y)*(points [iterator] [1]-y));
        var dist12=Math.sqrt ((points [iterator+1] [0]-x)*(points [iterator+1] [0]-x)+(points [iterator+1] [1]-y)*(points [iterator+1] [1]-y));
        var dist21=Math.sqrt ((points [crossoverIterator] [0]-x)*(points [crossoverIterator] [0]-x)+(points [crossoverIterator] [1]-y)*(points [crossoverIterator] [1]-y));
        var dist22=Math.sqrt ((points [crossoverIterator+1] [0]-x)*(points [crossoverIterator+1] [0]-x)+(points [crossoverIterator+1] [1]-y)*(points [crossoverIterator+1] [1]-y));

        if ( ( (dist11+dist12)<interval+2) && ( (dist11+dist12)>interval-2) ) {
          if ( ( (dist21+dist22)<interval+2) && ( (dist21+dist22)>interval-2)) {
            crossoverCount++;
          }
        }

        crossoverIterator++;
      }


      //increment iterator

      iterator++;

    }


    portion [0]=partitionEntered [1] +partitionEntered [2];   //Top half
    portion [1]=partitionEntered [3] +partitionEntered [4];   //Bottom
    portion [2]=partitionEntered [1] +partitionEntered [3];  //Left
    portion [3]=partitionEntered [4] +partitionEntered [2];  //Right

    var strokes=1;
    if (breakPoint>0) {
      strokes=2;
    }

    alert (" partition: "+portion.indexOf (Math.max (portion [0],portion [1],portion [2],portion [3]))+" Cross:"+crossoverCount+"Vert:"+verticalLine+"  Horiz:"+horizontalLine+"  strokes:"+strokes);


    /*
      priority[0] = partition
      priority[1] = crossover
      priority[2] = vertical
      priority[3] = horizontal
      priority[4] = strokes (1 or 2)

    */

    priority [0]=portion.indexOf (Math.max (portion [0],portion [1],portion [2],portion [3]));   //partition
    priority [1]=crossoverCount;
    if (verticalLine>10)
      priority [2]=1;
    else priority [2]=0;
    if (horizontalLine>10)
      priority [3]=1;
    else priority [3]=0;
    priority [4] = strokes;
    return priority;
  },



  mouseMove: function (e,ptr,array,minMax) {

    //Storing minimun and maximum values to determine size of the gesture

    if(e.clientX<minMax [2]){ minMax [2]=e.clientX;}
    if(e.clientX>minMax [0]) {minMax [0]=e.clientX;}

    if(e.clientY<minMax [3]){ minMax [3]=e.clientY;}
    if(e.clientY>minMax [1]) {minMax [1]=e.clientY;}

    array[ptr]=[e.clientX,e.clientY];

    Sandman.context.beginPath();
    Sandman.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle='cyan';
    Sandman.context.stroke();

    return array;

  },

  touchMoving: function (e,ptr,array,minMax) {
    // Taking the input points

    if(e.touches[0].pageX<minMax [2]){ minMax [2]=e.touches[0].pageX;}       //[ maxX, maxY, minX, minY ]
    if(e.touches[0].pageX>minMax [0]) {minMax [0]=e.touches[0].pageX;}
    if(e.touches[0].pageY<minMax [3]){ minMax [3]=e.touches[0].pageY;}
    if(e.touches[0].pageY>minMax [1]) {minMax [1]=e.touches[0].pageY;}

    array [ptr]=[e.touches [0].pageX,e.touches [0].pageY];

    Sandman.context.beginPath();
    Sandman.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle='cyan';
    Sandman.context.stroke();

    return array;

  },



  path_length: function (ptr, array,breakPoint)
  {
    var y=1;
    var len=0;
    var temp=0;


    while(y<ptr)
    {


      //
      if (y-1===breakPoint)
      {
        y++;
      }
      /**/
      temp=(array[y] [0]-array[y-1] [0])*(array[y] [0]-array[y-1] [0])+(array[y] [1]-array[y-1] [1])*(array[y] [1]-array[y-1] [1]);
      len = len + Math.sqrt(temp);
      y=y+1;

    }

    return len;
  },


  /*
    This  function calculates the Fast Fourier Transform
    of the given points
  */

  fft: function (sampled2d,n) {

    var Aeven=[];
    var Aodd=[];
    var Veven=[];
    var Vodd=[];
    var V=[];
    if(n===1)
    {    return sampled2d;}

    for(i=0;i<=n-2;i=i+2)
    {
      Aeven[i/2]=[sampled2d[i][0],sampled2d[i][1]];
      Aodd[i/2]=[sampled2d[i+1][0],sampled2d[i+1][1]];
    }
    Veven=Sandman. fft(Aeven,n/2);
    Vodd=Sandman.fft(Aodd,n/2);

    for(i=0;i<n/2;i++)
    {

      //Calculating the real and imaginary parts of the transform

      V[i]=[(Veven[i][0]+Math.cos( (2 * Math.PI * (i*32/n)) / 32 )*Vodd[i][0]-Math.sin( (2 * Math.PI * (i*32/n)) / 32 )*Vodd[i][1]),(Veven[i][1]+Math.cos( (2 * Math.PI * (i*32/n)) / 32 )*Vodd[i][1]+Math.sin( (2 * Math.PI * (i*32/n)) / 32 )*Vodd[i][0])];


      V[n/2+i]=[(Veven[i][0]-Math.cos( (2 * Math.PI * (i*32/n)) / 32 )*Vodd[i][0]+Math.sin( (2 * Math.PI * (i*32/n)) / 32 )*Vodd[i][1]),(Veven[i][1]-Math.cos( (2 * Math.PI * (i*32/n)) / 32 )*Vodd[i][1]-Math.sin( (2 * Math.PI * (i*32/n)) / 32 )*Vodd[i][0])];

    }

    return V;
  },





  /*
    Sampling the input gesture pixels

    It is possible that the input pixels are not evenly spaced in a Sandman.gesture. That is they may be denselty situated in
    in some region and sparcely in other.

    In Sandman function we create array of fixed number of  evenly spaced pixels from the input array array using interpolation.
  */

  sample: function (ptr,array,minMax,breakPoint){

    //INTERPOLATING
//    alert (breakPoint + "    "+ ptr);

    if (breakPoint===( ptr-1)) {
      breakPoint=-1;
    }
    var i=1;
    var leng=Sandman.path_length(ptr,array,breakPoint);
    var sampledX = [];
    var sampledY = [];//[ maxX, maxY, minX, minY ]
    var samplePt=0;
    var interval=(leng/31);
    var tempDist=0;
    var add=0;
    var interPixelDist=0;

    // Canculating scalefactor by dividing the diagonal of the box containing the gesture by 100

    var scaleFactor=Math.sqrt((minMax [0]-minMax [2])*(minMax [0]-minMax [2])+(minMax [1]-minMax [3])*(minMax [1]-minMax [3]))/100;
    sampledX[0]=array[0][0];
    sampledY[0]=array[0][1];
    samplePt=1;

    // Interpolating

    while(i<ptr) {

      // Calculating inter pixel distance by the distance formula

      add=(array[i] [0]-array[i-1] [0])*(array[i] [0]-array[i-1] [0])+(array[i] [1]-array[i-1] [1])*(array[i] [1]-array[i-1] [1]);
      interPixelDist=Math.sqrt(add);

      //
      if (i===breakPoint) {
        i++;
      }
      /**/

      if((tempDist+interPixelDist)>=interval) {

        // Interpolation formula. Finding the pixel between two given pixels.


        sampledX[samplePt]=array[i-1] [0]+((interval-tempDist)/interPixelDist)*(array[i] [0]-array[i-1] [0]);
        sampledY[samplePt]=array[i-1] [1]+((interval-tempDist)/interPixelDist)*(array[i] [1]-array[i-1] [1]);
        array[i-1] [0]=sampledX[samplePt];
        array[i-1] [1]=sampledY[samplePt];
        tempDist=0;
        samplePt=samplePt+1;
        i=i-1;
      } else {
        tempDist=tempDist+interPixelDist;
      }
      i=i+1;

    }

    sampledX[samplePt]=array[ptr-1] [0];
    sampledY[samplePt]=array[ptr-1] [1];

    samplePt++;

    var sampled2d=[];

    for(i=0;i<samplePt;i++) {
      sampled2d[i]=[];
      sampled2d[i][0]=Math.round(sampledX[i]);
      sampled2d[i][1]=Math.round(sampledY[i]);
    }
    var parameterArray=Sandman.findParameters (sampled2d,32,(minMax [0]+minMax [2])/2,(minMax [1]+minMax [3])/2,interval,breakPoint);
    for(i=0;i<samplePt;i++) {

      Sandman.context.beginPath();
      Sandman.context.arc(sampled2d[i][0],sampled2d[i][1], 1, 0, Math.PI, true);
      Sandman.context.strokeStyle='black';
      Sandman.context.stroke();
    }

    // Sorting the pixels

    var swapVar=0;
    for(j=0;j<31 ;j++) {
      for(t=0;t<31-j;t++) {
        if(sampled2d[t][1]>sampled2d[t+1][1]) {
          swapVar=sampled2d[t][1];
          sampled2d[t][1]=sampled2d[t+1][1];
          sampled2d[t+1][1]=swapVar;
        }
        if(sampled2d[t][1]===sampled2d[t+1][1]) {
          if(sampled2d[t][0]>sampled2d[t+1][0]) {
            swapVar=sampled2d[t][0];
            sampled2d[t][0]=sampled2d[t+1][0];
            sampled2d[t+1][0]=swapVar;
          }
        }
      }
    }


    var output=Sandman.
      fft(sampled2d,32);
    var rounded=output;
    var temp=0;
    var k=0;

    //ROUNDING VALUES | SETTING THRESHOLD

    for(i=0;i<32;i++) {
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

    }
for (j=0;j<31;j++)
{
  document.getElementById ("temp").innerHTML=document.getElementById ("temp").innerHTML+ "["+rounded [j] [0]+","+rounded [j] [1]+"],";
}


    Sandman.set = "s"+parameterArray [0]+parameterArray [1]+parameterArray [2]+parameterArray [3]+parameterArray [4];
    Sandman.gesture[Sandman.gestPtr]=rounded;
    Sandman.gestPtr++;
    var resCnt=0;

console.log ("set  "+Sandman.set);
//Sandman.set="s10001";
if (typeof (window .Sandman[Sandman.set]) === "undefined") {
console.log ("nope");
return;
}
//Sandman.set  = window.Sandman["set"];




    var gest1=Sandman.gestureArray [ window .Sandman[Sandman.set] [0]];

    var gest2=rounded;
    for(i=1;i<31;i++)
    {

      if(Math.abs(gest1[i][0])===Math.abs(gest2[i][0])) resCnt++;
      if(Math.abs(gest1[i][1])===Math.abs(gest2[i][1])) resCnt++;

      if(resCnt>=10) {
//alert("Gesture Matched"); break;
alert ("You have drawn: "+gest1 [0]);
break;
}/**/

    }

    Sandman.gestPtr=0;
    if(resCnt<64) alert("Sandman.Gestures do not match. No. of descriptors matched:" + resCnt);



    document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "<br /><br />";
    chainInputPtr=0;
    samplePt=0;
    ptr=0;
    minMax=[-9999,-9999,9999,9999];      //[ maxX, maxY, minX, minY ]

    }

,
  doFirst: function  (domElement) {


    var eventCalled = 0;
    var input2d = [];
    var inputPtr=0;
    var mouseFlag=0;
    var okToSample=1;
    var intervalSet=0;
    var strokeInterval=null;
    var minMax = [];
    minMax=[-9999,-9999,9999,9999];      //[ maxX, maxY, minX, minY ]



    document.getElementById(domElement).addEventListener("touchstart", function (e) {
      e.preventDefault ();
      okToSample=0;
      minMax=[-9999,-9999,9999,9999];
      Sandman.touchStart (e);
    }, false);

    document.getElementById(domElement).addEventListener("touchmove", function (e) {

      if (eventCalled===0) {

        eventCalled=1;
        event = document.getElementById(domElement).addEventListener("touchend",function (e)  {
          mouseFlag=0;

          okToSample=1;

          var breakPoint=inputPtr-1;
          if (intervalSet===0)
          {
            intervalSet=1;
            strokeInterval=setInterval ( function () {

              if (okToSample===1) {

                clearInterval (strokeInterval);

                Sandman.sample (inputPtr,input2d,minMax,breakPoint);
                intervalSet=0;
                inputPtr=0;
              }

            },500);
          }
        } ,false);
      }
      input2d=Sandman.touchMoving (e,inputPtr,input2d,minMax);

      inputPtr++;

    } ,false);

    document.getElementById(domElement).addEventListener("mousedown",function (e) {

      okToSample=0;
      minMax=[-9999,-9999,9999,9999];

      mouseFlag=1;
      Sandman.touchStart (e);
    }, false);

    var event=null;
    document.getElementById(domElement).addEventListener("mousemove",function (e) {

      if (eventCalled===0) {

        eventCalled=1;

        event = document.getElementById(domElement).addEventListener("mouseup",function (e)  {
          mouseFlag=0;

          okToSample=1;

          var breakPoint=inputPtr-1;
          if (intervalSet===0)
          {
            intervalSet=1;
            strokeInterval=setInterval ( function () {

              if (okToSample===1) {

                clearInterval (strokeInterval);

                Sandman.sample (inputPtr,input2d,minMax,breakPoint);
                intervalSet=0;
                inputPtr=0;
              }

            },500);
          }
        } ,false);
      }
      if (mouseFlag===1) {

        input2d=Sandman.mouseMove (e,inputPtr,input2d,minMax);


        inputPtr++;
      }
    },false);



    Sandman.gesture=[];
    Sandman.gestPtr=0;
    x=document.getElementById(domElement);
    Sandman.context=x.getContext('2d');

    Sandman.context.beginPath();
    Sandman.context.arc(200,200, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle='black';
    Sandman.context.stroke();
  }



};
