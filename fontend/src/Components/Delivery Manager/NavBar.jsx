import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavBar = () => {
    const [isActive, setIsActive] = useState(false); // State for the toggle menu

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <nav style={styles.navbar}>
                <div style={styles.navbarContainer}>
                    <a href="#" style={styles.navbarBrand}>AGRO Export</a>
                    <button style={styles.navbarToggle} onClick={toggleMenu}>
                        <span style={styles.navbarToggleIcon}>&#9776;</span>
                    </button>
                    <div className='text-xl py-2'>
                        <Link to="/deliverydashboard" style={styles.navbarLink}>Home</Link>
                        <Link to="/FarmerPaymentList" style={styles.navbarLink}>Paymented</Link>
                        <Link to="#" style={styles.navbarLink}>Blog</Link>
                        <Link to="/contact" style={styles.navbarLink}>Contact</Link>
                    </div>
                </div>
            </nav>
            <div style={styles.space}></div>
        </>
    );
};

// Inline styles
const styles = {
    navbar: {
        backgroundColor: '#256227', /* Green color */
        padding: '1em',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
    space: {
        width: '100%',
        height: '10px',
    },
    navbarContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navbarBrand: {
        color: '#F4D8D8',
        textDecoration: 'none',
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    navbarLinks: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    navbarLink: {
        color: 'white',
        textDecoration: 'none',
        padding: '0.5em 1em',
        display: 'inline-block',
    },
    navbarLinkHover: {
        backgroundColor: '#b3ffcc', /* Light green hover effect */
        color: '#256227',
        borderRadius: '5px',
    },
    navbarToggle: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '2em',
        display: 'none',
        cursor: 'pointer',
    },
    navbarToggleIcon: {
        fontSize: '1.5em',
    },
};

// Responsive styles
const mediaQueryStyles = `
    @media (max-width: 768px) {
        .navbar-links {
            display: none;
            flex-direction: column;
            align-items: center;
            width: 100%;
            background-color: #256227;
            position: absolute;
            top: 100%;
            left: 0;
        }

        .navbar-links a {
            width: 100%;
            text-align: center;
            padding: 1em;
        }

        .navbar-links.active {
            display: flex;
        }

        .navbar-toggle {
            display: block;
        }
    }
`;

// Append media query styles to the head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mediaQueryStyles;
document.head.appendChild(styleSheet);

export default NavBar;
