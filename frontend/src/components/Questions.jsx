import { useState, useEffect } from 'react';
import { categories, testsData } from '../data/questionBank';

function Questions({ onTestActiveChange }) {
    const [view, setView] = useState('categories'); // categories | testList | activeTest | result
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeTest, setActiveTest] = useState(null);
    
    // Test Taking State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionIndex: selectedOptionIndex }
    const [timeLeft, setTimeLeft] = useState(0);
    const [result, setResult] = useState(null);

    // Timer Effect
    useEffect(() => {
        let timer;
        if (view === 'activeTest' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (view === 'activeTest' && timeLeft === 0) {
            handleSubmitTest();
        }
        return () => clearInterval(timer);
    }, [view, timeLeft]);

    // Notify parent when test is active + block browser close/refresh
    useEffect(() => {
        const isActive = view === 'activeTest';
        if (onTestActiveChange) onTestActiveChange(isActive);

        const handleBeforeUnload = (e) => {
            if (isActive) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        if (isActive) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            // If component unmounts while test is active, reset
            if (isActive && onTestActiveChange) onTestActiveChange(false);
        };
    }, [view]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setView('testList');
    };

    const handleStartTest = (test) => {
        if (!confirm(`Start ${test.name}? You will have ${test.timeLimit} minutes.`)) return;
        setActiveTest(test);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimeLeft(test.timeLimit * 60);
        setView('activeTest');
    };

    const handleOptionSelect = (optionIndex) => {
        setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    };

    const handleSubmitTest = async () => {
        // Calculate Score & Weak Topics
        let score = 0;
        const weakTopics = new Set();
        const answerDetails = activeTest.questions.map((q, idx) => {
            const selected = answers[idx];
            const isCorrect = selected === q.correct;
            if (isCorrect) score++;
            else weakTopics.add(q.topic);
            return {
                questionId: idx,
                question: q.q,
                selected,
                correct: q.correct,
                selectedOption: selected !== undefined ? q.options[selected] : null,
                correctOption: q.options[q.correct],
                topic: q.topic,
                isCorrect
            };
        });

        const testResult = {
            testId: activeTest.id,
            subject: activeCategory.id,
            testName: activeTest.name,
            difficulty: activeTest.difficulty,
            score,
            totalQuestions: activeTest.questions.length,
            percentage: (score / activeTest.questions.length) * 100,
            answers: answerDetails,
            weakTopics: Array.from(weakTopics),
            timeTaken: (activeTest.timeLimit * 60) - timeLeft
        };

        setResult(testResult);
        setView('result');

        // Optional: Save to backend
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch('http://localhost:5000/api/results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(testResult)
                });
            }
        } catch(err) {
            console.error("Failed to save result", err);
        }
    };

    // View: Categories
    if (view === 'categories') {
        return (
            <div className="fade-in">
                <div className="text-center" style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '36px', background: 'linear-gradient(to right, var(--primary-start), var(--primary-end))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                        Assessment Hub
                    </h2>
                    <p>Select a subject to begin practicing</p>
                </div>

                <div className="test-grid">
                    {categories.map(cat => (
                        <div key={cat.id} className="card category-card" onClick={() => handleCategoryClick(cat)}>
                            <div className="icon">{cat.icon}</div>
                            <h3>{cat.name}</h3>
                            <p style={{ margin: 0, fontSize: '13px', textAlign: 'center' }}>
                                {testsData[cat.id]?.length || 0} Tests Available
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // View: Test List
    if (view === 'testList') {
        const tests = testsData[activeCategory.id] || [];
        return (
            <div className="fade-in">
                <button onClick={() => setView('categories')} className="btn btn-secondary" style={{ marginBottom: '20px' }}>
                    &larr; Back to Subjects
                </button>
                <h2>{activeCategory.name} Tests</h2>
                
                <div className="test-list">
                    {tests.length === 0 ? (
                        <p>No tests available for this subject yet.</p>
                    ) : (
                        tests.map(test => (
                            <div key={test.id} className="card test-list-card">
                                <div>
                                    <div className="test-list-meta">
                                        <h3 style={{ margin: 0 }}>{test.name}</h3>
                                        <span className={`badge badge-${test.difficulty}`}>{test.difficulty}</span>
                                    </div>
                                    <p>
                                        <strong style={{ color: 'var(--text-main)' }}>{test.questions.length}</strong> Questions &bull; <strong style={{ color: 'var(--text-main)' }}>{test.timeLimit}</strong> Minutes
                                    </p>
                                </div>
                                <button onClick={() => handleStartTest(test)} className="btn btn-primary">
                                    Start Test
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }

    // View: Active Test
    if (view === 'activeTest') {
        const question = activeTest.questions[currentQuestionIndex];
        const isLastQuestion = currentQuestionIndex === activeTest.questions.length - 1;

        return (
            <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card" style={{ padding: '20px 30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{activeTest.name}</h3>
                    <div style={{ color: timeLeft < 60 ? 'var(--danger)' : 'var(--primary-start)', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ⏱ {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="card" style={{ padding: '40px' }}>
                    <p style={{ margin: '0 0 20px 0', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                        Question {currentQuestionIndex + 1} of {activeTest.questions.length}
                    </p>
                    <h2 style={{ fontSize: '22px', marginBottom: '30px', lineHeight: '1.4' }}>
                        {question.q}
                    </h2>

                    <div style={{ display: 'grid', gap: '12px' }}>
                        {question.options.map((opt, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => handleOptionSelect(idx)}
                                className={`question-option ${answers[currentQuestionIndex] === idx ? 'active' : ''}`}
                            >
                                <span style={{ fontWeight: 'bold', marginRight: '15px', color: 'var(--text-muted)' }}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                {opt}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <button 
                            className="btn btn-secondary" 
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                        >
                            Previous
                        </button>

                        {isLastQuestion ? (
                            <button className="btn btn-primary" onClick={handleSubmitTest} style={{ background: 'var(--success)' }}>
                                Submit Test
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // View: Result
    if (view === 'result') {
        const isPassed = result.percentage >= 60;
        const correctAnswers = result.answers.filter((answer) => answer.isCorrect);
        const wrongAnswers = result.answers.filter((answer) => !answer.isCorrect);
        return (
            <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card" style={{ textAlign: 'center', padding: '50px 30px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>
                        {isPassed ? '🎉' : '📚'}
                    </div>
                    <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Test Completed</h2>
                    <p style={{ fontSize: '18px' }}>You scored <strong>{result.score}</strong> out of <strong>{result.totalQuestions}</strong>.</p>
                    
                    <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ 
                            width: '150px', height: '150px', borderRadius: '50%', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: `8px solid ${isPassed ? 'var(--success)' : 'var(--warning)'}`,
                            fontSize: '36px', fontWeight: 'bold', color: 'var(--text-main)'
                        }}>
                            {Math.round(result.percentage)}%
                        </div>
                    </div>

                    <div className="result-summary-grid">
                        <div className="result-summary-card correct">
                            <h3>{correctAnswers.length}</h3>
                            <p>Correct</p>
                        </div>
                        <div className="result-summary-card wrong">
                            <h3>{wrongAnswers.length}</h3>
                            <p>Wrong / Unanswered</p>
                        </div>
                    </div>

                    {result.weakTopics.length > 0 && (
                        <div style={{ textAlign: 'left', background: 'var(--bg-color-alt)', padding: '20px', borderRadius: '12px', marginTop: '30px' }}>
                            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: 'var(--accent-pink)' }}>⚠️ Areas to Improve</h3>
                            <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Based on your incorrect answers, we recommend focusing on:</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {result.weakTopics.map((topic, i) => (
                                    <span key={i} style={{ padding: '6px 12px', background: 'rgba(255, 123, 114, 0.1)', color: 'var(--accent-pink)', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }}>
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="result-review">
                        <h3>Question Review</h3>
                        {result.answers.map((answer, index) => (
                            <div key={index} className={`result-review-item ${answer.isCorrect ? 'correct' : 'wrong'}`}>
                                <p><strong>Q{index + 1}:</strong> {answer.question}</p>
                                <p>
                                    <strong>Your Answer:</strong> {answer.selectedOption || 'Not Answered'}
                                </p>
                                <p>
                                    <strong>Correct Answer:</strong> {answer.correctOption}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <button className="btn btn-primary" onClick={() => setView('categories')}>
                            Take Another Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default Questions;
