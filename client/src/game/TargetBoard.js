import React from "react";
import * as SVGTRI from "./SvgTriangles";
import {useStore} from "react-redux";

export default function TargetBoard({style}) {
  const styleFinal = {...style};
  styleFinal.backgroundColor = "rgba(255,255,255,0)";

  return <div style={styleFinal}>

    <div style={{position:"absolute", width:styleFinal.width/5}}>
      <SVGTRI.RightTriangleLowerLeft boardDims={styleFinal} color={"rgba(255,255,0,.5)"}/>
      <SVGTRI.RightTriangleUpperRight boardDims={styleFinal} color={"rgba(0,255,255,.5)"}/>
    </div>

    <div style={{position:"absolute",width:styleFinal.width/5 , left:styleFinal.width/5}}>
      <SVGTRI.RightTriangleLowerLeft boardDims={styleFinal} color={"rgba(255,255,0,.5)"}/>
      <SVGTRI.RightTriangleUpperRight boardDims={styleFinal} color={"rgba(0,255,255,.5)"}/>
    </div>

    <div style={{position:"absolute",width:styleFinal.width/5 , top:styleFinal.width/5}}>
      <SVGTRI.Left boardDims={styleFinal} color={"rgba(0,255,0,.5)"}/>
      <SVGTRI.Right boardDims={styleFinal} color={"rgba(0,255,0,.5)"}/>
      <SVGTRI.Up boardDims={styleFinal} color={"rgba(255,0,255,.5)"}/>
      <SVGTRI.Down boardDims={styleFinal} color={"rgba(255,0,255,.5)"}/>
    </div>

  </div>
}

