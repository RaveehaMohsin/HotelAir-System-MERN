import React, { useState } from 'react';
import './ContactForm.css'; 
import { FaUser, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'message') setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://lavender-iron-azimuth.glitch.me/contactus', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSuccessMessage('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Something went wrong!');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div>
    <div style={{marginBottom:"2%"}}>
    <h5><span className="home-text">Home</span> / Contact Us</h5>
  </div>
    <div className="contact-form-container">
      <h3>Contact Us</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group11">
          <FaUser className="icon" />
          <input 
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group11">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group11">
          <textarea
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button className="submit1-btn" type="submit">
          <FaPaperPlane className="submit1-icon" />
          Send
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
    </div>
  );
}
