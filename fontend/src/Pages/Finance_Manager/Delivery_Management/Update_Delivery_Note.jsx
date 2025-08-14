import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../../Components/Navbar";

export const Update_Delivery_Note = () => {
  const { id } = useParams();
  const [deliveryNote, setDeliveryNote] = useState(null);
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

  const [errorMessage, setErrorMessage] = useState("");

  // Fetch delivery note when the component mounts
  useEffect(() => {
    const fetchDeliveryNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/financial/${id}`);
        setDeliveryNote(response.data);

        // Once the data is fetched, update the formData
        setFormData({
          payment_id: response.data.payment_id || "",
          process_id: response.data.process_id || "",
          to_whom: response.data.to_whom || "",
          amount: response.data.amount || "",
          payment_method: response.data.payment_method || "",
          note: response.data.note || "",
          approved_by: response.data.approved_by || "pending",
          payment_status: response.data.payment_status || "",
        });
      } catch (error) {
        console.error("Error fetching delivery note", error);
      }
    };
    fetchDeliveryNote();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for the amount field to ensure it is not negative
    if (parseFloat(formData.amount) < 0) {
      setErrorMessage("Amount cannot be a negative value.");
      return;
    }

    // Clear any previous error message
    setErrorMessage("");

    try {
      const response = await axios.put(`http://localhost:3000/api/financial/${id}`, formData);
      alert("Delivery Note updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating delivery note", error);
      alert("Error updating delivery note.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar/>
      <form
        className="bg-white p-8 mt-14 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
          Update Delivery Note
        </h2>

        {/* Display error message if validation fails */}
        {errorMessage && (
          <div className="mb-4 text-red-500 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Delivery ID (Read-Only) */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Delivery ID:</label>
          <input
            type="text"
            name="delivery_id"
            value={deliveryNote?._id || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Payment ID */}
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

        {/* Process ID */}
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

        {/* To Whom */}
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

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Payment Method */}
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

        {/* Approved By (Read-Only) */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Approved By:</label>
          <input
            type="text"
            name="approved_by"
            value={formData.approved_by}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Note */}
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

        {/* Payment Status */}
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

        {/* Created Date */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Created Date:</label>
          <input
            type="text"
            name="created_date"
            value={deliveryNote ? new Date(deliveryNote.date_time).toISOString().substring(0, 10) : ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-yellow-500 transition duration-200"
        >
          Update Delivery Note
        </button>
      </form>
    </div>
  );
};
