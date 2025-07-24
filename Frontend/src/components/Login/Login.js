import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'; // Import PhoneInput
import 'react-phone-number-input/style.css'; // Import the default styles for react-phone-number-input
import styles from './Login.module.css'; // Import your custom CSS Module

function Login() {
    const [phoneNumber, setPhoneNumber] = useState(''); // This will now store the full E.164 formatted number (e.g., "+919876543210")
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Basic validation: Check if phoneNumber is not empty and is likely valid
        // The PhoneInput component itself handles a lot of validation internally,
        // but you might want to add more checks here before sending to backend.
        if (!phoneNumber || phoneNumber.length < 5) { // Minimal length check
            setMessage('Please enter a valid phone number including country code.');
            return;
        }

        try {
            // Send the phoneNumber directly as it's already in E.164 format (e.g., +91XXXXXXXXXX)
            const response = await axios.post(
                `http://localhost:8080/api/users/login?phoneNumber=${phoneNumber}`
            );
            console.log('Login successful:', response.data);
            localStorage.setItem('userPhoneNumber', phoneNumber); // Store full phone number
            setMessage('Login successful! Redirecting...');
            navigate('/dashboard'); // Navigate to dashboard
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please try again. ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className={styles.container}>
            <h2>Login / Register</h2>
            <form onSubmit={handleLogin} className={styles.form}>
                <PhoneInput
                    defaultCountry="IN" // Set a default country (e.g., India)
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={setPhoneNumber} // PhoneInput handles updating the state directly
                    className={styles.phoneInputContainer} // Apply custom styling to the wrapper
                    inputClassName={styles.phoneInputField} // Apply styling to the actual input field
                />
                <button type="submit" className={styles.button}>Login / Register</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}

export default Login;