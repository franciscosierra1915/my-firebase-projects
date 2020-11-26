import React, { useState } from 'react';
import { storage, db } from '../firebase';
import firebase from 'firebase';

function ImageUpload({username}) {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
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
                            username: username
                        });
    
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                        setUrl(url)
                    })
                }
            )
        }

    }

    return (
        <div className='image-upload'>
            <progress style={{height: '50px'}} value={progress} max='100'/>
            <input className='choose-file' style={{color: '#808080'}} type='file' onChange={handleChange}/>
            <input type='text' placeholder='Enter a description...' value={caption} onChange={event => setCaption(event.target.value)}/>
            <button style={{color: '#F8F8FF'}} onClick={handleUpload}>
                Upload
            </button>
        </div>
    )
}

export default ImageUpload
