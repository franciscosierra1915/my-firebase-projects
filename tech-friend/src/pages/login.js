import React, { useRef, useEffect, useState } from "react";
//Styles
import '../styles/login.css';
import logo from '../images/tech-friend-logo.png'
//Components
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
// Page State
import state from "../components/state";
//Firebase
import { auth } from '../firebase';
//User Avatars

const avatars = [
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F01-tech-friend-avatar.png?alt=media&token=bdea1182-d439-45a9-b719-acc0f0b8e6e5',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F02-tech-friend-avatar.png?alt=media&token=a7ebc7b2-9117-40df-8241-536ae9d416c2',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F03-tech-friend-avatar.png?alt=media&token=6daaab03-9ef8-4c39-ae44-2e0b262afb4b',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F04-tech-friend-avatar.png?alt=media&token=d3fe585b-1291-451a-b531-12f253f94aaa',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F05-tech-friend-avatar.png?alt=media&token=6c5063e6-e9fa-45cd-9b21-00eda4f0e9e0',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F06-tech-friend-avatar.png?alt=media&token=070c8968-a7b2-4dfd-a632-249cc5086697',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F07-tech-friend-avatar.png?alt=media&token=d43ae467-81a0-49a4-871e-2b54868efca9',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F08-tech-friend-avatar.png?alt=media&token=4f5a635c-b3e8-4f4b-a1fe-a3b087fa9536',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F09-tech-friend-avatar.png?alt=media&token=37436e77-83bd-4073-9433-679d80ad9693',
  'https://firebasestorage.googleapis.com/v0/b/tech-friend-64422.appspot.com/o/images%2F10-tech-friend-avatar.png?alt=media&token=3c87985e-2777-41dc-9723-dbe0edc8f447'
]

//App

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
    width: 500,
    height: 500,
    backgroundColor: '#F88379',
    padding: theme.spacing(15, 20, 3),
  },
}));

export default function Login({ user }) {
  

//Scroll
const scrollArea = useRef();
const onScroll = (e) => (state.top.current = e.target.scrollTop);
useEffect(() => void onScroll({ target: scrollArea.current }), []);

//Functions

const classes = useStyles();
const [modalStyle] = useState(getModalStyle);
const [open, setOpen] = useState(false);
const [openSignIn, setOpenSignIn] = useState(false);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

const signUp = (event) => {
  event.preventDefault();
  auth
  .createUserWithEmailAndPassword(email, password)
  .then((authUser) => {
    return authUser.user.updateProfile({
      displayName: username,
      photoURL: avatars[Math.floor(Math.random() * avatars.length)]
    })
  })
  .catch((error) => alert(error.message))
  setOpen(false);
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
    <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
      <div className='login'>
        <Modal className="modal" open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className='app_signup' style={{marginTop: '-10%'}}>
              <center>
                <img src={logo}
                className='app_headerImage'
                alt='instagram_logo_header'/>
                <Input
                style={{margin: '10px', width: '100%'}}
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                style={{margin: '10px', width: '100%'}}
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                <Input
                style={{margin: '10px', width: '100%'}}
                placeholder='username'
                type='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                <Button type='submit' onClick={signUp} style={{ background: '#F7CE68', color: '#F8F8FF', margin: '10px'}}>Sign Up</Button>
                </center>
                </form>
                </div>
                </Modal>
                <Modal className="modal" open={openSignIn} onClose={() => setOpenSignIn(false)}>
                  <div style={modalStyle} className={classes.paper}>
                    <form className='app_login'>
                      <center>
                        <img src={logo} 
                        className='app_headerImage'
                        alt='instagram_logo_header'/>
                        <Input
                        style={{margin: '10px', width: '100%'}}
                        placeholder='email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        <Input
                        style={{margin: '10px', width: '100%'}}
                        placeholder='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                        <Button type='submit'onClick={signIn} style={{ background: '#F7CE68', color: '#F8F8FF', margin: '10px'}}>Sign In</Button>
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