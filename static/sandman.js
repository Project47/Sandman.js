var Sandman = {

  context: null,
  gesture: null,
  gestPtr: null,
  keyPoints: [],
  gestureArray: [

    /*

      Structure of gestureArray:
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


// Sets containing the indexes of the corresponding gestures
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

//No. of points to represent each  gesture
  samplePoints: 32,

  touchStart: function (e) {
    e.preventDefault();
  },

  findParameters: function (points, pointCount, avgX, avgY, interval, keyPoints) {

/*
This function finds the parameters of the gesture
and returns them as an array

Structure of parameters array:

      parameters[0] = partition
      parameters[1] = crossover
      parameters[2] = vertical
      parameters[3] = horizontal
      parameters[4] = strokes
      = 0 if strkes = 1
      = 1 if strokes = 2
*/

    var index = [];
    var partitionEntered = [-99, 0, 0, 0, 0]; //Partiotion of the block entered
    var xanchorPoint = 0; //Anchored x coordinate value
    var yanchorPoint = 0; //Anchored x coordinate value
    var iterator = 0; //Iterator for the main while loop
    var horizontalThreshold = 10; //Threshold
    var verticalThreshold = 10; //Threshold
    var verticalLine = 0;
    var horizontalLine = 0;
    var xpointCounter = 0;
    var ypointCounter = 0;
    var crossoverIterator = 1;
    var crossoverThreshold = interval * 3 / 4;
    var crossoverCount = 0;
    var crossoverStart = 0;
    var parameters = [];
    var portion = [0, 0, 0, 0, 0, 0];
    var dist = 0;
    var xDeviation = 0;
    var yDeviation = 0;
    var xtempDev = -1;
    var ytempDev = -1;

    while (iterator < pointCount - 1) {
      //Find vertical line

   //Finding nomber of deviations

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

      if (Math.abs(points[xanchorPoint][0] - points[iterator + 1][0]) < verticalThreshold) {
        xpointCounter = xpointCounter + 1;

      } else if (verticalLine < xpointCounter) {

        verticalLine = xpointCounter;
        xpointCounter = 0;
        xanchorPoint = iterator;
        parameters[0] = verticalLine + 0.5;
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
        parameters[1] = horizontalLine + 0.6;
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


      //Find crossover
      crossoverIterator = iterator + 2;

      while (crossoverIterator <= pointCount - 2) {
        /*

Mathematically finding the intersection point of two segments
to determine if they cross each other

Simplified version of the following code:
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

    /*


    */

    parameters[0] = portion.indexOf(Math.max(portion[0], portion[1], portion[2], portion[3])); //partition
    if (crossoverCount > 3) {
      parameters[1] = 4;
    } else {
      parameters[1] = crossoverCount;
    }
    if (verticalLine > 10) parameters[2] = 1;
    else parameters[2] = 0;
    if (horizontalLine > 10) parameters[3] = 1;
    else parameters[3] = 0;
    parameters[4] = strokes;
    if (xDeviation > 5) {
      parameters[5] = 6;
    } else {
      parameters[5] = xDeviation;
    }
    if (yDeviation > 5) {
      parameters[6] = 6;
    } else {
      parameters[6] = yDeviation;
    }
    return parameters;
  },


  mouseMove: function (e, ptr, array, minMax) {

//Storing the input points in array
     array[ptr] = [e.clientX, e.clientY];

//Plotting the stored point
    Sandman.context.beginPath();
    Sandman.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle = 'green';
    Sandman.context.stroke();

    return array;
  },

  touchMoving: function (e, ptr, array, minMax) {

    // Taking the input points
    array[ptr] = [e.touches[0].pageX, e.touches[0].pageY];

//Plotting the point
    Sandman.context.beginPath();
    Sandman.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle = 'blue';
    Sandman.context.stroke();

    return array;
  },

  path_length: function (ptr, array, keyPoints) {

/*
This function find the total length of
the gesture
*/

    var y = 1;
    var len = 0;
    var temp = 0;
    var i=0;

    while (y < ptr) {

      if (( y -1) === keyPoints [i] [1]) {
        y++;
        if (i<keyPoints.length-1) i++;
      }
      temp = (array[y][0] - array[y - 1][0]) * (array[y][0] - array[y - 1][0]) + (array[y][1] - array[y - 1][1]) * (array[y][1] - array[y - 1][1]);
      len = len + Math.sqrt(temp);
      y = y + 1;
    }
    return len;
  },


  fft: function (sampled2d, n, inv) {

  /*
    This  function calculates the Fast Fourier Transform
    of the given points
    if inv = 1, returns fft
    if inv = -1, return idft
  */

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

  gestureReverser: function(keypoints,points,keyPtr) {

/*
This function merges two strokes in a gestures
whose end points are close to each other

*/
    var iter1=0;
    var iter2=0;
    var iter3=0;
    var pointThreshold =15;
    var tempPtr=0;
    var matched=0;
    var tempArr=[];
    var len = points.length;

    var newKeyPoints = [];

    for (iter3=0; iter3<keypoints.length;iter3++) {
      keypoints [iter3].push (0);
    }

    for (iter3=keypoints [0] [0]; iter3<=keypoints [0] [1];iter3++) {
      tempArr [tempPtr] = points [iter3];
      tempPtr++;

    }
    newKeyPoints [0] = [0,tempPtr-1];
    keypoints [0] [2] = 1;
    iter1 = 0;
    while (1) {
      if (tempPtr >= len) {
        break;
      }

      for(iter2=0;iter2<keypoints.length;iter2++) {

        if ( keypoints [iter2] [2] === 1) {
          continue;
        }

        if(((Math.abs(tempArr[newKeyPoints[iter1][0]][0]-points[keypoints[iter2][0]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][0]][1]-points[keypoints[iter2][0]][1])<pointThreshold))) {

          // Both's Start points  match
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
        }

        else if (((Math.abs(tempArr[newKeyPoints[iter1][1]][0]-points[keypoints[iter2][1]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][1]][1]-points[keypoints[iter2][1]][1])<pointThreshold))) {

          // Both's End points match
          for(iter3=keypoints[iter2][1];iter3>=keypoints[iter2][0];iter3--) {
            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;

        }
        else if(((Math.abs(tempArr[newKeyPoints[iter1][1]][0]-points[keypoints[iter2][0]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][1]][1]-points[keypoints[iter2][0]][1])<pointThreshold)) ) {

          //  tempEnd - arrayStart match
          for(iter3=keypoints[iter2][0];iter3<=keypoints[iter2][1];iter3++) {

            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
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
      }

      if (matched === 0) {
        iter1++;
        newKeyPoints [newKeyPoints.length] = [newKeyPoints [newKeyPoints.length-1] [1]+1,0];
        iter3=0;
        while (1) {
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

    Sandman.keyPoints = newKeyPoints;
    return tempArr;
  } ,

  compare: function(arr1,arr2,start1,end1,start2,end2) {

/*
This function compares arr1 from start1 to end1 with
arr2 from start2 to end2 and returns the number of points
matched

*/

    var comp1=1,comp2=1,iter1=0,iter2=0;
    var pointThreshold=15;
    var score=0;
    var low1 = 0;
    var strokeLen = Math.abs ( start1-end1);
    if(start1>end1) {
      comp1=-1;
    }
    if(start2>end2){
      comp2=-1;
    }
    iter2=start2;
    for(iter1=0;( iter1<Math.abs(end1-start1)) && (iter2<Math.abs(end2-start2));iter1=iter1+comp1){

      if((Math.abs(arr1[iter1+start1][0]-arr2[iter2][0])<pointThreshold)&&(Math.abs(arr1[iter1+start1][1]-arr2[iter2][1])<pointThreshold)){
        score++;
      }
iter2=iter2+comp2;
    }
    return score;
  },

gestureCompare: function (rounded, parameterArray,newKeyPoints) {

/*
Contains the main algorith of gestures comparison.
This function compares the drawn gesture with the stored gestures

*/

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
    var fourierThreshold = 16; // MUST BE A MULTIPLE OF 4
    var j=0;

    var keyPoints = newKeyPoints;

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

                  if (typeof (window.Sandman[Sandman.set]) != "undefined") {

                    var setLength = (window.Sandman[Sandman.set]).length;

                    var setIter = 0;
                    var maxMatchedIndex = 0;
                    var maxMatched = -1;

                    for (setIter = 0; setIter < setLength; setIter++) {

                      resCnt = 0;
                      var gestPtr =0;
                      var checked = 0;
                      var gest2Ptr =0;
                      var didNotMatch=-1;
                      var gest1 = Sandman.gestureArray[window.Sandman[Sandman.set][setIter]];

                      if (( gest1 [33]).length != keyPoints.length) {
                        // different number of strokes in gesture
                        continue;
                      }
                      var noOfStrokes = gest1 [33].length;
                      var keyPointsGest1 = gest1 [33];

                        // multiple strokes
                        while (gest2Ptr<keyPoints.length)
                        {

                          if ( Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [0] - gest2 [ keyPoints [gest2Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [1] - gest2 [ keyPoints [gest2Ptr] [1]] [1])<pointThreshold ) {
                            // Circular sub-gesture

  //Finding lowest point in gest2
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

                              if ( Math.abs ( gest1 [ keyPointsGest1 [gest1Ptr] [0]+2] [0] - gest1 [ keyPointsGest1 [gest1Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest1 [ keyPointsGest1 [gest1Ptr] [0]+2] [1] - gest1 [ keyPointsGest1 [gest1Ptr] [1]] [1])<pointThreshold ) {
                                //searching for circular sub-gesture ^

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

                                if (Math.abs ( gest1 [gest1Lowest] [0] - gest2 [gest2Lowest] [0])>pointThreshold || Math.abs(gest1 [gest1Lowest] [1] - gest2 [gest2Lowest] [1] >pointThreshold)) {
                                  //does not match
                                  break;
                                }

                                if (( gest1 [gest1Lowest] [1] > gest1 [gest1Lowest+2] [1]) && (gest2 [gest2Lowest] [1] > gest2 [gest2Lowest+2] [1]) ||( gest1 [gest1Lowest] [1] < gest1 [gest1Lowest+2] [1]) && (gest2 [gest2Lowest] [1] < gest2 [gest2Lowest+2] [1]) ) {

                                  // Straight checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [0] to keyPointsGest1 [gest2Ptr] [1])

                                  var iter1=0,iter2=0;
                                  var score=0;
 var start2 = keyPoints [gest2Ptr] [0];
                                  var end2 =  keyPoints [gest2Ptr] [1];
                                  var start1 = keyPointsGest1 [gest1Ptr] [0];
                                  var end1 = keyPointsGest1 [gest1Ptr] [1];
                                  var strokeLen = Math.abs ( start1-end1);
                                  var count=0;

                                  for(iter1=gest1Lowest-start1,iter2 = gest2Lowest - start2;count<strokeLen;iter1++,iter2++) {

                                    if (Math.abs (gest1 [start1 + iter1%strokeLen] [0] - gest2 [start2 +iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [start1+iter1%strokeLen] [1] - gest2 [start2 +iter2%strokeLen] [1])< pointThreshold) {
                                      resCnt++;
                                    }
                                    count++;
                                  }

                                  // if the stroke matches, checked = 1;
                                  checked = 1;
                                }
                                else {
                                  // Reverse checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [1] to keyPointsGest1 [gest2Ptr] [0])

                                  var comp1=1,comp2=1,iter1=0,iter2=0;
                                  var count =0 ;
                                  var score=0;
 var start2 = keyPoints [gest2Ptr] [0];
                                  var end2 =  keyPoints [gest2Ptr] [1];
                                  var start1 = keyPointsGest1 [gest1Ptr] [0];
                                  var end1 = keyPointsGest1 [gest1Ptr] [1];
                                  var strokeLen = Math.abs ( start1-end1);

                                  if (start1 > end1) {

                                    for(iter1=end1 - gest1Lowest,iter2 = gest2Lowest - start2;count<strokeLen;iter1++,iter2++) {
                                    console.log ("i1:  "+( start1 + iter1%strokeLen)+"  i2: "+(start2 +iter2%strokeLen));
                                      if (Math.abs (gest1 [end1 - iter1%strokeLen] [0] - gest2 [start2 +iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [end1 - iter1%strokeLen] [1] - gest2 [start2 +iter2%strokeLen] [1])< pointThreshold) {
                                        resCnt++;
                                      }
                                      count++;
                                    }
                                  }
                                  else {

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
                                }
                              }
                            }
                          }
else {
// non circular Sub-gesture

checked=1;
for (gest1Ptr =0 ; gest1Ptr<keyPointsGest1.length;gest1Ptr++) {

  if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [0]+ 1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5))) {

                          // Straight checking of entire array.
                          resCnt = resCnt + Sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [0], keyPointsGest1 [gest1Ptr] [1], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);
                        }
  else if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [0]+1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5))) {

                          // comparing gest1 with reverse of gest2.
                          resCnt = resCnt + Sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [1], keyPointsGest1 [gest1Ptr] [0], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);
                        }
}
}
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
                    }

                    if (maxMatched >= fourierThreshold) {
                      alert("You have drawn: " + Sandman.gestureArray[maxMatchedIndex][0] + ", " + maxMatched + " points matched");
                      return;
                    }
                  }
                }
              }
            }
          }
        }
  },


  sample: function (ptr, array, minMax, keyPoints) {

/*
This function performs smoothening of the gestures and interpolation

*/


   array = Sandman.gestureReverser (keyPoints,array,keyPoints.length);

keyPoints = Sandman.keyPoints;

    if (ptr <= 0) {
      return;
    }
    var averager = 5; // number of points to average
    var pointer =0;
    var looper = 5;


//Smoothening of gesture
    while (pointer < Sandman.keyPoints.length) {
      for (looper = 5; looper < ( Sandman.keyPoints [0] [1])-5; looper++) {

        array[looper][0] = Math.floor((array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0] + array[looper][0] + array[looper + 1][0] + array[looper + 2][0] + array[looper + 3][0] + array[looper + 4][0] + array[looper + 5][0]) / 11);

        array[looper][1] = Math.floor((array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1] + array[looper][1] + array[looper + 1][1] + array[looper + 2][1] + array[looper + 3][1] + array[looper + 4][1] + array[looper + 5][1]) / 11);
      }

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


    var i = 1;
    var leng = Sandman.path_length(ptr, array, keyPoints);
    var sampledX = [];
    var sampledY = []; //[ maxX, maxY, minX, minY ]
    var samplePt = 0;
    var interval = (leng / (Sandman.samplePoints - 1));
    var tempDist = 0;
    var add = 0;
    var interPixelDist = 0;


//Finding the diagonal of the box containing the  gestures
minMax = [-9999,-9999,9999,9999];
for (i=0;i<ptr;i++) {
if (array [i] [0] < minMax [2]) minMax [2] = array [i] [0];
  if (array [i] [0] > minMax [0]) minMax [0] = array [i] [0];
if (array [i] [1] < minMax [3]) minMax [3] = array [i] [1];
if (array [i] [1] > minMax [1]) minMax [1] = array [i] [1];
}
    // Canculating scalefactor by dividing the diagonal of the box containing the gesture by 100
    var scaleFactor = Math.sqrt((minMax[0] - minMax[2]) * (minMax[0] - minMax[2]) + (minMax[1] - minMax[3]) * (minMax[1] - minMax[3])) / 100;
    sampledX[0] = array[0][0];
    sampledY[0] = array[0][1];
    samplePt = 1;

    var keyPtr =0;
    var newKeyPoints = [];
    var newKeyPtr=0;
    newKeyPoints = [[0,-99]];
var keypointx=0;
var keypointy =0;
i=1;


    // Interpolating
    while (i < ptr) {

      // Calculating inter pixel distance by the distance formula
      add = (array[i][0] - array[i - 1][0]) * (array[i][0] - array[i - 1][0]) + (array[i][1] - array[i - 1][1]) * (array[i][1] - array[i - 1][1]);
      interPixelDist = Math.sqrt(add);

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

    document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML + "<br /><br />";
    for (j = 0; j < (Sandman.samplePoints); j++) {
      document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML + "[" + rounded[j][0] + "," + rounded[j][1] + "],";
    }

    Sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4];
    Sandman.gesture[Sandman.gestPtr] = rounded;
    Sandman.gestPtr++;

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

            }, 500);
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
