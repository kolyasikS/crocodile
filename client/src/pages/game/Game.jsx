import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Playground from './Playground';
import Chat from './Chat';
import { useParams } from 'react-router-dom';
import PlayersList from './PlayersList';
import { socket } from '../../socket';
import { addMessage, addPlayer } from '../../store/actions/game.actions';
import { useDispatch, useSelector } from 'react-redux';
import { chatSelector } from '../../store/selectors';

const Game = () => {
    const params = useParams();
    const [isGameStarted, setIsGameStarted] = useState(false);

    const dispatch = useDispatch();
    const {username, room, players, messages} = useSelector(chatSelector);

    const roomJoined = useCallback((data) => {
        if (players.find(player => player.username === data.username)) {
            return;
        }
        console.log(players, data);
        dispatch(addPlayer(data.username, data.role));
    }, [players]);

    useEffect(() => {
        socket.timeout(5000).emit('joinRoom', {username, room});
    }, []);
    useEffect(() => {

        socket.on('roomJoined', roomJoined);

        return () => {
            socket.off('roomJoined', roomJoined);
        }
    }, [players]);

    return (
        <section className={'flex max-h-[850px] items-center justify-center'}>
            <Container maxWidth={false}
                       sx={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           gap: 5,
                           paddingY: 4,
                           maxWidth: '100%'
                       }}
            >
                <PlayersList/>
                <Playground isGameStarted={isGameStarted}/>
                <Chat isGameStarted={isGameStarted}/>
            </Container>
        </section>
    );
};

export default Game;