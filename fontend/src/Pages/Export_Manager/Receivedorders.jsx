import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Navbar from "../../Components/Navbar";
import jsPDF from "jspdf"; // Import jsPDF

const Receivedorders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from API when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/ordermanagement'); // Updated API endpoint
      const data = await response.json();
      console.log(data)
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Function to handle exporting and changing the order status to "accepted"
  const handleExport = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ordermanagement/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: "order accepted" }), // Update status to "order accepted"
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        
        // Update state to reflect the status change
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? { ...order, status: "order accepted" } : order
          )
        );

        Swal.fire({
          title: 'Success!',
          text: 'Order status updated to "Order Accepted"',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update order status',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the order status',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  // Function to handle marking the order as "success"
  const handleSuccess = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ordermanagement/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: "delivery successful" }), // Update status to "delivered successfully"
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? { ...order, status: "delivery successful" } : order
          )
        );

        Swal.fire({
          title: 'Success!',
          text: 'Order status updated to "Delivered Successfully"',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update order status',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the order status',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };


  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    
    // Add title
    doc.text("Received Orders", 14, 16);
    
    // Create a table header
    const headers = ["User ID", "Order ID", "Amount", "Shipping Fee", "Total Price", "Status"];
    const rows = filteredOrders.map(order => [
      order.customerID,
      order.orderID,
      order.amount,
      order.shippingfee,
      order.totalprice,
      order.status
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20,
    });
    
    // Save the PDF
    doc.save("received_orders.pdf");
  };

  const filteredOrders = orders.filter(order =>
    ((order.customerID && order.customerID.includes(searchQuery)) ||
    (order.orderID && order.orderID.includes(searchQuery))) &&
    (order.status === "pending") || (order.status === "order accepted")
  );
  
  // Inline Styles
  const styles = {
    container: {
      maxWidth: '100%',
      margin: '50px 20px',
      padding: '30px',
      backgroundColor: '#ffffff',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '16px',
      transition: 'all 0.3s ease',
    },
    containerHover: {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
    },
    title: {
      fontSize: '2.2rem',
      color: '#2c3e50',
      fontWeight: '700',
    },
    searchBar: {
      padding: '12px',
      width: '280px',
      border: '1px solid #ddd',
      borderRadius: '30px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    },
    th: {
      padding: '20px',
      backgroundColor: '#f9fafb',
      color: '#2c3e50',
      fontWeight: '600',
      fontSize: '1rem',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    td: {
      textAlign: 'center',
      padding: '20px',
      fontSize: '0.95rem',
      color: '#555',
    },
    tdFirstChild: {
      fontWeight: '500',
      color: '#34495e',
    },
    button: {
      width: '170px',
      margin: '5px 0',
      padding: '10px',
      borderRadius: '20px',
      border: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    acceptedButton: {
      backgroundColor: '#f39c12',
      boxShadow: '0 3px 6px rgba(243, 156, 18, 0.3)',
    },
    deliveredButton: {
      backgroundColor: '#28a745',
      boxShadow: '0 3px 6px rgba(40, 167, 69, 0.3)',
    },
    buttonHover: {
      backgroundColor: '#e67e22',
      boxShadow: '0 4px 10px rgba(230, 126, 34, 0.4)',
    },
    buttonDisabled: {
      cursor: 'not-allowed',
      opacity: '0.8',
    },
  };

  return (
    <div>
      <Navbar/>
      <div style={styles.container}>
        <header className="mt-10" style={styles.header}>
          <h1 style={styles.title}>Received Orders</h1>
          <Link to="/Ongoingorders" style={{ textDecoration: 'none', color: '#007bff' }}>
            Go to Ongoing Orders
          </Link>
          <button onClick={generatePDF} className="bg-green-700 px-2 py-1 rounded-md text-white hover:bg-green-800 transition-colors duration-300">
            Generate PDF
          </button>
          <input
            type="text"
            placeholder="Enter your OrderID or UserID"
            style={styles.searchBar}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
         
        </header>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Shipping Fee</th>
                <th style={styles.th}>Total Price</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index} className="justify-center items-center ">
                    <td style={styles.td}>{order.customerID}</td>
                    <td style={styles.td}>{order.orderID}</td>
                    <td style={styles.td}>{order.amount}</td>
                    <td style={{ ...styles.td }}>{order.shippingfee}</td>
                    <td style={{ ...styles.td }}>{order.totalprice}</td>
                    <td style={{ ...styles.td }}>{order.status}</td>
                    <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", gap: '10px' }}>
                      <button
                        style={{ ...styles.button, ...styles.acceptedButton }}
                        onClick={() => handleExport(order._id)}
                      >
                        Order accepted
                      </button>
                      <button
                        style={{ ...styles.button, ...styles.deliveredButton }}
                        onClick={() => handleSuccess(order._id)}
                      >
                        Delivered Successfully
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={styles.td}>No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default Receivedorders;
