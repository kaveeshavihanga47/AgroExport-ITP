import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

export const CancaledOrders = () => {
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
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Function to handle exporting and changing the order status
  const handleExport = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ReceivedOrders/updateStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? { ...order, status: "Ongoing" } : order
          )
        );

        // Show a success alert using SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Order accepted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'swal-button--confirm', // Custom class for button styling
          },
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

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    const lowerCaseQuery = searchQuery.toLowerCase(); // Convert the search query to lowercase
    return (
     ( (order.customerID && order.customerID.toLowerCase().includes(lowerCaseQuery)) || // Check if customerID exists
      (order.orderID && order.orderID.toLowerCase().includes(lowerCaseQuery)) || // Check if orderID exists
      (order.amount && order.amount.toString().includes(lowerCaseQuery)) || // Check if amount exists
      (order.shippingfee && order.shippingfee.toString().includes(lowerCaseQuery)) || // Check if shippingfee exists
      (order.totalprice && order.totalprice.toString().includes(lowerCaseQuery))) &&
      order.status == "cancelled" // Check if totalprice exists
    );
  });

  return (
    <div className="font-sans bg-gray-200 min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Cancelled Orders</h1>
        <Link to="/recieveorders" className="text-blue-500 font-semibold hover:text-blue-700">Back to Received Orders</Link>
        <input
          type="text"
          placeholder="Enter your OrderID or Item"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="flex-grow overflow-auto mx-5">
        {filteredOrders.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded my-6">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer ID</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Shipping Fee</th>
                <th className="py-2 px-4">Total Price</th>
                <th className="py-2 px-4">Status</th>
                
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b border-b-neutral-500 text-center">
                  <td className="py-2 px-4">{order.orderID}</td>
                  <td className="py-2 px-4">{order.customerID}</td> {/* Fixed the field name */}
                  <td className="py-2 px-4">{order.amount}</td> {/* Fixed the field name */}
                  <td className="py-2 px-4">{order.shippingfee}</td> {/* Fixed the field name */}
                  <td className="py-2 px-4">{order.totalprice}</td> {/* Fixed the field name */}
                  <td className="py-2 px-4">{order.status === "accepted" ? "Order Placed" : order.status}</td>
                  <td className="py-2 px-4"><Link to={`/paymentreturn`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Payment back</button></Link></td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="bg-white shadow-md rounded p-4 my-6">
            <p className="text-gray-700">No accepted orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

