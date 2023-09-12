import React, { useEffect, useState } from 'react';
import Chat from '../game/Chat';
import Playground from '../game/Playground';
import Container from '@widgets/Container';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../lib/constants';
import { socket } from '../../socket';
import JoinToRoomDialog from './JoinToRoomDialog';
import { setRoom } from '../../store/actions/game.actions';
import ReturnToGameDialog from './ReturnToGameDialog';

const HomePage = () => {
    const username = useSelector(state => state.user.username);
    const [joinDialog, setJoinDialog] = useState(false);
    const [returnDialog, setReturnDialog] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [game, setGame] = useState(useLoaderData());
    console.log(game);
    useEffect(() => {
        console.log(socket)
        const roomCreated = (data) => {
            dispatch(setRoom(data.room));
            navigate(`/game/${data.room}`);
        }
        const roomLeaved = (data) => {
            console.log('LEAVED');
            setGame(null);
        }
        socket.on('roomCreated', roomCreated);
        socket.on('roomLeaved', roomLeaved);
        return () => {
            socket.off('roomCreated', roomCreated);
            socket.off('roomLeaved', roomLeaved);
        }
    }, []);
    const signOut = async () => {
        if (window.localStorage.getItem(ACCESS_TOKEN)) {
            window.localStorage.removeItem(ACCESS_TOKEN);
        }

        navigate('/login');
    }
    const createGameRoom = () => {
        if (game) {
            console.log('you have already joined to game');
            setReturnDialog(true);
            return;
        }
        socket.timeout(5000).emit('createRoom', {username});
    }
    const joinGameRoom = (link) => {
        if (link.includes('game/')) {
            window.location.href = link;
        }
    }
    const returnGameRoom = () => {
        console.log('back');
        window.location.href = `http://localhost:3001/game/${game.room}`;
    }
    const leaveGameRoom = () => {
        socket.timeout(5000).emit('leaveRoom', {username, room: game.room});
        console.log('leave');
    }
    return (
        <section className={'flex min-h-[100vh] items-center justify-center'}>
            <Container className={'px-10 py-12'}>
                <Typography variant={'h1'} fontSize={56}>Welcome to Crocodile, <span className={'italic text-cyan-400'}>{username}</span></Typography>
                <Stack direction={'row'} spacing={3} width={'100%'} mt={5} mb={3}>
                    <Box width={'50%'} display={'flex'} justifyContent={'flex-end'}>
                        <Button variant={'contained'} color={'success'}
                                onClick={() => setJoinDialog(true)}
                                sx={{
                                    fontSize: 18,
                                    borderRadius: 2,
                                    color: '#fff',
                                    fontWeight: 600
                                }}
                        >Join to game</Button>
                    </Box>
                    <Box width={'50%'} display={'flex'} justifyContent={'flex-start'}
                    >
                        <Button variant={'contained'} color={'info'}
                                onClick={createGameRoom}
                                sx={{
                                    fontSize: 18,
                                    borderRadius: 2,
                                    color: '#fff',
                                    fontWeight: 600
                                }}
                        >Create private game</Button>
                    </Box>
                </Stack>
                <Button variant={'outlined'} sx={{border: 1}} color={'error'}
                        onClick={signOut}
                >
                    Sign out
                </Button>
            </Container>
            <JoinToRoomDialog setOpen={setJoinDialog} open={joinDialog} join={joinGameRoom}/>
            <ReturnToGameDialog setOpen={setReturnDialog} open={returnDialog}
                                leave={leaveGameRoom}
                                back={returnGameRoom}/>
        </section>
    );
};

export default HomePage;