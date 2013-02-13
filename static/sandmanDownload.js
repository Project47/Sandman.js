
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

    var index = []
,partitionEntered = [-99, 0, 0, 0, 0]
,xanchorPoint = 0
, yanchorPoint = 0
, iterator = 0
, horizontalThreshold = 10
, verticalThreshold = 10
, verticalLine = 0
, horizontalLine = 0
, xpointCounter = 0
, ypointCounter = 0
, crossoverIterator = 1
, crossoverThreshold = interval * 3 / 4
, crossoverCount = 0
, crossoverStart = 0
, parameters = []
, portion = [0, 0, 0, 0, 0, 0]
, dist = 0
, xDeviation =0
, yDeviation = 0
, xtempDev = -1
, ytempDev = -1
,strokes = 0;

    while (iterator < pointCount - 1) {




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

        var X11 = points[iterator][0]
, Y11 = points[iterator][1]
, X12 = points[iterator + 1][0]
, Y12 = points[iterator + 1][1]

, X21 = points[crossoverIterator][0]
, Y21 = points[crossoverIterator][1]
, X22 = points[crossoverIterator + 1][0]
, Y22 = points[crossoverIterator + 1][1]

, A1 = points[iterator][1] - points[iterator + 1][1]
, B1 = points[iterator + 1][0] - points[iterator][0]
, C1 = (-1) * B1 * points[iterator][1] + (-1) * A1 * points[iterator][0]

, A2 = points[crossoverIterator][1] - points[crossoverIterator + 1][1]
, B2 = points[crossoverIterator + 1][0] - points[crossoverIterator][0]
, C2 = (-1) * B2 * points[crossoverIterator][1] + (-1) * A2 * points[crossoverIterator][0]
, del = A1 * B2 - A2 * B1;
        if (del !== 0) {
          var x = (-1) * (B2 * C1 - B1 * C2) / del, y = (-1) * (A1 * C2 - A2 * C1) / del;
        }

        var dist11 = Math.sqrt((points[iterator][0] - x) * (points[iterator][0] - x) + (points[iterator][1] - y) * (points[iterator][1] - y)), dist12 = Math.sqrt((points[iterator + 1][0] - x) * (points[iterator + 1][0] - x) + (points[iterator + 1][1] - y) * (points[iterator + 1][1] - y)), dist21 = Math.sqrt((points[crossoverIterator][0] - x) * (points[crossoverIterator][0] - x) + (points[crossoverIterator][1] - y) * (points[crossoverIterator][1] - y)), dist22 = Math.sqrt((points[crossoverIterator + 1][0] - x) * (points[crossoverIterator + 1][0] - x) + (points[crossoverIterator + 1][1] - y) * (points[crossoverIterator + 1][1] - y));

        if (((dist11 + dist12) < interval + 2) && ((dist11 + dist12) > interval - 2)) {
          if (((dist21 + dist22) < interval + 2) && ((dist21 + dist22) > interval - 2)) {
            crossoverCount++;
          }
        }

        crossoverIterator++;
      }
      iterator++;
    }

    portion[0] = partitionEntered[1] + partitionEntered[2];
    portion[1] = partitionEntered[3] + partitionEntered[4];
    portion[2] = partitionEntered[1] + partitionEntered[3];
    portion[3] = partitionEntered[4] + partitionEntered[2];

  strokes =0;
    if (keyPoints.length > 1) {
      strokes = 1;
    }

    /*


    */

    parameters[0] = portion.indexOf(Math.max(portion[0], portion[1], portion[2], portion[3]));
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
Sandman.currentParameters = "s" + parameters [0]+ parameters [1]+ parameters [2]+ parameters [3]+ parameters [4]+ parameters [5]+ parameters [6];
    return parameters;
  },


  mouseMove: function (e, ptr, array, minMax) {


     array[ptr] = [e.clientX, e.clientY];


    return array;
  },

  touchMoving: function (e, ptr, array, minMax) {


    array[ptr] = [e.touches[0].pageX, e.touches[0].pageY];


    return array;
  },

  path_length: function (ptr, array, keyPoints) {

/*
This function find the total length of
the gesture
*/

    var y = 1, len = 0, temp = 0,  i=0;

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

    var Aeven = [], Aodd = [], Veven = [], Vodd = [], V = [];
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
    var iter1=0
, iter2=0
, iter3=0
, pointThreshold =15
, tempPtr=0
, matched=0
, tempArr=[]
, len = points.length
, newKeyPoints = [];

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


          var revPtr =0, swapVar =0;
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


          for(iter3=keypoints[iter2][1];iter3>=keypoints[iter2][0];iter3--) {
            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;

        }
        else if(((Math.abs(tempArr[newKeyPoints[iter1][1]][0]-points[keypoints[iter2][0]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][1]][1]-points[keypoints[iter2][0]][1])<pointThreshold)) ) {


          for(iter3=keypoints[iter2][0];iter3<=keypoints[iter2][1];iter3++) {

            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;
        }

        else if (((Math.abs(tempArr[newKeyPoints[iter1][0]][0]-points[keypoints[iter2][1]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][0]][1]-points[keypoints[iter2][1]][1])<pointThreshold))) {


          var revPtr =0, swapVar =0;
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

    var comp1=1,comp2=1,iter1=0,iter2=0
    ,pointThreshold=15
, score=0
, low1 = 0
, strokeLen = Math.abs ( start1-end1);
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

    var strokeIter = 0
,crossIter = 0
, horizIter = 0
, vertIter = 0
, xIter = 0
, yIter = 0
, gest2 = rounded
, iter = 0
, cnt = 0
, resCnt = 0
, pointThreshold = 15
, fourierThreshold = 16
, j=0,keyPoints = newKeyPoints;




Sandman.keyPoints = newKeyPoints;
Sandman.currentGesture = gest2;



      for (xIter = 0; xIter < 7; xIter++) {

        parameterArray[5] = (parameterArray[5] + 1) % 7;

        for (yIter = 0; yIter < 7; yIter++) {

          parameterArray[6] = (parameterArray[6] + 1) % 7;

          for (crossIter = 0; crossIter < 5; crossIter++) {

            parameterArray[1] = (parameterArray[1] + 1) % 5;

            for (horizIter = 0; horizIter < 2; horizIter++) {

              parameterArray[3] = (parameterArray[3] + 1) % 2;

              for (vertIter = 0; vertIter < 2; vertIter++) {

                parameterArray[2] = (parameterArray[2] + 1) % 2;

                for (iter = 0; iter < 4; iter++) {
                  resCnt = 0;
                  cnt++;
                  parameterArray[0] = (parameterArray[0] + 1) % 4;
                  Sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4] + parameterArray[5] + parameterArray[6];

                  if (typeof (window.Sandman[Sandman.set]) != "undefined") {

                    var setLength = (window.Sandman[Sandman.set]).length,setIter = 0
var axMatchedIndex = 0
, maxMatched = -1;

                    for (setIter = 0; setIter < setLength; setIter++) {

                      resCnt = 0;
var gestPtr =0
, checked = 0
, gest2Ptr =0
, didNotMatch=-1
, gest1 = Sandman.gestureArray[window.Sandman[Sandman.set][setIter]];

                      if (( gest1 [33]).length != keyPoints.length) {

                        continue;
                      }
                      var noOfStrokes = gest1 [33].length, keyPointsGest1 = gest1 [33];


                        while (gest2Ptr<keyPoints.length)
                        {

                          if ( Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [0] - gest2 [ keyPoints [gest2Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [1] - gest2 [ keyPoints [gest2Ptr] [1]] [1])<pointThreshold ) {



                                var gest2Lowest =keyPoints [gest2Ptr] [0]+1,  iter=0;
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

                                  break;
                                }

                                if (( gest1 [gest1Lowest] [1] > gest1 [gest1Lowest+2] [1]) && (gest2 [gest2Lowest] [1] > gest2 [gest2Lowest+2] [1]) ||( gest1 [gest1Lowest] [1] < gest1 [gest1Lowest+2] [1]) && (gest2 [gest2Lowest] [1] < gest2 [gest2Lowest+2] [1]) ) {



                                  var iter1=0,iter2=0
, score=0
, start2 = keyPoints [gest2Ptr] [0]
, end2 =  keyPoints [gest2Ptr] [1]
, start1 = keyPointsGest1 [gest1Ptr] [0]
, end1 = keyPointsGest1 [gest1Ptr] [1]
, strokeLen = Math.abs ( start1-end1)
, count=0;

                                  for(iter1=gest1Lowest-start1,iter2 = gest2Lowest - start2;count<strokeLen;iter1++,iter2++) {

                                    if (Math.abs (gest1 [start1 + iter1%strokeLen] [0] - gest2 [start2 +iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [start1+iter1%strokeLen] [1] - gest2 [start2 +iter2%strokeLen] [1])< pointThreshold) {
                                      resCnt++;
                                    }
                                    count++;
                                  }


                                  checked = 1;
                                }
                                else {


                                  var comp1=1,comp2=1,iter1=0,iter2=0
, count =0
, score=0
 , start2 = keyPoints [gest2Ptr] [0]
  , end2 =  keyPoints [gest2Ptr] [1]
   , start1 = keyPointsGest1 [gest1Ptr] [0]
    , end1 = keyPointsGest1 [gest1Ptr] [1]
,strokeLen = Math.abs ( start1-end1);

                                  if (start1 > end1) {

                                    for(iter1=end1 - gest1Lowest,iter2 = gest2Lowest - start2;count<strokeLen;iter1++,iter2++) {

                                      if (Math.abs (gest1 [end1 - iter1%strokeLen] [0] - gest2 [start2 +iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [end1 - iter1%strokeLen] [1] - gest2 [start2 +iter2%strokeLen] [1])< pointThreshold) {
                                        resCnt++;
                                      }
                                      count++;
                                    }
                                  }
                                  else {

                                    for(iter1=gest1Lowest-start1,iter2 = end2 - gest2Lowest;count<strokeLen;iter1++,iter2++) {

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


checked=1;
for (gest1Ptr =0 ; gest1Ptr<keyPointsGest1.length;gest1Ptr++) {

  if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [0]+ 1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5))) {


                          resCnt = resCnt + Sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [0], keyPointsGest1 [gest1Ptr] [1], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);
                        }
  else if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [0]+1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5))) {


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

                      if (typeof ( window [Sandman.gestureArray[maxMatchedIndex][0]])!='undefined') {

window [Sandman.gestureArray[maxMatchedIndex][0]] ();

return;
}
else {
window ['defaultFunc'] ();
}
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
    var averager = 5
, pointer =0
, looper = 5;



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


    var i = 1
, leng = Sandman.path_length(ptr, array, keyPoints)
 , sampledX = []
 , sampledY = []
  , samplePt = 0
   , interval = (leng / (Sandman.samplePoints - 1))
    , tempDist = 0
, add = 0
 , interPixelDist = 0;



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

    var keyPtr =0
, newKeyPoints = []
, newKeyPtr=0

, keypointx=0
, keypointy =0;


   newKeyPoints = [[0,-99]];
i=1;


    while (i < ptr) {


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
      var sampled2d = [];
    for (i = 0; i < samplePt; i++) {
      sampled2d[i] = [];
      sampled2d[i][0] = Math.round(sampledX[i]);
      sampled2d[i][1] = Math.round(sampledY[i]);
    }

    var parameterArray = Sandman.findParameters(sampled2d, Sandman.samplePoints, (minMax[0] + minMax[2]) / 2, (minMax[1] + minMax[3]) / 2, interval, newKeyPoints);


    var output = Sandman.
      fft(sampled2d, Sandman.samplePoints, 1);
    var rounded = output;


    var templ = output;
    for (i = 1; i < Sandman.samplePoints; i++) {
      templ[i][0] = templ[i][0] / scaleFactor;
      templ[i][1] = templ[i][1] / scaleFactor;
    }
    templ[0][0] = 500;
    templ[0][1] = 500;


    var templ = Sandman.fft(templ, Sandman.samplePoints, -1);

    for (i = 1; i < Sandman.samplePoints; i++) {
      templ[i][0] = Math.round(templ[i][0] / Sandman.samplePoints);
      templ[i][1] = Math.round(templ[i][1] / Sandman.samplePoints);
    }

    var temp = 0;
    var k = 0;
    rounded = templ;
    var see = 0;

    Sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4];
    Sandman.gesture[Sandman.gestPtr] = rounded;
    Sandman.gestPtr++;

    Sandman.gestureCompare(templ, parameterArray, newKeyPoints);


    chainInputPtr = 0;
    samplePt = 0;
    ptr = 0;
    minMax = [-9999, -9999, 9999, 9999];
minMax [0] = -9999;
minMax [1] = -9999;
minMax [2] = 9999;
minMax [3] = 9999;

  }
  ,

  doFirst: function (domElement) {

    var eventCalled = 0
, input2d = []
, inputPtr = 0
, mouseFlag = 0
, okToSample = 1
, intervalSet = 0
, strokeInterval = null
, minMax = [];
    minMax = [-9999, -9999, 9999, 9999];

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

  }
};
