import React from 'react';
import Chat from '../game/Chat';
import Playground from '../game/Playground';
import Container from '@widgets/Container';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../lib/constants';

const HomePage = () => {
    const username = useSelector(state => state.user.username);
    const navigate = useNavigate();
    const signOut = async () => {
        if (window.localStorage.getItem(ACCESS_TOKEN)) {
            window.localStorage.removeItem(ACCESS_TOKEN);
        }

        navigate('/login');
    }

    return (
        <section className={'flex min-h-[100vh] items-center justify-center'}>
            <Container className={'px-10 py-12'}>
                <Typography variant={'h1'} fontSize={56}>Welcome to Crocodile, <span className={'italic text-cyan-400'}>{username}</span></Typography>
                <Stack direction={'row'} spacing={3} width={'100%'} mt={5} mb={3}>
                    <Box width={'50%'} display={'flex'} justifyContent={'flex-end'}>
                        <Button variant={'contained'} color={'success'}
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
        </section>
    );
};

export default HomePage;