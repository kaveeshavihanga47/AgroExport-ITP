import React from "react";

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#32a852',
    padding: '15px',
    color: 'white',
  },
  title: {
    fontSize: '28px',
    margin: 0,
  },
  content: {
    marginTop: '40px',
  },
  contentHeading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  searchBox: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '50px',
    padding: '10px 20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  orderInput: {
    border: 'none',
    padding: '10px',
    outline: 'none',
    borderRadius: '50px',
    flexGrow: 1,
    fontSize: '16px',
  },
  trackBtn: {
    backgroundColor: '#228b22',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  trackBtnHover: {
    backgroundColor: '#1e7d1e',
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    gap: '20px',
  },
  footerLinkItem: {
    cursor: 'pointer',
  },
  footerLinkItemHover: {
    textDecoration: 'underline',
  },
};

function Trackpage() {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>Agro Export</h1>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        <h2 style={styles.contentHeading}>Track your package within seconds</h2>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Enter your OrderID"
            style={styles.orderInput}
          />
          <button style={styles.trackBtn}>Track order</button>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div style={styles.logoSection}>
          <h3>Agro Export</h3>
        </div>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinkItem}>About us</li>
          <li style={styles.footerLinkItem}>Contact us</li>
          <li style={styles.footerLinkItem}>Blogs</li>
        </ul>
      </footer>
    </div>
  );
}

export default Trackpage;
