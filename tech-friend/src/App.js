import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//Pages

import Home from './pages/home';
import Discover from './pages/discover';
import CameraDonation from './pages/cameraDonation';
import LaptopDonation from './pages/laptopDonation';


const App = () => {
  return (
    <Router>
      <AnimatePresence initial={false} exitBeforeEnter>
            <Route exact path='/' render={() => <Home/>}/>
            <Route exact path='/discover' render={() => <Discover/>}/>
            <Route exact path='/camera-donation' render={() => <CameraDonation/>}/>
            <Route exact path='/laptop-donation' render={() => <LaptopDonation/>}/>
      </AnimatePresence>
    </Router>
  );
};

export default App;
