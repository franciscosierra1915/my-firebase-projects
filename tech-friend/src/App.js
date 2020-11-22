// import React, { useState, useEffect } from 'react';
import React from 'react';
// import { db, auth } from './firebase';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import Post from './Post';
// import ImageUpload from './ImageUpload';

//Pages

import Home from './pages/home';
import Discover from './pages/discover';
// import Login from './pages/login';
import CameraDonation from './pages/cameraDonation';
import LaptopDonation from './pages/laptopDonation';
import PhoneDonation from './pages/phoneDonation';


const App = () => {
  return (
    <Router>
      <AnimatePresence initial={false} exitBeforeEnter>
        <Route exact path='/' render={() => <Home/>}/>
        <Route exact path='/discover' render={() => <Discover/>}/>
        {/* <Route exact path='/login' render={() => <Login/>}/> */}
        <Route exact path='/camera-donation' render={() => <CameraDonation/>}/>
        <Route exact path='/laptop-donation' render={() => <LaptopDonation/>}/>
        <Route exact path='/phone-donation' render={() => <PhoneDonation/>}/>
      </AnimatePresence>
    </Router>
  );
};

export default App;
