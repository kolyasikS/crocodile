import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';

const authRoutes = [
    {
        path: "/auth/login",
        element: <Login/>,
    },
    {
        path: "/auth/signup",
        element: <SignUp/>,
    },
]

export default authRoutes;