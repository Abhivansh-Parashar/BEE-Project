import { useState, useEffect } from 'react';

function Tips() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/tips')
            .then((res) => res.json())
            .then((data) => {
                setTips(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Unable to load interview tips right now.');
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Interview Tips</h2>
            <p>Keep these in mind before your big day.</p>

            {loading && <div className="card">Loading tips...</div>}
            {error && <div className="card" style={{ color: 'var(--danger)' }}>{error}</div>}
            {!loading && !error && tips.length === 0 && <div className="card">No tips available yet.</div>}

            <div className="row">
                {tips.map((tip) => (
                    <div className="col-half" key={tip.id}>
                        <div className="card">
                            <h3>{tip.title}</h3>
                            <p>{tip.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tips;
