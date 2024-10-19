import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import Cart from '../components/Cart'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    mobile_number: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Helper function for validations
  const isValidMobileNumber = (number) => /^\d{10}$/.test(number); // Exactly 10 digits

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim()  // Trim whitespace from input values
    });

    // Clear specific errors when user revises input
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };

      if (name === 'mobile_number') {
        if (!isValidMobileNumber(value)) {
          newErrors.mobile_number = 'Mobile Number must be exactly 10 digits.';
        } else {
          delete newErrors.mobile_number;
        }
      }

      if (name === 'password') {
        if (!value) {
          newErrors.password = 'Password is required.';
        } else {
          delete newErrors.password;
        }
      }

      return newErrors;
    });
  };

  const validate = () => {
    const errors = {};

    if (!isValidMobileNumber(formData.mobile_number)) {
      errors.mobile_number = 'Mobile Number must be exactly 10 digits.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError('');
      return;
    }

    try {
      const response = await axios.post('http://localhost/achar/backend/login.php', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Clear previous server error messages
      setServerError('');

      // Handle response from the server
      if (response.data.success) {
        alert(response.data.success);
        // Optionally, redirect the user or handle successful login
      } else if (response.data.error) {
        setServerError(response.data.error);
      }
    } catch (error) {
      console.error('There was an error!', error);
      setServerError('There was an error with the server. Please try again later.');
    }
  };

  return (
   <>
   
    <section className='form'>
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
          />
          {errors.mobile_number && <p className="error">{errors.mobile_number}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
        {serverError && <p className="error">{serverError}</p>}
      </form>

     <div className='signup'>
     <Link to="/signup">Create New account</Link>
     </div>
    </div>
    </section>
    <Cart/>
   </>
  );
};

export default LoginForm;
