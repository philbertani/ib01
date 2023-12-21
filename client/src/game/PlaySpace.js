import React from "react";
import * as SVGTRI from "./SvgTriangles";
import {useStore} from "react-redux";

export default function PlaySpace({mech, style}) {
  
  const boardInfo = mech.boardInfo;
  const {cellDivisor,spacingDivisor} = mech.boardInfo;

  const styleFinal = {...style};

  const cellWidth = styleFinal.width/cellDivisor;
  const margin = .3*cellWidth;
  const spacing = styleFinal.width / spacingDivisor;

  styleFinal.backgroundColor = "rgba(0,0,0,0)";
  styleFinal.overflow = "hidden";
  styleFinal.overflowY = "scroll";

  const [newBoard, setNewBoard] = React.useState([]);
  const [debug, setDebug] = React.useState(["debug"]);
  const [displayOverlay, setDisplayOverlay] = React.useState(false);
  const [displayMerge, setDisplayMerge] = React.useState(false);
  const [moveCell, setMoveCell] = React.useState({});
  
  const computeSourcesRef = React.useRef(true);
  const orderRef = React.useRef();
  const cellsRef = React.useRef();
  const sourcesRef = React.useRef();
  const cellOrderRef = React.useRef();
  const divRefs = React.useRef();
  const overlayRefs = React.useRef();
  const selectedRef = React.useRef([]);
  const savedStyleRef = React.useRef();

  //i dont trust react usestate for this:
  if (computeSourcesRef.current) {

    console.log("compute sources", boardInfo);
    //have an object that points from a target square to its 2 sources
    const sources = Array.from(Array(mech.boardInfo.rows), () =>
      Array(mech.boardInfo.cols).fill(null)
    );

    if (!divRefs.current) {
      divRefs.current = Array.from(Array(mech.boardInfo.rows), () =>
        Array(mech.boardInfo.cols).fill(null)
      );
    }

    if (!overlayRefs.current) {
      overlayRefs.current = Array.from(Array(mech.boardInfo.rows), () =>
        Array(mech.boardInfo.cols).fill(null)
      );
    }

    //pick half of the total number of board cells because we need 2 squares to cover
    //one target square
    const N = boardInfo.rows * boardInfo.cols;
    const M = Math.trunc(N / 2);
    const cellsToUse = {};
    let num = 0;
    while (num < M) {
      const rnd = Math.trunc(Math.random() * N);
      if (!cellsToUse[rnd]) {
        cellsToUse[rnd] = Math.random() * 1000; //assign it a random sort order
        num++;
      }
    }

    const cells = Object.keys(cellsToUse);
    const rndOrder = Object.values(cellsToUse);
    const order = Array.from(cells, (x, i) => i);

    order.sort((a, b) => rndOrder[a] - rndOrder[b]);

    const Q = M * 2;
    const rndCellOrder = [];
    for (let i = 0; i < Q; i++) {
      rndCellOrder.push(Math.random() * Q);
    }

    const cellOrder = Array.from(rndCellOrder, (x, i) => i);
    cellOrder.sort((a, b) => rndCellOrder[a] - rndCellOrder[b]);

    orderRef.current = order;
    sourcesRef.current = sources;
    cellsRef.current = cells;
    cellOrderRef.current = cellOrder;

    computeSourcesRef.current = false;
  }

  //console.log('zzzzzzzzzzz',divRefs.current);

  React.useEffect( ()=>{
    console.log("we should be displaying the merge window");
  },[displayMerge]);

  React.useEffect(()=>{

    //this is getting called multiple times - prevent with boolean
    //we have to call for this from server for multi player
    const board = [];

    const playSpaceBoard = mech.playSpaceBoard;  //keep track of the colors in each cell here
    const N = boardInfo.rows*boardInfo.cols;
    const M = Math.trunc(N/2);

    const order = orderRef.current;
    const cells = cellsRef.current;
    const sources = sourcesRef.current;
    const cellOrder = cellOrderRef.current;

    const debug = [];

    //console.log("divRefs",divRefs.current);

    let checkSelected = false;
    let selectedRow, selectedCol, newTop, newLeft;
    if ( selectedRef.current.length === 1) {
      checkSelected = true;
      selectedRow = moveCell.row;
      selectedCol = moveCell.col;
      newTop = moveCell.y - cellWidth/2;
      newLeft = moveCell.x - cellWidth/2;
    }

    for (let i=0; i<order.length; i++) {

      const index = order[i];

      const {cell,row,col} = mech.linearTo2d(cells[index]);
      const {cell:cellx,row:outRow,col:outCol} = mech.linearTo2d(cellOrder[i]);
      const {cell:celly,row:outRow2,col:outCol2} = mech.linearTo2d(cellOrder[M+i]);

      //console.log(i,cellOrder[i],cellOrder[i*2],outRow,outCol,outRow2,outCol2);

      const [p1,p2] = [cell[2],cell[3]];

      //debug.push(["start",row,col, outCol,outRow,outCol2,outRow2,"end "].join(","));

      const prim1a = mech.vecToRGB( mech.primaryColors[p1[0]] );
      const prim1b = mech.vecToRGB( mech.primaryColors[p1[1]] );

      const prim2a = mech.vecToRGB( mech.primaryColors[p2[0]] );
      const prim2b = mech.vecToRGB( mech.primaryColors[p2[1]] );
      
      //we need these for the final comparison versus the target cells
      //colors are always specified as: [horizontal,vertical]
      playSpaceBoard[outRow][outCol] = {target:[row,col],prim:[p1[0],p2[0]]};  
      playSpaceBoard[outRow2][outCol2] = {target:[row,col],prim:[p1[1],p2[1]]};

      sources[row][col] = [[outRow,outCol],[outRow2,outCol2]];
      //console.log('sources',i,row,col,sources);

      const newStyle1={
        position:"absolute", width:cellWidth,
        left: margin+spacing*outCol,
        top: margin/2+spacing*outRow,
        height: cellWidth
      }

      const newStyle2={
        position:"absolute", width:cellWidth,
        left: margin+spacing*outCol2,
        top: margin/2+spacing*outRow2,
        height: cellWidth
      }
      //console.log(prim1a,prim1b,prim2a,prim2b);

      const debugStyle1 = mech.setDebugStyle(newStyle1,cellWidth);
      const debugStyle2 = mech.setDebugStyle(newStyle2,cellWidth);

      const overlayStyle1 = mech.setOverlayStyle(newStyle1,cellWidth);
      const overlayStyle2 = mech.setOverlayStyle(newStyle2,cellWidth);

      if (checkSelected) {
        //newStyle1.opacity = .5;
        //newStyle2.opacity = .5;
        newStyle1.mixBlendMode = "lighten"; //"screen"; //"lighten"; //"difference";
        newStyle2.mixBlendMode = "lighten"; //"screen"; //"lighten"; //"difference";
      }

      if (checkSelected) {
        if ( outRow == selectedRow && outCol == selectedCol) {
          newStyle1.top = newTop;
          newStyle1.left = newLeft;
          newStyle1.zIndex = 1000;
          //newStyle1.opacity = .5;
        }
      }

      board.push(
        <div
          ref={(el) => (divRefs.current[outRow][outCol] = el)}
          id={outRow.toString() + outCol.toString()}
          key={"tileA" + row.toString() + col.toString()}
          style={newStyle1}
        >
          <SVGTRI.Left boardDims={styleFinal} color={prim1a} />
          <SVGTRI.Right boardDims={styleFinal} color={prim1a} />
          <SVGTRI.Up boardDims={styleFinal} color={prim2a} />
          <SVGTRI.Down boardDims={styleFinal} color={prim2a} />
        </div>
      );

      board.push(
        <div
          ref={(el) => (overlayRefs.current[outRow][outCol] = el)}
          key={"tileAoverlay" + row.toString() + col.toString()}
          style={overlayStyle1}
        ></div>
      );

      board.push(
        <div key={"tileAdebug"+row.toString()+col.toString()} style={debugStyle1}>{row}{col}</div>
      )

      if (checkSelected) {
        if ( outRow2 == selectedRow && outCol2 == selectedCol) {
          newStyle2.top = newTop;
          newStyle2.left = newLeft;
          newStyle2.zIndex = 1000;
          //newStyle2.opacity = .5;
        }
      }

      board.push(
        <div
          ref={(el) => (divRefs.current[outRow2][outCol2] = el)}
          id={outRow2.toString() + outCol2.toString()}
          key={"tileB" + row.toString() + col.toString()}
          style={newStyle2}
        >
          <SVGTRI.Left boardDims={styleFinal} color={prim1b} />
          <SVGTRI.Right boardDims={styleFinal} color={prim1b} />
          <SVGTRI.Up boardDims={styleFinal} color={prim2b} />
          <SVGTRI.Down boardDims={styleFinal} color={prim2b} />
        </div>
      );

      board.push(
        <div
          ref={(el) => (overlayRefs.current[outRow2][outCol2] = el)}
          key={"tileBoverlay" + row.toString() + col.toString()}
          style={overlayStyle2}
        ></div>
      );

      board.push(
        <div key={"tileBdebug"+row.toString()+col.toString()} style={debugStyle2}>{row}{col}</div>
      )

    }

    //console.log('playSpace', playSpaceBoard);
  
    mech.sources = sources;

    //console.log('pppppppp',mech.sources);


    setNewBoard(board);
    setDebug(debug);

  },[cellWidth, boardInfo, displayOverlay, moveCell])  //React suggestions ususally cause infinite rerendering hell - resist!

  function checkCell(ev) {

    ev.preventDefault();

    const [x,y] = [ev.clientX, ev.clientY];
    console.log(x,y);

    //we are already moving a cell around
    //if  (selectedRef.current.length > 0) return;

    let foundOne = false;
    for (let row=0; row<boardInfo.rows; row++) {
      for (let col=0; col<boardInfo.cols; col++) {
        const cellInfo = divRefs.current[row][col];
        //console.log('ccccccccccccc',row,col,cellInfo);
        if (!cellInfo) continue;
        const rect = cellInfo.getBoundingClientRect();
        //console.log(x,y,rect.left,rect.right,rect.top,rect.bottom);
        if ( x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
          console.log("found it",cellInfo);
          foundOne = true;

          const [row,col] = 
            [ parseFloat(cellInfo.id.substring(0,1)), parseFloat(cellInfo.id.substring(1,2))];
          
          style = overlayRefs.current[row][col].style;
          console.log("overlay", row,col, style.display );

          if (style.display === "block") {
            style.display = "";
            style.background = null;
          }
          else  {
            //style.display = "block";
            //style.background = "radial-gradient(transparent 50%, black)";
          }

          if (selectedRef.current.length === 1) {
            const sr = selectedRef.current[0];
            const [selectedRow,selectedCol] = [sr.row,sr.col];
            if ( selectedRow === row && selectedCol === col ) {
              //we have clicked back in the original box so put it back
              //console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
              setMoveCell({});
              selectedRef.current.length = 0;
            }
          }
          else {
          //save the initial style, position, etc so we can restore it to original
            savedStyleRef.current = {...style};
            selectedRef.current.push( {row,col} );
          }
          //if ( selectedRef.current.length === 2 ) {
          //  setDisplayMerge(true);
          //}
          break;
        }
      }
      if (foundOne) break;
    }

  }

  function moveCellFunc(ev) {
    if  (selectedRef.current.length === 1) {
      const {row,col} = selectedRef.current[0];
      //console.log('moving',row,col);

      const divRef = divRefs.current[row][col];
      const [x,y] = [ev.clientX, ev.clientY];

      //setting the style here is having no effect have to do it the hard way
      //divRef.style.top = y;
      //divRef.style.left = x;

      setMoveCell({row,col,x,y})
    }
  }

  return (
    <div>
      <div
        onClick={(ev) => {
          //console.log(ev.clientX, ev.clientY);
          checkCell(ev);
          //setDisplayOverlay(!displayOverlay);
        }}
        onMouseMove={ ev=> {
          moveCellFunc(ev);
        }}
        style={styleFinal}
      >
        {newBoard}
      </div>
      <div style={{ position: "absolute", color: "white", zIndex: 100 }}>
        {debug}
      </div>
    </div>
  );
}
