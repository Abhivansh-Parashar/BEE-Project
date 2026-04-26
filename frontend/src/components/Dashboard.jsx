import { useState, useEffect } from 'react';
import { testsData } from '../data/questionBank';

function Dashboard({ isGuest }) {
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        fetch('http://localhost:5000/api/progress', { headers })
            .then((res) => res.json())
            .then((data) => {
                setProgress({
                    totalSolved: data.totalSolved || 0,
                    easySolved: data.easySolved || 0,
                    mediumSolved: data.mediumSolved || 0,
                    hardSolved: data.hardSolved || 0,
                });
            })
            .catch((err) => {
                console.error(err);
                setError('Could not load progress right now.');
                setProgress({ totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 });
            });
    }, [isGuest]);

    if (!progress) {
        return <div className="card">Loading your progress...</div>;
    }

    const totalQuestions = Object.values(testsData)
        .flat()
        .reduce((count, test) => count + test.questions.length, 0);
    const percentage = Math.round((progress.totalSolved / totalQuestions) * 100) || 0;

    return (
        <div>
            <h2>Home</h2>
            <p>Track your interview preparation journey here.</p>
            {error && <p style={{ color: 'var(--danger)', marginBottom: '12px' }}>{error}</p>}

            <div className="card">
                <h3>Overall Completion</h3>
                <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--primary-start)', margin: '15px 0' }}>
                    {percentage}% <span style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: '500' }}>({progress.totalSolved}/{totalQuestions})</span>
                </div>
                <div className="progress-bg">
                    <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>

            <div className="row">
                <div className="col-third">
                    <div className="stat-card">
                        <h3>{progress.easySolved}</h3>
                        <p>Easy Solved</p>
                    </div>
                </div>
                <div className="col-third">
                    <div className="stat-card">
                        <h3>{progress.mediumSolved}</h3>
                        <p>Medium Solved</p>
                    </div>
                </div>
                <div className="col-third">
                    <div className="stat-card">
                        <h3>{progress.hardSolved}</h3>
                        <p>Hard Solved</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
