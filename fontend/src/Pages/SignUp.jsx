import React, { useState } from "react";
import axios from "axios";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    email: "",
    password: "",
    role: "Inventory Manager"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/", formData);
      alert("Registration successful");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error registering user", error);
      alert("Error registering user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Register
        </h2>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">NIC:</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-400"
          >
            <option value="Inventory Manager">Inventory Manager</option>
            <option value="Financial Manager">Financial Manager</option>
            <option value="Delivery Manager">Delivery Manager</option>
            <option value="Export Manager">Export Manager</option>
            <option value="Order Manager">Order Manager</option>
            <option value="Collection Manager">Collection Manager</option>
            <option value="Distributor Manager">Distributor Manager</option>
            <option value="Supplier Manager">Supplier Manager</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};


