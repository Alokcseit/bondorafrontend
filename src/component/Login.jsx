import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const emailInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    // Basic validation
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      // Send POST request
      const postData = { email, password };
      const response = await axios.post(
        'http://localhost:5000/api/v2/users/login',
        postData
      );

      console.log('Server Response:', response.data); // Log the response from the backend
       const{accessToken,refreshToken}=response.data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      alert('Login successful!');
      setForm({ email: '', password: '' });
      navigate('/home');
    } catch (err) {
      console.error('Error response:', err.response);

      if (err.response && err.response.data) {
        const errorMessage =
          err.response.data.message || 'Invalid credentials. Please try again.';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
       
      <div className="login">
     
        <div className="login-content">
          <h1>Login</h1>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>} {/* Display error */}
          <form className="login-form" onSubmit={handleLogin}>
            <TextField
              required
              name="email"
              placeholder="Enter your email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              inputRef={emailInputRef}
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
            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
        </div>
        <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
