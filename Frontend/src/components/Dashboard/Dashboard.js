import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Dashboard.module.css'; // Import the CSS Module

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const phoneNumber = localStorage.getItem('userPhoneNumber');
            if (!phoneNumber) {
                navigate('/'); // Redirect to login if no phone number found
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/users/get?phoneNumber=${phoneNumber}`
                );
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) return <div className={styles.container}>Loading user data...</div>;
    if (error) return <div className={styles.container}><p className={styles.errorMessage}>{error}</p></div>;
    if (!user) return <div className={styles.container}>No user data found. Please login.</div>;

    const handleLogout = () => {
        localStorage.removeItem('userPhoneNumber');
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Welcome, +{user.phoneNumber}!</h2>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </div>
            <div className={styles.stats}>
                <h3>Your Stats:</h3>
                <p>Points: {user.points}</p>
                <p>Total Questions Attempted: {user.totalQuestions}</p>
                <p>Correct Answers: {user.correctAnswers}</p>
                <p>Wrong Answers: {user.wrongAnswers}</p>
            </div>
            <h3 className={styles.categoryTitle}>Choose a Quiz Category:</h3>
            <div className={styles.categoryGrid}>
                <Link to="/quiz/BASICS" className={styles.categoryCard}>
                    Basics
                </Link>
                <Link to="/quiz/GENERAL" className={styles.categoryCard}>
                    General Knowledge
                </Link>
                <Link to="/quiz/TECHNICAL" className={styles.categoryCard}>
                    Technical
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;