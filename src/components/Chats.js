import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';


const Chats = () => {

    const history = useHistory();

    const [loading, setLoading] = useState(true);

    const { user } = useAuth(); // fetching user data/oject from AuthContext that we created

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    // this func will handle user's image
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob(); // blobs are usually files like images or any other type of file that we want to transfer over in binary format

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if(!user) {
            history.push('/');
            return;
        }

        // if the user has already been created then make an api call to the chatengine so that we could show up the all the chats of that specific user
        axios.get('https://api.chatengine.io/users/me', {
            headers : {
                "project-id" : process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name" : user.displayName,
                "user-secret" : user.uid
            }
        })
        .then(() => {  // after getting the chatengine profile of that user, loading will stop and chats will appear
            setLoading(false);
        })
        .catch(() => {  // if that person's chatengine profile doesnt exists , then we must make one
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.displayName);
            formdata.append('secret', user.uid);

            // calling an API to get image
            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    // calling chatengine API to create the new user
                    axios.post('https://api.chatengine.io/users', 
                        formdata, 
                        { headers: { "private-key" : process.env.REACT_APP_CHAT_ENGINE_KEY } }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
            })
        })
    }, [user, history]);

    if(!user || loading) {
        return 'Loading...';
    }

    return (  
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Messenger
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    LogOut
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.displayName}
                userSecret={user.uid}
            />
        </div>
    );
}
 
export default Chats;