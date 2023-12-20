
const boardInfo3x3 = {
  rows: 3,
  cols: 3,
  cellDivisor: 3.65,    //3.8
  spacingDivisor: 3.65  //3.5
}

const boardInfo4x4 = {
  rows: 4,
  cols: 4,
  cellDivisor: 4.8,
  spacingDivisor: 4.5
}

const boardInfos = {};
boardInfos[3] = boardInfo3x3;
boardInfos[4] = boardInfo4x4;

export {boardInfos};


