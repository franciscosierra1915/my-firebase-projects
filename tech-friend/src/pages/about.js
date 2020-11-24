import React, { useRef, useEffect } from "react";
//Styles
import "../styles/about.scss";
//Components
import Header from "../components/header";
// Page State
import state from "../components/state";

export default function About() {
    const scrollArea = useRef();
    const onScroll = (e) => (state.top.current = e.target.scrollTop);
    useEffect(() => void onScroll({ target: scrollArea.current }), []);
    return (
        <>
        <Header/> 
          <div
            className='scrollArea'
            ref={scrollArea}
            onScroll={onScroll}>
            <div className="photos">
            <h1>This is Frank</h1><br></br>
            </div>
          </div>
        </>
      );
}





