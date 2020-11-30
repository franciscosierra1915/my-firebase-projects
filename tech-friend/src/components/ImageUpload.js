import React, { useState } from 'react';
//Firebase
import { storage, db } from '../firebase';
import firebase from 'firebase';
//Redirect
import { useHistory } from "react-router-dom";

function ImageUpload({user}) {
    
const [image, setImage] = useState(null);
const [caption, setCaption] = useState('');
const [progress, setProgress] = useState(0);
const [error, setError] = useState(null);
let history = useHistory();
const types = ['image/png', 'image/jpeg'];
    
const handleChange = (e) => {
    let selected = e.target.files[0]
    if ((selected && types.includes(selected.type))) {
        setImage(selected);
        setError(false);
    } else {
        setImage(null);
        setError(true);
    }
}
    
const handleUpload = () => {
    if(!image){
        alert('Please select an image')
    } else {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //Error function...
                console.log(error)
                alert(error.message);
            },
            () => {
                //complete function...
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then( url => {
                    //post image inside db
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: user.displayName,
                        userAvatar: user.photoURL
                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                    history.push('/discover');
                })
            }
        )
    }
}

return (
    <div className='image-upload'>
        { error && <p className='error-image-type'>Please select a PNG or JPEG image</p> }
        <progress style={{height: '50px'}} value={progress} max='100'/>
        <input className='choose-file' style={{color: '#808080'}} type='file' onChange={handleChange}/>
        <input type='text' placeholder='Describe your item...' value={caption} onChange={event => setCaption(event.target.value)}/>
        <button style={{color: '#F8F8FF'}} onClick={handleUpload}> Upload</button>
    </div>)
}

export default ImageUpload
