import React, { useRef } from 'react';
import { Button, Divider, styled, TextField } from '@mui/material';
import { Link, redirect, useNavigate } from 'react-router-dom';
import styles from './styles/auth.module.scss';
import { LightTextField } from '@shared/CustomMUIComponents';
import { useDispatch } from 'react-redux';
import { setUsername as setUsernameInStore } from '../../store/actions/user.actions';
import { setRoom } from '../../store/actions/game.actions';
const Login = ({username, password, setPassword, setUsername, moveToSignUpPage}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roomRef = useRef();
    const login = async () => {
        if (!username || !roomRef.current.value) {
            return;
        }

        dispatch(setUsernameInStore(username));
        dispatch(setRoom(roomRef.current.value));
        navigate('/home');

        /*if (!username || !password) {
            return;
        }

        const data = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        }).then(res => res.json());
        if (data.access_token) {
            window.localStorage.setItem('accessToken', data.access_token);
            navigate('/home');
        } else {
            console.log('false')
        }*/
    }
    return (
        <section className={styles.formLogin}>
            <div className={`shadow-lg shadow-[#64c7ee] ${styles.formLoginInner}`}>
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
                    <LightTextField label={'Room'}
                                    inputRef={roomRef}
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
            </div>
        </section>
    );
};

export default Login;