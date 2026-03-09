import { useState, useEffect } from 'react';

function Dashboard() {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/progress')
            .then((res) => res.json())
            .then((data) => setProgress(data))
            .catch((err) => console.error(err));
    }, []);

    if (!progress) {
        return <div className="card">Loading your progress...</div>;
    }

    const totalQuestions = 18;
    const percentage = Math.round((progress.totalSolved / totalQuestions) * 100) || 0;

    return (
        <div>
            <h2>Home</h2>
            <p>Track your interview preparation journey here.</p>

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
