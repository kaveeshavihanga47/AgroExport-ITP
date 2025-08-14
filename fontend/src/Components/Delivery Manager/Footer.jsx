import React from 'react';

const Footer = () => {
  // Inline Styles
  const footerStyle = {
    background: 'linear-gradient(to right, #B5AC49, #3CA55C)',
    padding: '2.5em 0',
    color: 'white',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: '0 2em',
  };

  const brandStyle = {
    fontSize: '2em',
    fontWeight: '600',
    marginBottom: '0.5em',
  };

  const brandDescriptionStyle = {
    fontSize: '1.1em',
    opacity: '0.8',
    marginBottom: '1.5em',
  };

  const linksStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2em',
    transition: 'all 0.3s ease',
    position: 'relative',
    paddingBottom: '0.2em',
  };

  const hoverEffectStyle = {
    position: 'absolute',
    width: '0',
    height: '2px',
    backgroundColor: '#ffdd57',
    left: '0',
    bottom: '0',
    transition: 'width 0.3s ease',
  };

  const handleHover = (e) => {
    e.target.style.color = '#ffdd57';
    e.target.style.letterSpacing = '1px';
    e.target.querySelector('span').style.width = '100%';
  };

  const handleLeave = (e) => {
    e.target.style.color = 'white';
    e.target.style.letterSpacing = 'normal';
    e.target.querySelector('span').style.width = '0';
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div>
          <h2 style={brandStyle}>AGRO Export</h2>
          <p style={brandDescriptionStyle}>
            Delivering Quality Agricultural Products Worldwide
          </p>
        </div>
        <div style={linksStyle}>
          {['About Us', 'Contact Us', 'Blogs', 'More'].map((link) => (
            <a
              key={link}
              href="#"
              style={linkStyle}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              {link}
              <span style={hoverEffectStyle} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
