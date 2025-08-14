import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import delivery from './../../assets/delivery.png';
import deliveryOk from './../../assets/deliveryOk.png';
import payment from './../../assets/payment.png';


const styles = {
  dashboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    flexWrap: 'wrap',
    gap: '30px',
    padding: '20px',
  },
  dashboardCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '350px',
    textAlign: 'center',
    padding: '25px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  cardTitle: {
    fontSize: '1.75rem',
    margin: '20px 0',
    color: '#333',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  cardButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  cardButtonHover: {
    backgroundColor: '#45a049',
    transform: 'translateY(-1px)',
  },
  cardButtonActive: {
    backgroundColor: '#3e8e41',
    transform: 'translateY(0)',
  },
  footer: {
    marginTop: '20px',
  },
};

const HomePage = () => {
  return (
    <div>
      <div style={styles.dashboardContainer}>
        <NavBar />
        {/* Card for To-Do Delivery */}
        <Link to={`/todiliverylist`}>
          <div style={styles.dashboardCard}>
            <img src={delivery} alt="To-Do Delivery" style={styles.cardImage} />
            <h3 style={styles.cardTitle}>Pending Deliveries</h3>
            <button
              style={styles.cardButton}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.cardButtonHover.backgroundColor)}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.cardButton.backgroundColor)}
              onMouseDown={e => (e.currentTarget.style.backgroundColor = styles.cardButtonActive.backgroundColor)}
              onMouseUp={e => (e.currentTarget.style.backgroundColor = styles.cardButton.backgroundColor)}
            >
              View Tasks
            </button>
          </div>
        </Link>

        {/* Card for Delivery History */}
        <Link to={'/acceptedorders'}>
          <div style={styles.dashboardCard}>
            <img src={deliveryOk} alt="Delivery History" style={styles.cardImage} />
            <h3 style={styles.cardTitle}>Update Tracking</h3>
            <button
              style={styles.cardButton}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.cardButtonHover.backgroundColor)}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.cardButton.backgroundColor)}
              onMouseDown={e => (e.currentTarget.style.backgroundColor = styles.cardButtonActive.backgroundColor)}
              onMouseUp={e => (e.currentTarget.style.backgroundColor = styles.cardButton.backgroundColor)}
            >
              View Tracking
            </button>
          </div>
        </Link>

        {/* Card for Payment */}
        <Link to={`/farmerpayment`}>
          <div style={styles.dashboardCard}>
            <img src={payment} alt="Payment" style={styles.cardImage} />
            <h3 style={styles.cardTitle}>Payment Overview</h3>
            <button
              style={styles.cardButton}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.cardButtonHover.backgroundColor)}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.cardButton.backgroundColor)}
              onMouseDown={e => (e.currentTarget.style.backgroundColor = styles.cardButtonActive.backgroundColor)}
              onMouseUp={e => (e.currentTarget.style.backgroundColor = styles.cardButton.backgroundColor)}
            >
              Payments Center
            </button>
          </div>
        </Link>
      </div>
      <Footer style={styles.footer} />
    </div>
  );
};

export default HomePage;
