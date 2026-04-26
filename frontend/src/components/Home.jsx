import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-page fade-in">
            <section className="home-hero card">
                <div>
                    <p className="home-kicker">Interview Prep Platform</p>
                    <h1>Crack placements with focused practice, not random scrolling.</h1>
                    <p>
                        PrepPortal gives you structured tests, progress tracking, and interview-ready guidance
                        so your preparation stays consistent and measurable.
                    </p>
                    <div className="home-hero-actions">
                        <Link to="/questions" className="btn btn-primary">Start Practice</Link>
                        <Link to="/dashboard" className="btn btn-secondary">View Progress</Link>
                    </div>
                </div>
                <div className="home-hero-stat-grid">
                    <div className="home-stat-tile">
                        <h3>30+</h3>
                        <p>Practice Tests</p>
                    </div>
                    <div className="home-stat-tile">
                        <h3>7</h3>
                        <p>Core Subjects</p>
                    </div>
                    <div className="home-stat-tile">
                        <h3>150+</h3>
                        <p>MCQ Problems</p>
                    </div>
                    <div className="home-stat-tile">
                        <h3>Daily</h3>
                        <p>Consistency Focus</p>
                    </div>
                </div>
            </section>

            <section className="home-section">
                <h2>How it works</h2>
                <div className="home-grid-3">
                    <div className="card home-info-card">
                        <h3>1. Pick your subject</h3>
                        <p>Choose DSA, DBMS, OS, CN, Aptitude, OOP, or System Design based on your target company role.</p>
                    </div>
                    <div className="card home-info-card">
                        <h3>2. Take timed tests</h3>
                        <p>Attempt curated tests under pressure to improve speed, decision making, and accuracy.</p>
                    </div>
                    <div className="card home-info-card">
                        <h3>3. Fix weak topics</h3>
                        <p>Review weak areas from test outcomes and focus your next revision on high-impact topics.</p>
                    </div>
                </div>
            </section>

            <section className="home-section">
                <h2>What you get</h2>
                <div className="card">
                    <ul className="home-feature-list">
                        <li>Topic-wise test sets across Easy, Medium, and Hard levels</li>
                        <li>Dashboard tracking for solved counts and completion progress</li>
                        <li>Actionable interview tips for coding rounds and HR communication</li>
                        <li>Profile customization with photo and academic details</li>
                        <li>Support for both normal login and Google login</li>
                    </ul>
                </div>
            </section>

            <section className="home-section">
                <div className="card home-cta">
                    <h2>Ready for your next interview cycle?</h2>
                    <p>Build momentum today. Even one focused test session per day compounds quickly.</p>
                </div>
            </section>

            <section className="home-section">
                <h2>30-Day Momentum Plan</h2>
                <div className="home-grid-3">
                    <div className="card home-info-card">
                        <h3>Week 1</h3>
                        <p>Revise fundamentals and attempt one easy test from each subject to map your baseline.</p>
                    </div>
                    <div className="card home-info-card">
                        <h3>Week 2-3</h3>
                        <p>Shift to medium/hard tests and track weak topics daily on your dashboard.</p>
                    </div>
                    <div className="card home-info-card">
                        <h3>Week 4</h3>
                        <p>Simulate interview rounds with timed tests and review every mistake from your result reports.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;