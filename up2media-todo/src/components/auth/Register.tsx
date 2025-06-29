import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/register', form);
            localStorage.setItem('access_token', res.data.token);
            navigate('/todos');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl mb-4">Register</h1>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={onSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    onChange={onChange}
                    className="w-full mb-2 p-2 border"
                    required
                />
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
                <input
                    name="password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={onChange}
                    className="w-full mb-2 p-2 border"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white mb-4"
                >
                    Register
                </button>
            </form>
            <p className="text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
}
