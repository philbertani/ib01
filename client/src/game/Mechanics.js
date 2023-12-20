export default class Mechanics {
  primaryColors = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255]
  ]

  

  /*
    [127.5, 127.5, 0],
    [0, 127.5, 127.5],
    [127.5, 0, 127.5],
  ];
  */
 
  /*
    [255, 255, 0],   //add these to second level - it gets hard to distinguish
    [0, 255, 255],   //maybe we should restrict to fully saturated colors??
    [255, 0, 255],
  ];
  */

  /*
    [127.5,127.5,0],
    [0,127.5,127.5],
    [127.5,0,127.5],
  
  */

  constructor(boardInfo) {
    this.boardInfo = boardInfo;
    this.createBoard(this.boardInfo);
    return this;
  }

  colorDist(c1, c2) {
    let ss = 0; //sum of squared diffs - yeah
    for (let i = 0; i < 3; i++) {
      ss += (c1[i] - c2[i]) * (c1[i] - c2[i]);
    }
    return Math.sqrt(ss);
  }

  vecToRGB(arr) {
    return "rgba(" + arr[0] + "," + arr[1] + "," + arr[2] + ",1)";
  }

  sumVec(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

  avgVec(arr1, arr2) {
    //not really the average
    //if any of the individual RGB components sum to >  255 then we divide all RGB by 2

    let v3 = Array(arr1.length).fill(0);

    let rescale = false;
    for (let i = 0; i < arr1.length; i++) {
      v3[i] = arr1[i] + arr2[i];
      if (v3[i] > 255) rescale = true;
    }

    if (rescale) {
      for (let i = 0; i < arr1.length; i++) {
        v3[i] /= 2;
      }
    }
    return v3;
  }

  linearTo2d(index) {
 
    const row = Math.trunc(index / this.boardInfo.cols);
    const col = index - row * this.boardInfo.cols;

    //console.log('zzzzzzz',index, row,  col);
    return {cell:this.targetBoard[row][col],row,col};
  }

  *boardIter(index, boardInfo) {
    //have the generator function convert from linear index to 2d array index for us
    while (index < boardInfo.rows * boardInfo.cols) {
      const row = Math.trunc(index / boardInfo.cols);
      const col = index - row * boardInfo.cols;
      yield { row, col };
      index++;
    }
    return;
  }

  //this is more like reduce than map since it returns an accumulated array or object
  map(callback, accum=[]) {
    const cellIndex = this.boardIter(0,this.boardInfo);
    let end=false;
    while (!end) {
      const result = cellIndex.next();
      if (result.done) break;
      const { row, col } = result.value;
      const cell = this.targetBoard[row][col];
      callback( {cell,row,col}, accum);
    }  
    return accum;
  }

  createBoard(boardInfo) {
    //hard to remember this syntax:
    const newBoard = Array.from(Array(boardInfo.rows), () =>
      Array(boardInfo.cols).fill(0)
    );

    //boardIter returns the row,col of the board cell we will set
    const cell = this.boardIter(0, boardInfo);
    let end = false;
    while (!end) {
      const result = cell.next();
      //console.log(result);

      if (!result.done) {
        const { row, col } = result.value;
        //pick 2 differnt "secondary" colors for each cell

        let [color1, color2, p1, p2] = this.chooseSecondaryColors(
          this.primaryColors
        );
        let color1Sum = this.sumVec(color1);
        let color2Sum = this.sumVec(color2);
        let colorDist = this.colorDist(color1, color2);
        const white = 255 * 3;

        let iter = 0;
        while (
          colorDist < 10 ||
          (color1Sum >= white && color2Sum >= white && iter < 100)
        ) {
          [color1, color2, p1, p2] = this.chooseSecondaryColors(
            this.primaryColors
          );
          color1Sum = this.sumVec(color1);
          color2Sum = this.sumVec(color2);
          colorDist = this.colorDist(color1, color2);
          iter++;
        }

        newBoard[row][col] = [color1, color2, p1, p2];
      }
      end = result.done;
    }

    this.targetBoard = newBoard;

    console.log(newBoard);

    return this;
  }

  sort(arr) {
    arr.sort((a, b) => a - b);
  }

  get2UniqueCombosOfPrimaryColors(N) {
    const [n1, n2] = this.get2rndNumbers(N);
    const p1 = [n1, n2];

    let [m1, m2] = this.get2rndNumbers(N);
    let p2 = [m1, m2];

    p1.sort((a, b) => a - b);
    p2.sort((a, b) => a - b);

    let iter = 0;
    while (p1[0] == p2[0] && p1[1] == p2[1] && iter < 100) {
      iter++;
      console.log("shiiiiiiit");
      [m1, m2] = this.get2rndNumbers(N);
      p2 = [m1, m2];
      p2.sort((a, b) => a - b);
    }

    return [
      [n1, n2],
      [m1, m2],
    ];
  }

  chooseSecondaryColors(primaryColors) {
    const N = primaryColors.length;

    const [p1, p2] = this.get2UniqueCombosOfPrimaryColors(N);

    const [n1, n2] = [p1[0], p1[1]]; //this.get2rndNumbers(N);
    const [m1, m2] = [p2[0], p2[1]]; //this.get2rndNumbers(N);

    //console.log("rnd", n1,n2);
    const color1 = this.avgVec(primaryColors[n1], primaryColors[n2]);

    const color2 = this.avgVec(primaryColors[m1], primaryColors[m2]);

    //return the 2 colors along with the original indices of the 2 primary colors
    return [color1, color2, [n1, n2], [m1, m2]];
  }

  get2rndNumbers(N) {
    const c1 = Math.trunc(Math.random() * N);
    let c2 = c1;
    let iter = 0;
    while (c1 === c2 && iter < 100) {
      c2 = Math.trunc(Math.random() * N);
    }

    if (c1 == c2) {
      console.log("fuuuuuuck", c1, c2);
    }

    return [c1, c2];
  }
}