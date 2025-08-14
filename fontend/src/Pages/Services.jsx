import React from 'react';
import compost from '../assets/compost.png';
import harvestingpng from '../assets/harvestingpng.png';
import orderServices from '../assets/orderServices.png';
import Navbar from '../Components/Navbar';

const Services = () => {
  const sectionStyle = {
    backgroundColor: '#fff',
    padding: '60px 0',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '40px',
    color: '#2c3e50',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '30px',
  };

  const cardStyle = {
    backgroundColor: '#f3f4f6',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#333',
  };

  const textStyle = {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
  };

  return (
    <div>
      <Navbar/>
      <section style={sectionStyle}>
       
       <h2 style={{ ...headingStyle, color: 'white' }}>Our Services</h2>
 
       <div style={containerStyle}>
         <div 
           className="service-card" 
           style={cardStyle} 
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
         >
           <img src={compost} alt="Pepper Export" style={{...imageStyle}} />
           <h3 style={titleStyle}>Seeds & Fertilizer</h3>
           <p style={textStyle}>Providing high-quality seeds and fertilizer to boost crop production.</p>
         </div>
         <div 
           className="service-card" 
           style={cardStyle} 
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
         >
           <img src={harvestingpng} alt="Harvesting" style={imageStyle} />
           <h3 style={titleStyle}>Harvesting</h3>
           <p style={textStyle}>Professional harvesting services to ensure maximum yield and quality.</p>
         </div>
         <div 
           className="service-card" 
           style={cardStyle} 
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
         >
           <img src={orderServices} alt="Corn Export" style={imageStyle} />
           <h3 style={titleStyle}>Orders & Delivery</h3>
           <p style={textStyle}>Seamless order processing and timely deliveries to meet client needs.</p>
         </div>
       </div>
     </section>
    </div>
  );
};

export default Services;
