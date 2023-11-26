import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact</h1>
        <p className="contact-description">
          Send us a message. I swear we'll read it!
        </p>
      </div>
      <div className="contact-form">
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
