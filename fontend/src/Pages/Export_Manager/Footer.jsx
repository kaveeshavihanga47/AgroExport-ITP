import React from 'react';

function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    footerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '1200px',
      width: '100%',
      padding: '0 20px',
    },
    footerContent: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    footerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#4CAF50',
    },
    footerDescription: {
      fontSize: '14px',
      color: '#bdc3c7',
    },
    footerLinks: {
      display: 'flex',
      gap: '15px',
      marginBottom: '20px',
    },
    footerLink: {
      color: '#4CAF50',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.3s',
    },
    footerLinkHover: {
      color: '#2ecc71',
    },
    footerSocial: {
      display: 'flex',
      gap: '15px',
    },
    socialIcon: {
      color: '#4CAF50',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.3s',
    },
    footerBottom: {
      marginTop: '20px',
      fontSize: '12px',
      color: '#bdc3c7',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerContent}>
          <h2 style={styles.footerTitle}>Agro Export</h2>
          <p style={styles.footerDescription}>
            Empowering global trade with agricultural exports. Connect with us to grow your business.
          </p>
        </div>
        <div style={styles.footerLinks}>
          <a
            href="#"
            style={styles.footerLink}
            onMouseOver={(e) => (e.target.style.color = styles.footerLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.footerLink.color)}
          >
            Home
          </a>
          <a
            href="#"
            style={styles.footerLink}
            onMouseOver={(e) => (e.target.style.color = styles.footerLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.footerLink.color)}
          >
            About Us
          </a>
          <a
            href="#"
            style={styles.footerLink}
            onMouseOver={(e) => (e.target.style.color = styles.footerLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.footerLink.color)}
          >
            Services
          </a>
          <a
            href="#"
            style={styles.footerLink}
            onMouseOver={(e) => (e.target.style.color = styles.footerLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.footerLink.color)}
          >
            Contact
          </a>
        </div>
        <div style={styles.footerSocial}>
          <a
            href="#"
            style={styles.socialIcon}
            onMouseOver={(e) => (e.target.style.color = styles.footerLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.socialIcon.color)}
          >
            Facebook
          </a>
          <a
            href="#"
            style={styles.socialIcon}
            onMouseOver={(e) => (e.target.style.color = styles.footerLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.socialIcon.color)}
          >
            Twitter
          </a>
          <a
            href="#"
            style={styles.socialIcon}
            onMouseOver={(e) => (e.target.style.color = styles.footerLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.socialIcon.color)}
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p>© 2024 Agro Export. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
