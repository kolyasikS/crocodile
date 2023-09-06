import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import { Button, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';

const Chat = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);

    const messageRef = useRef();
    const listMessagesRef = useRef();
    useEffect(() => {
        if (listMessagesRef.current) {
            listMessagesRef.current.scrollTop = listMessagesRef.current.scrollHeight;
        }
    }, [messages])
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onReMessage(data) {
            setMessages(previous => [...previous, data.message]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('reMessage', onReMessage);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('reMessage', onReMessage);
        };
    }, []);

    const sendMessage = async (e) => {
        if (!messageRef.current.value) {
            return;
        }
        socket.timeout(5000).emit('message', messageRef.current.value, () => {
        });

        messageRef.current.value = '';
    }

    const clearMessages = () => {
        setMessages([]);
    }
    return (
        <div className={'flex flex-col items-center justify-end h-[800px] w-[500px] py-10 px-5 rounded-2xl border-2 border-black'}>
            <List className={'max-h-[500px] overflow-auto w-full flex flex-col items-center'}
                  sx={{
                      position: 'relative',
                      overflow: 'auto',
                  }}
                  ref={listMessagesRef}
            >
                {messages.length
                    ? messages.map((value, ind) =>
                        <ListItem key={ind}>
                            <ListItemText className={'mb-3 text-2xl text-center'}>
                                {value}
                            </ListItemText>
                            </ListItem>)
                    : <h1 className={'text-4xl'}>No messages...</h1>
                }
            </List>
            <TextField
                multiline={true}
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