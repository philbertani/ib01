import React from "react";
import Menu from "./Menu";
import TargetBoard from "./game/TargetBoard";
import PlaySpace from "./game/PlaySpace";
import { useWindowSize } from "./uiHooks";

import Mechanics from "./game/Mechanics";
import {boardInfos} from "./game/boardInfo";

export default function WindowManager( {mainScreenRef} ) {

  const boardInfo = boardInfos[3];
  const mechRef = React.useRef(new Mechanics(boardInfo));
  const mech = mechRef.current;

  const ws = useWindowSize();
  const [fullScreen,setFullScreen] = React.useState(false);
  const [showHints,setShowHints] = React.useState(false);

  const [numMatches,setNumMatches] = React.useState(0);
  const matchesRef = React.useRef([]);

  React.useEffect( ()=>{

    function makeFullScreen() {

      const isFullScreen = (window.innerWidth===window.screen.width && window.innerHeight===window.screen.height);

      console.log("width",  window.innerWidth,window.screen.width);
      console.log("height", window.innerHeight,window.screen.height);

      if (!isFullScreen) {

        console.log("fullScreen shite 2", document.fullscreenEnabled);
        const elem = mainScreenRef.current;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          elem.msRequestFullscreen();
        }
        setFullScreen(true);
      }
    }
    if (mainScreenRef.current && !fullScreen) {
      //touchstart fails with permission check when trying to fullscreen
      //but click action still works on touchscreen so forget about it for now
      //mainScreenRef.current.addEventListener("touchstart",makeFullScreen);
      mainScreenRef.current.addEventListener("click",makeFullScreen);

    }


  },[mainScreenRef, fullScreen]);

  const props = {
    mech, ws, showHints, setShowHints, matchesRef, numMatches, setNumMatches
  }
  
  if (ws.dimData) {

    //console.log("pixel ratio",window.devicePixelRatio); //we dont need this yet

    return (
      <div>
        <Menu props={props} style={ws.dimData.menu} />
        <TargetBoard props={props} style={ws.dimData.board} />
        <PlaySpace props={props} style={ws.dimData.play} />
      </div>
    );
  }
  else {
    return <div>Waiting</div>
  }

}
