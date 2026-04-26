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
                <NavLink to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>PrepPortal</NavLink>
            </div>
            <div className="nav-links">
                <NavLink to="/dashboard" onClick={(e) => handleProtectedClick(e, '/dashboard')} className="nav-link">
                    Dashboard
                </NavLink>
                <NavLink to="/questions" onClick={(e) => handleProtectedClick(e, '/questions')} className="nav-link">
                    Questions
                </NavLink>
                <NavLink to="/tips" onClick={(e) => handleProtectedClick(e, '/tips')} className="nav-link">
                    Tips
                </NavLink>

                {(user || isGuest) ? (
                    <>
                        <NavLink to="/profile" className="nav-link" style={{ fontWeight: '600', color: 'var(--primary-start)' }}>
                            <span className="nav-profile-chip">
                                {user?.profilePic ? (
                                    <img src={user.profilePic} alt="Profile" className="nav-profile-avatar" />
                                ) : (
                                    <span className="nav-profile-avatar nav-profile-initial">
                                        {user ? user.name.charAt(0).toUpperCase() : 'G'}
                                    </span>
                                )}
                                <span>{user ? user.name : 'Profile'}</span>
                            </span>
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
