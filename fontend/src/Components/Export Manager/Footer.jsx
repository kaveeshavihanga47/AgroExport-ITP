import React from 'react';

function Footer() {
  // Inline Styles
  const footerStyle = {
    backgroundColor: '#232323',
    color: '#fff',
    padding: '2rem 0',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  };

  const contentStyle = {
    marginBottom: '2rem',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
  };

  const descriptionStyle = {
    fontSize: '1rem',
    marginTop: '0.5rem',
    color: '#ccc',
  };

  const linksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  };

  const socialStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  };

  const socialIconStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  };

  const bottomStyle = {
    borderTop: '1px solid #444',
    paddingTop: '1rem',
    fontSize: '0.9rem',
    color: '#ccc',
  };

  const handleHover = (e, hover) => {
    e.target.style.color = hover ? '#28a745' : '#fff';
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h2 style={titleStyle}>Agro Export</h2>
          <p style={descriptionStyle}>
            Empowering global trade with agricultural exports. Connect with us to grow your business.
          </p>
        </div>
        <div style={linksStyle}>
          <a
            href="#"
            style={linkStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Home
          </a>
          <a
            href="#"
            style={linkStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            About Us
          </a>
          <a
            href="#"
            style={linkStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Services
          </a>
          <a
            href="#"
            style={linkStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Contact
          </a>
        </div>
        <div style={socialStyle}>
          <a
            href="#"
            style={socialIconStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Facebook
          </a>
          <a
            href="#"
            style={socialIconStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Twitter
          </a>
          <a
            href="#"
            style={socialIconStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div style={bottomStyle}>
        <p>© 2024 Agro Export. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
