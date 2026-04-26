import { useState, useEffect } from 'react';

const avatarOptions = [
    'https://api.dicebear.com/9.x/adventurer/svg?seed=PrepPortal1',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=PrepPortal2',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=PrepPortal3',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=PrepPortal4',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=PrepPortal5',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=PrepPortal6'
];

function Profile({ user, isGuest, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        bio: '',
        university: ''
    });
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [previewPic, setPreviewPic] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const isReadOnlyProfile = isGuest || !user;

    useEffect(() => {
        if (isReadOnlyProfile) return;

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/user/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setFormData({
                    age: data.age || '',
                    bio: data.bio || '',
                    university: data.university || ''
                });
                setPreviewPic(data.profilePic || null);
            })
            .catch(err => {
                console.error("Failed to load profile:", err);
            });
    }, [isReadOnlyProfile, user?.id]);

    if (isReadOnlyProfile) {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="card" style={{ padding: '40px' }}>
                    <h2 style={{ marginBottom: '8px' }}>Profile</h2>
                    <p style={{ marginTop: 0 }}>You are browsing as guest. Login to create and edit your profile.</p>
                    <div style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
                        <div className="card" style={{ marginBottom: 0, padding: '16px' }}>
                            <p style={{ margin: 0, fontWeight: 600 }}>Name</p>
                            <p style={{ margin: '6px 0 0 0' }}>Guest User</p>
                        </div>
                        <div className="card" style={{ marginBottom: 0, padding: '16px' }}>
                            <p style={{ margin: 0, fontWeight: 600 }}>Status</p>
                            <p style={{ margin: '6px 0 0 0' }}>Read-only access</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePicFile(e.target.files[0]);
            setSelectedAvatar('');
            setPreviewPic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleAvatarSelect = (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
        setProfilePicFile(null);
        setPreviewPic(avatarUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('age', formData.age);
            data.append('bio', formData.bio);
            data.append('university', formData.university);
            if (profilePicFile) {
                data.append('profilePic', profilePicFile);
            } else if (selectedAvatar) {
                data.append('profilePicUrl', selectedAvatar);
            }

            const res = await fetch(`http://localhost:5000/api/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            const updatedData = await res.json();

            if (res.ok) {
                setSuccess(true);
                setIsEditing(false);
                onUpdate(updatedData.user); 
                localStorage.setItem('user', JSON.stringify(updatedData.user));
                setPreviewPic(updatedData.user.profilePic);
            } else {
                setError(updatedData.error || 'Failed to update profile');
            }
        } catch (err) {
            setError('Server connection failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {previewPic ? (
                                <img src={previewPic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '2rem', color: '#94a3b8' }}>{user.name.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '28px', background: 'linear-gradient(to right, var(--primary-start), var(--primary-end))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                                {user.name}
                            </h2>
                            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>{user.email}</p>
                        </div>
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
                            <label className="form-label" htmlFor="profilePic">Profile Picture</label>
                            <p style={{ margin: '0 0 10px 0', fontSize: '13px' }}>Upload your own photo or choose a quick avatar.</p>
                            <input
                                type="file"
                                id="profilePic"
                                className="form-input"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Choose Avatar</label>
                            <div className="avatar-picker-grid">
                                {avatarOptions.map((avatarUrl) => (
                                    <button
                                        key={avatarUrl}
                                        type="button"
                                        className={`avatar-option ${previewPic === avatarUrl ? 'active' : ''}`}
                                        onClick={() => handleAvatarSelect(avatarUrl)}
                                    >
                                        <img src={avatarUrl} alt="Avatar option" />
                                    </button>
                                ))}
                            </div>
                        </div>

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
