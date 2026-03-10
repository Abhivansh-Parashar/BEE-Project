import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ user, isGuest, onLogout }) {
    const navigate = useNavigate();

    const handleProtectedClick = (e, path) => {
        if (!user && !isGuest) {
            e.preventDefault();
            alert("Please Login First to access this page!");
        } else {
            navigate(path);
        }
    };

    return (
        <div className="navbar">
            <div className="nav-brand">
                <NavLink to="/" style={{ textDecoration: 'none', color: '#0066cc' }}>PrepPortal</NavLink>
            </div>
            <div className="nav-links">
                {/* Always show these links, but protect them with onClick */}
                <a href="#" onClick={(e) => handleProtectedClick(e, '/dashboard')} className="nav-link">
                    Dashboard
                </a>
                <a href="#" onClick={(e) => handleProtectedClick(e, '/questions')} className="nav-link">
                    Questions
                </a>
                <a href="#" onClick={(e) => handleProtectedClick(e, '/tips')} className="nav-link">
                    Tips
                </a>

                {(user || isGuest) ? (
                    <>
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
