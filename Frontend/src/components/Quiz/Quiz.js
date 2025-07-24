import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../QuestionCard/QuestionCard'; // Adjust path
import styles from './Quiz.module.css'; // Import the CSS Module

function Quiz() {
    const { type } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`http://localhost:8080/api/questions/type/${type}`);
                if (response.data && response.data.length > 0) {
                    setQuestions(response.data);
                } else {
                    setError(`No questions found for ${type} category.`);
                }
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Failed to load questions. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [type]);

    const handleOptionSelect = (optionNum) => {
        if (!showFeedback) {
            setSelectedOption(optionNum);
        }
    };

    const handleSubmitAnswer = async () => {
        if (selectedOption === null) {
            alert('Please select an option before submitting.');
            return;
        }

        const phoneNumber = localStorage.getItem('userPhoneNumber');
        if (!phoneNumber) {
            alert('You are not logged in. Please log in first.');
            navigate('/');
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];

        try {
            const response = await axios.post('http://localhost:8080/api/users/submit-answer', {
                phoneNumber: phoneNumber,
                questionId: currentQuestion.id,
                selectedOption: selectedOption,
            });
            console.log('Answer submission response:', response.data);
            setIsCorrect(response.data.isCorrect);
            setExplanation(response.data.explanation);
            setShowFeedback(true);
        } catch (err) {
            console.error('Error submitting answer:', err);
            alert('Failed to submit answer. Please try again.');
        }
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedOption(null);
        setIsCorrect(false);
        setExplanation('');

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Quiz finished! Returning to dashboard.');
            navigate('/dashboard');
        }
    };

    if (loading) return <div className={styles.container}>Loading quiz...</div>;
    if (error) return <div className={styles.container}><p className={styles.errorMessage}>{error}</p><button onClick={() => navigate('/dashboard')} className={styles.button}>Go to Dashboard</button></div>;
    if (questions.length === 0) return <div className={styles.container}>No questions available for this category. <button onClick={() => navigate('/dashboard')} className={styles.button}>Go to Dashboard</button></div>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Quiz: {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}</h2>
            <div className={styles.progress}>
                Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <QuestionCard
                question={currentQuestion}
                selectedOption={selectedOption}
                onOptionSelect={handleOptionSelect}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
                explanation={explanation}
            />

            <div className={styles.buttonContainer}>
                {!showFeedback ? (
                    <button onClick={handleSubmitAnswer} disabled={selectedOption === null} className={styles.button}>
                        Submit Answer
                    </button>
                ) : (
                    <button onClick={handleNextQuestion} className={styles.button}>
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Quiz;