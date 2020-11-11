import React, { useState, useEffect } from 'react';
import '../styles/Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from 'firebase';

function Post({ user, postId, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const postComment = (e) => {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map(doc => ({
                    commentId: doc.id,
                    comment: doc.data()
                })));
            });
        }
        return () => {
            unsubscribe();
        };
    }, [postId])
    return (
        <div className='post'>
            <div className='post_header'>
            <Avatar 
            className='post_avatar'
            alt="frank01"
            src='/static/images//avatar/1.jpg'
            />
            <h3>{username}</h3>
            </div>
            <img className='post_image' src={imageUrl} alt='first-posted'/>
            <h4 className='post_text'><strong>{username}</strong>{caption}</h4>
            <div className='post_comments'>
                {comments.map(({ commentId, comment}) => (
                    <p key={commentId}>
                        <strong>{comment.username}</strong>{comment.text}
                    </p>
                ))
                }
            </div>
            {user && (
            <form className='post_commentBox'>
                <input className='post_input'
                type='text'
                placeholder='Add a comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}>
                </input>
                <button
                disabled={!comment}
                className='post_button'
                type='submit'
                onClick={postComment}>
                    Post
                </button>
            </form>
            )}
        </div>
    )
}

export default Post
