import React from "react";
import {useStore} from "react-redux";

export default function PlaySpace({style}) {
  const styleFinal = {...style};
  styleFinal.backgroundColor = "red";

  console.log("playSpace",styleFinal);

  const debug = [window.devicePixelRatio, ",", window.innerHeight, ",", 
    window.screen.height,",",window.innerWidth,",",window.screen.width];
  return <div style={styleFinal}>{debug} {JSON.stringify(styleFinal)}</div>
}
