import React, { useRef, useEffect } from "react";
//Styles
import "../styles/about.scss";
// Page State
import state from "../components/state";
import photo from '../images/frank-headshot.jpeg'

export default function About() {
    const scrollArea = useRef();
    const onScroll = (e) => (state.top.current = e.target.scrollTop);
    useEffect(() => void onScroll({ target: scrollArea.current }), []);
    return (
        <>
          <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
            <div className="about-container">
              <img alt='frank-bio-pic' className="frank-photo" src={photo}></img>
              <div className="bio">
                <p>My name is Francisco Sierra, but you can call me Frank. 
                  I’m a Frontend Developer who loves video, photo and animation. 
                  At heart, I'm a storyteller: I studied poetry in high school, 
                  Graphic Design in my home country Venezuela <span role="img" aria-label="venezuela">🇻🇪</span>, 
                  Film Production at Miami Dade College 
                  and Software Engineering at Flatiron School.
                  I love telling stories using the latest technologies.
                  </p>
                  <p>I built this site using React and Firebase. 
                    I also used Three.js, React Three Fiber, Drei, Sketchfab and React Intersection Observer to make it look nifty. 
                    I hope people can use Tech Friend to donate tech items to those who need them, but can’t afford them.
                  </p>
                  <p>If you like this site, let me know at:</p>
                  <a href='https://www.linkedin.com/in/francisco-sierra-munoz/' target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/fluent/48/000000/linkedin.png" alt="LinkedIn-Icon"/></a>
                  <a href='https://github.com/franciscosierra1915' target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/fluent/48/000000/github.png" alt="Github-Icon"/></a>
                  <a href='https://www.franciscosierra.site' target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/dotty/80/000000/portfolio.png" alt="Portfolio-Icon" style={{width: '48px'}}/></a>
                  <a href='https://www.youtube.com/channel/UCFDp5xoqqDfeiJwyHLkJk7A?view_as=subscriber' target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/cotton/64/000000/youtube.png" alt="Youtube-Icon" style={{width: '48px'}}/></a>
                  <a href='mailto:fransierra.s.15@gmail.com' target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/dusk/64/000000/email.png" alt="Email-Icon" style={{width: '45px'}}/></a>
              </div>
            </div>
          </div>
        </>
      );
}





