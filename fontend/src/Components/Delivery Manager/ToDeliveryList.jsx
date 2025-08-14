import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import NavBar from './NavBar';

const ToDeliveryList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state to show a loading message or spinner
    const [searchTerm, setSearchTerm] = useState(''); // State to store search input

    // Fetch data from the backend API using Axios
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get('http://localhost:3000/api/collectings'); // Correct API endpoint
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
            setLoading(false); // Stop loading
        };

        fetchOrders();
    }, []);

    // Reject order
    const handleRejectOrder = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/collectings/${id}/reject`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        } catch (error) {
            console.error('Error rejecting order:', error);
        }
    };

    // Accept order
    const handleAcceptOrder = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/collectings/${id}/accept`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    // Filter orders by HarID or farmerNIC
    const filteredOrders = orders.filter(order => 
        order.HarID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.farmerNIC.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Inline Styles
    const containerStyle = {
        padding: '30px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const titleStyle = {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold',
    };

    const tableStyle = {
        width: '100%',
        maxWidth: '1200px',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    };

    const thStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '1.1rem',
        padding: '12px',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '12px',
        fontSize: '1rem',
        borderBottom: '1px solid #ddd',
    };

    const btnStyle = {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        fontSize: '1rem',
        fontWeight: '600',
        margin: '5px',
    };

    const acceptBtnStyle = {
        ...btnStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const rejectBtnStyle = {
        ...btnStyle,
        backgroundColor: '#f44336',
        color: 'white',
    };

    return (
        <div style={containerStyle}>
            <NavBar />
            <br /><br /><br />
            <h2 style={titleStyle}>Orders to Deliver</h2>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by Name or NIC or HarID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-bar"
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    marginBottom: '20px',
                    width: '100%',
                    maxWidth: '400px',
                }}
            />

            {loading ? (
                <p>Loading...</p> 
            ) : filteredOrders.length === 0 ? (
                <div className="no-data-container">
                    <img src="nodata.jpg" alt="No Data" width={500} />  
                    <p>No data available</p> 
                </div>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>HarID</th>
                            <th style={thStyle}>Farmer NIC</th>
                            <th style={thStyle}>Farmer</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Quantity</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id}>
                                <td style={tdStyle}>{order.HarID}</td>
                                <td style={tdStyle}>{order.farmerNIC}</td>
                                <td style={tdStyle}>{order.Name}</td>
                                <td style={tdStyle}>{order.Category}</td>
                                <td style={tdStyle}>{order.Quantity}</td>
                                <td style={tdStyle}>
                                    <button
                                        style={acceptBtnStyle}
                                        onClick={() => handleAcceptOrder(order._id)}
                                    >
                                        Accept Order
                                    </button>
                                    <button
                                        style={rejectBtnStyle}
                                        onClick={() => handleRejectOrder(order._id)}
                                    >
                                        Reject Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ToDeliveryList;
