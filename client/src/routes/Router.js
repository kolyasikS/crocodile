import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import Login from '../pages/auth/Login';
import App from '../App';
import authRoutes from './auth.routes';
import Auth from '../pages/auth/Auth';
import Game from '../pages/game/Game';
import { ACCESS_TOKEN } from '../lib/constants';
import { socket } from '../socket';

const router = createBrowserRouter([
    {
        path: "/home",
        element: <HomePage/>,
        loader: async () => {
            const token = window.localStorage.getItem(ACCESS_TOKEN);
            const isAuth = await fetch('http://localhost:3000/auth/refresh', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!isAuth.ok) {
                return redirect('/auth');
            }

            return isAuth;
        }
    },
    {
        path: '/auth',
        element: <Auth/>,
    },
    {
        path: '/game/:room',
        element: <Game/>,
        /*loader: async ({params}) => {

            const token = window.localStorage.getItem(ACCESS_TOKEN);
            // console.log('join')
            const role = await fetch('http://localhost:3000/game/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({token, room: params.room})
            });

            // console.log(role);
            return {
                role
            }
        }*/
    },
    {
        path: '*',
        element: <HomePage/>,
        loader: async () => {
            const token = window.localStorage.getItem(ACCESS_TOKEN);
            const isAuth = await fetch('http://localhost:3000/auth/refresh', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!isAuth.ok) {
                return redirect('/auth');
            }

            return isAuth;
        }
    }
]);

export default router;