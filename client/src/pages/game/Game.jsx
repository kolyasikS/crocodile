import React, { useState } from 'react';
import { Container } from '@mui/material';
import Playground from './Playground';
import Chat from './Chat';
import { useParams } from 'react-router-dom';
import PlayersList from './PlayersList';

const Game = () => {
    const params = useParams();
    const [isGameStarted, setIsGameStarted] = useState(false);

    return (
        <section className={'flex max-h-[850px] items-center justify-center'}>
            <Container maxWidth={'xl'}
                       sx={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           gap: 5,
                           paddingY: 4
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