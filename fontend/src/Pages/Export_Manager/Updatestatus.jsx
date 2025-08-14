import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Navbar from '../../Components/Navbar';
const Updatestatus = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all orders
    useEffect(() => {
        fetch('http://localhost:3000/api/ordermanagement')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching orders: ", err));
    }, []);

    // Update the order status
    const handleStatusChange = (orderId, newStatus) => {
        fetch(`http://localhost:3000/api/ordermanagement/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then(response => response.json())
        .then(updatedOrder => {
            // Update the order state with the new status
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === updatedOrder._id ? updatedOrder : order
                )
            );
        })
        .catch(err => console.error("Error updating order status: ", err));
    };

    if (loading) return <p className="text-center text-xl">Loading orders...</p>;

    // Filter orders based on search term
    const filteredOrders = orders.filter(order =>
      ((order.customerID && order.customerID.includes(searchTerm)) ||
      (order.orderID && order.orderID.includes(searchTerm)) ||
      (order.customerEmail && order.customerEmail.includes(searchTerm))) &&
      (order.status === 'order accepted' ||
       order.status === 'delivery successful' ||
       order.status === 'cancelled' ||
       order.status === 'getItems' ||
      order.status === 'packaged'||
      order.status === 'exported'||
      order.status === 'delivered') 
  );
  

  const saveHandel = () =>{
    swal("Updated Successfully", "", "success");
    window.location.reload();
  }
    return (
       <div>
        <Navbar/>
         <div className="bg-gray-100 mt-20 min-h-screen flex flex-col items-center">
            <div className="container mx-auto p-4 mt-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Accepted Orders</h1>
                
                {/* Search form */}
                <div className="mb-4 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer ID, or Email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                    />

                    <button onClick={saveHandel} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'>Save </button>
                </div>

                <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Customer ID</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Shipping Fee</th>
                            <th className="px-4 py-2">Total Price</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-100 transition duration-200">
                                <td className="border px-4 py-2 text-center">{order.orderID}</td>
                                <td className="border px-4 py-2 text-center">{order.customerID}</td>
                                <td className="border px-4 py-2 text-center">{order.customerEmail}</td>
                                <td className="border px-4 py-2 text-center">${order.amount.toFixed(2)}</td>
                                <td className="border px-4 py-2 text-center">${order.shippingfee.toFixed(2)}</td>
                                <td className="border px-4 py-2 text-center">${order.totalprice.toFixed(2)}</td>
                                <td className="border px-4 py-2 text-center">{order.status}</td>
                                <td className="border px-4 py-2 text-center">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="order accepted">Order Accepted</option>
                                        <option value="delivery successful">Delivery Successful</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="getItems">Get Items</option>
                                        <option value="processing">Processing</option>
                                        <option value="packaged">Packaged</option>
                                        <option value="exported">Exported</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
       </div>
    );
};

export default Updatestatus;
