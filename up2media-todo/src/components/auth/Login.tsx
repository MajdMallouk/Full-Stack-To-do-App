import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', form);
            localStorage.setItem('access_token', res.data.token);
            navigate('/todos');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl mb-4">Login</h1>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={onChange}
                    className="w-full mb-2 p-2 border"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                    className="w-full mb-2 p-2 border"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-green-600 text-white mb-4"
                >
                    Login
                </button>
            </form>
            <p className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );
}
