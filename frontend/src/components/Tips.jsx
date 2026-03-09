import { useState, useEffect } from 'react';

function Tips() {
    const [tips, setTips] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/tips')
            .then((res) => res.json())
            .then((data) => setTips(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container">
            <h2>Interview Tips</h2>
            <p>Keep these in mind before your big day.</p>

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
