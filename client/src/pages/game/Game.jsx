import React from 'react';
import { Container } from '@mui/material';
import Playground from './Playground';
import Chat from './Chat';
import { useParams } from 'react-router-dom';

const Game = () => {
    let params = useParams();
    console.log(params);

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
                <Playground/>
                <Chat/>
            </Container>
        </section>
    );
};

export default Game;