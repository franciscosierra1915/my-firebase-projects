import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Pages
import Home from './pages/home';
import Discover from './pages/discover';
import Donation from './pages/donation';
import Login from './pages/login';
import About from './pages/about';
//Components
import Header from "./components/header";
//App
import { auth } from './firebase';

const App = () => {
  
  const [user, setUser] = useState(null);


  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // user had logged in
        setUser(authUser);
      } else {
        //user had logged out...
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup actions 
      unsubscribe();
    }
  }, []);

  console.log(user)

  return (
    <Router>
      <Header key='Header' session={user ? 'Logout' : 'Login'}/>
        <Route key='Home' exact path='/' render={() => <Home/>}/>
        <Route key='Login' exact path='/login' render={() => <Login user={user}/>}/>
        <Route key='About' exact path='/about' render={() => <About/>}/>
        <Route key='Discover' exact path='/discover' render={() => <Discover user={user}/>}/>
        <Route key='Donation' exact path='/donation' render={() => <Donation user={user}/>}/>
    </Router>
  );
};

export default App;


