import React from "react"

function dims(width, height, top, left, fontSize, scale=1) {
  return {
    position: "absolute",
    fontSize,
    width: width * scale,
    height: height * scale,
    top: top * scale,
    left: left * scale,
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  React.useEffect(() => {
    function handleResize() {

      let width,height;
      if (isTouchDevice) {
        [width,height] = [window.screen.width, window.screen.height];
      }
      else {
        [width, height] = [window.innerWidth,window.innerHeight];
      }

      [width, height] = [window.innerWidth,window.innerHeight];

      let landscape;
      let shortSide, longSide;
  
      if ( width > height) {
        [longSide,shortSide] = [width,height];
        landscape = true;
      }
      else {
        [longSide,shortSide] = [height,width];
        landscape = false;
      }

      let dimData = {menu:{},board:{},play:{}};

      //leave some slack at bottom for iPhone stupid url bars
      const totalBoardLong = isTouchDevice ? 1 : 1;

      let menuLong = .05
      //if ( !isTouchDevice) menuLong = Math.min(menuLong, 30/longSide);

      const nonMenu = totalBoardLong - menuLong;
      const boardLong = nonMenu/2;
      const playLong = nonMenu - boardLong;

      //need everything in pixels
      const [menuLongPx,nonMenuPx,playLongPx,boardLongPx] = 
        [menuLong*longSide, nonMenu*longSide, playLong*longSide, boardLong*longSide];
    
      const fontSize = shortSide * .05;

      if (landscape) {
        //menu on right
        dimData.menu  = new dims(menuLongPx,height,0,nonMenuPx, fontSize);
        dimData.play  = new dims(playLongPx,height,0,0, fontSize); 
        dimData.board = new dims(boardLongPx,height,0,playLongPx, fontSize);
 
      }
      else {
        //menu on bottom
        dimData.menu  = new dims(width, menuLongPx, nonMenuPx, 0, fontSize);
        dimData.play  = new dims(width, playLongPx, 0 , 0, fontSize);
        dimData.board = new dims(width, boardLongPx, playLongPx, 0, fontSize);
      }

      setWindowSize(
        //{width,height}
        {dimData,landscape,width,height,longSide,shortSide,isTouchDevice}
      )
      
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);

  }, [isTouchDevice]);
  return windowSize;
}
