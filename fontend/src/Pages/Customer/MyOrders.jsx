import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../../Components/Navbar';
import UserContext from '../../UserContext';

export const MyOrders = () => {
  const { currentUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/ordermanagement/email/${currentUser?.email}`);
      setOrders(response.data.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/ordermanagement/${orderId}`, {
        status: "cancelled",
      });

      if (response.status === 200) {
        const updatedOrder = response.data;
        
        // Update the local orders list
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? { ...order, status: "cancelled" } : order
          )
        );

        Swal.fire({
          title: 'Success!',
          text: 'Order cancelled successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to cancel the order',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while cancelling the order',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="order-management-container " style={styles.container}>
        <h2 className="text-2xl mt-28 mb-5 text-center font-serif">My Orders</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Order ID</th>
              <th style={styles.headerCell}>Customer ID</th>
              <th style={styles.headerCell}>Customer Email</th>
              <th style={styles.headerCell}>Amount</th>
              <th style={styles.headerCell}>Shipping Fee</th>
              <th style={styles.headerCell}>Total Price</th>
              <th style={styles.headerCell}>Status</th>
              <th style={styles.headerCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td style={styles.cell}>{order.orderID}</td>
                <td style={styles.cell}>{order.customerID}</td>
                <td style={styles.cell}>{order.customerEmail}</td>
                <td style={styles.cell}>{order.amount}</td>
                <td style={styles.cell}>{order.shippingfee}</td>
                <td style={styles.cell}>{order.totalprice}</td>
                <td style={styles.cell}>{order.status}</td>
                <td style={styles.cell}>
                  {order.status !== "cancelled" && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: 'full',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  headerCell: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #0056b3',
  },
  cell: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  cancelButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
