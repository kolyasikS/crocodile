import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import { Button, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import { LightTextArea, LightTextField } from '@shared/CustomMUIComponents';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import Message from './Message';
import { chatSelector } from '../../store/selectors';

const Chat = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);

    const messageRef = useRef();
    const listMessagesRef = useRef();

    const {username, room} = useSelector(chatSelector);
    console.log(1);
    useEffect(() => {
        if (listMessagesRef.current) {
            listMessagesRef.current.scrollTop = listMessagesRef.current.scrollHeight;
        }
    }, [messages])
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            socket.emit('joinRoom', room);
        }

        function onDisconnect() {
            setIsConnected(false);
            setMessages([]);
        }

        function onReMessage(data) {
            console.log(data);
            setMessages(previous => [...previous, {...data, type: 'DEFAULT'}]);
        }

        function roomCreated(data) {
            console.log('joined', data, room);
            setMessages(prevState => [...prevState, {username, type: 'NEW_PLAYER'}]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('reMessage', onReMessage);
        socket.on('roomCreated', roomCreated);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('reMessage', onReMessage);
            socket.off('roomCreated', roomCreated);
        };
    }, []);
    console.log(messages, room);
    const sendMessage = async (e) => {
        if (!messageRef.current.value) {
            return;
        }
        socket.timeout(5000).emit('message', {message: messageRef.current.value, username, room}, () => {
        });

        messageRef.current.value = '';
    }

    const clearMessages = () => {
        setMessages([]);
    }
    console.log(username);
    return (
        <div className={'relative shadow-lg bg-[#101418] shadow-[#64c7ee] flex flex-col items-center justify-end h-[800px] w-[500px] pb-10 pt-16 px-5 rounded-2xl border-2 border-black'}>
            <h2 className={'absolute top-5 text-3xl'}>{room}</h2>
            <List className={'max-h-[500px] overflow-auto w-full flex flex-col items-center'}
                  sx={{
                      position: 'relative',
                      overflow: 'auto',
                  }}
                  ref={listMessagesRef}
            >
                {messages.length
                    ? messages.map((message, ind) => <Message {...message} key={ind}/>)
                    : <h1 className={'text-4xl'}>No messages...</h1>
                }
            </List>
            <LightTextField
                sx={{
                    marginY: 5
                }}
                fullWidth={true}
                placeholder={'Message...'}
                inputRef={messageRef}
            />
            <Stack
                direction={'row'}
                spacing={2}
            >
                <Button
                    onClick={sendMessage}
                    sx={{
                        fontSize: 16,
                        width: 150
                    }}
                    variant={'contained'}>
                    Send
                </Button>
                <Button
                    onClick={clearMessages}
                    sx={{
                        fontSize: 16,
                        width: 150
                    }}
                    variant={'contained'}
                    color={'error'}
                >
                    Clear
                </Button>
            </Stack>
        </div>
    );
};

export default Chat;