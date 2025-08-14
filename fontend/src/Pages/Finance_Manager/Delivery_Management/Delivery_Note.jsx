import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../../UserContext";
import Navbar from "../../../Components/Navbar";

export const Delivery_Note = () => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    payment_id: "",
    process_id: "",
    to_whom: "",
    amount: "",
    payment_method: "",
    note: "",
    approved_by: "pending",
    payment_status: "",
  });

  const [amountError, setAmountError] = useState(""); // To track error state for amount

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate amount field
    if (name === "amount") {
      if (value < 0) {
        setAmountError("Amount cannot be negative"); // Set error message
        setFormData({ ...formData, [name]: "" }); // Clear the amount field
      } else {
        setAmountError(""); // Clear the error message if input is valid
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amountError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/financial", formData);
      alert("Delivery Note created successfully!");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating delivery note", error);
      alert("Error creating delivery note.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar/>
      <form
        className="bg-white mt-20 p-8 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
          Delivery Note
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Payment ID:</label>
          <input
            type="text"
            name="payment_id"
            value={formData.payment_id}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Process ID:</label>
          <input
            type="text"
            name="process_id"
            value={formData.process_id}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">To Whom:</label>
          <input
            type="text"
            name="to_whom"
            value={formData.to_whom}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none ${amountError ? "border-red-500" : "focus:border-green-400"}`}
          />
          {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Payment Method:</label>
          <input
            type="text"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Note:</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Payment Status:</label>
          <input
            type="text"
            name="payment_status"
            value={formData.payment_status}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-yellow-500 transition duration-200"
          disabled={!!amountError} // Disable submit if there's an error
        >
          Submit Delivery Note
        </button>
      </form>
    </div>
  );
};
