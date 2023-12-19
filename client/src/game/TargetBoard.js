import React from "react";
import * as SVGTRI from "./SvgTriangles";
import {useStore} from "react-redux";
import {boardInfos} from "./boardInfo";
import Mechanics from "./Mechanics";

const boardInfo = boardInfos[3];

const {cellDivisor,spacingDivisor} = boardInfo;

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

    //this is getting called multiple times - prevent with boolean

    const mech = new Mechanics(boardInfo);

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


  },[cellWidth, boardInfo])  //React suggestions ususally cause infinite rerendering hell - resist!

  return <div style={styleFinal}>{newBoard}</div>
}

