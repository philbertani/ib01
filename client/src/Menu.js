import React from "react";
import {useStore} from "react-redux";

export default function Menu({style}) {

  const styleFinal = {...style};
  styleFinal.backgroundColor = "rgba(0,0,255,1)";

  return <div style={styleFinal}></div>

}
