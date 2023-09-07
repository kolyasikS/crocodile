import React, { useCallback, useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import { Button, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import { LightTextArea, LightTextField } from '@shared/CustomMUIComponents';
import { io, Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import { chatSelector } from '../../store/selectors';
import { addMessage, addPlayer, clear } from '../../store/actions/game.actions';

const Chat = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    const messageRef = useRef();
    const listMessagesRef = useRef();

    const dispatch = useDispatch();
    const {username, room, players, messages} = useSelector(chatSelector);

    console.log('players', players);
    useEffect(() => {
        if (listMessagesRef.current) {
            listMessagesRef.current.scrollTop = listMessagesRef.current.scrollHeight;
        }
    }, [messages])
    useEffect(() => {
        if (isConnected) {
            socket.emit('joinRoom', {room, username});
        }

    }, []);
    const roomCreated = useCallback((data) => {
        console.log('joined', data, room);
        console.log(players, data.username, username, players.includes(data.username));
        if (players.includes(data.username)) {
            return;
        }
        dispatch(addPlayer(data.username));
        dispatch(addMessage({username: data.username, type: 'NEW_PLAYER'}));
    }, [players]);

    useEffect(() => {
        console.log(players, socket);
        function onConnect() {
            setIsConnected(true);
            console.log(socket.id, room);
            socket.emit('joinRoom', {room, username});
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onReMessage(data) {
            console.log(data);
            dispatch(addMessage({...data, type: 'DEFAULT'}));
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
    }, [roomCreated]);
    const sendMessage = async (e) => {
        if (!messageRef.current.value) {
            return;
        }
        socket.timeout(5000).emit('message', {message: messageRef.current.value, username, room}, () => {
        });

        messageRef.current.value = '';
    }
    console.log(messages);
    const clearMessages = () => {
        dispatch(clear());
    }
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
                {messages?.length
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