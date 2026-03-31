import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { register } from '../services/api';

function Register({setUser} ) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Connect to backend API for registration
        try {
            const data = await register({ username, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('storedUser', JSON.stringify(data.user));

            if (setUser) setUser(data.user);
            
            navigate('/dashboard', { replace: true });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md justify-center items-center flex flex-col gap-4 justify-height">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-blue-600">MotivateMate</h1>
                    <p className="text-gray-600">Your personal motivation assistant</p>
                    <p className="text-gray-500 text-sm mt-2 font-italic">Create an account to get started</p>
                </div>
                {error && (<div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>)}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-center">
                        <label className="w-full text-gray-700 mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <label className="w-full text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <label className="w-full text-gray-700 mb-2" htmlFor="password">Password</label>
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
                        <label className="w-full text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {loading ? 'Creating account...' : 'Register'}
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:text-blue-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div >
    );
}

export default Register;