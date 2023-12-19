export default class Mechanics {
 
  constructor(boardInfo) {
    this.boardInfo = boardInfo;
    this.createBoard(this.boardInfo);
  }

  * boardIter(index,boardInfo) {
    //have the generator function convert from linear index to 2d array index for us
    while (index < boardInfo.rows*boardInfo.cols) {
      const row = Math.trunc( index / boardInfo.cols );
      const col = index - row*boardInfo.cols;
      yield {row,col};
      index ++;
    }
    return;
  }

  createBoard(boardInfo) {

    //hard to remember this syntax:
    const newBoard = Array.from( Array(boardInfo.rows), ()=>Array(boardInfo.cols).fill(0));

    console.log(newBoard);

    const cell = this.boardIter(0,boardInfo);
    let end = false;
    while ( !end ) {
      const result = cell.next();
      end = result.done;
    }
  }

}