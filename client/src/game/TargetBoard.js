import React from "react";
import {useStore} from "react-redux";

export default function TargetBoard({style}) {
  const styleFinal = {...style};
  styleFinal.backgroundColor = "yellow";

  return <div style={styleFinal}></div>
}

