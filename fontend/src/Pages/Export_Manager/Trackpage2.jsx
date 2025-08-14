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
  orderTracking: {
    backgroundColor: '#fff',
    padding: '20px',
    marginTop: '20px',
  },
  orderInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  orderLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  orderLinkHover: {
    textDecoration: 'underline',
  },
  timeline: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  timelineStep: {
    width: '18%',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#eee',
    borderRadius: '5px',
  },
  timelineStepCompleted: {
    backgroundColor: '#228b22',
    color: 'white',
  },
  shipmentDetails: {
    textAlign: 'left',
  },
  shipmentStep: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  statusDot: {
    width: '15px',
    height: '15px',
    backgroundColor: 'green',
    borderRadius: '50%',
    marginRight: '10px',
    marginTop: '5px',
  },
  shipmentStepDetail: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
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

function Trackpage2() {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>Agro Export</h1>
      </header>

      {/* Order Tracking Section */}
      <div style={styles.orderTracking}>
        <div style={styles.orderInfo}>
          <span>ORDER <a href="/" style={styles.orderLink}>#6152</a></span>
          <span>Expected Arrival 01/06/20</span>
          <span>Grasshoppers V554HB</span>
        </div>

        {/* Timeline Section */}
        <div style={styles.timeline}>
          <div style={{...styles.timelineStep, ...styles.timelineStepCompleted}}>
            <span>Order Processed</span>
          </div>
          <div style={{...styles.timelineStep, ...styles.timelineStepCompleted}}>
            <span>Order Designing</span>
          </div>
          <div style={{...styles.timelineStep, ...styles.timelineStepCompleted}}>
            <span>Order Shipped</span>
          </div>
          <div style={styles.timelineStep}>
            <span>Order En Route</span>
          </div>
          <div style={styles.timelineStep}>
            <span>Order Arrived</span>
          </div>
        </div>

        {/* Shipment Details */}
        <div style={styles.shipmentDetails}>
          <div style={styles.shipmentStep}>
            <span style={styles.statusDot}></span>
            <div style={styles.shipmentStepDetail}>
              <p>Shipment information received by warehouse electronically</p>
              <p><strong>Carrier note:</strong> Order received successfully</p>
              <p>2024-08-15 18:18:59</p>
            </div>
          </div>

          <div style={styles.shipmentStep}>
            <span style={styles.statusDot}></span>
            <div style={styles.shipmentStepDetail}>
              <p>Received by logistics company</p>
              <p><strong>Carrier note:</strong> Accepted by carrier</p>
              <p>2024-08-17 15:19:36 GMT+8</p>
            </div>
          </div>

          <div style={styles.shipmentStep}>
            <span style={styles.statusDot}></span>
            <div style={styles.shipmentStepDetail}>
              <p>Package shipped out from warehouse</p>
              <p><strong>Carrier note:</strong> Leave the warehouse</p>
              <p>2024-08-17 08:52:10 GMT+0800</p>
            </div>
          </div>

          <div style={styles.shipmentStep}>
            <span style={styles.statusDot}></span>
            <div style={styles.shipmentStepDetail}>
              <p>Leaving from departure country/region</p>
              <p><strong>Carrier note:</strong> Leaving from departure country/region</p>
              <p>2024-08-19 17:55:26 GMT+8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div style={styles.logoSection}>
          <img src="https://via.placeholder.com/40" alt="Agro Export Logo" />
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

export default Trackpage2;
