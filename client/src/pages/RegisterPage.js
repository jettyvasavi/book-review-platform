import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // We use axios directly here for the one-off register call
import { UserContext } from '../context/UserContext';
import ErrorMessage from '../components/ErrorMessage';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  // We get login and loading from context to auto-login the user after successful registration
  const { login, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- Basic Frontend Validation ---
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
    }

    try {
      // Step 1: Register the new user
      await axios.post('/api/auth/register', { name, email, password });
      
      // Step 2: Automatically log the user in after successful registration
      const loginResult = await login(email, password);

      if (loginResult.success) {
        navigate('/'); // Redirect to home page
      } else {
        // This might happen in a rare case where registration succeeds but login fails
        setError('Registration successful, but auto-login failed. Please log in manually.');
        navigate('/login');
      }

    } catch (err) {
      // Set error message from the backend response
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form form-stacked">
        {error && <ErrorMessage message={error} />}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g., Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="e.g., jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p style={{marginTop: '1rem'}}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;