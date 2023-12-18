import './App.css';
import WindowManager from './WindowManager';
import {useStore} from "react-redux";
import React from "react";

//am tired of passing props, lets just use redux state
function App() {

  const mainScreenRef = React.useRef();

  return (
    <div ref={mainScreenRef}>
      <WindowManager mainScreenRef={mainScreenRef}/>
    </div>
  );
}

export default App;
