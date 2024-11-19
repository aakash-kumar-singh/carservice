import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required.';

    const phoneRegex = /^[0-9]{10}$/;  
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits.';
    }

    if (!formData.email.trim()) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.password.trim()) errors.password = 'Password is required.';
    else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/carrental/signup', formData);
      setSuccessMessage(response.data.message || 'Account created successfully!');
      setFormData({ name: '', phone: '', email: '', password: '' });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again later.';
      setErrors({ global: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#333', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '500px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Create an account</h1>

        {errors.global && <p style={{ color: 'red', textAlign: 'center' }}>{errors.global}</p>}
        {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Phone number</label>
            <input
              type="tel"
              name="phone"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Your email</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#000d6b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create an account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px', color: '#333' }}>
          Already have an account? <Link to="/login" style={{ color: '#007BFF', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}
