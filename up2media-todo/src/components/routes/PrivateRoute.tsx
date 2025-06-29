import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem('access_token');
    // If no token, redirect to login :(
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    // Otherwise render the protected page ;)
    return children;
}
