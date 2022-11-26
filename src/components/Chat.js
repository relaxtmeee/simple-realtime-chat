import { useContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, getDocs, addDoc, doc, query, limit, onSnapshot} from "firebase/firestore";

import { Context } from "../index";
import { Grid, TextField, Button, Avatar} from "@mui/material";
import { Container } from "@mui/system";
import Loader from "./Loader";

import './chat.scss'

const Chat = () => {
    const {auth, firestore, db} = useContext(Context);
    const [user] = useAuthState(auth);
 

    const sendMessage = async () => {
        const value = document.getElementById('message').value;
        if (value.length > 0) {
            const docRef = await addDoc(collection(db, "message"), {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: new Date().getTime()
            });
            document.querySelectorAll('input').forEach(item => {
                item.value = '';
            })
        }
    }
  

    return (
        <Container>
            <Grid container
                style={{'height': window.innerHeight - 50, 'marginTop': 5}}
                alignItems={'center'}
                justifyContent={'center'}   
            >
                <MessagesList />
                <Grid 
                    display={'flex'} flexDirection={'column'} alignItems={'flex-end'}
                    style={{'width': '60%'}}
                >
                    <TextField
                        id='message'
                        variant={'outlined'} 
                        fullWidth 
                        maxRows={2}/>
                    <Button onClick={sendMessage} style={{'marginTop': '10px'}} variant={'outlined'}>Отправить</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

const MessagesList =  () => {

    const {auth, firestore, db} = useContext(Context);
    const [user] = useAuthState(auth);

    const [messages, loading] =  useCollectionData( 
        query(collection(db, 'message'), orderBy("createdAt", "desc"))
    )

    useEffect(() => {
        if (document.getElementById('chat-list')) {
            document.getElementById('chat-list').scrollTop = document.getElementById('chat-list').scrollHeight - document.getElementById('chat-list').clientHeight;
        }
    })

    const scrollFunc = (event) => {
        if(event.target.scrollTop === 0) {

        }
    }   

    if(loading) {
        return <Loader />
    }
    const newArr = messages ? messages.reverse() : null;
    return (
        <div onScroll={event => scrollFunc(event)} id='chat-list' style={{'width': '60%', 'height': '60vh', 'border': '1px solid grey', 'overflowY': 'auto', 'padding': '10px 0'}}>
           {
               newArr ? newArr.map((message, index) => 
                    index > 0 && messages[index - 1].uid == message.uid
                    ? 
                        <div className='list-messsage' style={{'width': 'fit-content',
                        'padding': '5px',
                        'color': '#fff',
                        'marginTop': '5px',
                        'marginLeft': '10px',
                        'background': user.uid === message.uid ? '#1976d2' : 'red',
                        'borderRadius': '5px'
                        }}>
                            {message.text}
                        </div>
                    
                    :
                    <>
                        <div style={{
                            'width': 'fit-content',
                            'padding': '0 5px',
                            'marginTop': '10px'
                        }}>
                        <Grid container     
                            alignItems={'center'}
                            justifyContent={'center'}   
                        >
                            <Avatar src={message.photoURL}>

                            </Avatar>
                            <div >
                                {message.displayName}
                            </div>
                            </Grid>
                        </div>
                        <div className='list-messsage' style={{'width': 'fit-content',
                            'padding': '5px',
                            'marginTop': '5px',
                            'marginLeft': '10px',
                            'background': user.uid === message.uid ? '#1976d2' : 'red',
                            'color': '#fff',
                            'borderRadius': '5px'
                            }}>
                            {message.text}
                        </div>
                    </>   
                )
                : 
                'There is no messages'
           }
        </div>
    )
}
export default Chat;
