import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Import the CSS file
import Cart from '../components/Cart'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    mobile_number: '',
    email_id: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Helper functions for validations
  const isValidFullName = (name) => /^[A-Za-z\s]+$/.test(name); // Only letters and spaces
  const isValidMobileNumber = (number) => /^\d{10}$/.test(number); // Exactly 10 digits
  const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password); // At least 8 chars, 1 letter, 1 number, 1 special char

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim()  // Trim whitespace from input values
    });

    // Clear specific errors when user revises input
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };

      if (name === 'full_name') {
        if (!isValidFullName(value)) {
          newErrors.full_name = 'Full Name can only contain letters and spaces.';
        } else {
          delete newErrors.full_name;
        }
      }

      if (name === 'mobile_number') {
        if (!isValidMobileNumber(value)) {
          newErrors.mobile_number = 'Mobile Number must be exactly 10 digits.';
        } else {
          delete newErrors.mobile_number;
        }
      }

      if (name === 'password' || name === 'confirmPassword') {
        if (name === 'password') {
          if (!isValidPassword(value)) {
            newErrors.password = 'Password must be at least 8 characters long, include at least one letter, one number, and one special character.';
          } else {
            delete newErrors.password;
          }
        }

        if (name === 'confirmPassword') {
          if (formData.password !== value) {
            newErrors.confirmPassword = 'Passwords do not match.';
          } else {
            delete newErrors.confirmPassword;
          }
        }
      }

      return newErrors;
    });
  };

  const validate = () => {
    const errors = {};

    if (!isValidFullName(formData.full_name)) {
      errors.full_name = 'Full Name can only contain letters and spaces.';
    }
    if (!isValidMobileNumber(formData.mobile_number)) {
      errors.mobile_number = 'Mobile Number must be exactly 10 digits.';
    }
    if (!isValidPassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters long, include at least one letter, one number, and one special character.';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.full_name) errors.full_name = 'Full Name is required.';
    if (!formData.mobile_number) errors.mobile_number = 'Mobile Number is required.';
    if (!formData.email_id) errors.email_id = 'Email ID is required.';
    if (!formData.password) errors.password = 'Password is required.';
    if (!formData.confirmPassword) errors.confirmPassword = 'Confirm Password is required.';

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
      const response = await axios.post('http://localhost/achar/backend/registration.php', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Clear previous server error messages
      setServerError('');

      // Handle response from the server
      if (response.data.success) {
        alert(response.data.success);
        // Optionally, reset form or redirect
        setFormData({
          full_name: '',
          mobile_number: '',
          email_id: '',
          password: '',
          confirmPassword: ''
        });
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
          {errors.full_name && <p className="error">{errors.full_name}</p>}
        </div>
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
          <label>Email ID:</label>
          <input
            type="email"
            name="email_id"
            value={formData.email_id}
            onChange={handleChange}
          />
          {errors.email_id && <p className="error">{errors.email_id}</p>}
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Register</button>
        {serverError && <p className="error">{serverError}</p>}
      </form>
    </div>
    <Cart/>
    </section>
   </>
  );
};

export default RegistrationForm;
