import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const[errorMessage,setErrorMessage]=useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await axios.post("http://localhost:5000/carrental/login", formData);
      setSuccessMessage(response.data.message || 'Login successful!');
      localStorage.setItem('email',formData.email);
      const {message,name}=response.data;
      localStorage.setItem('name',name);

      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setErrors(errorMessage)
      alert(errorMessage);
      setFormData({email: '', password: ''});
      

    } 
  };

  return (
    <div className="login-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} className="login-form" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign in to your account</h1>

        {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
        {errors.global && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.global}</div>}

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Your email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="name@company.com"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <button
          type="submit"
          className="signin-button"
          style={{ width: '100%', padding: '10px', backgroundColor: '#000d6b', color: '#fff', border: 'none', borderRadius: '4px' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Don't have an account? <Link to="/register" style={{ color: '#007BFF' }}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}
