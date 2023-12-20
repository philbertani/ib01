import React from "react";
import * as SVGTRI from "./SvgTriangles";
import {useStore} from "react-redux";

export default function TargetBoard({mech, style}) {
  const boardInfo = mech.boardInfo;
  const { cellDivisor, spacingDivisor } = mech.boardInfo;

  const styleFinal = { ...style };
  styleFinal.backgroundColor = "rgba(0,0,0,1)";
  styleFinal.overflow = "hidden";
  styleFinal.overflowY = "scroll";

  const [newBoard, setNewBoard] = React.useState([]);

  const cellWidth = styleFinal.width / cellDivisor;

  const margin = 0.3 * cellWidth;
  const spacing = styleFinal.width / spacingDivisor;

  React.useEffect(() => {
    //this is getting called multiple times - prevent with boolean
    //we have to call for this from server for multi player
    const board = [];

    //mech.map iterates over the 2d board array in row major order
    mech.map((cellData) => {
      const { cell, row, col } = cellData;

      const color1 = mech.vecToRGB(cell[0]);
      const color2 = mech.vecToRGB(cell[1]);

      const newStyle = {
        position: "absolute",
        width: cellWidth,
        left: margin + spacing * col,
        top: margin / 2 + spacing * row,
      };

      board.push(
        <div key={"tile" + row.toString() + col.toString()} style={newStyle}>
          <SVGTRI.Left boardDims={styleFinal} color={color1} />
          <SVGTRI.Right boardDims={styleFinal} color={color1} />
          <SVGTRI.Up boardDims={styleFinal} color={color2} />
          <SVGTRI.Down boardDims={styleFinal} color={color2} />
        </div>
      );

      return null;
    }, board);

    setNewBoard(board);
  }, [cellWidth, boardInfo]); //React suggestions ususally cause infinite rerendering hell - resist!

  return <div style={styleFinal}>{newBoard}</div>;
}

