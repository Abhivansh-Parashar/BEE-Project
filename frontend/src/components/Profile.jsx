import { useState, useEffect } from 'react';

function Profile({ user, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        bio: '',
        university: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setFormData({
                    age: data.age || '',
                    bio: data.bio || '',
                    university: data.university || ''
                });
            })
            .catch(err => {
                console.error("Failed to load profile:", err);
            });
    }, [user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`http://localhost:5000/api/user/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setIsEditing(false);
                onUpdate(data.user); 
            } else {
                setError(data.error || 'Failed to update profile');
            }
        } catch (err) {
            setError('Server connection failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <div className="card" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '28px', background: 'linear-gradient(to right, var(--primary-start), var(--primary-end))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                            {user.name}
                        </h2>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>{user.email}</p>
                    </div>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                            Edit Profile
                        </button>
                    )}
                </div>

                {error && <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}
                {success && <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>Profile updated successfully!</div>}

                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                className="form-input"
                                placeholder="E.g., 20"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="university">University / College</label>
                            <input
                                type="text"
                                id="university"
                                className="form-input"
                                placeholder="Enter your university"
                                value={formData.university}
                                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                className="form-input"
                                placeholder="A short description about yourself and your goals..."
                                rows="4"
                                style={{ resize: 'vertical' }}
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            ></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div style={{ display: 'grid', gap: '20px' }}>
                        <div>
                            <p style={{ margin: '0 0 5px 0', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Age</p>
                            <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-main)' }}>{formData.age ? formData.age : <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not provided</span>}</p>
                        </div>
                        <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }}></div>

                        <div>
                            <p style={{ margin: '0 0 5px 0', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)' }}>University</p>
                            <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-main)' }}>{formData.university ? formData.university : <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not provided</span>}</p>
                        </div>
                        <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }}></div>

                        <div>
                            <p style={{ margin: '0 0 5px 0', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Bio</p>
                            <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>{formData.bio ? formData.bio : <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Tell us about yourself...</span>}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
