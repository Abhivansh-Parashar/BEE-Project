function Home() {
    return (
        <div>
            <h2>Welcome to PrepPortal</h2>
            <div className="card">
                <h3>About This Website</h3>
                <p>
                    PrepPortal is a comprehensive interview preparation platform designed
                    to help students and professionals get ready for their upcoming technical interviews.
                </p>
                <p>
                    Here you can track your progress on common coding challenges, read helpful interview tips,
                    and keep all your preparation organized in one place.
                </p>
                <div style={{ marginTop: '20px' }}>
                    <p><strong>Features:</strong></p>
                    <ul>
                        <li>✔ Track coding questions across different difficulty levels</li>
                        <li>✔ View a dashboard of your learning progress</li>
                        <li>✔ Study essential interview tips and practices</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;