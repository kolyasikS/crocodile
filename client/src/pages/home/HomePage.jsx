import React from 'react';
import Chat from './Chat';
import Playground from './Playground';
import { Container } from '@mui/material';

const HomePage = () => {
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

export default HomePage;