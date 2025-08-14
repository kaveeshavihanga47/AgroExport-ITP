import React, { forwardRef } from 'react';
import fertilizer from '../assets/fertilizer.png';
import harvestingpng from '../assets/harvestingpng.png';
import orders from '../assets/order.png';

const Services = forwardRef((props, ref) => {
  const servicesStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FFFFF',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const containerStyle = {
    display: 'flex',
    gap: '30px',
  };

  const cardStyle = {
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '300px',
    height: '500px',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    margin: '15px 0',
    color: '#333',
  };

  const descriptionStyle = {
    padding: '0px 15px 10px 15px',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #1db954, #1ed760)',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '15px',
  };

  const handleButtonHover = (e, hover) => {
    if (hover) {
      e.target.style.background = 'linear-gradient(135deg, #17a350, #1db954)';
      e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    } else {
      e.target.style.background = 'linear-gradient(135deg, #1db954, #1ed760)';
      e.target.style.boxShadow = 'none';
    }
  };

  const handleCardHover = (e, hover) => {
    if (hover) {
      e.target.style.transform = 'translateY(-15px)';
      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    } else {
      e.target.style.transform = 'none';
      e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
  };

  return (
    <section style={servicesStyle} ref={ref}>
      <div style={containerStyle}>
        <div style={cardStyle} onMouseEnter={(e) => handleCardHover(e, true)} onMouseLeave={(e) => handleCardHover(e, false)}>
          <img src={fertilizer} alt="Pepper" style={imageStyle} />
          <h3 style={titleStyle}>Seeds and Fertilizer</h3>
          <p style={descriptionStyle}>Your source for high-quality seeds and organic fertilizers.</p>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Explore More
          </button>
        </div>
        <div style={{ ...cardStyle }} onMouseEnter={(e) => handleCardHover(e, true)} onMouseLeave={(e) => handleCardHover(e, false)}>
          <img src={harvestingpng} alt="Coconut" style={imageStyle} />
          <h3 style={titleStyle}>Harvesting Details</h3>
          <p style={descriptionStyle}>Detailed information on optimal harvesting practices.</p>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Explore More
          </button>
        </div>
        <div style={cardStyle} onMouseEnter={(e) => handleCardHover(e, true)} onMouseLeave={(e) => handleCardHover(e, false)}>
          <img src={orders} alt="Corn" style={imageStyle} />
          <h3 style={titleStyle}>Give Order</h3>
          <p style={descriptionStyle}>Manage your orders efficiently and track your deliveries.</p>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
});

export default Services;
