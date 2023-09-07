import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import Login from '../pages/auth/Login';
import App from '../App';
import authRoutes from './auth.routes';
import Auth from '../pages/auth/Auth';
import Game from '../pages/game/Game';
import { ACCESS_TOKEN } from '../lib/constants';

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
        element: <Auth/>
    },
    {
        path: '/game/:room',
        element: <Game/>
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