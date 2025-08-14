import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { locations } from './locations'; 
import Swal from 'sweetalert2'; 
import nodata from '../../assets/nodata.jpg';

const AcceptedOrders = () => {
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [inputs, setInputs] = useState({}); 
    const [suggestions, setSuggestions] = useState([]); 

    // Fetch data from the backend API using Axios
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get('http://localhost:3000/api/collectings'); // Correct API endpoint
                setOrders(response.data); // Set orders from API response
            } catch (error) {
                console.error('Error fetching orders:', error); // Handle errors
            }
            setLoading(false); // Stop loading
        };

        fetchOrders();
    }, []);

    // Reject an order
    const handleRejectOrder = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/collectings/${id}/reject`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== id)); // Remove rejected order
        } catch (error) {
            console.error('Error rejecting order:', error); // Handle errors
        }
    };

    // Mark an order as finished
    const handleFinishOrder = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/collectings/${id}/finish`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== id)); // Remove finished order
        } catch (error) {
            console.error('Error finishing order:', error); // Handle errors
        }
    };

    // Handle input changes for each order
    const handleChange = (e, id) => {
        const userInput = e.target.value;
        setInputs(prevInputs => ({
            ...prevInputs,
            [id]: userInput, // Update input for the specific order
        }));

        // Filter the suggestions based on user input
        const filteredSuggestions = locations.filter((location) =>
            location.toLowerCase().includes(userInput.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion, id) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            [id]: suggestion, // Set the selected suggestion as input
        }));
        setSuggestions([]); // Hide suggestions after selection
    };

    // Update the address for a specific order
    const handleUpdateAddress = async (id) => {
        const newWarehouse = inputs[id]; // Get the warehouse location from user input

        // Check if warehouse location is provided
        if (!newWarehouse) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops!',
                text: 'Please enter a warehouse location before updating.',
            });
            return;
        }

        const newAddress = {
            warehouse: newWarehouse,
            date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            time: new Date().toLocaleTimeString('en-GB'), // Current time in HH:MM:SS format
        };

        try {
            await axios.put(`http://localhost:3000/api/collectings/${id}/update-address`, { newAddress });

            // Update the order in the state
            const updatedOrders = orders.map(order =>
                order._id === id ? { ...order, Address: [...order.Address, newAddress] } : order
            );
            setOrders(updatedOrders);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Warehouse address updated successfully!',
            });
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message || error.message : 'An unexpected error occurred.';
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Failed to update the warehouse address: ${errorMessage}`,
            });
        }
    };

    // Filter orders by tracking number, start location, or current location
    const filteredOrders = orders.filter(order => 
        order.TrackingNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.Address[0].warehouse.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.Address[order.Address.length - 1].warehouse.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container h-screen mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">Update Tracking</h2>

            {/* Search bar for filtering orders */}
            <input
                type="text"
                placeholder="Search by Tracking Number, Start Location, or Current Location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md mb-6 p-2 border-2 border-blue-500 rounded-md focus:outline-none focus:border-blue-700 mx-auto block"
            />

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center">
                    <img src={nodata} alt="No Data" className="w-64 h-64 mb-4" width={1500} />
                    <p className="text-lg text-gray-600">No data available</p>
                </div>
            ) : (
                <table className="min-w-full  bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="p-4 text-left">Tracking Number</th>
                            <th className="p-4 text-left">Start Location</th>
                            <th className="p-4 text-left">Current Location</th>
                            <th className="p-4 text-left">Update Tracking</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="p-4">{order.TrackingNo}</td>
                                <td className="p-4">{order.Address[0].warehouse}</td>
                                <td className="p-4">{order.Address[order.Address.length - 1].warehouse}</td>
                                <td className="p-4">
                                    <div className="relative">
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            type="text"
                                            value={inputs[order._id] || ''} // Get input for this specific order
                                            onChange={(e) => handleChange(e, order._id)} // Pass order ID
                                            placeholder="Enter a location..."
                                        />
                                        {/* Show location suggestions */}
                                        {suggestions.length > 0 && (
                                            <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-md z-10">
                                                {suggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleSuggestionClick(suggestion, order._id)}
                                                    >
                                                        {suggestion}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 flex space-x-2">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                        onClick={() => handleUpdateAddress(order._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                                        onClick={() => handleFinishOrder(order._id)}
                                    >
                                        Finish
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                        onClick={() => handleRejectOrder(order._id)}
                                    >
                                        Reject
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

export default AcceptedOrders;
