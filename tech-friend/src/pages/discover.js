import React, { useRef, useEffect, useState } from "react";
//Styles
import "../styles/discover.scss";
//Components
import Header from "../components/header";
import Post from '../components/Post';
// Page State
import state from "../components/state";
//Firebase
import { db } from '../firebase';
//Avatar Images
import avatar1 from '../images/avatars-tech-friend/01-tech-friend-avatar.png';
import avatar2 from '../images/avatars-tech-friend/02-tech-friend-avatar.png';
import avatar3 from '../images/avatars-tech-friend/03-tech-friend-avatar.png';
import avatar4 from '../images/avatars-tech-friend/04-tech-friend-avatar.png';
import avatar5 from '../images/avatars-tech-friend/05-tech-friend-avatar.png';
import avatar6 from '../images/avatars-tech-friend/06-tech-friend-avatar.png';
import avatar7 from '../images/avatars-tech-friend/07-tech-friend-avatar.png';
import avatar8 from '../images/avatars-tech-friend/08-tech-friend-avatar.png';
import avatar9 from '../images/avatars-tech-friend/09-tech-friend-avatar.png';
import avatar10 from '../images/avatars-tech-friend/10-tech-friend-avatar.png';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10];

export default function Discover({user}) {
    const scrollArea = useRef();
    const onScroll = (e) => (state.top.current = e.target.scrollTop);
    useEffect(() => void onScroll({ target: scrollArea.current }), []);

    const [posts, setPosts] = useState([]);

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

    return (
        <>
        <Header/> 
          <div
            className='scrollArea'
            ref={scrollArea}
            onScroll={onScroll}>
            <div className="posts-container">
            {
              posts.map(({ id, post }) => (
                <Post avatar={avatars[Math.floor(Math.random() * avatars.length)]} postId={id} key={id} user={user} username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
                ))
            }
            </div>
          </div>
        </>
      );
}