import React, { useState, useEffect, useRef } from 'react';
import './Signup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(''); // State to store validation error messages
  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setError(''); // Clear error when user types
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = form;
  
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      // Send POST request
      const postData = { username, email, password };
      const response = await axios.post(
        'http://localhost:5000/api/v2/users/register',
        postData
      );
  
      console.log('Server Response:', response.data); // Log the response from the backend
  
      alert('Registration successful!');
      setForm({ username: '', email: '', password: '', confirmPassword: '' });
      navigate('/login');
    } catch (err) {
      console.error('Error response:', err.response); // Log the full error response
  
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message || 'An unexpected error occurred. Please try again.';
        setError(errorMessage); // Display the error message
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  
  return (
    <div>
      <div className="signup">
        <div className="signup-content">
          <h1>Sign Up</h1>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>} {/* Display error */}
          <form className="signup-form" onSubmit={handleSignup}>
            <TextField
              required
              name="username"
              placeholder="Enter your name"
              label="UserName"
              value={form.username}
              onChange={handleChange}
              inputRef={nameInputRef}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              name="email"
              placeholder="Enter your email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained">
              Signup
            </Button>
          </form>
        </div>
        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
