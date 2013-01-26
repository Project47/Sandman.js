var Sandman = {

    context: null,
    gesture: null,
    gestPtr: null,
    gestureArray: [



    [["P"],[18,-20],[12,-19],[24,-19],[6,-18],[30,-17],[4,-14],[34,-13],[4,-8],[37,-8],[4,-2],[39,-2],[4,4],[39,4],[4,10],[40,10],[38,16],[4,17],[33,20],[4,23],[28,23],[23,26],[17,27],[4,28],[10,28],[4,29],[4,35],[5,41],[5,48],[5,53],[5,59],[5,66],[165.602355547494,2298.503651543523]],

    //   ALL OF THE  FOURIERS HAVE BEEN REPLACED WITH IDFTed POINTS

    [["S"],[1204.0851117289371,-671.3593502342032],[18,-25],[25,-25],[11,-24],[32,-24],[4,-23],[-1,-20],[-7,-16],[-12,-12],[-14,-5],[-12,1],[-7,6],[-2,10],[4,11],[11,12],[17,13],[23,15],[30,16],[36,18],[41,22],[45,28],[46,35],[44,41],[39,45],[34,50],[21,52],[28,52],[-12,53],[-6,54],[1,54],[8,54],[15,54]],

    [["O"],[685.1956948995432,-762.2872862997685],[23,-22],[14,-21],[8,-18],[26,-17],[1,-15],[31,-13],[-4,-10],[34,-8],[-10,-5],[38,-4],[-14,1],[44,1],[-17,7],[46,7],[46,14],[-18,15],[-18,22],[46,22],[-17,30],[46,30],[-13,36],[45,37],[-9,42],[42,43],[-4,46],[36,47],[2,51],[30,51],[8,52],[16,53],[23,53]],

    [["Z"],[-679.0614804532645,-523.7845876957829],[-14,-16],[-6,-16],[2,-16],[10,-16],[18,-16],[25,-16],[33,-15],[41,-15],[48,-15],[43,-10],[37,-5],[33,2],[27,6],[20,11],[16,17],[10,21],[4,25],[-2,30],[-7,35],[-13,39],[-18,42],[-13,44],[-6,44],[3,44],[10,44],[18,44],[26,44],[33,44],[41,45],[48,46],[55,47]],

    [["M"],[-6,-7],[38,-7],[-9,-4],[-1,-2],[35,-2],[41,-2],[-11,3],[30,3],[1,4],[43,4],[27,8],[-13,9],[4,10],[46,10],[24,13],[-16,15],[49,15],[6,16],[20,19],[-19,20],[9,21],[51,21],[16,24],[-22,26],[13,26],[52,27],[-24,32],[54,33],[-25,38],[57,38],[58,43],[-855.8753413705473,1412.87781291382]],

    [["L"],[121.68302674672213,-1300.758767528995],[4,-36],[4,-32],[4,-27],[4,-23],[4,-18],[4,-14],[4,-10],[4,-5],[3,-1],[3,4],[3,8],[3,13],[3,17],[3,21],[3,25],[3,30],[3,34],[3,39],[7,40],[11,40],[16,40],[20,40],[25,40],[29,40],[34,40],[38,40],[42,40],[47,40],[51,40],[56,40],[60,40]],

    [["V"],[-799.7441539968363,-292.217205745314],[59,-10],[57,-7],[-22,-6],[54,-4],[-19,-3],[50,-1],[-18,1],[47,2],[-15,5],[44,5],[-13,8],[41,8],[-10,12],[39,12],[-7,15],[36,15],[-5,19],[32,19],[29,22],[-2,23],[27,25],[0,26],[24,29],[3,30],[21,32],[5,33],[19,36],[8,37],[17,40],[10,41],[14,43]]

    ],
  s2110022: [0], //p

  s2001031: [3], //z
    s0000014: [4], //m
    s3000012: [6], //v
    s2011011: [5], //l

    s2000032: [2], //O
    s1000031: [1, 6], //s

    set: null,
    samplePoints: 32,

    createChainCode: function (inputArray) {
        //console.log ("inputarr"+inputArray [0][1]);
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
        //console.log ("chain"+ chain);
        //console.log ("reduced"+reducedChain);

        // Displaying the result

        //fft();
    },

    touchStart: function (e) {
        e.preventDefault();
    },


    findParameters: function (points, pointCount, avgX, avgY, interval, breakPoint) {

        Sandman.context.beginPath();
        Sandman.context.arc(avgX, avgY, 1, 0, Math.PI, true);
        Sandman.context.strokeStyle = 'red';
        Sandman.context.stroke();

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
                //console.log ("cross  "+crossoverIterator +"  iteratir  "+iterator+ "   points [crossoverIterator+1] [1]  "+points [crossoverIterator+1] [1]);
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
        if (breakPoint >= 0) {
            strokes = 1;
        }

        //    alert (" partition: "+portion.indexOf (Math.max (portion [0],portion [1],portion [2],portion [3]))+" Cross:"+crossoverCount+"Vert:"+verticalLine+"  Horiz:"+horizontalLine+"  strokes:"+strokes);


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
        Sandman.context.strokeStyle = 'cyan';
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



    path_length: function (ptr, array, breakPoint) {
        var y = 1;
        var len = 0;
        var temp = 0;


        while (y < ptr) {


            //
            if (y - 1 === breakPoint) {
                y++;
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

    gestureCompare: function (rounded, parameterArray) {


        var strokeIter = 0;
        var crossIter = 0;
        var horizIter = 0;
        var vertIter = 0;
        var xIter = 0;
        var yIter = 0;
        var iter = 0;
        var cnt = 0;
        var resCnt = 0;
        var pointThreshold = 15;
        var fourierThreshold = 16; //MUST BE A MULTIPLE OF 4

        alert("parameter: " + parameterArray);

        for (strokeIter = 0; strokeIter < 2; strokeIter++) {

            parameterArray[4] = (parameterArray[4] + 1) % 2;

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
                                    //console.log ("set:"+Sandman.set +"  i:"+i+"  rescnt:"+ resCnt);


                                    if (typeof (window.Sandman[Sandman.set]) != "undefined") {

                                        var setLength = (window.Sandman[Sandman.set]).length;

                                        var setIter = 0;
                                        var maxMatchedIndex = 0;
                                        var maxMatched = -1;

                                        for (setIter = 0; setIter < setLength; setIter++) {
                                            resCnt = 0;
                                            var gest1 = Sandman.gestureArray[window.Sandman[Sandman.set][setIter]];

                                            var gest2 = rounded;



                                            for (i = 0; i < (Sandman.samplePoints-1) / 4; i++) {
                                                if (Math.abs((gest1[i+1][0]) - (gest2[i][0])) <= pointThreshold && Math.abs((gest1[i+1][1]) - (gest2[i][1])) <= pointThreshold) {
                                                    resCnt++;
console.log ("gest1: "+ gest1 [i]+ "gest2: "+gest2 [i]);
                                                }

                                                if (resCnt>=fourierThreshold/4) {break;              }

                                            }
                                            console.log(gest1[0] + "partition1:" + resCnt);
                                            if (resCnt >= fourierThreshold / 4) {

                                                for (i = (Sandman.samplePoints) / 4; i < (Sandman.samplePoints) / 2; i++) {
                                                    if (Math.abs((gest1[i+1][0]) - (gest2[i][0])) <= pointThreshold && Math.abs((gest1[i+1][1]) - (gest2[i][1])) <= pointThreshold) {
                                                        resCnt++;
console.log ("gest1: "+ gest1 [i]+ "gest2: "+gest2 [i]);
                                                    }

                                                    if (resCnt>=fourierThreshold/2) {break;              }
                                                }
                                                console.log(gest1[0] + "partition2:" + resCnt);
                                                if (resCnt >= fourierThreshold / 2) {
                                                    for (i = (Sandman.samplePoints) / 2; i < (3 * (Sandman.samplePoints)) / 4; i++) {
                                                        if ((Math.abs(gest1[i+1][0]) - (gest2[i][0])) <= pointThreshold && Math.abs((gest1[i+1][1]) - (gest2[i][1])) <= pointThreshold) {
                                                            resCnt++;
console.log ("gest1: "+ gest1 [i]+ "gest2: "+gest2 [i]);
                                                        }

                                                        if (resCnt>=(3*fourierThreshold)/4) {break;            }
                                                    }
                                                    console.log(gest1[0] + "partition3:" + resCnt);
                                                    if (resCnt >= (3 * fourierThreshold) / 4) {
                                                        for (i = (3 * (Sandman.samplePoints)) / 4; i < (Sandman.samplePoints - 1); i++) {
                                                            if (Math.abs((gest1[i+1][0]) - (gest2[i][0])) <= pointThreshold && Math.abs((gest1[i+1][1]) - (gest2[i][1])) < pointThreshold) {
                                                                resCnt++;
console.log ("gest1: "+ gest1 [i]+ "gest2: "+gest2 [i]);
                                                            }

                                                            if (resCnt>=fourierThreshold) {break;              }
                                                        }
                                                        console.log(gest1[0] + "partition4:" + resCnt);
                                                    }
                                                }
                                            }
                                            if (resCnt > maxMatched) {
                                                maxMatchedIndex = window.Sandman[Sandman.set][setIter];
                                                maxMatched = resCnt;
                                            }

                                        }

                                        if (maxMatched >= fourierThreshold) {
                                            alert("You have drawn: " + Sandman.gestureArray[maxMatchedIndex][0] + ", " + maxMatched + " points matched");
                                            return;
                                        }

                                        //

                                        if (resCnt < fourierThreshold) {
                                            console.log("Sandman.Gestures do not match. No. of descriptors matched:" + resCnt);
                                        } else {
                                            //console.log ("BrokeOUt");
                                            //   break;
                                        }
                                        //console.log ("loop end "+i);
                                    }
                                    //console.log ("came here");

                                    /*
                  //Searching within a particular set
                  */


                                }

                            }

                        }


                    }
                }

            }




        }
    },

    sample: function (ptr, array, minMax, breakPoint) {

        //INTERPOLATING

        if (breakPoint === (ptr - 1)) {
            breakPoint = -1;
        }

        if (ptr <= 0) {
            return;
        }


        var looper = 5;
        for (looper = 5; looper < ptr - 5; looper++) {
            array[looper][0] = Math.floor((array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0] + array[looper][0] + array[looper + 1][0] + array[looper + 2][0] + array[looper + 3][0] + array[looper + 4][0] + array[looper + 5][0]) / 11);
            array[looper][1] = Math.floor((array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1] + array[looper][1] + array[looper + 1][1] + array[looper + 2][1] + array[looper + 3][1] + array[looper + 4][1] + array[looper + 5][1]) / 11);
            //console.log (looper + ptr);

        }
        //  console.log ("ptr  "+ptr + "array[ptr][0]&1: "+array [ptr-1] [0]+" " +array [ptr-1] [1]);
        //      console.log(array[ptr-1][1]);


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


        /**/


        var i = 1;
        var leng = Sandman.path_length(ptr, array, breakPoint);
        var sampledX = [];
        var sampledY = []; //[ maxX, maxY, minX, minY ]
        var samplePt = 0;
        var interval = (leng / (Sandman.samplePoints - 1));
        var tempDist = 0;
        var add = 0;
        var interPixelDist = 0;


        // Canculating scalefactor by dividing the diagonal of the box containing the gesture by 100

        for (looper = 0; looper < ptr; looper++) {
            Sandman.context.beginPath();
            Sandman.context.arc(array[looper][0], array[looper][1], 1, 0, Math.PI, true);
            Sandman.context.strokeStyle = 'green';
            Sandman.context.stroke();
        }

        var scaleFactor = Math.sqrt((minMax[0] - minMax[2]) * (minMax[0] - minMax[2]) + (minMax[1] - minMax[3]) * (minMax[1] - minMax[3])) / 100;
        sampledX[0] = array[0][0];
        sampledY[0] = array[0][1];
        samplePt = 1;

        // Interpolating

        while (i < ptr) {

            // Calculating inter pixel distance by the distance formula

            add = (array[i][0] - array[i - 1][0]) * (array[i][0] - array[i - 1][0]) + (array[i][1] - array[i - 1][1]) * (array[i][1] - array[i - 1][1]);
            interPixelDist = Math.sqrt(add);

            //
            if (i === breakPoint) {
                i++;
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

        sampledX[samplePt] = array[ptr - 1][0];
        sampledY[samplePt] = array[ptr - 1][1];

        samplePt++;


        var sampled2d = [];

        for (i = 0; i < samplePt; i++) {
            sampled2d[i] = [];
            sampled2d[i][0] = Math.round(sampledX[i]);
            sampled2d[i][1] = Math.round(sampledY[i]);
        }
        for (i = 0; i < samplePt; i++) {

            Sandman.context.beginPath();
            Sandman.context.arc(sampled2d[i][0], sampled2d[i][1], 1, 0, Math.PI, true);
            Sandman.context.strokeStyle = 'black';
            Sandman.context.stroke();
        }
        var parameterArray = Sandman.findParameters(sampled2d, Sandman.samplePoints, (minMax[0] + minMax[2]) / 2, (minMax[1] + minMax[3]) / 2, interval, breakPoint);

        Sandman.createChainCode(sampled2d);


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

        var see = 0;
        for (see = 0; see < Sandman.samplePoints - 1; see++) {
            Sandman.context.beginPath();
            Sandman.context.arc(templ[see][0] + 200, templ[see][1] + 200, 1, 0, Math.PI, true);
            Sandman.context.strokeStyle = 'red';
            Sandman.context.stroke();
        }

        // Sorting the pixels


        var swapVar = 0;
        for (j = 0; j < (Sandman.samplePoints - 1); j++) {
            for (t = 0; t < (Sandman.samplePoints - 1) - j; t++) {
                if (templ[t][1] > templ[t + 1][1]) {
                    swapVar = templ[t];
                    templ[t] = templ[t + 1];
                    templ[t + 1] = swapVar;
                }
                if (templ[t][1] === templ[t + 1][1]) {
                    if (templ[t][0] > templ[t + 1][0]) {
                        swapVar = templ[t];
                        templ[t] = templ[t + 1];
                        templ[t + 1] = swapVar;
                    }
                }
            }
        }


        var temp = 0;
        var k = 0;

        rounded = templ;
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


        //console.log ("set  "+Sandman.set);


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

        Sandman.gestureCompare(rounded, parameterArray);


        document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML + "<br /><br />";
        chainInputPtr = 0;
        samplePt = 0;
        ptr = 0;
        minMax = [-9999, -9999, 9999, 9999]; //[ maxX, maxY, minX, minY ]

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

                    var breakPoint = inputPtr - 1;
                    if (intervalSet === 0) {
                        intervalSet = 1;
                        strokeInterval = setInterval(function () {

                            if (okToSample === 1) {

                                clearInterval(strokeInterval);

                                Sandman.sample(inputPtr, input2d, minMax, breakPoint);
                                intervalSet = 0;
                                inputPtr = 0;
                            }

                        }, 500);
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

                    var breakPoint = inputPtr - 1;
                    if (intervalSet === 0) {
                        intervalSet = 1;
                        strokeInterval = setInterval(function () {

                            if (okToSample === 1) {

                                clearInterval(strokeInterval);

                                Sandman.sample(inputPtr, input2d, minMax, breakPoint);
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
