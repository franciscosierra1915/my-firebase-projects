import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//Pages
import Home from './pages/home';
import Discover from './pages/discover';
import CameraDonation from './pages/cameraDonation';
import LaptopDonation from './pages/laptopDonation';
import PhoneDonation from './pages/phoneDonation';
import Login from './pages/login';
import About from './pages/about';
//App
import { auth } from './firebase';


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user had logged in
        setUser(authUser)
      } else {
        //user had logged out...
        setUser(null);
      }
    })
    return () => {
      // perform some cleanup actions 
      unsubscribe();
    }
  }, [user]);
  return (
    <Router>
      <AnimatePresence initial={false} exitBeforeEnter>
        {user ? <div>Hi {user.displayName}</div> : null}
        <Route exact path='/' render={() => <Home/>}/>
        <Route exact path='/login' render={() => <Login/>}/>
        <Route exact path='/about' render={() => <About/>}/>
        <Route exact path='/discover' render={() => <Discover/>}/>
        <Route exact path='/camera-donation' render={() => <CameraDonation/>}/>
        <Route exact path='/laptop-donation' render={() => <LaptopDonation/>}/>
        <Route exact path='/phone-donation' render={() => <PhoneDonation/>}/>
      </AnimatePresence>
    </Router>
  );
};

export default App;
