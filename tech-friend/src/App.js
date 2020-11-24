import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


//Pages
import Home from './pages/home';
import Discover from './pages/discover';
import CameraDonation from './pages/cameraDonation';
import LaptopDonation from './pages/laptopDonation';
import PhoneDonation from './pages/phoneDonation';
import Login from './pages/login';


const App = () => {
  return (
    <Router>
      <AnimatePresence initial={false} exitBeforeEnter>
        <Route exact path='/' render={() => <Home/>}/>
        <Route exact path='/login' render={() => <Login/>}/>
        <Route exact path='/discover' render={() => <Discover/>}/>
        <Route exact path='/camera-donation' render={() => <CameraDonation/>}/>
        <Route exact path='/laptop-donation' render={() => <LaptopDonation/>}/>
        <Route exact path='/phone-donation' render={() => <PhoneDonation/>}/>
      </AnimatePresence>
    </Router>
  );
};

export default App;
