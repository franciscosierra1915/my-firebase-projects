import React, { useRef, useEffect } from "react";
//Styles
import "../styles/donation.css";
//Components
import ImageUpload from '../components/ImageUpload';
// Page State
import state from "../components/state";

export default function Donation({ user }) {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
        <div className="donate">
        {user ? <ImageUpload user={user}/> : <h1>Please login</h1>}
        </div>
      </div>
    </>
  );
}