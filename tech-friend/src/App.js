import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//Pages
import Home from './pages/home';
import Discover from './pages/discover';
import Donation from './pages/donation';
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
        <Route exact path='/' render={() => <Home user={user ? user : null}/>}/>
        <Route exact path='/login' render={() => <Login user={user ? user : null}/>}/>
        <Route exact path='/about' render={() => <About user={user ? user : null}/>}/>
        <Route exact path='/discover' render={() => <Discover user={user ? user : null}/>}/>
        <Route exact path='/donation' render={() => <Donation user={user ? user : null}/>}/>
      </AnimatePresence>
    </Router>
  );
};

export default App;
