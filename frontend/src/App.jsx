import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('storedUser');
    return storedUser ? JSON.parse(storedUser && storedUser ) : { points: 0, level: 1 };
  });

  const isAuthenticated = !!localStorage.getItem('token');

   return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} 
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;