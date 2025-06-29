import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const token = localStorage.getItem('access_token');
    // If we have a token, bounce to /todos :)
    if (token) {
        return <Navigate to="/todos" replace />;
    }
    // Otherwise render the login/register page :(
    return children;
}
