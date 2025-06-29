import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register     from './components/auth/Register';
import Login        from './components/auth/Login';
import Todos        from './components/todos/Todos';
import PublicRoute  from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/todos"
                    element={
                        <PrivateRoute>
                            <Todos />
                        </PrivateRoute>
                    }
                />
                {/* catch‑all: if no route matches, send them either to /todos (if authed) or /login */}
                <Route
                    path="*"
                    element={<Navigate to={localStorage.getItem('access_token') ? "/todos" : "/login"} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
