import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/ReceivedOrders'); // Updated API endpoint
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Filtering orders based on search query
  const filteredOrders = orders.filter(order =>
    (order.customerID && order.customerID.includes(searchQuery)) ||
    (order.orderID && order.orderID.includes(searchQuery))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Received Orders</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by CustomerID or OrderID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Orders Table */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Customer ID</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Postal Code</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Export Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="border px-4 py-2">{order.customerID}</td>
                <td className="border px-4 py-2">{order.orderID}</td>
                <td className="border px-4 py-2">{order.quantity}</td>
                <td className="border px-4 py-2">{order.item}</td>
                <td className="border px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{order.name}</td>
                <td className="border px-4 py-2">{order.country}</td>
                <td className="border px-4 py-2">{order.postalCode}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2">${order.exportCost.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
