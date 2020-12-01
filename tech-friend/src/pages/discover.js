import React, { useRef, useEffect, useState } from "react";
//Styles
import "../styles/discover.scss";
//Components
import Post from '../components/Post';
// Page State
import state from "../components/state";
//Firebase
import { db } from '../firebase';

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
      <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
        <div className="posts-container">
        {
          posts.map(({ id, post }) => (
            <Post 
            avatar={post.userAvatar} 
            postId={id} 
            key={id} 
            user={user} 
            username={post.username} 
            imageUrl={post.imageUrl} 
            caption={post.caption}/>
            ))
        }
        </div>
      </div>
    </>
  );
}