import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

interface Todo {
    id: number;
    title: string;
    is_completed: boolean;
    created_at: string;
}

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch todos
    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get<Todo[]>('/todos');
                setTodos(data);
            } catch (err: any) {
                setError('Failed to load todos');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Create
    const handleAdd = async (e: FormEvent) => {
        e.preventDefault();
            if (newTitle.trim().length > 255) {
              setError('Title cannot exceed 255 characters.');
              return;
            }

        if (!newTitle.trim()) return;

        try {
            const { data } = await api.post<Todo>('/todos', { title: newTitle });
            setTodos([data, ...todos]);
            setNewTitle('');
            setError('');
        } catch {
            setError('Failed to add todo');
        }
    };

    // Toggle completion
    const handleToggle = async (todo: Todo) => {
        try {
            const { data } = await api.put<Todo>(`/todos/${todo.id}`, {
                is_completed: !todo.is_completed,
            });
            setTodos(todos.map(t => (t.id === todo.id ? data : t)));
        } catch {
            setError('Failed to update todo');
        }
    };

    // Delete
    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this todo?')) return;
        try {
            await api.delete(`/todos/${id}`);
            setTodos(todos.filter(t => t.id !== id));
        } catch {
            setError('Failed to delete todo');
        }
    };

    // Logout
    const handleLogout = async () => {
        await api.post('/logout');
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl">My Todos</h1>
                <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
            </div>

            <form onSubmit={handleAdd} className="flex mb-4">
                <div className="relative w-full mr-2">
                    <input
                        type="text"
                        className="flex-grow w-full border p-2 pr-16 rounded"
                        placeholder="New todo title..."
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                    />
                    <p className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 mb-2">
                        {newTitle.length}/255
                    </p>
                </div>
                <button type="submit" className="px-4 bg-blue-500 text-white rounded">
                    Add
                </button>
            </form>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : todos.length === 0 ? (
                <p className="text-gray-600">No todos yet. Add one above!</p>
            ) : (
                <ul className="space-y-2">
                    {todos.map(todo => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between p-2 border rounded"
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={todo.is_completed}
                                    onChange={() => handleToggle(todo)}
                                />
                                <span
                                    className={`${
                                        todo.is_completed ? 'line-through text-gray-500' : ''
                                    }`}
                                >
                  {todo.title}
                </span>
                            </div>
                            <button
                                onClick={() => handleDelete(todo.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
