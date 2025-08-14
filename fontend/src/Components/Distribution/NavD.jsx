import React from 'react';
import { Link } from 'react-router-dom';

const NavD = () => {
    const styles = {
        navbar: {
            backgroundColor: '#28b94a',
            padding: '10px 20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
        navbarBrand: {
            color: '#000000',
            fontSize: '1.6rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        navbarToggler: {
            border: 'none',
            outline: 'none',
        },
        navbarTogglerIcon: {
            backgroundColor: '#dc1111',
        },
        navItem: {
            color: '#080808',
            fontSize: '1.1rem',
            fontWeight: 500,
            padding: '8px 15px',
            transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out',
            textTransform: 'capitalize',
        },
        navLinkHover: {
            backgroundColor: '#0e9f3c',
            color: '#ffffff',
            borderRadius: '4px',
        },
        activeLink: {
            backgroundColor: '#ff5722',
            color: '#ffffff',
            borderRadius: '4px',
        },
        focusLink: {
            backgroundColor: '#28a745',
            color: '#ffffff',
            borderRadius: '4px',
        },
    };

    return (
        <nav className="navbar navbar-expand-lg" style={styles.navbar}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={styles.navbarBrand}>
                    Distribution Management System
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
                    <span className="navbar-toggler-icon" style={styles.navbarTogglerIcon}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={styles.navItem}>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/insertD" style={styles.navItem}>
                                Add Order
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavD;
