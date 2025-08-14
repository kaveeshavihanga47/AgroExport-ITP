import React, { useState } from 'react';

const ChangeUsername = () => {
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      setErrorMessage('Username cannot be empty!');
      setSuccessMessage('');
    } else {
      setSuccessMessage(`Username successfully changed to ${username}!`);
      setErrorMessage('');
      // Typically handle the username change logic, like calling an API here
    }
  };

  const styles = {
    body: {
      background: 'linear-gradient(135deg, #0d3b66, #3a7ca5, #f4d35e)',
      backgroundSize: 'cover',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    changeUsernameContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    formCard: {
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      padding: '40px',
      width: '350px',
      textAlign: 'center',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    formTitle: {
      fontSize: '24px',
      color: 'white',
      marginBottom: '20px',
      textShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    },
    inputGroup: {
      marginBottom: '20px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: '#fff',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      color: '#fff',
      fontSize: '16px',
      outline: 'none',
    },
    inputPlaceholder: {
      color: 'rgba(255, 255, 255, 0.6)',
    },
    errorMessage: {
      color: '#ff6b6b',
      fontSize: '14px',
      marginBottom: '10px',
    },
    successMessage: {
      color: '#2ed573',
      fontSize: '14px',
      marginBottom: '10px',
    },
    submitBtn: {
      background: 'linear-gradient(135deg, #4cc9f0, #4361ee)',
      color: 'white',
      padding: '12px 30px',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    },
    submitBtnHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.changeUsernameContainer}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Change Username</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>New Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter new username"
                style={styles.input}
              />
            </div>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
            <button
              type="submit"
              style={styles.submitBtn}
              onMouseOver={(e) => (e.target.style.transform = styles.submitBtnHover.transform)}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeUsername;
