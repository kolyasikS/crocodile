import React from 'react';
import { Button, Divider, styled, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles/auth.module.scss';
import { LightTextField } from '@shared/CustomMUIComponents';


const SignUp = ({username, password, setPassword, setUsername, moveToLoginPage}) => {
    const signUp = () => {

    }
    return (
        <section className={styles.formLogin}>
            <div className={styles.formLoginInner}>
                <h1>Sign up to Crocodile</h1>
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
                        onClick={signUp}
                        sx={{
                            fontSize: 16,
                            width: 150
                        }}
                        variant={'contained'}>
                        Continue
                    </Button>
                </form>
                <p className={styles.signUp}>Don&apos;t have an account? <Button onClick={moveToLoginPage}>Login</Button></p>
            </div>
        </section>
    );
};

export default SignUp;