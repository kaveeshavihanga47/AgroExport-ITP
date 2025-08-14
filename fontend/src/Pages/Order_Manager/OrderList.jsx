import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../../Components/Navbar";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ordermanagement");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/ordermanagement/${id}`)
      .then(() => {
        setOrders(orders.filter((order) => order._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the order!", error);
      });
  };

  const handleUpdate = (id) => {
    console.log("Update order with ID:", id);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Order Management List", 14, 22);

    const tableColumn = ["Order ID", "Customer ID", "Amount", "Shipping Fee", "Total Price"];
    const tableRows = [];

    filteredOrders.forEach((order) => {
      const orderData = [
        order.orderID,
        order.customerID,
        order.amount,
        order.shippingfee,
        order.totalprice,
      ];
      tableRows.push(orderData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("order_management_list.pdf");
  };

  const filteredOrders = orders.filter((order) =>
    order.orderID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p style={{ textAlign: 'center' }}>Loading orders...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="order-table-container mt-20" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ textAlign: 'center', color: '#333', fontFamily: 'serif', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Order Management List</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: '20px',
            padding: '10px',
            width: '100%',
            maxWidth: '300px',
            border: '2px solid #007BFF',
            borderRadius: '5px',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#0056b3')}
          onBlur={(e) => (e.target.style.borderColor = '#007BFF')}
        />

        {/* Generate PDF Button */}
        <button
          onClick={generatePDF}
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
            float: 'right',
            transition: 'background-color 0.3s',
          }}
        >
          Generate PDF
        </button>

        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{
            width: '100%',
            margin: '20px 0',
            borderCollapse: 'collapse',
            borderRadius: '5px',
            overflow: 'hidden',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead style={{ backgroundColor: '#007BFF', color: 'white' }}>
            <tr>
              <th style={{ padding: '10px' }}>Order ID</th>
              <th style={{ padding: '10px' }}>Customer ID</th>
              <th style={{ padding: '10px' }}>Amount</th>
              <th style={{ padding: '10px' }}>Shipping Fee</th>
              <th style={{ padding: '10px' }}>Total Price</th>
              <th style={{ padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: '20px' }}>No Orders Found</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{order.orderID}</td>
                  <td style={{ padding: '10px' }}>{order.customerID}</td>
                  <td style={{ padding: '10px' }}>{order.amount}</td>
                  <td style={{ padding: '10px' }}>{order.shippingfee}</td>
                  <td style={{ padding: '10px' }}>{order.totalprice}</td>
                  <td style={{ padding: '10px' }}>
                    <Link to={`/update-information/${order._id}`}>
                      <button
                        style={{
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '10px 15px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginRight: '10px',
                          transition: 'background-color 0.3s',
                        }}
                      >
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(order._id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
