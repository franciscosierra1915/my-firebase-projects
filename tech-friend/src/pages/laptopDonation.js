import React, { useRef, useEffect } from "react";
//Styles
import "../styles/laptopDonation.scss";
//Components
import Header from "../components/header";

// Page State
import state from "../components/state";

export default function LaptopDonation() {
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
        <h1>1</h1><br></br>
        <h1>u</h1><br></br>
        <h1>u</h1><br></br>
        <h1>u</h1><br></br>
        <h1>u</h1><br></br>
        <h1>u</h1><br></br>
        <h1>u</h1><br></br>
        <h1>u</h1><br></br>
        <h1>u9</h1><br></br>
        <h1>uo</h1><br></br>
        <h1>7</h1><br></br>
        <h1>u</h1><br></br>
        <h1>6</h1><br></br>
        <h1>u4</h1><br></br>
        <h1>2</h1><br></br>
        <h1>8</h1><br></br>
        </div>
      </div>
    </>
  );
}