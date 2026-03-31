import { useState } from 'react';
import { Link }     from 'react-router-dom';
import { login } from '../services/api';

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await login({ identifier, password });

            // Save token and user info to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('storedUser', JSON.stringify(data.user));

            window.location.href = '/dashboard';

        } catch (err) {
            console.error('Login error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-blue-600">MotivateMate</h1>
                    <p className="text-gray-600">Your personal motivation assistant</p>
                    <p className="text-gray-500 text-sm mt-2">Login to access your dashboard</p>
                </div>
                {error && (<div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>)}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-center">
                        <label className="block text-gray-700 mb-2" htmlFor="identifier">Email or Username</label>
                        <input
                            type="text"
                            id="identifier"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                < div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
        </div >
    );
}

export default Login;