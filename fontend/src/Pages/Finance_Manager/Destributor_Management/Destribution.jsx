import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../../Components/Navbar";

// Form component for Destributor
export const Destribution = () => {
  const [formData, setFormData] = useState({
    nic: "",
    needs: "",
    quantity: 0,
    date_time: new Date().toISOString().substring(0, 16), // Default to current date-time
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/destributor", formData);
      alert("Distributor created successfully!");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error creating distributor", error);
      alert("Failed to create distributor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar/>
      <form onSubmit={handleSubmit} className="bg-white p-8 mt-20 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">Distributor Form</h2>

        <div className="mb-4">
          <label className="block text-green-600 font-medium mb-2">NIC</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-600 font-medium mb-2">Needs</label>
          <input
            type="text"
            name="needs"
            value={formData.needs}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-600 font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-600 font-medium mb-2">Date & Time</label>
          <input
            type="datetime-local"
            name="date_time"
            value={formData.date_time}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-600 font-medium mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Delivered">Delivered</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-yellow-500 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};


