import React from 'react';

const About = () => {
  // Inline styles for the About section
  const aboutStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#dadbdc',
    padding: '20px',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '20px',
    position: 'relative',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    color: '#34495e',
    maxWidth: '600px',
    lineHeight: 1.6,
    padding: '0 15px',
  };

  const underlineStyle = {
    content: '""',
    display: 'block',
    width: '60px',
    height: '4px',
    background: 'linear-gradient(135deg, #1db954, #1ed760)',
    margin: '10px auto',
    borderRadius: '5px',
  };

  return (
    <section style={aboutStyle}>
      <h2 style={headingStyle}>
        Why Choose Us?
        <span style={underlineStyle}></span>
      </h2>
      <p style={paragraphStyle}>
        Our company prides itself on sustainable practices, timely delivery, and unmatched quality.
        We are committed to serving global markets with the best agro products, ensuring satisfaction
        at every step of the supply chain.
      </p>
    </section>
  );
};

export default About;
