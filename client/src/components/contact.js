import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailInput = e.target.elements.email.value;

    if (!isValidEmail(emailInput)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact</h1>
        <p className="contact-description">
          Send us a message. I swear we'll read it!
        </p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
          {emailError && <p className="error-message">{emailError}</p>}
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
