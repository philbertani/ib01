import React from "react";
import Menu from "./Menu";
import TargetBoard from "./game/TargetBoard";
import PlaySpace from "./game/PlaySpace";
import { useWindowSize } from "./uiHooks";

export default function WindowManager( {mainScreenRef} ) {

  const ws = useWindowSize();
  const [fullScreen,setFullScreen] = React.useState(false);

  React.useEffect( ()=>{
    function makeFullScreen() {
      const elem = mainScreenRef.current;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }   
      setFullScreen(true);  
    }
    if (mainScreenRef.current && !fullScreen) {
      //touchstart fails with permission check when trying to fullscreen
      //but click action still works on touchscreen so forget about it for now
      //mainScreenRef.current.addEventListener("touchstart",makeFullScreen);
      mainScreenRef.current.addEventListener("click",makeFullScreen);

    }
  },[mainScreenRef, fullScreen]);


  if (ws.dimData) {

    console.log(ws);
    console.log("pixel ratio",window.devicePixelRatio); //we dont need this yet

    return (
      <div>
        <Menu style={ws.dimData.menu} />
        <TargetBoard style={ws.dimData.board} />
        <PlaySpace style={ws.dimData.play} />
      </div>
    );
  }
  else {
    return <div>Waiting</div>
  }

}
