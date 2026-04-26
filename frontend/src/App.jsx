import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Questions from './components/Questions';
import Tips from './components/Tips';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('guest') === 'true';
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      localStorage.setItem('token', token);
      fetchUserFromToken(token);
    }
  }, [location.search]);

  const fetchUserFromToken = async (token) => {
     try {
       const response = await fetch('http://localhost:5000/api/me', {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

       if (!response.ok) {
         throw new Error('Unable to fetch user profile from token');
       }

       const userData = await response.json();
       localStorage.setItem('user', JSON.stringify(userData));
       localStorage.removeItem('guest');
       setUser(userData);
       setIsGuest(false);
       navigate('/home', { replace: true });
     } catch(e) { console.error(e); }
  };

  const handleLogin = (userData, token) => {
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.removeItem('guest');
    setUser(userData);
    setIsGuest(false);
    navigate('/home');
  };

  const handleGuestLogin = () => {
    localStorage.setItem('guest', 'true');
    localStorage.removeItem('user');
    setIsGuest(true);
    setUser(null);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('guest');
    setUser(null);
    setIsGuest(false);
    navigate('/login');
  };

  const hasAccess = user || isGuest;

  return (
    <div>
      <Navbar user={user} isGuest={isGuest} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={!user ? <Login onLogin={handleLogin} onGuest={handleGuestLogin} /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup onSignupSuccess={() => navigate('/login')} onGuest={handleGuestLogin} /> : <Navigate to="/home" />}
          />

          <Route
            path="/home"
            element={hasAccess ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={hasAccess ? <Dashboard user={user} isGuest={isGuest} /> : <Navigate to="/login" />}
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
            element={hasAccess ? <Profile user={user} isGuest={isGuest} onUpdate={setUser} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <h3>PrepPortal</h3>
            <p>Smart preparation for coding, core CS subjects, and interview confidence.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/questions">Questions</Link>
              <Link to="/tips">Tips</Link>
              <Link to="/profile">Profile</Link>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: support@prepportal.com</p>
          </div>
        </div>
        <p className="site-footer-copy">© {new Date().getFullYear()} PrepPortal. Built for consistent interview preparation.</p>
      </footer>
    </div>
  );
}

export default App;
