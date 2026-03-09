import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin, onGuest }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                onLogin(data.user);
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="text-center">
                    <h2>Welcome Back</h2>
                    <p>Please enter your details to sign in.</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', marginBottom: '15px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '15px' }} disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    onClick={onGuest}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginBottom: '20px' }}
                >
                    Skip Login
                </button>

                <p className="text-center">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
