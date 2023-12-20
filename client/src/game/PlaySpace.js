import React from "react";
import * as SVGTRI from "./SvgTriangles";
import {useStore} from "react-redux";

export default function PlaySpace({mech, style}) {
  
  const boardInfo = mech.boardInfo;
  const {cellDivisor,spacingDivisor} = mech.boardInfo;

  const styleFinal = {...style};
  styleFinal.backgroundColor = "rgba(0,0,0,1)";
  styleFinal.overflow = "hidden";
  styleFinal.overflowY = "scroll";

  const [newBoard, setNewBoard] = React.useState([]);
  const [debug, setDebug] = React.useState(["debug"]);
  
  const cellWidth = styleFinal.width/cellDivisor;

  const margin = .3*cellWidth;
  const spacing = styleFinal.width / spacingDivisor;

  React.useEffect(()=>{

    //this is getting called multiple times - prevent with boolean
    //we have to call for this from server for multi player
    const board = [];

    //pick half of the total number of board cells because we need 2 squares to cover
    //one target square
    const N = boardInfo.rows*boardInfo.cols;
    const M = Math.trunc(N/2);
    const cellsToUse = {};
    let num=0;
    while (num<M) {
      const rnd = Math.trunc(Math.random()*N);
      if ( !cellsToUse[rnd]) {
        cellsToUse[rnd] = Math.random()*1000;  //assign it a random sort order
        num++;
      }
    }
    
    const cells = Object.keys(cellsToUse);
    const rndOrder = Object.values(cellsToUse);
    const order = Array.from( cells, (x,i)=>i);

    order.sort( (a,b)=> rndOrder[a]-rndOrder[b]);

    const Q = M*2;
    const rndCellOrder = []
    for (let i=0; i<Q; i++) {
      rndCellOrder.push(Math.random()*Q);
    }

    const cellOrder = Array.from(rndCellOrder,(x,i)=>i);
    cellOrder.sort( (a,b)=>rndCellOrder[a]-rndCellOrder[b]);

    console.log(order, cellOrder, rndCellOrder);

    const debug = [];

    for (let i=0; i<order.length; i++) {

      const index = order[i];

      const {cell,row,col} = mech.linearTo2d(cells[index]);
      const {cell:cellx,row:outRow,col:outCol} = mech.linearTo2d(cellOrder[i]);
      const {cell:celly,row:outRow2,col:outCol2} = mech.linearTo2d(cellOrder[M+i]);

      //console.log(i,cellOrder[i],cellOrder[i*2],outRow,outCol,outRow2,outCol2);

      const [p1,p2] = [cell[2],cell[3]];

      debug.push(["start",row,col, outCol,outRow,outCol2,outRow2,"end "].join(","));

      const prim1a = mech.vecToRGB( mech.primaryColors[p1[0]] );
      const prim1b = mech.vecToRGB( mech.primaryColors[p1[1]] );

      const prim2a = mech.vecToRGB( mech.primaryColors[p2[0]] );
      const prim2b = mech.vecToRGB( mech.primaryColors[p2[1]] );
      
      const newStyle1={
        position:"absolute", width:cellWidth,
        left: margin+spacing*outCol,
        top: margin/2+spacing*outRow,
      }

      const newStyle2={
        position:"absolute", width:cellWidth,
        left: margin+spacing*outCol2,
        top: margin/2+spacing*outRow2
      }
      //console.log(prim1a,prim1b,prim2a,prim2b);

      const debugStyle1 = {...newStyle1};
      const debugStyle2 = {...newStyle2};
      debugStyle1.backgroundColor="white";
      debugStyle1.width="fit-content";
      debugStyle2.backgroundColor="white";
      debugStyle2.width="fit-content";

      board.push(
        <div key={"tileA"+row.toString()+col.toString()} style={newStyle1}>
          <SVGTRI.Left boardDims={styleFinal} color={prim1a}/>
          <SVGTRI.Right boardDims={styleFinal} color={prim1a}/>
          <SVGTRI.Up boardDims={styleFinal} color={prim2a}/>
          <SVGTRI.Down boardDims={styleFinal} color={prim2a}/>
        </div>
      )

      board.push(
        <div key={"tileAdebug"+row.toString()+col.toString()} style={debugStyle1}>{row}{col}</div>
      )

      board.push(
        <div key={"tileB"+row.toString()+col.toString()} style={newStyle2}>
          <SVGTRI.Left boardDims={styleFinal} color={prim1b}/>
          <SVGTRI.Right boardDims={styleFinal} color={prim1b}/>
          <SVGTRI.Up boardDims={styleFinal} color={prim2b}/>
          <SVGTRI.Down boardDims={styleFinal} color={prim2b}/>
        </div>
      )

      board.push(
        <div key={"tileBdebug"+row.toString()+col.toString()} style={debugStyle2}>{row}{col}</div>
      )

    }

    setNewBoard(board);
    setDebug(debug);

  },[cellWidth, boardInfo])  //React suggestions ususally cause infinite rerendering hell - resist!

  return ( 
    <div> 
      <div style={styleFinal}>{newBoard}</div> 
      <div style={{position:"absolute",color:"white",zIndex:100}}>{debug}</div>
    </div>)
}
