import React from 'react';
import styles from './QuestionCard.module.css'; // Import the CSS Module

function QuestionCard({ question, selectedOption, onOptionSelect, showFeedback, isCorrect, explanation }) {
    if (!question) {
        return <div className={styles.container}>Loading question...</div>;
    }

    const getOptionClassName = (optionNum) => {
        let className = styles.option;
        if (showFeedback) {
            if (optionNum === question.correctOption) {
                className += ` ${styles.optionCorrect}`;
            } else if (optionNum === selectedOption) {
                className += ` ${styles.optionWrong}`;
            }
        } else if (optionNum === selectedOption) {
            className += ` ${styles.optionSelected}`;
        }
        return className;
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.questionText}>{question.questionText}</h3>
            {question.questionImageUrl && (
                <img src={question.questionImageUrl} alt="Question" className={styles.image} />
            )}
            <div className={styles.optionsContainer}>
                {[1, 2, 3, 4].map((num) => (
                    <button
                        key={num}
                        className={getOptionClassName(num)}
                        onClick={() => onOptionSelect(num)}
                        disabled={showFeedback}
                    >
                        {question[`option${num}`]}
                    </button>
                ))}
            </div>
            {showFeedback && (
                <div className={styles.feedbackContainer}>
                    <p className={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
                        {isCorrect ? 'Correct!' : 'Incorrect!'}
                    </p>
                    <p className={styles.explanationText}>
                        Explanation: {explanation}
                    </p>
                    {question.explanationImageUrl && (
                        <img src={question.explanationImageUrl} alt="Explanation" className={styles.image} />
                    )}
                </div>
            )}
        </div>
    );
}

export default QuestionCard;