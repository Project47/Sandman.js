var Sandman = {

  context: null,
  gesture: null,
  gestPtr: null,
  keyPoints: [],
  gestureArray: [

    /*

      Structure:
      0: name of gesture
      1-32: actual poiints
      33: keypoints' array

    */


    [["P"],[6.445534945673558,2266.522994832454],[0,64],[0,56],[0,50],[0,43],[0,35],[0,28],[0,22],[0,14],[0,7],[0,0],[0,-6],[0,-14],[5,-16],[11,-16],[19,-16],[26,-16],[33,-16],[39,-14],[43,-8],[45,-4],[45,4],[45,11],[44,16],[39,19],[33,22],[27,23],[20,26],[16,28],[9,30],[2,30],[-3,30],[ [0,31]]],

    //   ALL OF THE  FOURIERS HAVE BEEN REPLACED WITH IDFTed POINTS

    [["S"],[1312.4138526119202,-574.5682574638769],[39,-23],[33,-25],[27,-26],[20,-27],[13,-27],[7,-26],[2,-22],[-3,-18],[-6,-13],[-8,-7],[-8,0],[-3,5],[1,10],[7,13],[12,14],[19,16],[25,19],[30,21],[34,25],[36,31],[37,38],[37,44],[34,49],[30,53],[25,55],[18,56],[12,58],[6,58],[-1,58],[-7,56],[-10,53],[[0,31]]],

    [["O"],[592.3683460288678,-776.4150816864162],[11,-23],[5,-20],[-1,-15],[-7,-12],[-12,-5],[-14,2],[-14,10],[-14,18],[-14,27],[-14,35],[-12,41],[-7,46],[-4,51],[2,54],[10,55],[18,55],[26,54],[33,52],[38,47],[43,40],[46,35],[47,27],[47,18],[44,12],[43,4],[42,-3],[38,-8],[34,-12],[28,-16],[24,-20],[20,-24], [[0,31]]],

    [["Z"],[-679.0614804532645,-523.7845876957829],[-14,-16],[-6,-16],[2,-16],[10,-16],[18,-16],[25,-16],[33,-15],[41,-15],[48,-15],[43,-10],[37,-5],[33,2],[27,6],[20,11],[16,17],[10,21],[4,25],[-2,30],[-7,35],[-13,39],[-18,42],[-13,44],[-6,44],[3,44],[10,44],[18,44],[26,44],[33,44],[41,45],[48,46],[55,47],[[0,31]]],

    [["M"],[-1042.1326291094003,1055.0477361580527],[-31,29],[-28,24],[-25,20],[-21,17],[-18,13],[-15,9],[-12,5],[-10,1],[-6,2],[-3,7],[0,11],[3,15],[6,19],[10,23],[13,26],[17,23],[21,20],[26,16],[29,13],[32,9],[34,5],[36,2],[41,4],[45,7],[47,10],[50,14],[53,17],[56,21],[59,25],[60,29],[62,31],[[0,31]]],

    [["L"],[121.68302674672213,-1300.758767528995],[4,-36],[4,-32],[4,-27],[4,-23],[4,-18],[4,-14],[4,-10],[4,-5],[3,-1],[3,4],[3,8],[3,13],[3,17],[3,21],[3,25],[3,30],[3,34],[3,39],[7,40],[11,40],[16,40],[20,40],[25,40],[29,40],[34,40],[38,40],[42,40],[47,40],[51,40],[56,40],[60,40],[[0,31]]],

    [["V"],[-862.8967502425527,-239.52370056116536],[-26,-4],[-23,-2],[-19,1],[-17,3],[-14,7],[-12,11],[-10,15],[-6,18],[-3,22],[0,25],[3,29],[6,32],[10,36],[12,38],[15,42],[17,41],[20,37],[24,35],[27,31],[29,27],[31,23],[34,19],[37,16],[40,13],[43,9],[44,5],[47,1],[49,-2],[52,-5],[56,-7],[58,-8],[[0,31]]],

    [["A"],[-705.1214812687492,1382.6311713368075],[-19,39],[-14,35],[-12,29],[-9,24],[-5,19],[-1,14],[1,8],[4,3],[7,-2],[11,-8],[14,-12],[17,-17],[19,-15],[21,-9],[23,-3],[26,3],[29,7],[32,12],[34,18],[37,25],[39,31],[41,37],[44,43],[47,47],[-2,16],[5,17],[12,18],[19,19],[27,19],[34,19],[40,19],[[0,24],[25,31]]],

[["Q"],[191.5484930520742,-699.2287236320598],[0,-19],[-4,-14],[-9,-8],[-12,-2],[-13,6],[-14,13],[-12,20],[-8,26],[-4,32],[2,37],[9,40],[16,40],[23,37],[29,32],[32,26],[34,19],[35,12],[35,4],[32,-3],[28,-9],[24,-15],[19,-19],[11,-21],[7,-21],[23,26],[26,33],[29,40],[32,46],[37,51],[41,55],[46,58] ,[[0,24],[25,31]]]

  ],
  s2110022: [0], //p

  s2001031: [3], //z
  s0000014: [4], //m
  s3000012: [6], //v
  s2011011: [5], //l
  s2000032: [2], //O
  s1000031: [1, 6], //s
  s2200112: [7], //A
s2100143: [8], //Q
  set: null,
  samplePoints: 32,


printThis: function (pt,varr) {
console.log (pt+ ": "+ varr);

},



  createChainCode: function (inputArray) {
    //////console.log ("inputarr"+inputArray [0][1]);
    /*
      Creation of chain code from the sampled pixels
    */

    chain = [];
    var chainInputPtr = 0;
    var region = 0;
    var slope = 0;
    var i = 0;

    while (i < (Sandman.samplePoints - 1)) {
      slope = -1 * (inputArray[i + 1][1] - inputArray[i][1]) / (inputArray[i + 1][0] - inputArray[i][0]);
      if (slope >= 2.414 || slope < -2.414) {
        if ((inputArray[i + 1][1] - inputArray[i][1]) >= 0) chain[chainInputPtr] = 6;
        else chain[chainInputPtr] = 2;

      } else if (slope >= 0.414 && slope < 2.414) {
        if ((inputArray[i + 1][0] - inputArray[i][0]) >= 0) chain[chainInputPtr] = 1;
        else chain[chainInputPtr] = 5;

      } else if (slope <= 0.414 && slope > -0.414) {
        if ((inputArray[i + 1][0] - inputArray[i][0]) >= 0) chain[chainInputPtr] = 0;
        else chain[chainInputPtr] = 4;

      } else if (slope >= -2.414 && slope < -0.414) {
        if ((inputArray[i + 1][0] - inputArray[i][0]) >= 0) chain[chainInputPtr] = 7;
        else chain[chainInputPtr] = 3;

      }
      i++;
      chainInputPtr++;
    }

    var repeatedNum = chain[0];
    var reducedChain = [];
    var redPtr = 1;
    reducedChain[0] = chain[0];
    i = 1;
    while (i < Sandman.samplePoints) {
      if (chain[i] != repeatedNum) {
        reducedChain[redPtr] = chain[i];
        redPtr++;
        repeatedNum = chain[i];
      }
      i++;
    }
    //////console.log ("chain"+ chain);
    //////console.log ("reduced"+reducedChain);

    // Displaying the result

    //fft();
  },

  touchStart: function (e) {
    e.preventDefault();
  },


  findParameters: function (points, pointCount, avgX, avgY, interval, keyPoints) {

    // @TODO Prioritized sorting

    var index = [];
    var partitionEntered = [-99, 0, 0, 0, 0]; //Partiotion of the block entered
    var xanchorPoint = 0; //Anchored x coordinate value
    var yanchorPoint = 0; //Anchored x coordinate value
    var iterator = 0; //Iterator for the main while loop
    var horizontalThreshold = 10; //Threshold
    var verticalThreshold = 10; //Threshold
    var verticalLine = 0; //
    var horizontalLine = 0; //
    var xpointCounter = 0; //
    var ypointCounter = 0; //
    var crossoverIterator = 1;
    var crossoverThreshold = interval * 3 / 4;
    var crossoverCount = 0;
    var crossoverStart = 0;
    var priority = [];
    var portion = [0, 0, 0, 0, 0, 0];
    var dist = 0;
    var xDeviation = 0;
    var yDeviation = 0;
    var xtempDev = -1;
    var ytempDev = -1;

    while (iterator < pointCount - 1) {
      //Find vertical line

      /////////////////////No of deviations////////////////////////////

      if (iterator < pointCount - 4) {
        if ((points[iterator][0] - points[iterator + 1][0]) < 0 && (points[iterator + 1][0] - points[iterator + 2][0]) < 0 && (points[iterator + 2][0] - points[iterator + 3][0]) < 0 && (points[iterator + 3][0] - points[iterator + 4][0]) < 0) {
          if (xtempDev != 0) {
            xDeviation++;

          }
          xtempDev = 0;

        } else if ((points[iterator][0] - points[iterator + 1][0]) > 0 && (points[iterator + 1][0] - points[iterator + 2][0]) > 0 && (points[iterator + 2][0] - points[iterator + 3][0]) > 0 && (points[iterator + 3][0] - points[iterator + 4][0]) > 0) {
          if (xtempDev != 1) {
            xDeviation++;

          }
          xtempDev = 1;
        }
        if ((points[iterator][1] - points[iterator + 1][1]) < 0 && (points[iterator + 1][1] - points[iterator + 2][1]) < 0 && (points[iterator + 2][1] - points[iterator + 3][1]) < 0 && (points[iterator + 3][1] - points[iterator + 4][1]) < 0) {
          if (ytempDev != 0) {
            yDeviation++;

          }
          ytempDev = 0;
        } else if ((points[iterator][1] - points[iterator + 1][1]) > 0 && (points[iterator + 1][1] - points[iterator + 2][1]) > 0 && (points[iterator + 2][1] - points[iterator + 3][1]) > 0 && (points[iterator + 3][1] - points[iterator + 4][1]) > 0) {
          if (ytempDev != 1) {
            yDeviation++;

          }
          ytempDev = 1;
        }
      }

      /////////////////////////////////////////////////////////////////

      if (Math.abs(points[xanchorPoint][0] - points[iterator + 1][0]) < verticalThreshold) {
        xpointCounter = xpointCounter + 1;

      } else if (verticalLine < xpointCounter) {


        //  @TODO Change the values of priority ( eg. div by some number)


        verticalLine = xpointCounter;
        xpointCounter = 0;
        xanchorPoint = iterator;
        priority[0] = verticalLine + 0.5;
      } else {
        xanchorPoint = iterator;
        xpointCounter = 0;
      }
      if (verticalLine < xpointCounter) {
        verticalLine = xpointCounter;

      }
      //Find horizontal line

      if (Math.abs(points[yanchorPoint][1] - points[iterator + 1][1]) < horizontalThreshold) {
        ypointCounter++;
      } else if (horizontalLine < ypointCounter) {
        horizontalLine = ypointCounter;
        priority[1] = horizontalLine + 0.6;
        yanchorPoint = iterator;
        ypointCounter = 0;
      } else {
        yanchorPoint = iterator;
        ypointCounter = 0;
      }
      if (horizontalLine < ypointCounter) {
        horizontalLine = ypointCounter;
      }

      //Find blocks in which gesture exists

      //
      if (points[iterator][0] < (avgX + avgX / 10)) {
        if (points[iterator][1] < (avgY + avgY / 10)) {
          partitionEntered[1]++;
        } else {
          partitionEntered[3]++;
        }
      } else if (points[iterator][1] < avgY) {
        partitionEntered[2]++;
      } else {
        partitionEntered[4]++;
      }
      /**/

      //Find crossover

      crossoverIterator = iterator + 2;

      while (crossoverIterator <= pointCount - 2) {
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

        var X11 = points[iterator][0];
        var Y11 = points[iterator][1];
        var X12 = points[iterator + 1][0];
        var Y12 = points[iterator + 1][1];

        var X21 = points[crossoverIterator][0];
        var Y21 = points[crossoverIterator][1];
        //////console.log ("cross  "+crossoverIterator +"  iteratir  "+iterator+ "   points [crossoverIterator+1] [1]  "+points [crossoverIterator+1] [1]);
        var X22 = points[crossoverIterator + 1][0];
        var Y22 = points[crossoverIterator + 1][1];

        var A1 = points[iterator][1] - points[iterator + 1][1];
        var B1 = points[iterator + 1][0] - points[iterator][0];
        var C1 = (-1) * B1 * points[iterator][1] + (-1) * A1 * points[iterator][0];

        var A2 = points[crossoverIterator][1] - points[crossoverIterator + 1][1];
        var B2 = points[crossoverIterator + 1][0] - points[crossoverIterator][0];
        var C2 = (-1) * B2 * points[crossoverIterator][1] + (-1) * A2 * points[crossoverIterator][0];

        var del = A1 * B2 - A2 * B1;
        if (del !== 0) {
          var x = (-1) * (B2 * C1 - B1 * C2) / del;
          var y = (-1) * (A1 * C2 - A2 * C1) / del;
        }

        var dist11 = Math.sqrt((points[iterator][0] - x) * (points[iterator][0] - x) + (points[iterator][1] - y) * (points[iterator][1] - y));
        var dist12 = Math.sqrt((points[iterator + 1][0] - x) * (points[iterator + 1][0] - x) + (points[iterator + 1][1] - y) * (points[iterator + 1][1] - y));
        var dist21 = Math.sqrt((points[crossoverIterator][0] - x) * (points[crossoverIterator][0] - x) + (points[crossoverIterator][1] - y) * (points[crossoverIterator][1] - y));
        var dist22 = Math.sqrt((points[crossoverIterator + 1][0] - x) * (points[crossoverIterator + 1][0] - x) + (points[crossoverIterator + 1][1] - y) * (points[crossoverIterator + 1][1] - y));

        if (((dist11 + dist12) < interval + 2) && ((dist11 + dist12) > interval - 2)) {
          if (((dist21 + dist22) < interval + 2) && ((dist21 + dist22) > interval - 2)) {
            crossoverCount++;
          }
        }

        crossoverIterator++;
      }


      //increment iterator

      iterator++;

    }


    portion[0] = partitionEntered[1] + partitionEntered[2]; //Top half
    portion[1] = partitionEntered[3] + partitionEntered[4]; //Bottom
    portion[2] = partitionEntered[1] + partitionEntered[3]; //Left
    portion[3] = partitionEntered[4] + partitionEntered[2]; //Right

    var strokes = 0;
    if (keyPoints.length > 1) {
      strokes = 1;
    }

    //    //alert (" partition: "+portion.indexOf (Math.max (portion [0],portion [1],portion [2],portion [3]))+" Cross:"+crossoverCount+"Vert:"+verticalLine+"  Horiz:"+horizontalLine+"  strokes:"+strokes);


    /*
      priority[0] = partition
      priority[1] = crossover
      priority[2] = vertical
      priority[3] = horizontal
      priority[4] = strokes
      = 0 if strkes = 1
      = 1 if strokes = 2

    */

    priority[0] = portion.indexOf(Math.max(portion[0], portion[1], portion[2], portion[3])); //partition
    if (crossoverCount > 3) {
      priority[1] = 4;
    } else {
      priority[1] = crossoverCount;
    }
    if (verticalLine > 10) priority[2] = 1;
    else priority[2] = 0;
    if (horizontalLine > 10) priority[3] = 1;
    else priority[3] = 0;
    priority[4] = strokes;
    if (xDeviation > 5) {
      priority[5] = 6;
    } else {
      priority[5] = xDeviation;
    }

    if (yDeviation > 5) {
      priority[6] = 6;
    } else {
      priority[6] = yDeviation;
    }
    return priority;
  },



  mouseMove: function (e, ptr, array, minMax) {

    //Storing minimun and maximum values to determine size of the gesture

    if (e.clientX < minMax[2]) {
      minMax[2] = e.clientX;
    }
    if (e.clientX > minMax[0]) {
      minMax[0] = e.clientX;
    }

    if (e.clientY < minMax[3]) {
      minMax[3] = e.clientY;
    }
    if (e.clientY > minMax[1]) {
      minMax[1] = e.clientY;
    }

    array[ptr] = [e.clientX, e.clientY];

    Sandman.context.beginPath();
    Sandman.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle = 'green';
    Sandman.context.stroke();

    return array;

  },

  touchMoving: function (e, ptr, array, minMax) {
    // Taking the input points

    if (e.touches[0].pageX < minMax[2]) {
      minMax[2] = e.touches[0].pageX;
    } //[ maxX, maxY, minX, minY ]
    if (e.touches[0].pageX > minMax[0]) {
      minMax[0] = e.touches[0].pageX;
    }
    if (e.touches[0].pageY < minMax[3]) {
      minMax[3] = e.touches[0].pageY;
    }
    if (e.touches[0].pageY > minMax[1]) {
      minMax[1] = e.touches[0].pageY;
    }

    array[ptr] = [e.touches[0].pageX, e.touches[0].pageY];

    Sandman.context.beginPath();
    Sandman.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle = 'blue';
    Sandman.context.stroke();

    return array;

  },



  path_length: function (ptr, array, keyPoints) {
    var y = 1;
    var len = 0;
    var temp = 0;
    var i=0;
console.log (keyPoints);
    while (y < ptr) {
      //
      if (( y -1) === keyPoints [i] [1]) {

        y++;
Sandman.context.beginPath();
    Sandman.context.arc(array[y-1][0],array[y-1][1] , 1, 0, Math.PI, true);
    Sandman.context.strokeStyle = 'red';
    Sandman.context.stroke();

        if (i<keyPoints.length-1) i++;
      }
      /**/
      temp = (array[y][0] - array[y - 1][0]) * (array[y][0] - array[y - 1][0]) + (array[y][1] - array[y - 1][1]) * (array[y][1] - array[y - 1][1]);

      len = len + Math.sqrt(temp);
      y = y + 1;

    }

    return len;
  },


  /*
    This  function calculates the Fast Fourier Transform
    of the given points
    if inv = 1, returns fft
    if inv = -1, return idft
  */

  fft: function (sampled2d, n, inv) {

    var Aeven = [];
    var Aodd = [];
    var Veven = [];
    var Vodd = [];
    var V = [];
    if (n === 1) {
      return sampled2d;
    }

    for (i = 0; i <= n - 2; i = i + 2) {
      Aeven[i / 2] = [sampled2d[i][0], sampled2d[i][1]];
      Aodd[i / 2] = [sampled2d[i + 1][0], sampled2d[i + 1][1]];
    }
    Veven = Sandman.fft(Aeven, n / 2, inv);
    Vodd = Sandman.fft(Aodd, n / 2, inv);

    for (i = 0; i < n / 2; i++) {

      //Calculating the real and imaginary parts of the transform

      V[i] = [(Veven[i][0] + Math.cos((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][0] - inv * Math.sin((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][1]), (Veven[i][1] + Math.cos((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][1] + inv * Math.sin((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][0])];


      V[n / 2 + i] = [(Veven[i][0] - Math.cos((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][0] + inv * Math.sin((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][1]), (Veven[i][1] - Math.cos((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][1] - inv * Math.sin((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][0])];

    }

    return V;
  },





  /*
    Sampling the input gesture pixels

    It is possible that the input pixels are not evenly spaced in a Sandman.gesture. That is they may be denselty situated in
    in some region and sparcely in other.

    In Sandman function we create array of fixed number of  evenly spaced pixels from the input array array using interpolation.
  */


  gestureReverser: function(keypoints,points,keyPtr) {


    var iter1=0;
    var iter2=0;
    var iter3=0;
    // var iter4=0;
    var pointThreshold =15;
    var tempPtr=0;
    var matched=0;
    var tempArr=[];
    var len = points.length;

    var newKeyPoints = [];

    for (iter3=0; iter3<keypoints.length;iter3++) {
      ////console.log ("loopi1");
      keypoints [iter3].push (0);
    }

    for (iter3=keypoints [0] [0]; iter3<=keypoints [0] [1];iter3++) {
      ////console.log ("loopi2");
      tempArr [tempPtr] = points [iter3];
      tempPtr++;

    }
    newKeyPoints [0] = [0,tempPtr-1];
    keypoints [0] [2] = 1;
    iter1 = 0;
    while (1) {
      ////console.log ("loopi3");
      if (tempPtr >= len) {
        break;
      }

      /*
        if (iter1>=newKeyPoints.length) {
        break;
        }
      */
      for(iter2=0;iter2<keypoints.length;iter2++) {
        ////console.log ("loopi4");
        if ( keypoints [iter2] [2] === 1) {
          continue;
        }

        ////console.log ("newpts:"+newKeyPoints);
        ////console.log ("keypts:"+keypoints);
        ////console.log ("iter1:"+iter1+"  itr2:"+iter2);

        if(((Math.abs(tempArr[newKeyPoints[iter1][0]][0]-points[keypoints[iter2][0]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][0]][1]-points[keypoints[iter2][0]][1])<pointThreshold))) {

          // Start match
          var revPtr =0 ;
          var swapVar =0;
          for (iter3 = newKeyPoints [newKeyPoints.length-1] [0],revPtr =newKeyPoints [newKeyPoints.length-1] [1];iter3<revPtr;iter3++,revPtr--) {
            swapVar = tempArr [iter3];
            tempArr [iter3] = tempArr [revPtr];
            tempArr [revPtr] = swapVar;
          }
          for(iter3=keypoints[iter2][0];iter3<=keypoints[iter2][1];iter3++) {
            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;

          //       //alert ("hi1");

        }

        else if (((Math.abs(tempArr[newKeyPoints[iter1][1]][0]-points[keypoints[iter2][1]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][1]][1]-points[keypoints[iter2][1]][1])<pointThreshold))) {

          // End match
          for(iter3=keypoints[iter2][1];iter3>=keypoints[iter2][0];iter3--) {
            tempArr[tempPtr++]=points[iter3];

          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;

        }
        else if(((Math.abs(tempArr[newKeyPoints[iter1][1]][0]-points[keypoints[iter2][0]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][1]][1]-points[keypoints[iter2][0]][1])<pointThreshold)) ) {

          //  temnEnd - arrayStart match

          for(iter3=keypoints[iter2][0];iter3<=keypoints[iter2][1];iter3++) {

            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          //       keypoints[iter1][1]=keypoints[iter2][1];
          //       delete keypoints [iter2];

          matched=1;
          //
          //     keypoints[iter1][1]=keypoints[iter2][1];
          //delete keypoints [iter2];
          matched=1;
        }

        else if (((Math.abs(tempArr[newKeyPoints[iter1][0]][0]-points[keypoints[iter2][1]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][0]][1]-points[keypoints[iter2][1]][1])<pointThreshold))) {

          // tempStart - arrayEnd match
          var revPtr =0 ;
          var swapVar =0;
          for (iter3 = newKeyPoints [newKeyPoints.length-1] [0],revPtr =newKeyPoints [newKeyPoints.length-1] [1];iter3<revPtr;iter3++,revPtr--) {
            swapVar = tempArr [iter3];
            tempArr [iter3] = tempArr [revPtr];

            tempArr [revPtr] = swapVar;
          }
          for(iter3=keypoints[iter2][1];iter3>=keypoints[iter2][0];iter3--) {

            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;
        }

        ////console.log ("loopi INsine");
      }
      // inner loop end here



      if (matched === 0) {
        iter1++;
        newKeyPoints [newKeyPoints.length] = [newKeyPoints [newKeyPoints.length-1] [1]+1,0];
        iter3=0;
        ////console.log ("keypts:"+keypoints);
        while (1) {
          ////console.log ("iter3"+iter3);
          if(iter3>=keypoints.length) {
            break;
          }
          if ((keypoints [iter3] [2]===0)) {
            break;
          }

          iter3++;
        }
        if (iter3 === keypoints.length) {
          break;
        }
        else {
          var iter4 =0;
          for(iter4=keypoints[iter3][0];iter4<=keypoints[iter3][1];iter4++) {
            tempArr[tempPtr++]=points[iter4];
          }
          keypoints [iter3] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;

        }
      }
      else {
        matched =0;
      }

    }
    ////console.log ("Points" + points);
    ////console.log ("tempArr:" + tempArr);
    ////console.log ("tempPtr:"+tempPtr+"  newKeyPts:"+newKeyPoints);
    ////console.log ("pointsLength:"+points.length+"   keyPoints:"+keypoints);
/*
    Sandman.context.moveTo (tempArr [0] [0], tempArr [0] [1]);
    Sandman.context.strokeStyle = "red";
    //  //alert (tempArr);
    for (iter3=0;iter3<tempPtr;iter3++) {
      //      Sandman.context.beginPath();
      //            Sandman.context.arc(tempArr [iter3] [0], tempArr [iter3] [1], 1, 0, Math.PI, true);
      Sandman.context.lineTo (tempArr [iter3] [0], tempArr [iter3] [1]);
    }
    Sandman.context.stroke();
*/
    //alert ("s1:"+Sandman.keyPoints +"  newKeyPts:"+newKeyPoints);
    Sandman.keyPoints = newKeyPoints;
    //alert ("s1:"+Sandman.keyPoints);
    return tempArr;

  } ,



  compare: function(arr1,arr2,start1,end1,start2,end2) {
    var comp1=1,comp2=1,iter1=0,iter2=0;
    var pointThreshold=15;
    var score=0;
    var low1 = 0;
    var strokeLen = Math.abs ( start1-end1);
Sandman.printThis ("start1",start1);
Sandman.printThis ("end1",end1);
Sandman.printThis ("start2",start2);
Sandman.printThis ("end2",end2);
    if(start1>end1){
      comp1=-1;

    }
    if(start2>end2){
      comp2=-1;
    }
    iter2=start2;
    console.log (Math.abs ( end1-start1));
    for(iter1=0;( iter1<Math.abs(end1-start1)) && (iter2<Math.abs(end2-start2));iter1=iter1+comp1){
      console.log ("iter1New: "+( iter1+start1)+"  iter2:" +iter2);

      if((Math.abs(arr1[iter1+start1][0]-arr2[iter2][0])<pointThreshold)&&(Math.abs(arr1[iter1+start1][1]-arr2[iter2][1])<pointThreshold)){
        score++;
      }
iter2=iter2+comp2;
    }
    ////console.log ("score:" + score);
console.log ("TheComparescore: "+score);
    return score;
  }
  ,


gestureCompare: function (rounded, parameterArray,newKeyPoints) {

    ////console.log ("gest2: "+ rounded);

    var strokeIter = 0;
    var crossIter = 0;
    var horizIter = 0;
    var vertIter = 0;
    var xIter = 0;
    var yIter = 0;
    var gest2 = rounded;
    var iter = 0;
    var cnt = 0;
    var resCnt = 0;
    var pointThreshold = 15;
    var fourierThreshold = 16; //MUST BE A MULTIPLE OF 4
    var j=0;
alert("parameter: " + parameterArray);

    var keyPoints = newKeyPoints;
Sandman.printThis ("newKeyPoints",newKeyPoints);

    //        for (strokeIter = 0; strokeIter < 2; strokeIter++)

      //            parameterArray[4] = (parameterArray[4] + 1) % 2;

      for (xIter = 0; xIter < 7; xIter++) {

        parameterArray[5] = (parameterArray[5] + 1) % 7;

        for (yIter = 0; yIter < 7; yIter++) {

          parameterArray[6] = (parameterArray[6] + 1) % 7;

          for (crossIter = 0; crossIter < 5; crossIter++) { // shud be 5

            parameterArray[1] = (parameterArray[1] + 1) % 5;

            for (horizIter = 0; horizIter < 2; horizIter++) {

              parameterArray[3] = (parameterArray[3] + 1) % 2;

              for (vertIter = 0; vertIter < 2; vertIter++) {

                parameterArray[2] = (parameterArray[2] + 1) % 2;


                for (iter = 0; iter < 4; iter++) { // shud be 4
                  resCnt = 0;
                  cnt++;
                  parameterArray[0] = (parameterArray[0] + 1) % 4;
                  Sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4] + parameterArray[5] + parameterArray[6];
                  ////////console.log ("set:"+Sandman.set +"  i:"+i+"  rescnt:"+ resCnt);


                  if (typeof (window.Sandman[Sandman.set]) != "undefined") {

                    var setLength = (window.Sandman[Sandman.set]).length;

                    var setIter = 0;
                    var maxMatchedIndex = 0;
                    var maxMatched = -1;

                    for (setIter = 0; setIter < setLength; setIter++) {

                      //alert (Sandman.set);
                      resCnt = 0;
console.log ("--------SET: "+Sandman.set);
                      var gestPtr =0;
                      var checked = 0;
                      var gest2Ptr =0;
                      var didNotMatch=-1;
                      var gest1 = Sandman.gestureArray[window.Sandman[Sandman.set][setIter]];
console.log ("gest1: "+gest1);
console.log ("gest2: "+gest2);

                      if (( gest1 [33]).length != keyPoints.length) {
                        // different number of strokes in gesture

console.log ("gest1[33]Len: "  + gest1 [33].length+ "keyprLen:" +keyPoints.length);
console.log ("broke out");
                        continue;
                      }
                      var noOfStrokes = gest1 [33].length;
                      var keyPointsGest1 = gest1 [33];

/*                      if (noOfStrokes === 1) {
                        // Single Stroke
console.log ("noOfStrokes === 1");
checked=1;
                        if (( Math.abs((gest1[2][0]) - (gest2[1][0])) <= pointThreshold && Math.abs((gest1[2][1]) - (gest2[1][1])) <= pointThreshold) || (Math.abs((gest1[32][0]) - (gest2[31][0])) <= pointThreshold && Math.abs((gest1[32][1]) - (gest2[31][1])) <= pointThreshold)) {

                          // Straight checking of entire array.
                          resCnt = Sandman.compare (gest1, gest2, 0, 31, 0, 31);

                        }
                        else {

                          // comparing gest1 with reverse of gest2.
                          resCnt = Sandman.compare (gest1, gest2, 31, 0, 0, 31);

                        }
                      }
*/

                        // multiple strokes
                        while (gest2Ptr<keyPoints.length)
                        {
////console.log ("keypoints"+keyPoints);

////console.log ("gest2Ptr"+gest2Ptr);
////console.log ("gest2: "+gest2);
////console.log (gest2 [ keyPoints [gest2Ptr] [0]] [0]);
////console.log (gest2 [ 1] [0]);
////console.log (gest2 [ keyPoints [gest2Ptr] [0]] [1]);
////console.log (gest2 [ keyPoints [gest2Ptr] [1]] [1]);

console.log ("in while");
                          if ( Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [0] - gest2 [ keyPoints [gest2Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [1] - gest2 [ keyPoints [gest2Ptr] [1]] [1])<pointThreshold ) {
                            // Circular sub-gesture
console.log ("in Circular");
  //Finding lowwest point in gest2
                                var gest2Lowest =keyPoints [gest2Ptr] [0]+1;
                                var iter=0;
                                for (iter = keyPoints [gest2Ptr] [0]+2; iter<=keyPoints [gest2Ptr] [1];iter++) {
                                  if (gest2 [iter] [0] < gest2 [gest2Lowest] [0]) {
                                    gest2Lowest=iter;
                                  }
                                  else if (gest2 [iter] [0] === gest2 [gest2Lowest] [0] ) {
                                    if (gest2 [iter] [1] < gest2 [gest2Lowest] [1] ) {
                                      gest2Lowest=iter;
                                    }
                                  }
                                }



                            for (gest1Ptr =0; gest1Ptr<keyPointsGest1.length;gest1Ptr++) {
console.log ("looping:"+gest1Ptr);

                              if ( Math.abs ( gest1 [ keyPointsGest1 [gest1Ptr] [0]+2] [0] - gest1 [ keyPointsGest1 [gest1Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest1 [ keyPointsGest1 [gest1Ptr] [0]+2] [1] - gest1 [ keyPointsGest1 [gest1Ptr] [1]] [1])<pointThreshold ) {
                                //searching for circular sub-gesture ^
console.log ("found circular");
                                ////////console.log ("lowest: "+gest1 [gest1Lowest] [0] + "  index:"+gest1Lowest);

                                //Finding lowest point in gest1
                                var gest1Lowest =keyPointsGest1 [gest1Ptr] [0] +2;
                                for (iter = keyPointsGest1 [gest1Ptr] [0] +3 ; iter<=keyPointsGest1 [gest1Ptr] [1];iter++) {
                                  if (gest1 [iter] [0] < gest1 [gest1Lowest] [0]) {
                                    gest1Lowest=iter;
                                  }
                                  else if (gest1 [iter] [0] === gest1 [gest1Lowest] [0] ) {
                                    if (gest1 [iter] [1] < gest1 [gest1Lowest] [1] ) {
                                      gest1Lowest=iter;
                                    }
                                  }
                                }
   console.log ("gest2Lowest "+ gest2Lowest +  " gest1Lowest  "+gest1Lowest);
                                if (Math.abs ( gest1 [gest1Lowest] [0] - gest2 [gest2Lowest] [0])>pointThreshold || Math.abs(gest1 [gest1Lowest] [1] - gest2 [gest2Lowest] [1] >pointThreshold)) {
console.log ("brokaen");
                                  //does not match
                                  break;

                                }

                                if (( gest1 [gest1Lowest] [1] > gest1 [gest1Lowest+2] [1]) && (gest2 [gest2Lowest] [1] > gest2 [gest2Lowest+2] [1]) ||( gest1 [gest1Lowest] [1] < gest1 [gest1Lowest+2] [1]) && (gest2 [gest2Lowest] [1] < gest2 [gest2Lowest+2] [1]) ) {

console.log ("in circular strt");
                                  // Straight checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [0] to keyPointsGest1 [gest2Ptr] [1])

                                  var iter1=0,iter2=0;
                                  var score=0;
 var start2 = keyPoints [gest2Ptr] [0];
                                  var end2 =  keyPoints [gest2Ptr] [1];

                                  var start1 = keyPointsGest1 [gest1Ptr] [0];
                                  var end1 = keyPointsGest1 [gest1Ptr] [1];

                                  var strokeLen = Math.abs ( start1-end1);

                                  var count=0;
console.log ("lowest1: "+gest1Lowest+"lowets2: "+gest2Lowest+ "  strokelen: "+strokeLen);
                                  for(iter1=gest1Lowest-start1,iter2 = gest2Lowest - start2;count<strokeLen;iter1++,iter2++) {
                                    console.log ("i1:  "+( start1 + iter1%strokeLen)+"  i2: "+(start2 +iter2%strokeLen));
                                    if (Math.abs (gest1 [start1 + iter1%strokeLen] [0] - gest2 [start2 +iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [start1+iter1%strokeLen] [1] - gest2 [start2 +iter2%strokeLen] [1])< pointThreshold) {
                                      resCnt++;
                                    }
                                    count++;
                                  }
                                  ////////console.log ("score:" + score);

                                  // if the stroke matches, checked = 1;
                                  //resCnt = resCnt + compare();
console.log ("rescnt:"+resCnt);
                                  checked = 1;
                                }
                                else {
console.log ("in circular reverse");
                                  // Reverse checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [1] to keyPointsGest1 [gest2Ptr] [0])
                                  // if the stroke matches, checked = 1;
                                  //resCnt = resCnt + compare();

                                  var comp1=1,comp2=1,iter1=0,iter2=0;
                                  var count =0 ;
                                  var score=0;
 var start2 = keyPoints [gest2Ptr] [0];
                                  var end2 =  keyPoints [gest2Ptr] [1];

                                  var start1 = keyPointsGest1 [gest1Ptr] [0];
                                  var end1 = keyPointsGest1 [gest1Ptr] [1];
                                  var strokeLen = Math.abs ( start1-end1);

console.log ("lowest1: "+gest1Lowest+"lowets2: "+gest2Lowest+ "  strokelen: "+strokeLen);
                                  if (start1 > end1) {
console.log ("Start1>end1");
                                    for(iter1=end1 - gest1Lowest,iter2 = gest2Lowest - start2;count<strokeLen;iter1++,iter2++) {
                                    console.log ("i1:  "+( start1 + iter1%strokeLen)+"  i2: "+(start2 +iter2%strokeLen));
                                      if (Math.abs (gest1 [end1 - iter1%strokeLen] [0] - gest2 [start2 +iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [end1 - iter1%strokeLen] [1] - gest2 [start2 +iter2%strokeLen] [1])< pointThreshold) {
                                        resCnt++;
                                      }
                                      count++;
                                    }

                                  }
                                  else {
console.log ("Start1<end1");
                                    for(iter1=gest1Lowest-start1,iter2 = end2 - gest2Lowest;count<strokeLen;iter1++,iter2++) {
                                    console.log ("i1:  "+( start1 + iter1%strokeLen)+"  i2: "+(end2 -iter2%strokeLen));
                                      if (Math.abs (gest1 [start1 + iter1%strokeLen] [0] - gest2 [end2 - iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [start1+iter1%strokeLen] [1] - gest2 [end2 - iter2%strokeLen] [1])< pointThreshold) {
                                        resCnt++;
                                      }
                                      count++;
                                    }

                                  }
                                  var count=0;
                                  checked = 1;
console.log ("rescnt:"+resCnt);
                                }

                              }
/*
                              else {
                                  // Non circular sub-gesutre
                                for (gestPtr =0; gestPtr<keyPointsGest1.length;gestPtr++)
                                {
                                  if (Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [0] - gest1 [ keyPointsGest1 [gestPtr] [0]+1] [0]) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [1] - gest1 [ keyPointsGest1 [gestPtr] [0]+1] [1]) < pointThreshold) {
                                    // Straight checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [0] to keyPointsGest1 [gest2Ptr] [1])
                                    // if the stroke matches, checked = 1;
                                    //resCnt = resCnt + compare();
                                    resCnt = Sandman.compare (gest2 , gest1, keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1], keyPointsGest1 [gestPtr] [0]+1, keyPointsGest1 [gest2Ptr] [1]+1);
                                    checked = 1;
                                  }
                                  else  if (Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [0] - gest1 [ keyPointsGest1 [gestPtr] [1]+1] [0]) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [1] - gest1 [ keyPointsGest1 [gestPtr] [1]+1] [1]) < pointThreshold) {
                                    // Reverse checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [1] to keyPointsGest1 [gest2Ptr] [0])
                                    // if the stroke matches, checked = 1;
                                    //resCnt = resCnt + compare();
                                    resCnt = Sandman.compare (gest2 , gest1, keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1], keyPointsGest1 [gestPtr] [1]+1, keyPointsGest1 [gest2Ptr] [0]+1);
                                    checked = 1;

                                  }
                                }
                              }*/





                            }


                          }
else {
// non circular Sub-gesture
console.log ("in else");
checked=1;

for (gest1Ptr =0 ; gest1Ptr<keyPointsGest1.length;gest1Ptr++) {

console.log ("keyPointsGest1: "+keyPointsGest1);
console.log ("keypoints"+keyPoints);
  console.log ("keyPointsGest1: "+gest1 [ keyPointsGest1 [gest1Ptr] [0]+2] [0]);
  console.log ("keyPoints: "+gest2 [ keyPoints [gest2Ptr] [0]+1] [0]);

  if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [0]+ 1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5))) {
console.log ("in non cirdc");
                          // Straight checking of entire array.
                          resCnt = resCnt + Sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [0], keyPointsGest1 [gest1Ptr] [1], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);

                        }
  else if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [0]+1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5))) {

                          // comparing gest1 with reverse of gest2.
                          resCnt = resCnt + Sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [1], keyPointsGest1 [gest1Ptr] [0], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);

                        }

}

}


                          /////////////////////////////////////////////////////////////////////
/*

                          for (gest1Ptr =0; gest1Ptr<keyPointsGest1.length;gest1Ptr++)
                          {
                            checked =0;

                            {
                              // Circular sub-gesture

                              for (gestPtr =0; gestPtr<keyPoints.length;gestPtr++) {
                                if ( Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [0] - gest2 [ keyPoints [gest2Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [1] - gest2 [ keyPoints [gest2Ptr] [1]] [1])<pointThreshold ){
                                  //searching for circular sub-gesture ^

                                  //Finding lowest point in gest2
                                  var gest2Lowest =keyPoints [gest2Ptr] [0];
                                  var iter=0;
                                  for (iter = keyPoints [gest2Ptr] [0]; iter<=keyPoints [gest2Ptr] [1];iter++) {
                                    if (gest2 [iter] [0] < gest2 [gest2Lowest] [0]) {
                                      gest2Lowest=iter;
                                    }
                                    else if (gest2 [iter] [0] === gest2 [gest2Lowest] [0] ) {
                                      if (gest2 [iter] [1] < gest2 [gest2Lowest] [1] ) {
                                        gest2Lowest=iter;
                                      }
                                    }
                                  }

                                  ////////console.log ("lowest: "+gest1 [gest1Lowest] [0] + "  index:"+gest1Lowest);

                                  //Finding lowest point in gest1
                                  var gest1Lowest =keyPointsGest1 [gest1Ptr] [0] +1;
                                  for (iter = keyPointsGest1 [gest1Ptr] [0] +1 ; iter<=keyPointsGest1 [gest1Ptr] [1];iter++) {
                                    if (gest1 [iter] [0] < gest1 [gest1Lowest] [0]) {
                                      gest1Lowest=iter;
                                    }
                                    else if (gest1 [iter] [0] === gest1 [gest1Lowest] [0] ) {
                                      if (gest1 [iter] [1] < gest1 [gest1Lowest] [1] ) {
                                        gest1Lowest=iter;
                                      }
                                    }
                                  }


                                  if (( gest1 [gest1Lowest] [0] > gest1 [gest1Lowest+2] [0]) && (gest2 [gest2Lowest] [0] > gest2 [gest2Lowest+2] [0])) {
                                    // Straight checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [0] to keyPointsGest1 [gest2Ptr] [1])
                                    // if the stroke matches, checked = 1;
                                    //resCnt = resCnt + compare();
                                    resCnt = compare (gest2 , gest1, keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1], keyPointsGest1 [gestPtr] [0], keyPointsGest1 [gest2Ptr] [1]);
                                    checked = 1;
                                  }
                                  else {
                                    // Reverse checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [1] to keyPointsGest1 [gest2Ptr] [0])
                                    // if the stroke matches, checked = 1;
                                    //resCnt = resCnt + compare();
                                    resCnt = compare (gest2 , gest1, keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1], keyPointsGest1 [gestPtr] [1], keyPointsGest1 [gest2Ptr] [0]);
                                    checked = 1;

                                  }

                                }

                              }


                            }
                            else {
                              for (gestPtr =0; gestPtr<keyPoints.length;gestPtr++)
                              {

                                if (Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [0] - gest1 [ keyPointsGest1 [gestPtr] [0]+1] [0]) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [1] - gest1 [ keyPointsGest1 [gestPtr] [0]+1] [1]) < pointThreshold) {
                                  // Straight checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [0] to keyPointsGest1 [gest2Ptr] [1])
                                  // if the stroke matches, checked = 1;
                                  //resCnt = resCnt + compare();
                                  resCnt = compare (gest2 , gest1, keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1], keyPointsGest1 [gestPtr] [0]+1, keyPointsGest1 [gest2Ptr] [1]+1);
                                  checked = 1;
                                }
                                else  if (Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [0] - gest1 [ keyPointsGest1 [gestPtr] [1]+1] [0]) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]] [1] - gest1 [ keyPointsGest1 [gestPtr] [1]+1] [1]) < pointThreshold) {
                                  // Reverse checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [1] to keyPointsGest1 [gest2Ptr] [0])
                                  // if the stroke matches, checked = 1;
                                  //resCnt = resCnt + compare();
                                  resCnt = compare (gest2 , gest1, keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1], keyPointsGest1 [gestPtr] [1]+1, keyPointsGest1 [gest2Ptr] [0]+1);
                                  checked = 1;

                                }
                              }
                            }

*/
////////////////////////

                            if (checked != 1 ) {
                              didNotMatch =1;
                              break;
                            }

gest2Ptr++;
                          }




                        if (checked === 1) {
if (maxMatched <resCnt) {
 maxMatchedIndex = window.Sandman[Sandman.set][setIter];
                          maxMatched = resCnt;
}

                        }

                      }


                      /*
                        for (i = 0; i < (Sandman.samplePoints-1) / 4; i++) {
                        if (Math.abs((gest1[i+1][0]) - (gest2[i][0])) <= pointThreshold && Math.abs((gest1[i+1][1]) - (gest2[i][1])) <= pointThreshold) {
                        resCnt++;
                        //////////console.log ("gest1: "+ gest1 [i]+ "gest2: "+gest2 [i]);
                        }

                        if (resCnt>=fourierThreshold/4) {break;              }

                        }
                        //                                            ////////console.log(gest1[0] + "partition1:" + resCnt);
                        if (resCnt >= fourierThreshold / 4) {

                        for (i = (Sandman.samplePoints) / 4; i < (Sandman.samplePoints) / 2; i++) {
                        if (Math.abs((gest1[i+1][0]) - (gest2[i][0])) <= pointThreshold && Math.abs((gest1[i+1][1]) - (gest2[i][1])) <= pointThreshold) {
                        resCnt++;
                        //////////console.log ("gest1: "+ gest1 [i]+ "gest2: "+gest2 [i]);
                        }

                        if (resCnt>=fourierThreshold/2) {break;              }
                        }
                        //                                                ////////console.log(gest1[0] + "partition2:" + resCnt);
                        if (resCnt >= fourierThreshold / 2) {
                        for (i = (Sandman.samplePoints) / 2; i < (3 * (Sandman.samplePoints)) / 4; i++) {
                        if ((Math.abs(gest1[i+1][0]) - (gest2[i][0])) <= pointThreshold && Math.abs((gest1[i+1][1]) - (gest2[i][1])) <= pointThreshold) {
                        resCnt++;
                        //////////console.log ("gest1: "+ gest1 [i]+ "gest2: "+gest2 [i]);
                        }

                        if (resCnt>=(3*fourierThreshold)/4) {break;            }
                        }
                        //                                                    ////////console.log(gest1[0] + "partition3:" + resCnt);
                        if (resCnt >= (3 * fourierThreshold) / 4) {
                        for (i = (3 * (Sandman.samplePoints)) / 4; i < (Sandman.samplePoints - 1); i++) {
                        if (Math.abs((gest1[i+1][0]) - (gest2[i][0])) <= pointThreshold && Math.abs((gest1[i+1][1]) - (gest2[i][1])) < pointThreshold) {
                        resCnt++;
                        //////////console.log ("gest1: "+ gest1 [i]+ "gest2: "+gest2 [i]);
                        }

                        if (resCnt>=fourierThreshold) {break;              }
                        }
                        //                                                        ////////console.log(gest1[0] + "partition4:" + resCnt);
                        }
                        }
                        }
                        if (resCnt > maxMatched) {
                        maxMatchedIndex = window.Sandman[Sandman.set][setIter];
                        maxMatched = resCnt;
                        }
                      */



                    }

                    if (maxMatched >= fourierThreshold) {
                      alert("You have drawn: " + Sandman.gestureArray[maxMatchedIndex][0] + ", " + maxMatched + " points matched");
                      return;
                    }

                    //

                    if (resCnt < fourierThreshold) {
                      //                                            ////////console.log("Sandman.Gestures do not match. No. of descriptors matched:" + resCnt);
                    } else {
                      //////////console.log ("BrokeOUt");
                      //   break;
                    }
                    //////////console.log ("loop end "+i);
                  }
                  //////////console.log ("came here");

                  /*
                  //Searching within a particular set
                  */


                }

              }

            }


          }
        }







  },


  sample: function (ptr, array, minMax, keyPoints) {

    ////////console.log ("before");

    //INTERPOLATING
   array = Sandman.gestureReverser (keyPoints,array,keyPoints.length);
    ////////console.log ("after");
    /*     if (breakPoint === (ptr - 1)) {
           breakPoint = -1;
           }*/

keyPoints = Sandman.keyPoints;


    if (ptr <= 0) {
      return;
    }
    ////////console.log ("keypts:"+ keyPoints + "   leng: "+keyPoints.length + "arrayLeng:"+array.length);

    var averager = 5; // number of points to average
    var pointer =0;

    var looper = 5;
    while (pointer < Sandman.keyPoints.length) {
      for (looper = 5; looper < ( Sandman.keyPoints [0] [1])-5; looper++) {

        array[looper][0] = Math.floor((array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0] + array[looper][0] + array[looper + 1][0] + array[looper + 2][0] + array[looper + 3][0] + array[looper + 4][0] + array[looper + 5][0]) / 11);

        array[looper][1] = Math.floor((array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1] + array[looper][1] + array[looper + 1][1] + array[looper + 2][1] + array[looper + 3][1] + array[looper + 4][1] + array[looper + 5][1]) / 11);

      }
      //  ////////console.log ("ptr  "+ptr + "array[ptr][0]&1: "+array [ptr-1] [0]+" " +array [ptr-1] [1]);
      //      ////////console.log(array[ptr-1][1]);

      array[ptr - 5][0] = Math.floor((array[ptr - 10][0] + array[ptr - 9][0] + array[ptr - 8][0] + array[ptr - 7][0] + array[ptr - 6][0] + array[ptr - 5][0] + array[ptr - 4][0] + array[ptr - 3][0] + array[ptr - 2][0] + array[ptr - 1][0]) / 10);
      array[ptr - 5][1] = Math.floor((array[ptr - 10][1] + array[ptr - 9][1] + array[ptr - 8][1] + array[ptr - 7][1] + array[ptr - 6][1] + array[ptr - 5][1] + array[ptr - 4][1] + array[ptr - 3][1] + array[ptr - 2][1] + array[ptr - 1][1]) / 10);
      array[ptr - 4][0] = Math.floor((array[ptr - 9][0] + array[ptr - 8][0] + array[ptr - 7][0] + array[ptr - 6][0] + array[ptr - 5][0] + array[ptr - 4][0] + array[ptr - 3][0] + array[ptr - 2][0] + array[ptr - 1][0]) / 9);
      array[ptr - 4][1] = Math.floor((array[ptr - 9][1] + array[ptr - 8][1] + array[ptr - 7][1] + array[ptr - 6][1] + array[ptr - 5][1] + array[ptr - 4][1] + array[ptr - 3][1] + array[ptr - 2][1] + array[ptr - 1][1]) / 9);

      array[ptr - 3][0] = Math.floor((array[ptr - 8][0] + array[ptr - 7][0] + array[ptr - 6][0] + array[ptr - 5][0] + array[ptr - 4][0] + array[ptr - 3][0] + array[ptr - 2][0] + array[ptr - 1][0]) / 8);
      array[ptr - 3][1] = Math.floor((array[ptr - 8][1] + array[ptr - 7][1] + array[ptr - 6][1] + array[ptr - 5][1] + array[ptr - 4][1] + array[ptr - 3][1] + array[ptr - 2][1] + array[ptr - 1][1]) / 8);

      array[ptr - 2][0] = Math.floor((array[ptr - 7][0] + array[ptr - 6][0] + array[ptr - 5][0] + array[ptr - 4][0] + array[ptr - 3][0] + array[ptr - 2][0] + array[ptr - 1][0]) / 7);
      array[ptr - 2][1] = Math.floor((array[ptr - 7][1] + array[ptr - 6][1] + array[ptr - 5][1] + array[ptr - 4][1] + array[ptr - 3][1] + array[ptr - 2][1] + array[ptr - 1][1]) / 7);

      array[ptr - 1][0] = Math.floor((array[ptr - 6][0] + array[ptr - 5][0] + array[ptr - 4][0] + array[ptr - 3][0] + array[ptr - 2][0] + array[ptr - 1][0]) / 6);
      array[ptr - 1][1] = Math.floor((array[ptr - 6][1] + array[ptr - 5][1] + array[ptr - 4][1] + array[ptr - 3][1] + array[ptr - 2][1] + array[ptr - 1][1]) / 6);
      pointer++;

    }


    /**/


    var i = 1;




i=1;
    var leng = Sandman.path_length(ptr, array, keyPoints);
    var sampledX = [];
    var sampledY = []; //[ maxX, maxY, minX, minY ]
    var samplePt = 0;
    var interval = (leng / (Sandman.samplePoints - 1));
    var tempDist = 0;
    var add = 0;
    var interPixelDist = 0;


    // Canculating scalefactor by dividing the diagonal of the box containing the gesture by 100
    /*
      for (looper = 0; looper < ptr; looper++) {
      Sandman.context.beginPath();
      Sandman.context.arc(array[looper][0], array[looper][1], 1, 0, Math.PI, true);
      Sandman.context.strokeStyle = 'green';
      Sandman.context.stroke();
      }
      /**/

minMax = [-9999,-9999,9999,9999];
for (i=0;i<ptr;i++) {
if (array [i] [0] < minMax [2]) minMax [2] = array [i] [0];
  if (array [i] [0] > minMax [0]) minMax [0] = array [i] [0];
if (array [i] [1] < minMax [3]) minMax [3] = array [i] [1];
if (array [i] [1] > minMax [1]) minMax [1] = array [i] [1];
}



    var scaleFactor = Math.sqrt((minMax[0] - minMax[2]) * (minMax[0] - minMax[2]) + (minMax[1] - minMax[3]) * (minMax[1] - minMax[3])) / 100;
    sampledX[0] = array[0][0];
    sampledY[0] = array[0][1];
    samplePt = 1;

    // Interpolating
    var keyPtr =0;
    ////////console.log ("--------------------------------------");
    ////////console.log ("array:"+array);
    var newKeyPoints = [];
    var newKeyPtr=0;
    newKeyPoints = [[0,-99]];


var keypointx=0;
var keypointy =0;
i=1;
    while (i < ptr) {


      // Calculating inter pixel distance by the distance formula
      add = (array[i][0] - array[i - 1][0]) * (array[i][0] - array[i - 1][0]) + (array[i][1] - array[i - 1][1]) * (array[i][1] - array[i - 1][1]);
      interPixelDist = Math.sqrt(add);

      //
      if (i === Sandman.keyPoints [keyPtr] [1]) {
        i++;
        if (keyPtr < Sandman.keyPoints.length-1 ) {
          keyPtr++;
        }
        newKeyPoints [newKeyPoints.length - 1] [1] = samplePt-1;
        if (i >= ptr-1) {
          break;
        }
        newKeyPoints [newKeyPoints.length]  = [ samplePt,0];
      }
      /**/

      if ((tempDist + interPixelDist) >= interval) {

        // Interpolation formula. Finding the pixel between two given pixels.

        sampledX[samplePt] = array[i - 1][0] + ((interval - tempDist) / interPixelDist) * (array[i][0] - array[i - 1][0]);
        sampledY[samplePt] = array[i - 1][1] + ((interval - tempDist) / interPixelDist) * (array[i][1] - array[i - 1][1]);

        array[i - 1][0] = sampledX[samplePt];
        array[i - 1][1] = sampledY[samplePt];
        tempDist = 0;
        samplePt = samplePt + 1;
        i = i - 1;
      } else {
        tempDist = tempDist + interPixelDist;
      }
      i = i + 1;
    }


if (samplePt <= 31) {
  sampledX[samplePt] = array[ptr - 1][0];
    sampledY[samplePt] = array[ptr - 1][1];
    samplePt++;
}

    newKeyPoints [newKeyPoints.length - 1] [1] = samplePt-1;
console.log ("newKeypt: "+newKeyPoints);
////console.log ("ol: "+keyPoints);
    keyPoints = [];

    keyPoints = newKeyPoints;
    document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML + "<br /><br />New KEYPOINTS:<br />";
    for (j = 0; j < (newKeyPoints.length); j++) {
      document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML + "[" + newKeyPoints[j][0] + "," + newKeyPoints [j][1] + "],";
    }


    var sampled2d = [];

    for (i = 0; i < samplePt; i++) {
      sampled2d[i] = [];
      sampled2d[i][0] = Math.round(sampledX[i]);
      sampled2d[i][1] = Math.round(sampledY[i]);
    }
    for (i = 0; i < samplePt; i++) {

      Sandman.context.beginPath();
      Sandman.context.arc(sampled2d[i][0], sampled2d[i][1], 1, 0, Math.PI, true);
      Sandman.context.strokeStyle = 'white';
      Sandman.context.stroke();
    }

    var parameterArray = Sandman.findParameters(sampled2d, Sandman.samplePoints, (minMax[0] + minMax[2]) / 2, (minMax[1] + minMax[3]) / 2, interval, newKeyPoints);

    Sandman.createChainCode(sampled2d);

// Taking fourier transform
    var output = Sandman.
      fft(sampled2d, Sandman.samplePoints, 1);
    var rounded = output;


//Scaling down to fixed size
    var templ = output;
    for (i = 1; i < Sandman.samplePoints; i++) {
      templ[i][0] = templ[i][0] / scaleFactor;
      templ[i][1] = templ[i][1] / scaleFactor;
    }
    templ[0][0] = 500;
    templ[0][1] = 500;

//Taking inverse fourier transform
    var templ = Sandman.fft(templ, Sandman.samplePoints, -1);

    for (i = 1; i < Sandman.samplePoints; i++) {
      templ[i][0] = Math.round(templ[i][0] / Sandman.samplePoints);
      templ[i][1] = Math.round(templ[i][1] / Sandman.samplePoints);
    }


    var temp = 0;
    var k = 0;

    rounded = templ;


    var see = 0;
    for (see = 0; see < Sandman.samplePoints - 1; see++) {
      Sandman.context.beginPath();
      Sandman.context.arc(templ[see][0] + 200, templ[see][1] + 200, 1, 0, Math.PI, true);
      Sandman.context.strokeStyle = 'red';
      Sandman.context.stroke();
    }


    //ROUNDING VALUES | SETTING THRESHOLD

    /*
      for(i=0;i<Sandman.samplePoints;i++) {
      temp=Math.round(templ [i] [1]/Sandman.samplePoints);
      if(temp<-10)
      temp=temp-5;
      else
      temp=temp+5;
      k=Math.round(temp/10);
      rounded[i][1]=k*10;

      temp=Math.round(templ [i] [0]/Sandman.samplePoints);
      if(temp<-10)
      temp=temp-5;
      else
      temp=temp+5;
      k=Math.round(temp/10);
      rounded[i][0]=k*10;


      }


      /**/
    /*
      for(i=0;i<Sandman.samplePoints;i++) {
      temp=Math.round(templ [i] [0]/Sandman.samplePoints);
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

      temp=Math.round(templ [i] [1]/Sandman.samplePoints);
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
      /**/

    document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML + "<br /><br />";
    for (j = 0; j < (Sandman.samplePoints); j++) {
      document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML + "[" + rounded[j][0] + "," + rounded[j][1] + "],";
    }

    Sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4];
    Sandman.gesture[Sandman.gestPtr] = rounded;
    Sandman.gestPtr++;


    //////////console.log ("set  "+Sandman.set);


    /*
      strokes 0-2
      cross   0-3
      horiz   0-1
      vert    0-1
      partition 0-3

      priority[0] = partition
      priority[1] = crossover
      priority[2] = vertical
      priority[3] = horizontal
      priority[4] = strokes (0 or 1)
    */

    Sandman.gestureCompare(templ, parameterArray, newKeyPoints);


    document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML + "<br /><br />";
    chainInputPtr = 0;
    samplePt = 0;
    ptr = 0;
    minMax = [-9999, -9999, 9999, 9999]; //[ maxX, maxY, minX, minY ]
minMax [0] = -9999;
minMax [1] = -9999;
minMax [2] = 9999;
minMax [3] = 9999;
    Sandman.keyPoints.length = 0;
  }

  ,

  doFirst: function (domElement) {

    var eventCalled = 0;
    var input2d = [];
    var inputPtr = 0;
    var mouseFlag = 0;
    var okToSample = 1;
    var intervalSet = 0;
    var strokeInterval = null;
    var minMax = [];
    minMax = [-9999, -9999, 9999, 9999]; //[ maxX, maxY, minX, minY ]

    document.getElementById(domElement).addEventListener("touchstart", function (e) {
      e.preventDefault();
      okToSample = 0;
      minMax = [-9999, -9999, 9999, 9999];
      Sandman.touchStart(e);
    }, false);

    document.getElementById(domElement).addEventListener("touchmove", function (e) {

      if (eventCalled === 0) {

        eventCalled = 1;
        event = document.getElementById(domElement).addEventListener("touchend", function (e) {
          mouseFlag = 0;

          okToSample = 1;

          if (Sandman.keyPoints.length === 0) {
            Sandman.keyPoints [0] = [0,inputPtr-1];
          } else {
            Sandman.keyPoints [Sandman.keyPoints.length] = [( Sandman.keyPoints [Sandman.keyPoints.length-1] [1])+1 , inputPtr-1];
          }
          if (intervalSet === 0) {
            intervalSet = 1;
            strokeInterval = setInterval(function () {

              if (okToSample === 1) {

                clearInterval(strokeInterval);

                Sandman.sample(inputPtr, input2d, minMax, Sandman.keyPoints);
                intervalSet = 0;
                inputPtr = 0;
              }

            }, 2000);
          }
        }, false);
      }
      input2d = Sandman.touchMoving(e, inputPtr, input2d, minMax);

      inputPtr++;

    }, false);

    document.getElementById(domElement).addEventListener("mousedown", function (e) {

      okToSample = 0;
      minMax = [-9999, -9999, 9999, 9999];

      mouseFlag = 1;
      Sandman.touchStart(e);
    }, false);

    var event = null;
    document.getElementById(domElement).addEventListener("mousemove", function (e) {

      if (eventCalled === 0) {

        eventCalled = 1;

        event = document.getElementById(domElement).addEventListener("mouseup", function (e) {
          mouseFlag = 0;

          okToSample = 1;

          //  var breakPoint = inputPtr - 1;


          if (Sandman.keyPoints.length === 0) {
            Sandman.keyPoints [0] = [0,inputPtr-1];
          } else {
            Sandman.keyPoints [Sandman.keyPoints.length] = [( Sandman.keyPoints [Sandman.keyPoints.length-1] [1])+1 , inputPtr-1];
          }

          if (intervalSet === 0) {
            intervalSet = 1;
            strokeInterval = setInterval(function () {

              if (okToSample === 1) {

                clearInterval(strokeInterval);

                Sandman.sample(inputPtr, input2d, minMax, Sandman.keyPoints);
                intervalSet = 0;
                inputPtr = 0;
              }

            }, 2000);
          }
        }, false);
      }
      if (mouseFlag === 1) {

        input2d = Sandman.mouseMove(e, inputPtr, input2d, minMax);
        inputPtr++;
      }
    }, false);

    Sandman.gesture = [];
    Sandman.gestPtr = 0;
    x = document.getElementById(domElement);
    Sandman.context = x.getContext('2d');

    Sandman.context.beginPath();
    Sandman.context.arc(200, 200, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle = 'black';
    Sandman.context.stroke();
  }



};
