import React, { useRef, useEffect } from "react";
//Styles
import "../styles/donation.css";
//Components
import Header from "../components/header";
import ImageUpload from '../components/ImageUpload';
// Page State
import state from "../components/state";

export default function Donation({ user }) {
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
        <div className="donate">
        {user?.displayName ? (<ImageUpload username={user.displayName}/>) : <h1>Please login</h1>}
        </div>
      </div>
    </>
  );
}