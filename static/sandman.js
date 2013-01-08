

var Sandman = {

  context:null,
  gesture:null,
  gestPtr:null,


  touchStart: function  (e) {
    // if(cnt
    // ==1) return;
    // To prevent  default browser scrolling

    //  mouseFlag=1;
    e.preventDefault();

  },



compare: function (points,pointCount,avgX,avgY,interval) {

        var partitionEntered= [];           //Partiotion of the block entered
 var xanchorPoint=0;              //Anchored x coordinate value
 var yanchorpoint=0;            //Anchored x coordinate value
        var iterator=0;             //Iterator for the main while loop
  var horizontalThreshold=2;            //Threshold
        var verticalThreshold=2;             //Threshold
        var verticalLine=0;//
        var horizontalLine=0;//
 var xpointCounter=0;//
 var ypointCounter=0;//
 var crossoverIterator=1;
var crossoverThreshold=interval*3/4;
 var crossoverCount=0;
var crossoverStart=0;
        var priority= [];
    var dist=0;



    while(iterator<pointCount-1){
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
 if(Math.abs(points[iterator][1]-points[iterator+1][1])<horizontalThreshold){
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

/* if(points[iterator][0]<avgX){
     if(points[iterator][1]<avgY){
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
*/

 //Find crossover



//
crossoverIterator=iterator+2;
while (crossoverIterator<pointCount-2) {
if (iterator===15) break;

  var slope1=Math.atan ( ( points [iterator] [1]-points [iterator+1] [1])/(points [iterator] [0]-points [iterator+1] [0]));
  var slope2=Math.atan ( (points [iterator] [1]-points [crossoverIterator] [1])/(points [iterator] [0]-points [crossoverIterator] [0]));
  var slope3=Math.atan ( (points [iterator] [1]-points [crossoverIterator+1] [1])/(points [iterator] [0]-points [crossoverIterator+1] [0]));

  var slope4=Math.atan ( (points [crossoverIterator] [1] -points [crossoverIterator+1] [1])/(points [crossoverIterator] [0] -points [crossoverIterator+1] [0]));
  var slope5=Math.atan ( (points [crossoverIterator] [1]-points [iterator+1] [1])/(points [crossoverIterator] [0]-points [iterator+1] [0]));



  if ( (slope2<slope1 && slope3>slope1) || (slope2>slope1 && slope3<slope1)) {


if ((slope4<slope5 && slope4>slope2) || (slope4>slope5 && slope4<slope2)) {
crossoverCount++;
console.log ("Iterator: "+ iterator + "  CrossoverIterator: "+crossoverIterator);
console.log ("  2:"+slope2+"    1:"+slope1+"    3:"+slope3+"    ||5:"+slope5+"    4:"+slope4+"    2:"+slope2);
}

}
crossoverIterator++;
//console.log (crossoverIterator);

}



/**/




// Previous Crossover Method
/*

crossoverIterator=iterator+2;
      while(crossoverIterator<pointCount-1) {

          //if(Distance formula)
          dist=Math.sqrt((points[crossoverIterator][0]-points[iterator][0])*(points[crossoverIterator][0]-points[iterator][0])+(points[crossoverIterator][1]-points[iterator][1])*(points[crossoverIterator][1]-points[iterator][1]));

          if(dist<crossoverThreshold && crossoverStart===0) {
            crossoverStart=1;
            crossoverCount++;
            console.log ("distac: "+dist + "   crossoverCount: "+crossoverCount +"  crossover Iteratoer"+crossoverIterator +"  iterator: "+ iterator);
            crossoverIterator++;
            priority[3]=priority[3]+dist;
break;
          }
       //Increment iterator
          crossoverIterator++;
        }
if (crossoverIterator===pointCount-1) {
crossoverStart=0;
}
*/

        //increment iterator

      iterator++;

        //  priority[2]=partitionEntered.indexOf(Math.max.apply(0,partitionEntered))/10+Math.max.apply(0,partitionEntered);

      }


console.log ("Vert:"+verticalLine+"  Horiz:"+horizontalLine+" Cross:"+crossoverCount);
},



  mouseMove: function (e,ptr,array,minMax) {

    //Storing minimun and maximum values to determine size of the gesture



    if(e.clientX<minMax [2]){ minMax [2]=e.clientX;}
    if(e.clientX>minMax [0]) {minMax [0]=e.clientX;}

    if(e.clientY<minMax [3]){ minMax [3]=e.clientY;}
    if(e.clientY>minMax [1]) {minMax [1]=e.clientY;}

    array[ptr]=[e.clientX,e.clientY];

    this.context.beginPath();
    this.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    this.context.strokeStyle='cyan';
    this.context.stroke();

    return array;

  },

  touchMoving: function (e,ptr,array,minMax) {
    // Taking the input points


    if(e.touches[0].pageX<minMax [2]){ minMax [2]=e.touches[0].pageX;}       //[ maxX, maxY, minX, minY ]
    if(e.touches[0].pageX>minMax [0]) {minMax [0]=e.touches[0].pageX;}
    if(e.touches[0].pageY<minMax [3]){ minMax [3]=e.touches[0].pageY;}
    if(e.touches[0].pageY>minMax [1]) {minMax [1]=e.touches[0].pageY;}

    array [ptr]=[e.touches [0].pageX,e.touches [0].pageY];

    //[ maxX, maxY, minX, minY ]
    this.context.beginPath();
    this.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    this.context.strokeStyle='cyan';
    this.context.stroke();

    return array;

  },




  /*
    Creation of chain code from the sampled pixels
  */
  /*
    createChainCode: function  () {

    chain = [];
    [0  chainInputPtr=0;
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
    },
  */





  /*
    This function calculate the total length of the
    gesture
  */

  path_length: function (ptr, array,breakPoint)
  {
    var y=1;
    var len=0;
    var temp=0;


    while(y<ptr)
    {

/*
      if (y-1===breakPoint)
      {
        y++;
      }
/**/
      temp=(array[y] [0]-array[y-1] [0])*(array[y] [0]-array[y-1] [0])+(array[y] [1]-array[y-1] [1])*(array[y] [1]-array[y-1] [1]);
      len = len + Math.sqrt(temp);
      y=y+1;

    }
    /*********/
    return len;
  },


  /*
    This function calculates the Fast Fourier Transform
    of the given points
  */


  fft: function (sampled2d,n) {
    var twiddle=[];
    twiddle=[[1,0],[0.924,-0.387],[0.707,-0.707],[0.387,-0.924],[0,-1],[-0.387,0.924],[-0.707,-0.707],[-0.927,0.387]];

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

      V[i]=[(Veven[i][0]+twiddle[i*16/n][0]*Vodd[i][0]-twiddle[i*16/n][1]*Vodd[i][1]),(Veven[i][1]+twiddle[i*16/n][0]*Vodd[i][1]+twiddle[i*16/n][1]*Vodd[i][0])];
      V[n/2+i]=[(Veven[i][0]-twiddle[i*16/n][0]*Vodd[i][0]+twiddle[i*16/n][1]*Vodd[i][1]),(Veven[i][1]-twiddle[i*16/n][0]*Vodd[i][1]-twiddle[i*16/n][1]*Vodd[i][0])];
    }
    return V;
  },



  ckeck: function() {
    alert ("hhhhh");
  },



  /*
    Sampling the input gesture pixels

    It is possible that the input pixels are not evenly spaced in a this.gesture. That is they may be denselty situated in
    in some region and sparcely in other.

    In this function we create array of fixed number of  evenly spaced pixels from the input array array using interpolation.
  */

  sample: function (ptr,array,minMax,breakPoint){




    //INTERPOLATING
if (breakPoint===( ptr-1)) {
breakPoint=-1;

}
    var i=1;
    var leng=this.path_length(ptr,array,breakPoint);
    var sampledX = [];
    var sampledY = [];//[ maxX, maxY, minX, minY ]
    var samplePt=0;
    var interval=(leng/15);
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

/*
      if (i===breakPoint) {
        i++;
      }
/**/

      if((tempDist+interPixelDist)>=interval) {

        // Interpolation formula. Finding the pixel between two given pixels.

//        console.log ("INPUT:   "+array [i-1] [0]+  "   "+ array [i-1] [1]+ "     "+samplePt);
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
    Sandman.compare (sampled2d,16,(minMax [0]+minMax [2])/2,(minMax [1]+minMax [3])/2,interval);
    for(i=0;i<samplePt;i++) {

      this.context.beginPath();
      this.context.arc(sampled2d[i][0],sampled2d[i][1], 1, 0, Math.PI, true);
      this.context.strokeStyle='black';
      this.context.stroke();
    }



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


    // Sorting the pixels

    var swapVar=0;
    for(j=0;j<15 ;j++) {
      for(t=0;t<15-j;t++) {
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

    var output=this.
      fft(sampled2d,16);
    var rounded=output;
    var temp=0;
    var k=0;

    //ROUNDING VALUES | SETTING THRESHOLD

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

      document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "| x: "+ rounded[i][0]+" y: " + rounded[i][1] + " | ";
    }

    // alert (ptr + "   " + this.gestPtr );
    this.gesture[this.gestPtr]=rounded;
    this.gestPtr++;
    var resCnt=0;
    if(this.gestPtr===2)
    {
      var gest1=this.gesture[0];
      var gest2=this.gesture[1];
      for(i=0;i<16;i++)
      {
        if(Math.abs(gest1[i][0])===Math.abs(gest2[i][0])) resCnt++;
        if(Math.abs(gest1[i][0])===Math.abs(gest2[i][0])) resCnt++;
        if(resCnt>=16) {alert("Gesture Matched"); break;}
      }
      this.gestPtr=0;
      if(resCnt<16) console.log("This.Gestures do not match. No. of descriptors matched:" + resCnt);

    }

    document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "<br /><br />";
    chainInputPtr=0;
    samplePt=0;
    ptr=0;
    minMax=[-9999,-9999,9999,9999];      //[ maxX, maxY, minX, minY ]

  },

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
        //alert ("inevent");
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

            },500); //alert (input2d [inputPtr]);
          }
        } ,false);
        //alert ("outeventE");
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
        //alert ("inevent");
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

            },500); //alert (input2d [inputPtr]);
          }
        } ,false);
        //alert ("outeventE");
      }
      if (mouseFlag===1) {

        input2d=Sandman.mouseMove (e,inputPtr,input2d,minMax);


        inputPtr++;
      }
    },false);



    this.gesture=[];
    this.gestPtr=0;
    x=document.getElementById(domElement);
    this.context=x.getContext('2d');

    this.context.beginPath();
    this.context.arc(200,200, 1, 0, Math.PI, true);
    this.context.strokeStyle='black';
    this.context.stroke();
  }



};
