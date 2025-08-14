import React from 'react';

const Hero = () => {
  const handleScroll = () => {
    document.querySelector('.services').scrollIntoView({ behavior: 'smooth' });
  };

  const heroStyle = {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  };

  const contentStyle = {
    color: 'white',
    zIndex: 1,
    maxWidth: '600px',
  };

  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    marginBottom: '30px',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #1db954, #1ed760)',
    color: 'white',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
    outline: 'none',
  };

  const buttonHoverStyle = {
    background: 'rgba(255, 255, 255, 0.25)',
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.35)',
  };

  return (
    <section style={heroStyle}>
      <video style={videoStyle} autoPlay loop muted playsInline>
        <source src="/videos/homeBg2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={contentStyle}>
        <h1 style={headingStyle}>Premium Agro Products for Global Export</h1>
        <p style={paragraphStyle}>
          High-quality pepper, coconut, corn, and cashew from our fields to your market.
        </p>
        <button
          style={buttonStyle}
          onMouseOver={e => (e.currentTarget.style = buttonHoverStyle)}
          onMouseOut={e => (e.currentTarget.style = buttonStyle)}
          onClick={handleScroll}
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
