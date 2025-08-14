import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Navbar from "../../Components/Navbar";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from API when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/ordermanagement/'); // Updated API endpoint
      const data = await response.json();
      setOrders(data); // Set the orders in state
      console.log(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    const lowerCaseQuery = searchQuery.toLowerCase(); // Convert the search query to lowercase
  
    // Check if the properties exist before accessing them
    const userId = order.UserID ? order.UserID.toLowerCase() : "";
    const orderId = order.OrderID ? order.OrderID.toLowerCase() : "";
    const item = order.Item ? order.Item.toLowerCase() : "";
    const quantity = order.Quantity ? order.Quantity.toString() : "";
    const status = order.status ? order.status.toLowerCase() : "";
  
    // Only include orders with status "delivery successful"
    return (
       // Ensure the status is "delivery successful"
      (userId.includes(lowerCaseQuery) || 
       orderId.includes(lowerCaseQuery) || 
       item.includes(lowerCaseQuery) || 
       quantity.includes(lowerCaseQuery)) &&
       status === "delivery successful"
    );
  });
  
  // Define styles for inline use
  const styles = {
    appContainer: {
      marginTop:"90px",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#e3f2fd",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#388e3c",
      color: "white",
      padding: "10px",
    },
    h1: {
      margin: "0",
    },
    searchBar: {
      padding: "8px",
      width: "300px",
      border: "none",
      borderRadius: "5px",
    },
    ordersTableContainer: {
      marginTop: "20px",
    },
    ordersTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "10px",
      backgroundColor: "#f2f2f2",
      borderBottom: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      textAlign: "center",
      borderBottom: "1px solid #ddd",
    },
    status: {
      padding: "8px 12px",
      borderRadius: "5px",
      color: "white",
      backgroundColor: "#4caf50",
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      fontWeight: "bold",
    }
  };

  return (
    <div>
      <Navbar/>
      <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Sent Orders</h1>
        <Link to="/" style={styles.link}>Back to home page</Link>
        <input
          type="text"
          placeholder="Enter your OrderID or Item"
          style={styles.searchBar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div style={styles.ordersTableContainer}>
        <table style={styles.ordersTable}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Customer ID</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Shipping fee</th>
              <th style={styles.th}>Total Price</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td style={styles.td}>{order.orderID}</td>
                  <td style={styles.td}>{order.customerID}</td>
                  <td style={styles.td}>{order.amount}</td>
                  <td style={styles.td}>{order.shippingfee}</td>
                  <td style={styles.td}>{order.totalprice}</td>
                  <td style={styles.td}>{order.status}</td>
                  <td style={styles.td}>
                    <span style={styles.status}>
                      Order delivered successfully to the destination
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="4">No accepted orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default App;
