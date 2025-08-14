import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

const UpdateFarmerPayment = () => {
    const { process_id } = useParams(); // Retrieve process_id from the URL
    const [farmerData, setFarmerData] = useState({
        nic: '',
        amount: '',
        payment_method: '',
        date_time: '',
        payment_status: ''
    });

    const [showModal, setShowModal] = useState(false); // Modal state
    const [modalMessage, setModalMessage] = useState(''); // Message for modal
    const [modalType, setModalType] = useState(''); // Type of modal: 'success' or 'error'

    useEffect(() => {
        // Fetch farmer data by process_id
        axios.get(`http://localhost:3000/api/FarmerPayments/${process_id}`)
            .then((response) => {
                setFarmerData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching farmer data:", error);
            });
    }, [process_id]);

    const handleChange = (e) => {
        setFarmerData({
            ...farmerData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/FarmerPayments/${process_id}`, farmerData)
            .then(() => {
                setModalType('success');
                setModalMessage("Farmer payment details updated successfully!");
                setShowModal(true); // Show modal
            })
            .catch((error) => {
                console.error("Error updating farmer data:", error);
                setModalType('error');
                setModalMessage("Failed to update payment details.");
                setShowModal(true); // Show modal
            });
    };

    const handleClose = () => setShowModal(false); // Function to close the modal

    return (
        <div>
            <Navbar />
            <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Farmer Payment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">NIC:</label>
                        <input
                            type="text"
                            name="nic"
                            value={farmerData.nic}
                            onChange={handleChange}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            value={farmerData.amount}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Payment Method:</label>
                        <input
                            type="text"
                            name="payment_method"
                            value={farmerData.payment_method}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Date & Time:</label>
                        <input
                            type="datetime-local"
                            name="date_time"
                            value={farmerData.date_time}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Payment Status:</label>
                        <select
                            name="payment_status"
                            value={farmerData.payment_status}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="" disabled>Select Payment Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
                        >
                            Update Payment
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal Component */}
            {showModal && (
                <div className="modal-overlay">
                    <div className={`modal ${modalType}`}>
                        <h2>{modalType === 'success' ? 'Success' : 'Error'}</h2>
                        <p>{modalMessage}</p>
                        <button onClick={handleClose} className="close-button">Close</button>
                    </div>
                </div>
            )}

            {/* CSS for modal */}
            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
                    text-align: center;
                    transition: transform 0.3s ease;
                }
                .modal.success {
                    border-left: 5px solid green;
                }
                .modal.error {
                    border-left: 5px solid red;
                }
                .close-button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: blue;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .close-button:hover {
                    background-color: darkblue;
                }
            `}</style>
        </div>
    );
};

export default UpdateFarmerPayment;
