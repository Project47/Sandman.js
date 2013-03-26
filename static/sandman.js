var sandman = {
  context: null,
  gesture: null,
  gestPtr: null,
  keyPoints: [],
  drawDiv: null,
  currentGesture: [],
  currentParameters: [],
  gestures: [],
  gestureArray: [
    /*
      Structure of gestureArray:
      0: name of gesture
      1-32: actual poiints
      33: keypoints' array
    */
   [["P"], [6.445534945673558, 2266.522994832454], [0, 64], [0, 56], [0, 50], [0, 43], [0, 35], [0, 28], [0, 22], [0, 14], [0, 7], [0, 0], [0, -6], [0, -14], [5, -16], [11, -16], [19, -16], [26, -16], [33, -16], [39, -14], [43, -8], [45, -4], [45, 4], [45, 11], [44, 16], [39, 19], [33, 22], [27, 23], [20, 26], [16, 28], [9, 30], [2, 30], [-3, 30], [ [0, 31]]],
    //   ALL OF THE  FOURIERS HAVE BEEN REPLACED WITH IDFTed POINTS
   [["S"], [1312.4138526119202, -574.5682574638769], [39, -23], [33, -25], [27, -26], [20, -27], [13, -27], [7, -26], [2, -22], [-3, -18], [-6, -13], [-8, -7], [-8, 0], [-3, 5], [1, 10], [7, 13], [12, 14], [19, 16], [25, 19], [30, 21], [34, 25], [36, 31], [37, 38], [37, 44], [34, 49], [30, 53], [25, 55], [18, 56], [12, 58], [6, 58], [-1, 58], [-7, 56], [-10, 53], [[0, 31]]],
   [["O"], [592.3683460288678, -776.4150816864162], [11, -23], [5, -20], [-1, -15], [-7, -12], [-12, -5], [-14, 2], [-14, 10], [-14, 18], [-14, 27], [-14, 35], [-12, 41], [-7, 46], [-4, 51], [2, 54], [10, 55], [18, 55], [26, 54], [33, 52], [38, 47], [43, 40], [46, 35], [47, 27], [47, 18], [44, 12], [43, 4], [42, -3], [38, -8], [34, -12], [28, -16], [24, -20], [20, -24],  [[0, 31]]],
   [["Z"], [-679.0614804532645, -523.7845876957829], [-14, -16], [-6, -16], [2, -16], [10, -16], [18, -16], [25, -16], [33, -15], [41, -15], [48, -15], [43, -10], [37, -5], [33, 2], [27, 6], [20, 11], [16, 17], [10, 21], [4, 25], [-2, 30], [-7, 35], [-13, 39], [-18, 42], [-13, 44], [-6, 44], [3, 44], [10, 44], [18, 44], [26, 44], [33, 44], [41, 45], [48, 46], [55, 47], [[0, 31]]],
   [["M"], [-1042.1326291094003, 1055.0477361580527], [-31, 29], [-28, 24], [-25, 20], [-21, 17], [-18, 13], [-15, 9], [-12, 5], [-10, 1], [-6, 2], [-3, 7], [0, 11], [3, 15], [6, 19], [10, 23], [13, 26], [17, 23], [21, 20], [26, 16], [29, 13], [32, 9], [34, 5], [36, 2], [41, 4], [45, 7], [47, 10], [50, 14], [53, 17], [56, 21], [59, 25], [60, 29], [62, 31], [[0, 31]]],
   [["L"], [121.68302674672213, -1300.758767528995], [4, -36], [4, -32], [4, -27], [4, -23], [4, -18], [4, -14], [4, -10], [4, -5], [3, -1], [3, 4], [3, 8], [3, 13], [3, 17], [3, 21], [3, 25], [3, 30], [3, 34], [3, 39], [7, 40], [11, 40], [16, 40], [20, 40], [25, 40], [29, 40], [34, 40], [38, 40], [42, 40], [47, 40], [51, 40], [56, 40], [60, 40], [[0, 31]]],
   [["V"], [-862.8967502425527, -239.52370056116536], [-26, -4], [-23, -2], [-19, 1], [-17, 3], [-14, 7], [-12, 11], [-10, 15], [-6, 18], [-3, 22], [0, 25], [3, 29], [6, 32], [10, 36], [12, 38], [15, 42], [17, 41], [20, 37], [24, 35], [27, 31], [29, 27], [31, 23], [34, 19], [37, 16], [40, 13], [43, 9], [44, 5], [47, 1], [49, -2], [52, -5], [56, -7], [58, -8], [[0, 31]]],
   [["A"], [-705.1214812687492, 1382.6311713368075], [-19, 39], [-14, 35], [-12, 29], [-9, 24], [-5, 19], [-1, 14], [1, 8], [4, 3], [7, -2], [11, -8], [14, -12], [17, -17], [19, -15], [21, -9], [23, -3], [26, 3], [29, 7], [32, 12], [34, 18], [37, 25], [39, 31], [41, 37], [44, 43], [47, 47], [-2, 16], [5, 17], [12, 18], [19, 19], [27, 19], [34, 19], [40, 19], [[0, 24], [25, 31]]],
   [["Q"], [191.5484930520742, -699.2287236320598], [0, -19], [-4, -14], [-9, -8], [-12, -2], [-13, 6], [-14, 13], [-12, 20], [-8, 26], [-4, 32], [2, 37], [9, 40], [16, 40], [23, 37], [29, 32], [32, 26], [34, 19], [35, 12], [35, 4], [32, -3], [28, -9], [24, -15], [19, -19], [11, -21], [7, -21], [23, 26], [26, 33], [29, 40], [32, 46], [37, 51], [41, 55], [46, 58] , [[0, 24], [25, 31]]],
   [["1"], [576.588159991559, 2369.165093848049], [18, 70], [18, 66], [18, 62], [18, 57], [18, 53], [18, 49], [18, 45], [18, 41], [18, 37], [18, 33], [19, 29], [19, 25], [19, 21], [19, 17], [19, 13], [19, 9], [19, 5], [19, 1], [19, -3], [19, -7], [18, -11], [18, -15], [17, -18], [17, -22], [15, -24], [12, -22], [9, -20], [6, -19], [4, -16], [1, -15], [-1, -14], [[0, 31]]],
   [["rightarrow"], [-1175.1281318250308, 445.8033497387426], [-30, 14], [-24, 14], [-18, 14], [-11, 14], [-5, 14], [1, 14], [8, 15], [14, 15], [20, 15], [27, 15], [33, 15], [6, -8], [13, -6], [18, -3], [22, 1], [28, 3], [34, 5], [38, 9], [43, 12], [48, 13], [52, 17], [46, 19], [40, 21], [35, 23], [29, 25], [25, 28], [20, 30], [14, 32], [9, 33], [4, 36], [-1, 38], [[0, 11], [12, 31]]]
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
  s2010012: [9], //1
  s0001121: [10], //rigtharrow
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
      parameters[5] = xDeviation
      parameters[6] = yDeviation

    */

    var  partitionEntered = [-99, 0, 0, 0, 0], xanchorPoint = 0, yanchorPoint = 0, iterator = 0, horizontalThreshold = 10, verticalThreshold = 10, verticalLine = 0, horizontalLine = 0, xpointCounter = 0, ypointCounter = 0, crossoverIterator = 1, crossoverCount = 0, parameters = [], portion = [0, 0, 0, 0, 0, 0], xDeviation = 0, yDeviation = 0, xtempDev = -1, ytempDev = -1, strokes, x, y, dist11, dist12, dist21, dist22, X11, X12, X21, X22, Y11, Y12, Y21, Y22, A1, B1, C1, A2, B2, C2, del;
    while (iterator < pointCount - 1) {
      //Find vertical line
      //Finding nomber of deviations
      if (iterator < pointCount - 4) {
        if ((points[iterator][0] - points[iterator + 1][0]) < 0 && (points[iterator + 1][0] - points[iterator + 2][0]) < 0 && (points[iterator + 2][0] - points[iterator + 3][0]) < 0 && (points[iterator + 3][0] - points[iterator + 4][0]) < 0) {
          if (xtempDev !== 0) {
            xDeviation++;
          }
          xtempDev = 0;
        } else if ((points[iterator][0] - points[iterator + 1][0]) > 0 && (points[iterator + 1][0] - points[iterator + 2][0]) > 0 && (points[iterator + 2][0] - points[iterator + 3][0]) > 0 && (points[iterator + 3][0] - points[iterator + 4][0]) > 0) {
          if (xtempDev !== 1) {
            xDeviation++;
          }
          xtempDev = 1;
        }
        if ((points[iterator][1] - points[iterator + 1][1]) < 0 && (points[iterator + 1][1] - points[iterator + 2][1]) < 0 && (points[iterator + 2][1] - points[iterator + 3][1]) < 0 && (points[iterator + 3][1] - points[iterator + 4][1]) < 0) {
          if (ytempDev !== 0) {
            yDeviation++;
          }
          ytempDev = 0;
        } else if ((points[iterator][1] - points[iterator + 1][1]) > 0 && (points[iterator + 1][1] - points[iterator + 2][1]) > 0 && (points[iterator + 2][1] - points[iterator + 3][1]) > 0 && (points[iterator + 3][1] - points[iterator + 4][1]) > 0) {
          if (ytempDev !== 1) {
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
          if (del!===0) {
          var x=(-1)*(B2*C1 - B1*C2)/del;
          var y=(-1)*(A1*C2 - A2*C1)/del;
          }
        */
        X11 = points[iterator][0];
        Y11 = points[iterator][1];
        X12 = points[iterator + 1][0];
        Y12 = points[iterator + 1][1];
        X21 = points[crossoverIterator][0];
        Y21 = points[crossoverIterator][1];
        X22 = points[crossoverIterator + 1][0];
        Y22 = points[crossoverIterator + 1][1];
        A1 = points[iterator][1] - points[iterator + 1][1];
        B1 = points[iterator + 1][0] - points[iterator][0];
        C1 = (-1) * B1 * points[iterator][1] + (-1) * A1 * points[iterator][0];
        A2 = points[crossoverIterator][1] - points[crossoverIterator + 1][1];
        B2 = points[crossoverIterator + 1][0] - points[crossoverIterator][0];
        C2 = (-1) * B2 * points[crossoverIterator][1] + (-1) * A2 * points[crossoverIterator][0];
        del = A1 * B2 - A2 * B1 ;
        if (del !== 0) {
          x = (-1) * (B2 * C1 - B1 * C2) / del;
          y = (-1) * (A1 * C2 - A2 * C1) / del;
        }
        dist11 = Math.sqrt((points[iterator][0] - x) * (points[iterator][0] - x) + (points[iterator][1] - y) * (points[iterator][1] - y));
        dist12 = Math.sqrt((points[iterator + 1][0] - x) * (points[iterator + 1][0] - x) + (points[iterator + 1][1] - y) * (points[iterator + 1][1] - y));
        dist21 = Math.sqrt((points[crossoverIterator][0] - x) * (points[crossoverIterator][0] - x) + (points[crossoverIterator][1] - y) * (points[crossoverIterator][1] - y));
        dist22 = Math.sqrt((points[crossoverIterator + 1][0] - x) * (points[crossoverIterator + 1][0] - x) + (points[crossoverIterator + 1][1] - y) * (points[crossoverIterator + 1][1] - y));
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
    strokes = 0;
    if (keyPoints.length > 1) {
      strokes = 1;
    }
    parameters[0] = portion.indexOf(Math.max(portion[0], portion[1], portion[2], portion[3])); //partition
    if (crossoverCount > 3) {
      parameters[1] = 4;
    } else {
      parameters[1] = crossoverCount;
    }
    if (verticalLine > 10) {
      parameters[2] = 1;
    }
    else {
      parameters[2] = 0;
    }
    if (horizontalLine > 10) {
      parameters[3] = 1;
    }
    else {
      parameters[3] = 0;
    }
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
        sandman.currentParameters = "s" + parameters [0]+ parameters [1]+ parameters [2]+ parameters [3]+ parameters [4]+ parameters [5]+ parameters [6];
        return parameters;
  },
  mouseMove: function (e, ptr, array) {
    //Storing the input points in array
    array[ptr] = [e.hasOwnProperty('offsetX') ? e.offsetX : e.layerX, e.hasOwnProperty('offsetX') ? e.offsetY : e.layerY];
    //Plotting the stored

    sandman.context.beginPath();
    sandman.context.arc(e.hasOwnProperty('offsetX') ? e.offsetX/2 : e.layerX/2, e.hasOwnProperty('offsetX') ? e.offsetY/2 : e.layerY/2, 1, 0, Math.PI, true);
    sandman.context.strokeStyle = 'red';
    sandman.context.stroke();
    return array;
  },
  touchMoving: function (e, ptr, array) {
    // Taking the input points
    array[ptr] = [e.touches[0].pageX, e.touches[0].pageY];
    //Plotting the point
    sandman.context.beginPath();
    sandman.context.arc(e.clientX, e.clientY, 1, 0, Math.PI, true);
    sandman.context.strokeStyle = 'blue';
    sandman.context.stroke();
    return array;
  },
  path_length: function (ptr, array, keyPoints) {
    /*
      This function find the total length of
      the gesture
    */
    var y = 1, len = 0, temp = 0, i=0;
    while (y < ptr) {
      if (( y -1) === keyPoints [i] [1]) {
        y++;
        if (i<keyPoints.length-1) {
          i++;
        }
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
    var Aeven = [], Aodd = [], Veven = [], Vodd = [], V = [], i;
    if (n === 1) {
      return sampled2d;
    }
    for (i = 0; i <= n - 2; i = i + 2) {
      Aeven[i / 2] = [sampled2d[i][0], sampled2d[i][1]];
      Aodd[i / 2] = [sampled2d[i + 1][0], sampled2d[i + 1][1]];
    }
    Veven = sandman.fft(Aeven, n / 2, inv);
    Vodd = sandman.fft(Aodd, n / 2, inv);
    for (i = 0; i < n / 2; i++) {
      //Calculating the real and imaginary parts of the transform
      V[i] = [(Veven[i][0] + Math.cos((2 * Math.PI * (i * sandman.samplePoints / n)) / sandman.samplePoints) * Vodd[i][0] - inv * Math.sin((2 * Math.PI * (i * sandman.samplePoints / n)) / sandman.samplePoints) * Vodd[i][1]), (Veven[i][1] + Math.cos((2 * Math.PI * (i * sandman.samplePoints / n)) / sandman.samplePoints) * Vodd[i][1] + inv * Math.sin((2 * Math.PI * (i * sandman.samplePoints / n)) / sandman.samplePoints) * Vodd[i][0])];
      V[n / 2 + i] = [(Veven[i][0] - Math.cos((2 * Math.PI * (i * sandman.samplePoints / n)) / sandman.samplePoints) * Vodd[i][0] + inv * Math.sin((2 * Math.PI * (i * sandman.samplePoints / n)) / sandman.samplePoints) * Vodd[i][1]), (Veven[i][1] - Math.cos((2 * Math.PI * (i * sandman.samplePoints / n)) / sandman.samplePoints) * Vodd[i][1] - inv * Math.sin((2 * Math.PI * (i * sandman.samplePoints / n)) / sandman.samplePoints) * Vodd[i][0])];
    }
    return V;
  },
  gestureReverser: function(keypoints,points) {
    /*
      This function merges two strokes in a gestures
      whose end points are close to each other
    */
    var iter1=0, iter2=0, iter3=0, iter4=0, pointThreshold =15, tempPtr=0, matched=0, tempArr=[], len = points.length, newKeyPoints = [], revPtr=0, swapVar=0;
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
          revPtr =0;
          swapVar =0;
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
          revPtr =0 ;
          swapVar =0;
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
          iter4 =0;
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
    sandman.keyPoints = newKeyPoints;
    return tempArr;
  } ,
  compare: function(arr1,arr2,start1,end1,start2,end2) {

      /*
      This function compares arr1 from start1 to end1 with
      arr2 from start2 to end2 and returns the number of points
      matched
    */
  var comp1=1,comp2=1,iter1=0,iter2=0, pointThreshold=15, score=0;
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

  addNewGesture: function () {


    if (document.getElementById ('gestureName').value === "") {
alert ("Please enter a name");
      return;
    }
    if (sandman.currentGesture.length<sandman.samplePoints) {
alert ("Please draw a gesture and name it");
      return;
    }
/*

0-9 : 48-57
A-Z : 65-90
a-z : 97-122
$ : 36
_ : 95

*/
    var gestureStructure =[], keyPointsArray = "", customGesture, ajaxRequest, jsonObject, i, gestureString, gestObj, newDiv, divCanvas, iter,nam;
nam= document.getElementById ('gestureName').value;
    if (nam.charCodeAt (0)>=48 && nam.charCodeAt (0)<=57) {
alert ("You have entered an invalid name. Name should be just like a javascript function name. Cannot start with a number");
return;
}
    for (i=0;i<nam.length;i++) {
if ((nam.charCodeAt (i)>47 && nam.charCodeAt (i)<58) || (nam.charCodeAt (i)>64 && nam.charCodeAt (i)<91) || (nam.charCodeAt (i)>96 && nam.charCodeAt (i)<123) || (nam.charCodeAt (i)===36) || (nam.charCodeAt (i)===95)) {
} else {
alert ("You have entered an invalid name. Name should be just like a javascript function name.");
return;
}
}
    for (iter1=0;iter<sandman.gestures.length;iter+=1) {
      if (sandman.gestures [iter].name === document.getElementById ('gestureName').value) {
        alert ("A gesture with same name already exists");
        return;
      }
    }
    for (i=0;i<sandman.samplePoints;i++) {
      gestureStructure = gestureStructure + "["+sandman.currentGesture [i] [0]+","+sandman.currentGesture [i] [1]+"],";
    }
    keyPointsArray = "";
    keyPointsArray = keyPointsArray +"[["+sandman.keyPoints [0] [0]+","+sandman.keyPoints [0] [1]+"]";
    for (i=1;i<sandman.keyPoints.length;i++) {
      keyPointsArray = keyPointsArray + ",["+sandman.keyPoints [i] [0]+","+sandman.keyPoints [i] [1]+"]";
    }
    keyPointsArray = keyPointsArray +"]";
    customGesture = {
      name: document.getElementById ('gestureName').value,
      points: gestureStructure,
      keyPoints:keyPointsArray
    };
    try{
      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
    } catch (e){
      // Internet Explorer Browsers
      try{
        ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try{
          ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e){
          // Something went wrong
          console.log("Your browser broke!");
          return false;
        }
      }
    }
    ajaxRequest.open("POST", "/");
    ajaxRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        gestureString = "[[\""+document.getElementById ('gestureName').value+ "\"],"+gestureStructure+""+keyPointsArray+"]";

    jsonObject = {
      name: document.getElementById ('gestureName').value,
      structure: sandman.currentGesture,
      keyPoints: sandman.keyPoints,
      parameters:sandman.currentParameters
    };

        ajaxRequest.send (JSON.stringify (jsonObject));
    ajaxRequest.onreadystatechange = function () {
      if(ajaxRequest.readyState === 4) {
        gestObj = JSON.parse (ajaxRequest.responseText);
        newDiv = document.createElement ('div');
        newDiv.setAttribute ('class','predefined');
        newDiv.setAttribute ('id','div'+document.getElementById ('gestureName').value);
        document.getElementById ('gesturesList').appendChild (newDiv);
        divCanvas = document.createElement ('canvas');
        divCanvas.setAttribute ('id',document.getElementById ('gestureName').value);
        divCanvas.setAttribute ('class','smallCanv');
        document.getElementById ('div'+document.getElementById ('gestureName').value).innerHTML = document.getElementById ('gestureName').value+"<br />";
        document.getElementById ('div'+document.getElementById ('gestureName').value).appendChild (divCanvas);
        sandman.drawGesture (gestObj.name,gestObj.structure);
        sandman.gestures[sandman.gestures.length] = {name:document.getElementById ('gestureName').value, selected:0 };
        document.getElementById('div' + document.getElementById ('gestureName').value ).addEventListener("click", function(){var ptr = sandman.clicked(this.id);


                                                                                                                             if (sandman.gestures[ptr].selected===1) {
                                                                                                                               this.style.background="#404040";
                                                                                                                               sandman.gestures [ptr].selected=0;
                                                                                                                             } else if (sandman.gestures[ptr].selected===0) {
                                                                                                                               this.style.background="#FF0000";
                                                                                                                               sandman.gestures [ptr].selected=1;
                                                                                                                             }
                                                                                                                            }, false);
        sandman.currentGesture =[];
        sandman.keyPoints =[];
      }
    };
  },
  gestureCompare: function (rounded, parameterArray,newKeyPoints) {
    /*
      Contains the main algorith of gestures comparison.
      This function compares the drawn gesture with the stored gestures
    */
    var  crossIter = 0, horizIter = 0, vertIter = 0, xIter = 0, yIter = 0, gest2 = rounded, cnt = 0, resCnt = 0, pointThreshold = 15, fourierThreshold = 16, keyPoints = newKeyPoints, setLength, setIter = 0, maxMatchedIndex = 0, maxMatched = -1, gestPtr =0, checked = 0, gest2Ptr =0, didNotMatch=-1, gest1, noOfStrokes, keyPointsGest1, gest2Lowest, gest1Lowest, iter, count, score, start2, end2, start1, end1, strokeLen,comp1=1, comp2=1, iter1=0, iter2=0, gest1Ptr;


    sandman.keyPoints = newKeyPoints;
    sandman.currentGesture = gest2;


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
                sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4] + parameterArray[5] + parameterArray[6];
                if (typeof (window.sandman[sandman.set]) !== "undefined") {
                  setLength = (window.sandman[sandman.set]).length;
                  setIter = 0;
                  maxMatchedIndex = 0;
                  maxMatched = -1;
                  for (setIter = 0; setIter < setLength; setIter++) {
                    resCnt = 0;
                    gestPtr =0;
                    checked = 0;
                    gest2Ptr =0;
                    didNotMatch=-1;
                    gest1 = sandman.gestureArray[window.sandman[sandman.set][setIter]];
                    if (( gest1 [33]).length !== keyPoints.length) {
                      // different number of strokes in gesture
                      continue;
                    }
                    noOfStrokes = gest1 [33].length;
                    keyPointsGest1 = gest1 [33];
                    // multiple strokes
                    while (gest2Ptr<keyPoints.length)
                    {
                      if ( Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [0] - gest2 [ keyPoints [gest2Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [1] - gest2 [ keyPoints [gest2Ptr] [1]] [1])<pointThreshold ) {
                        // Circular sub-gesture
                        //Finding lowest point in gest2
                        gest2Lowest =keyPoints [gest2Ptr] [0]+1;
                        iter=0;
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
                            gest1Lowest =keyPointsGest1 [gest1Ptr] [0] +2;
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
                            if (( gest1 [gest1Lowest] [1] > gest1 [( gest1Lowest+2)%sandman.samplePoints] [1]) && (gest2 [gest2Lowest] [1] > gest2 [( gest2Lowest+2)%sandman.samplePoints] [1]) ||( gest1 [gest1Lowest] [1] < gest1 [( gest1Lowest+2)%sandman.samplePoints] [1]) && (gest2 [gest2Lowest] [1] < gest2 [( gest2Lowest+2)%sandman.samplePoints] [1]) ) {
                              // Straight checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [0] to keyPointsGest1 [gest2Ptr] [1])
                              iter1=0,iter2=0;
                              score=0;
                              start2 = keyPoints [gest2Ptr] [0];
                              end2 =  keyPoints [gest2Ptr] [1];
                              start1 = keyPointsGest1 [gest1Ptr] [0];
                              end1 = keyPointsGest1 [gest1Ptr] [1];
                              strokeLen = Math.abs ( start1-end1);
                              count=0;
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
                              comp1=1;
                              comp2=1;
                              iter1=0;
                              iter2=0;
                              count =0;
                              score=0;
                              start2 = keyPoints [gest2Ptr] [0];
                              end2 =  keyPoints [gest2Ptr] [1];
                              start1 = keyPointsGest1 [gest1Ptr] [0];
                              end1 = keyPointsGest1 [gest1Ptr] [1];
                              strokeLen = Math.abs ( start1-end1);
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
                              count=0;
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
                            resCnt = resCnt + sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [0], keyPointsGest1 [gest1Ptr] [1], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);
                          }
                          else if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [0]+1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5))) {
                            // comparing gest1 with reverse of gest2.
                            resCnt = resCnt + sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [1], keyPointsGest1 [gest1Ptr] [0], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);
                          }
                        }
                      }
                      if (checked !== 1 ) {
                        didNotMatch =1;
                        break;
                      }
                      gest2Ptr++;
                    }
                    if (checked === 1) {
                      if (maxMatched <resCnt) {
                        maxMatchedIndex = window.sandman[sandman.set][setIter];
                        maxMatched = resCnt;
                      }
                    }
                  }
                }
                if (maxMatched >= fourierThreshold) {
                  console.log("You have drawn: " + sandman.gestureArray[maxMatchedIndex][0] + ", " + maxMatched + " points matched");
                  if (typeof ( window [sandman.gestureArray[maxMatchedIndex][0]])==='function') {
                 alert (typeof ( window [sandman.gestureArray[maxMatchedIndex][0]]));
   window [sandman.gestureArray[maxMatchedIndex][0]] ();
                    return;
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


    sandman.keyPoints = keyPoints;
    if (ptr <= 0) {
      return;
    }
    var pointer =0, looper, i = 1, leng, sampledX = [], sampledY = [], samplePt = 0, interval, tempDist = 0, add = 0, interPixelDist = 0, scaleFactor, keyPtr =0, newKeyPoints = [], sampled2d = [], parameterArray, output, rounded, templ, see = 0;
    //Smoothening of gesture
    while (pointer < sandman.keyPoints.length) {
      if ((sandman.keyPoints [pointer] [1] - sandman.keyPoints [pointer] [0]) <= 15) {
        pointer++;
        continue;
      }

      for (looper = ( sandman.keyPoints [pointer] [0])+5; looper < ( sandman.keyPoints [pointer] [1])-6; looper++) {
                array[looper][0] = Math.floor((array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0] + array[looper][0] + array[looper + 1][0] + array[looper + 2][0] + array[looper + 3][0] + array[looper + 4][0] + array[looper + 5][0]) / 11);
        array[looper][1] = Math.floor((array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1] + array[looper][1] + array[looper + 1][1] + array[looper + 2][1] + array[looper + 3][1] + array[looper + 4][1] + array[looper + 5][1]) / 11);
      }

      array[looper - 5][0] = Math.floor((array[looper - 10][0] + array[looper - 9][0] + array[looper - 8][0] + array[looper - 7][0] + array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 10);
      array[looper - 5][1] = Math.floor((array[looper - 10][1] + array[looper - 9][1] + array[looper - 8][1] + array[looper - 7][1] + array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 10);
      array[looper - 4][0] = Math.floor((array[looper - 9][0] + array[looper - 8][0] + array[looper - 7][0] + array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 9);
      array[looper - 4][1] = Math.floor((array[looper - 9][1] + array[looper - 8][1] + array[looper - 7][1] + array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 9);
      array[looper - 3][0] = Math.floor((array[looper - 8][0] + array[looper - 7][0] + array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 8);
      array[looper - 3][1] = Math.floor((array[looper - 8][1] + array[looper - 7][1] + array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 8);
      array[looper - 2][0] = Math.floor((array[looper - 7][0] + array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 7);
      array[looper - 2][1] = Math.floor((array[looper - 7][1] + array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 7);
      array[looper - 1][0] = Math.floor((array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 6);
      array[looper - 1][1] = Math.floor((array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 6);
/*  */
      pointer++;
  }


    //Finding the diagonal of the box containing the  gestures

    array = sandman.gestureReverser (keyPoints,array);
    keyPoints = sandman.keyPoints;


    minMax = [-9999,-9999,9999,9999];
    for (i=0;i<ptr;i++) {
      //min X
      if (array [i] [0] < minMax [2]) {
        minMax [2] = array [i] [0];
      }
      //max X
      if (array [i] [0] > minMax [0]) {
        minMax [0] = array [i] [0];
      }
      //min Y
      if (array [i] [1] < minMax [3]) {
        minMax [3] = array [i] [1];
      }
      //max Y
      if (array [i] [1] > minMax [1]) {
        minMax [1] = array [i] [1];
      }
    }
    //if gesture is smaller than 10x10, return
    if (Math.abs ( minMax [0] - minMax [2])<10 && Math.abs (minMax [1] - minMax [3])<10) {
      return;
    }
    leng = sandman.path_length(ptr, array, keyPoints);
    interval = (leng / (sandman.samplePoints - 1));
    // Canculating scalefactor by dividing the diagonal of the box containing the gesture by 100
    scaleFactor = Math.sqrt((minMax[0] - minMax[2]) * (minMax[0] - minMax[2]) + (minMax[1] - minMax[3]) * (minMax[1] - minMax[3])) / 100;
    sampledX[0] = array[0][0];
    sampledY[0] = array[0][1];
    samplePt = 1;
    newKeyPoints = [[0,-99]];
    i=1;


    // Interpolating
    while (samplePt <= sandman.samplePoints) {
      // Calculating inter pixel distance by the distance formula
      add = (array[i][0] - array[i - 1][0]) * (array[i][0] - array[i - 1][0]) + (array[i][1] - array[i - 1][1]) * (array[i][1] - array[i - 1][1]);
      interPixelDist = Math.sqrt(add);
      if (i === sandman.keyPoints [keyPtr] [1]) {
        i++;
        if (keyPtr < sandman.keyPoints.length-1 ) {
          keyPtr++;
        }
        newKeyPoints [newKeyPoints.length - 1] [1] = samplePt-1;
        if (i > array.length-1) {

          break;
        }
        newKeyPoints [newKeyPoints.length]  = [samplePt,0];
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
    for (i = 0; i < samplePt; i++) {
      sampled2d[i] = [];
      sampled2d[i][0] = Math.round(sampledX[i]);
      sampled2d[i][1] = Math.round(sampledY[i]);
    }

    parameterArray = sandman.findParameters(sampled2d, sandman.samplePoints, (minMax[0] + minMax[2]) / 2, (minMax[1] + minMax[3]) / 2, interval, newKeyPoints);
    // Taking fourier transform
    output = sandman.
      fft(sampled2d, sandman.samplePoints, 1);
    rounded = output;
    //Scaling down to fixed size
    templ = output;
    for (i = 1; i < sandman.samplePoints; i++) {
      templ[i][0] = templ[i][0] / scaleFactor;
      templ[i][1] = templ[i][1] / scaleFactor;
    }
    templ[0][0] = 500;
    templ[0][1] = 500;
    //Taking inverse fourier transform
    templ = sandman.fft(templ, sandman.samplePoints, -1);
    for (i = 1; i < sandman.samplePoints; i++) {
      templ[i][0] = Math.round(templ[i][0] / sandman.samplePoints);
      templ[i][1] = Math.round(templ[i][1] / sandman.samplePoints);
    }
    rounded = templ;
    sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4];
    sandman.gesture[sandman.gestPtr] = rounded;
    sandman.gestPtr++;

    samplePt = 0;
    ptr = 0;
    minMax = [-9999, -9999, 9999, 9999]; //[ maxX, maxY, minX, minY ]
    minMax [0] = -9999;
    minMax [1] = -9999;
    minMax [2] = 9999;
    minMax [3] = 9999;
    sandman.keyPoints = newKeyPoints;
    sandman.currentGesture = templ;
  },

  doFirst: function (domElement) {

    var eventCalled = 0, input2d = [], inputPtr = 0, mouseFlag = 0, okToSample = -1, intervalSet = 0, strokeInterval = null, minMax = [], x;
    minMax = [-9999, -9999, 9999, 9999]; //[ maxX, maxY, minX, minY ]
    document.getElementById("createButton").addEventListener ("click",sandman.addNewGesture,false);
    document.getElementById ("home").addEventListener ("click",sandman.showHome, false);
    document.getElementById ("about").addEventListener ("click",sandman.showAbout, false);
    document.getElementById ("howItWorks").addEventListener ("click",sandman.showHelp, false);
    document.getElementById(domElement).addEventListener("touchstart", function (e) {
       if (okToSample === -1) {
        sandman.keyPoints = [];
               }
      e.preventDefault();
      okToSample = 0;
      minMax = [-9999, -9999, 9999, 9999];
      sandman.touchStart(e);
    }, false);
    document.getElementById(domElement).addEventListener("touchmove", function (e) {
      if (eventCalled === 0) {
        eventCalled = 1;
        event = document.getElementById(domElement).addEventListener("touchend", function () {
          mouseFlag = 0;
          okToSample = 1;
          if (sandman.keyPoints.length === 0) {
            sandman.keyPoints [0] = [0,inputPtr-1];
          } else {
            sandman.keyPoints [sandman.keyPoints.length] = [( sandman.keyPoints [sandman.keyPoints.length-1] [1])+1 , inputPtr-1];
          }
          if (intervalSet === 0) {
            intervalSet = 1;
            strokeInterval = setInterval(function () {
              if (okToSample === 1) {
                okToSample = 1;
                clearInterval(strokeInterval);
                try {
                sandman.sample(inputPtr, input2d, minMax, sandman.keyPoints);
                }
                  catch (e) {

                array=[];
                alert ("Touchooops!");
                }

                intervalSet = 0;
                inputPtr = 0;
              }
            }, 2000);
          }
        }, false);
      }
      input2d = sandman.touchMoving(e, inputPtr, input2d);
      inputPtr++;
    }, false);
    document.getElementById(domElement).addEventListener("mousedown", function (e) {

      if (okToSample === -1) {
        sandman.keyPoints = [];
sandman.context.clearRect (0,0,300,300);
      }
      okToSample = 0;
      minMax = [-9999, -9999, 9999, 9999];
      mouseFlag = 1;
      sandman.touchStart(e);
    }, false);
    var event = null;
    document.getElementById(domElement).addEventListener("mousemove", function (e) {
      if (eventCalled === 0) {
        eventCalled = 1;
        event = document.getElementById(domElement).addEventListener("mouseup", function () {
          mouseFlag = 0;
          okToSample = 1;
          if (sandman.keyPoints.length === 0) {
            sandman.keyPoints [0] = [0,inputPtr-1];
          } else {
            sandman.keyPoints [sandman.keyPoints.length] = [( sandman.keyPoints [sandman.keyPoints.length-1] [1])+1 , inputPtr-1];
          }
          if (intervalSet === 0) {
            intervalSet = 1;
            strokeInterval = setInterval(function () {
              if (okToSample === 1) {
                clearInterval(strokeInterval);

                sandman.sample(inputPtr, input2d, minMax, sandman.keyPoints);



                array=[];


                intervalSet = 0;
                inputPtr = 0;
                okToSample = -1;
              }
            }, 500);
          }
        }, false);
      }
      if (mouseFlag === 1) {
        input2d = sandman.mouseMove(e, inputPtr, input2d);
        inputPtr++;
      }
    }, false);
    sandman.gesture = [];
    sandman.gestPtr = 0;
    x = document.getElementById(domElement);
    sandman.context = x.getContext('2d');
  },
  drawGesture: function(canv, structure) {
    var canvContext = document.getElementById (canv).getContext ('2d'), see=0;

    canvContext.strokeStyle = 'black';
    canvContext.beginPath();
    canvContext.arc( 50,50, 1, 0, Math.PI, true);
    canvContext.stroke();
        for (see = 0; see <= sandman.samplePoints-1; see++) {

      canvContext.beginPath();
      canvContext.arc(structure [see] [0]+50,structure [see] [1]+50, 1, 0, Math.PI, true);
      canvContext.stroke();
    }
  },
  clicked: function (name) {
    var i=0;
    for (i=0;i<sandman.gestures.length;i++) {
      if (("div"+ sandman.gestures [i].name) === name)  {
        return i;
      }
    }
  },

  downloadLibrary: function () {
    var iter=0,namesList=[], jsonObj;
    for (iter=0;iter<sandman.gestures.length;iter++) {
      if (sandman.gestures [iter].selected === 1) {
        namesList [namesList.length] = sandman.gestures [iter].name;
      }
    }
    if (namesList.length === 0) {
      alert ("You have not selected a single gesture. Click on a gesture to select it");
      return;
    }
    jsonObj = {
      namesList:namesList
    };
    document.getElementById ("json").value=JSON.stringify(jsonObj);
  },

  showHelp: function () {
there = document.getElementById ("helpPage");
about = document.getElementById ("aboutPage");
    document.getElementById ("aboutPage").style.visibility="hidden";
there.style.top=document.getElementById ("menu").offsetTop + document.getElementById ("menu").offsetHeight+25+"px";
there.style.left=document.getElementById ("wrapper").offsetLeft+"px";
there.style.height="1500px";
there.style.visibility="visible";

document.getElementById ("home").style.background = "#404040";
document.getElementById ("howItWorks").style.background = "black";
document.getElementById ("about").style.background = "#404040";
document.getElementById ("wrapper").style.visibility="hidden";
},

showAbout: function () {
there = document.getElementById ("aboutPage");
help = document.getElementById ("helpPage");
    document.getElementById ("helpPage").style.visibility="hidden";
there.style.top=document.getElementById ("menu").offsetTop + document.getElementById ("menu").offsetHeight+25+"px";
there.style.left=document.getElementById ("wrapper").offsetLeft+"px";
there.style.height="1500px";
there.style.visibility="visible";
document.getElementById ("wrapper").style.visibility="hidden";

document.getElementById ("home").style.background = "#404040";
document.getElementById ("howItWorks").style.background = "#404040";
document.getElementById ("about").style.background = "black";
},

showHome: function () {
there = document.getElementById ("helpPage");
about = document.getElementById ("aboutPage");
there.style.visibility = "hidden";
about.style.visibility = "hidden";
document.getElementById ("wrapper").style.visibility="visible";
document.getElementById ("home").style.background = "black";
document.getElementById ("howItWorks").style.background = "#404040";
document.getElementById ("about").style.background = "#404040";

}

};
