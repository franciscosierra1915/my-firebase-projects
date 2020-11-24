import React, { useRef, useEffect, useState } from "react";
//Styles
import '../styles/login.css';
import logo from '../images/tech-friend-logo.png'
//Components
import Header from "../components/header";
// Page State
import state from "../components/state";
//App
import { db, auth } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Login() {

  //Scroll
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

    //App

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }

  return (
    <>
    <Header/> 
      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}>
          <div className='login'>
            {/* {user?.displayName ? <h3>Hi {user.displayName}</h3> : <h3>Signin!</h3>} */}
            <Modal open={open} onClose={() => setOpen(false)}>
              <div style={modalStyle} className={classes.paper}>
                <form className='app_signup'>
                  <center>
                  <img src={logo}
                    className='app_headerImage'
                    alt='instagram_logo_header'/>
                    <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <Input
                    placeholder='username'
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                    <Button type='submit' onClick={signUp} >Sign Up</Button>
                    </center>
                    </form>
                    </div>
                    </Modal>
                    <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
                      <div style={modalStyle} className={classes.paper}>
                        <form className='app_login'>
                          <center>
                            <img src={logo} 
                            className='app_headerImage'
                            alt='instagram_logo_header'/>
                            <Input
                            placeholder='email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                            <Input
                            placeholder='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                            <Button type='submit'onClick={signIn} >Sign In</Button>
                            </center>
                            </form>
                            </div>
                            </Modal>
                            {
                            user ?
                            (<Button className="login-buttons" onClick={() => auth.signOut()} style={{color: '#F8F8FF'}}>Logout</Button>) 
                            : 
                            (<div className='app_loginContainer'>
                                <Button className="login-buttons" onClick={() => setOpenSignIn(true)} style={{color: '#F8F8FF'}}>Sign In</Button>
                                <Button className="login-buttons" onClick={() => setOpen(true)} style={{color: '#F8F8FF'}}>Sign Up</Button>
                              </div>
                            )
                            }
               </div>
        </div>
    </>
  );
}

