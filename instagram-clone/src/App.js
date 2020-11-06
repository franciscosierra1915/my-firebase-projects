import React, { useState, useEffect } from 'react';
import Post from './Post';
import './App.css';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

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

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    //Snapshot is a very powerful listener
    //everytime a change happens in my db, Snapshot will take a photo("snapshot") of my db
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
    });
  }, []);

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
    <div className='app'>
      {user?.displayName ? (<ImageUpload username={user.displayName}/>) : <h3>Sorry, but you need to login to upload</h3>}
      <Modal
      open={open}
      onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signup'>
          <center>
          <img
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
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
      <Modal
      open={openSignIn}
      onClose={() => openSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app_login'>
          <center>
          <img
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
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
          <Button type='submit' onClick={signIn} >Sign In</Button>
          </center>
          </form>
        </div>
      </Modal>
      <div className='app_header'>
        <img
        src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
        className='app_headerImage'
        alt='instagram_logo_header'
        />
      </div>
      {
        user ?
        (<Button onClick={() => auth.signOut()} >Logout</Button>) : (
          <div className='app_loginContainer'>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)} >Sign Up</Button>
        </div>
        )
      }
      <h1>Hello from Frank!</h1>
      {
        posts.map(({ id, post }) => (
          <Post postId={id} key={id} user={user} username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
          ))
      }
    </div>
  );
}

export default App;
