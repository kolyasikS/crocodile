import React, { useRef } from 'react';
import { Button, Divider, styled, TextField } from '@mui/material';
import { Link, redirect, useNavigate } from 'react-router-dom';
import styles from './styles/auth.module.scss';
import { LightTextField } from '@shared/CustomMUIComponents';
import { useDispatch } from 'react-redux';
import { setUsername as setUsernameInStore } from '../../store/actions/user.actions';
import { setRoom } from '../../store/actions/game.actions';
import Container from '@widgets/Container';
import { ACCESS_TOKEN } from '../../lib/constants';
const Login = ({username, password, setPassword, setUsername, moveToSignUpPage}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async () => {
        if (!username || !password) {
            return;
        }
        dispatch(setUsernameInStore(username));
        const data = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        }).then(res => res.json());
        if (data.access_token) {
            window.localStorage.setItem(ACCESS_TOKEN, data.access_token);
            navigate('/home');
        } else {
            console.log('false')
        }
    }
    return (
        <section className={styles.formLogin}>
            <Container className={styles.formLoginInner}
            >
                <h1>Login to Crocodile</h1>
                <Divider color={'#fff'} sx={{marginY: 5}} flexItem/>
                <form className={styles.form}>
                    <LightTextField label={'Username'}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <LightTextField label={'Password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={login}
                        sx={{
                            fontSize: 16,
                            width: 150
                        }}
                        variant={'contained'}>
                        Continue
                    </Button>
                </form>
                <p className={styles.signUp}>Don&apos;t have an account? <Button onClick={moveToSignUpPage}>Sign Up</Button></p>
            </Container>
        </section>
    );
};

export default Login;