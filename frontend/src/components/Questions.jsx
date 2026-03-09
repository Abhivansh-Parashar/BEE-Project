import { useState, useEffect } from 'react';

function Questions() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/questions')
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((err) => console.error(err));
    }, []);

    const handleToggleSolve = (id, currentStatus) => {
        fetch(`http://localhost:5000/api/progress/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ solved: !currentStatus })
        })
            .then((res) => res.json())
            .then((data) => {
                setQuestions((prev) =>
                    prev.map((q) => q.id === id ? { ...q, solved: !currentStatus } : q)
                );
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h2>Coding Challenges</h2>
            <p>Practice these common interview questions.</p>

            <div className="row">
                {questions.map((q) => (
                    <div className="col-half" key={q.id}>
                        <div className="card">
                            <div className="clearfix" style={{ marginBottom: '10px' }}>
                                <span style={{ float: 'left' }} className={`badge badge-${q.difficulty}`}>{q.difficulty}</span>
                                <span style={{ float: 'right', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>{q.category}</span>
                            </div>

                            <h3>{q.title}</h3>

                            <div style={{ marginTop: '15px' }} className="clearfix">
                                <a href={q.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ float: 'left' }}>
                                    Solve
                                </a>
                                {q.solved ? (
                                    <button className="btn btn-success" style={{ float: 'right' }} onClick={() => handleToggleSolve(q.id, q.solved)}>
                                        Solved
                                    </button>
                                ) : (
                                    <button className="btn btn-primary" style={{ float: 'right' }} onClick={() => handleToggleSolve(q.id, q.solved)}>
                                        Mark as Solved
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Questions;
