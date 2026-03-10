import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Questions from './components/Questions';
import Tips from './components/Tips';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isGuest, setIsGuest] = useState(() => {
    return sessionStorage.getItem('guest') === 'true';
  });

  const handleLogin = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.removeItem('guest');
    setUser(userData);
    setIsGuest(false);
  };

  const handleGuestLogin = () => {
    sessionStorage.setItem('guest', 'true');
    setIsGuest(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('guest');
    setUser(null);
    setIsGuest(false);
  };

  const hasAccess = user || isGuest;

  return (
    <div>
      <Navbar user={user} isGuest={isGuest} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={!hasAccess ? <Navigate to="/login" /> : <Navigate to="/home" />}
          />

          <Route
            path="/login"
            element={!user ? <Login onLogin={handleLogin} onGuest={handleGuestLogin} /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup onLogin={handleLogin} onGuest={handleGuestLogin} /> : <Navigate to="/home" />}
          />

          <Route
            path="/home"
            element={hasAccess ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={hasAccess ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/questions"
            element={hasAccess ? <Questions /> : <Navigate to="/login" />}
          />
          <Route
            path="/tips"
            element={hasAccess ? <Tips /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} onUpdate={setUser} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
