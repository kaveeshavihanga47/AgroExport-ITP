import React from 'react';
import { Link } from 'react-router-dom';

const NavbarC = () => {
  const styles = {
    navbar: {
      background: 'linear-gradient(45deg, #0c3a0e, #47884b)', // Green gradient
      boxShadow: '0 4px 8px #fff', // Shadow effect
      padding: '10px 20px',
    },
    navbarBrand: {
      color: '#fff',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      transition: 'color 0.3s ease',
      textDecoration: 'none', // Ensure the Link looks like normal text
    },
    navbarBrandHover: {
      color: '#e3f2fd',
    },
    navLink: {
      color: '#fff',
      fontSize: '1.1rem',
      marginRight: '20px',
      transition: 'color 0.3s ease',
      textDecoration: 'none', // Remove underline from Link
    },
    navLinkHover: {
      color: '#e0f7fa',
    },
    navLinkActive: {
      fontWeight: 'bold',
      borderBottom: '2px solid #fff',
    },
    navbarNav: {
      display: 'flex',
      flexDirection: 'row',
    },
    navbarToggler: {
      backgroundColor: 'transparent',
      border: 'none',
    },
    // Responsive styles
    navbarNavMobile: {
      background: 'linear-gradient(45deg, #81c784, #4caf50)',
      marginTop: '10px',
      padding: '10px',
      flexDirection: 'column',
    },
    navItemMobile: {
      marginBottom: '10px',
    },
  };

  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={styles.navbarBrand}
          onMouseOver={(e) => (e.target.style.color = styles.navbarBrandHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.navbarBrand.color)}
        >
          Collecting Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={styles.navbarToggler}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav" style={styles.navbarNav}>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/"
                style={styles.navLink}
                onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/insertH"
                style={styles.navLink}
                onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
              >
                Add Harvesting Details
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarC;
