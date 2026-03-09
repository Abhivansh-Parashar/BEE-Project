import { NavLink } from 'react-router-dom';

function Navbar({ user, isGuest, onLogout }) {
    return (
        <div className="navbar">
            <div className="nav-brand">
                <NavLink to="/" style={{ textDecoration: 'none', color: '#0066cc' }}>PrepPortal</NavLink>
            </div>
            <div className="nav-links">
                {(user || isGuest) ? (
                    <>
                        <NavLink to="/dashboard" className="nav-link">
                            Dashboard
                        </NavLink>
                        <NavLink to="/questions" className="nav-link">
                            Questions
                        </NavLink>
                        <NavLink to="/tips" className="nav-link">
                            Tips
                        </NavLink>

                        {user ? (
                            <>
                                <NavLink to="/profile" className="nav-link" style={{ fontWeight: '600', color: 'var(--primary-start)' }}>
                                    {user.name}
                                </NavLink>
                                <button onClick={onLogout} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                                <NavLink to="/signup" className="btn btn-primary" style={{ padding: '6px 16px' }}>
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>
                        <NavLink to="/signup" className="btn btn-primary" style={{ padding: '6px 16px', marginLeft: '10px' }}>
                            Sign Up
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
