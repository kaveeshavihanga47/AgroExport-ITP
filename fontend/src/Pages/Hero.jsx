import React, { useRef } from 'react';
import Navbar from '../Components/Navbar';
import About from '../Components/About';
import Services from '../Components/Services';
import logo from '../assets/logo.jpg';

const Hero = () => {
  const servicesRef = useRef(null); // Create a ref for the Services section

  const handleScroll = () => {
    // Use the ref to scroll into view
    servicesRef.current.scrollIntoView({ behavior: 'smooth' });
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

  const heroContentStyle = {
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

  const scrollBtnStyle = {
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

  return (
    <>
      <Navbar />
      <section style={heroStyle}>
        <video style={videoStyle} autoPlay loop muted playsInline>
          <source src="/videos/homeBg2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={{ ...heroContentStyle, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <h1 style={headingStyle}>Premium Agro Products for Global Export</h1>
          <p style={paragraphStyle}>High-quality pepper, coconut, corn, and cashew from our fields to your market.</p>
          <button style={scrollBtnStyle} onClick={handleScroll}>Learn More</button>
        </div>
      </section>
      {/* Pass the ref to the Services component */}
      <Services ref={servicesRef} />
      <About />
    </>
  );
};

export default Hero;
