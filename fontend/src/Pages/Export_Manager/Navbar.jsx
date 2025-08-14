import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // Inline styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#f4f5f7",
      padding: "20px",
      backgroundImage: "url('https://img.freepik.com/free-vector/hand-drawn-delivery-concept-with-truck_23-2149147759.jpg')",
      backgroundSize: "cover",
    backgroundPosition: "center",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#4CAF50",
      padding: "15px 20px",
      borderRadius: "8px",
      color: "white",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      marginRight: "10px",
    },
    userSpan: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    buttonsContainer: {
      marginTop: "20px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      position: "relative",
      top: "-250px",
    },
    buttonGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#ffffff",
      border: "2px solid #4CAF50",
      color: "#4CAF50",
      padding: "15px 20px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all 0.3s ease",
      width: "250px",
      textAlign: "center",
    },
    buttonHover: {
      backgroundColor: "#4CAF50",
      color: "white",
    },
    buttonActive: {
      transform: "scale(0.98)",
    },
    mediaQuery: {
      '@media screen and (max-width: 768px)': {
        buttonsContainer: {
          flexDirection: "column",
          alignItems: "center",
        },
        buttonGroup: {
          alignItems: "center",
        },
        button: {
          width: "100%",
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link to={`/`}><h1 style={styles.title}>Agro Export</h1></Link>
        <div style={styles.userInfo}>
          <Link to="/UserProfile">
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              alt="User Avatar"
              style={styles.avatar}
            />
          </Link>
          <span style={styles.userSpan}>User11</span>
        </div>
      </header>

      <div style={{...styles.buttonsContainer,marginTop: "300px"}}>
        <div style={styles.buttonGroup}>
          <Link to="/recieveorders">
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Received orders
            </button>
          </Link>
          <Link to={'/sentorders'}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Sent orders
          </button>
          </Link>

          <Link to="/Ongoingorders">
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Ongoing orders
            </button>
          </Link>
          
        </div>
       
        <div style={styles.buttonGroup}>
          <Link to="/Insertexportdata">
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Add an export item
            </button>
          </Link>
          <Link to="/viewExporteditems">
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              View Exported items
            </button>
          </Link>

          <Link to="/paymentreturnlist">
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Payments Returns
            </button>
          </Link>

          <Link to="/updatestatus">
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
             Order Status Update
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
