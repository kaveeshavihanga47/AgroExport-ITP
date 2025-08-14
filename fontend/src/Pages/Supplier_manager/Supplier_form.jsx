import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";

export const Supplier_form = () => {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    contact: "",
    email: "",
    category: "corn"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name (only letters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      alert("Name should contain only letters and spaces.");
      return;
    }

    // Validate NIC (9 digits + 'V/v' or 12 digits)
    const nicRegex = /^(\d{9}[Vv]|\d{12})$/;
    if (!nicRegex.test(formData.nic)) {
      alert("NIC should be 9 digits followed by 'V' or 'v', or 12 digits.");
      return;
    }

    // Validate contact number (only numbers and exactly 10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(formData.contact)) {
      alert("Contact number should be exactly 10 digits and contain only numbers.");
      return;
    }

    // Validate email (basic email pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/supplier", formData);
      console.log("Supplier added:", response.data);
      // Optionally reset the form
      setFormData({ name: "", nic: "", contact: "", email: "", category: "corn" });
    } catch (error) {
      console.error("There was an error adding the supplier:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto mb-5 mt-20 p-6 bg-white shadow-md shadow-slate-700 rounded-md">
        <h2 className="text-2xl font-bold font-serif text-center text-gray-800 mb-6">Add Supplier</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              pattern="[A-Za-z\s]+"
              title="Name should only contain letters."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">NIC:</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              required
              pattern="^(\d{9}[Vv]|\d{12})$"
              title="NIC should be 9 digits followed by 'V/v' or 12 digits."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="\d{10}"
              title="Contact number should be exactly 10 digits."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Please enter a valid email address."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="corn">Corn</option>
              <option value="pepper">Pepper</option>
              <option value="cashew">Cashew</option>
              <option value="coconut">Coconut</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
            >
              Add Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
