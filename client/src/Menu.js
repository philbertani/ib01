import React from "react";
import {useStore} from "react-redux";

export default function Menu({props,style}) {
  const {setShowHints, mech} = props;

  const styleFinal = {...style};
  styleFinal.backgroundColor = "rgba(0,0,255,1)";

  return ( 
    <div style={styleFinal}>
      <button style={{fontSize:"1em"}} onClick={ev=>{setShowHints(prev=>!prev)}}>👀</button>
    </div>
  )
}

