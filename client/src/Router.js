import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Auth from './pages/auth/Auth';
import App from './App';

const router = createBrowserRouter([
    {
        path: "/home",
        element: <HomePage/>,
    },
    {
        path: "/auth",
        element: <Auth/>,
    },
    {
        path: '*',
        element: <HomePage/>,
        loader: async () => {
            const token = window.localStorage.getItem('accessToken');
            const users = await fetch('http://localhost:3000/auth/refresh', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!users.ok) {
                return redirect('/auth');
            }

            return users;
        }
    }
]);

export default router;