import React from "react";
import * as SVGTRI from "./SvgTriangles";
import {useStore} from "react-redux";

const cellDivisor = 4.8;
const spacingDivisor = 4.5;
const boardInfo = {cols:4,rows:4};

export default function TargetBoard({style}) {
  
  const styleFinal = {...style};
  styleFinal.backgroundColor = "rgba(255,255,255,0)";
  styleFinal.overflow = "hidden";
  styleFinal.overflowY = "scroll";

  const [newBoard, setNewBoard] = React.useState([]);

  const cellWidth = styleFinal.width/cellDivisor;

  const margin = .3*cellWidth;
  const spacing = styleFinal.width / spacingDivisor;


  React.useEffect(()=>{

    //we have to call for this from server for multi player
    const board = [];

    for (let row=0; row<boardInfo.rows; row++) {

      for (let col=0; col<boardInfo.cols; col++) {

        const newStyle={
          position:"absolute", width:cellWidth,
          left: margin+spacing*col,
          top: margin/2+spacing*row
        }
        board.push(
          <div key={"tile"+row.toString()+col.toString()} style={newStyle}>
            <SVGTRI.Left boardDims={styleFinal} color={"rgba(0,255,0,.5)"}/>
            <SVGTRI.Right boardDims={styleFinal} color={"rgba(0,255,0,.5)"}/>
            <SVGTRI.Up boardDims={styleFinal} color={"rgba(255,0,255,.5)"}/>
            <SVGTRI.Down boardDims={styleFinal} color={"rgba(255,0,255,.5)"}/>
          </div>
        )

      }
    }

    setNewBoard(board);


  },[cellWidth])  //React suggestions ususally cause infinite rerendering hell - resist!

  return <div style={styleFinal}>{newBoard}</div>
}

