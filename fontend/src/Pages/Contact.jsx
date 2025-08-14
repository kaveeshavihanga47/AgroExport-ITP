import React from 'react';
import Navbar from '../Components/Navbar';


const Contact = () => {
  const sectionStyle = {
    backgroundColor: '#f9fafb',
    padding: '60px 20px',
    textAlign: 'center',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  };

  const detailsStyle = {
    flex: 1,
    textAlign: 'left',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px',
  };

  const infoStyle = {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '10px',
  };

  const socialMediaStyle = {
    flex: 1,
    textAlign: 'left',
  };

  const socialHeadingStyle = {
    fontSize: '1.8rem',
    color: '#2c3e50',
    marginBottom: '20px',
  };

  const iconsStyle = {
    display: 'flex',
    gap: '15px',
  };

  const iconLinkStyle = {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '10px',
    fontSize: '1.5rem',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease',
  };

  const iconLinkHoverStyle = {
    backgroundColor: '#1db954',
  };

  const relatedContentStyle = {
    flex: 1,
    textAlign: 'left',
  };

  const relatedHeadingStyle = {
    fontSize: '1.8rem',
    color: '#2c3e50',
    marginBottom: '20px',
  };

  return (
  <div>
    <Navbar />
      <section style={sectionStyle}>
       
       <br />
       <br />
       <div style={containerStyle}>
         <div style={detailsStyle}>
         <h2 style={{ ...headingStyle, color: 'white' }} className='text-3xl'>Contact Us</h2>
           <p style={paragraphStyle}>
             Connect with us for inquiries or further information. We are always available to assist 
             you in any way possible. Reach out through the following details.
           </p>
           <div>
             <p style={infoStyle}><strong>Address:</strong> 123 Agro Street, Green City, Country</p>
             <p style={infoStyle}><strong>Email:</strong> support@agroexport.com</p>
             <p style={infoStyle}><strong>Phone:</strong> +1 234 567 890</p>
           </div>
         </div>
 
         <div style={socialMediaStyle}>
           <h3 style={socialHeadingStyle}>Follow Us</h3>
           <div style={iconsStyle}>
             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
               <i className="fab fa-facebook-f"></i>
             </a>
             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
               <i className="fab fa-twitter"></i>
             </a>
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
               <i className="fab fa-instagram"></i>
             </a>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
               <i className="fab fa-linkedin-in"></i>
             </a>
           </div>
         </div>
 
         <div style={relatedContentStyle}>
           <h3 style={relatedHeadingStyle}>Additional Information</h3>
           <p style={paragraphStyle}>
             We pride ourselves on sustainability and customer satisfaction. Follow our social media for
             the latest updates on our products and services. Stay tuned for more announcements and offers!
           </p>
         </div>
       </div>
     </section>
  </div>
  );
};

export default Contact;
