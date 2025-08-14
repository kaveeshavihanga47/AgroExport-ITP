import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const randomNum = Math.floor(Math.random() * 9000) + 1000;
const processId = 'PID' + randomNum;

const FarmerPayments = () => {
    const [employeeData, setEmployeedata] = useState({
        process_id: processId,
        nic: "",
        amount: "",
        payment_method: "Cash", // Default value
        date_time: "",
        payment_status: "Pending", // Default value
    });

    const [errors, setErrors] = useState({
        nic: "",
        date_time: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "amount") {
            // Prevent negative numbers
            const numericValue = parseFloat(value);
            if (numericValue < 0 || isNaN(numericValue)) {
                setEmployeedata({
                    ...employeeData,
                    amount: "", // Clear the amount field if it's invalid
                });
                return;
            }
        }

        setEmployeedata({
            ...employeeData,
            [name]: value,
        });

        // Live validation
        if (name === "nic") {
            validateNIC(value);
        } else if (name === "date_time") {
            validateDateTime(value);
        }
    };

    const validateNIC = (nic) => {
        const nicRegex = /^[0-9]{9}[Vv]$|^[0-9]{12}$/; // Validates 9 digits + V/v or 12 digits
        if (!nicRegex.test(nic)) {
            setErrors(prev => ({ ...prev, nic: "Invalid NIC (9 digits + V/v or 12 digits)." }));
        } else {
            setErrors(prev => ({ ...prev, nic: "" }));
        }
    };

    const validateDateTime = (dateTime) => {
        const selectedDate = new Date(dateTime);
        const now = new Date();
        if (selectedDate < now) {
            setErrors(prev => ({ ...prev, date_time: "Date and time cannot be in the past." }));
        } else {
            setErrors(prev => ({ ...prev, date_time: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate NIC and Date-Time
        if (errors.nic || errors.date_time) {
            alert("Please fix validation errors before submitting.");
            return;
        }

        axios.post("http://localhost:3000/api/FarmerPayments", employeeData)
            .then(() => {
                setEmployeedata({
                    process_id: processId,
                    nic: "",
                    amount: "",
                    payment_method: "Cash", // Reset to default
                    date_time: "",
                    payment_status: "Pending", // Reset to default
                });

                window.location.reload(); // Refresh page after successful submission
            })
            .catch((error) => {
                alert(error); // Display error message
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Navbar />
            <div className="mt-20 max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Payment Details Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="process_id" className="block text-sm font-medium text-gray-700">Process ID:</label>
                        <input
                            type="text"
                            id="process_id"
                            name="process_id"
                            placeholder="Enter process ID"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange}
                            value={employeeData.process_id}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC:</label>
                        {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>} {/* Show NIC error */}
                        <input
                            type="text"
                            id="nic"
                            name="nic"
                            placeholder="Enter NIC"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.nic ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            onChange={handleChange}
                            value={employeeData.nic}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (Rs):</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Enter amount"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange}
                            value={employeeData.amount}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700">Payment Method:</label>
                        <select
                            id="payment_method"
                            name="payment_method"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange}
                            value={employeeData.payment_method}
                            required
                        >
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date_time" className="block text-sm font-medium text-gray-700">Date & Time:</label>
                        {errors.date_time && <p className="text-red-500 text-sm">{errors.date_time}</p>} {/* Show Date-Time error */}
                        <input
                            type="datetime-local"
                            id="date_time"
                            name="date_time"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.date_time ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            onChange={handleChange}
                            value={employeeData.date_time}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="payment_status" className="block text-sm font-medium text-gray-700">Payment Status:</label>
                        <select
                            id="payment_status"
                            name="payment_status"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange}
                            value={employeeData.payment_status}
                            required
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FarmerPayments;
