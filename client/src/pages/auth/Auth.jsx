import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        isLogin
            ? <Login username={username} setUsername={setUsername}
                     password={password} setPassword={setPassword}
                     moveToSignUpPage={() => setIsLogin(false)}
            />
            : <SignUp username={username} setUsername={setUsername}
                      password={password} setPassword={setPassword}
                      moveToLoginPage={() => setIsLogin(true)}
            />

    );
};

export default Auth;