import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup({ onSignupSuccess, onGuest }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();

            if (res.ok) {
                onSignupSuccess();
            } else {
                setError(data.error || 'Failed to sign up');
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
                    <h2>Create Account</h2>
                    <p>Get started with your interview preparation.</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', marginBottom: '15px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <button type="button" onClick={() => { window.location.href = 'http://localhost:5000/api/auth/google'; }} className="btn" style={{ width: '100%', marginBottom: '15px', backgroundColor: '#fff', color: '#333', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{width: '18px', height: '18px'}} />
                        Sign up with Google
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
                    Skip Signup
                </button>

                <p className="text-center">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
