import React from "react";
import {useStore} from "react-redux";

export default function Menu({style}) {

  const styleFinal = {...style};
  styleFinal.backgroundColor = "blue";

  return <div style={styleFinal}></div>

}
