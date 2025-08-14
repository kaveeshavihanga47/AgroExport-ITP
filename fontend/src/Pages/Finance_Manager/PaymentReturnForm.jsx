import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../../UserContext';
import Navbar from '../../Components/Navbar';

const PaymentReturnForm = () => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    order_id: '',
    by_whom: currentUser.name || '',
    amount: '',
    return_back: '' // This field will be updated based on the amount
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update return_back whenever amount changes
  useEffect(() => {
    const amount = parseFloat(formData.amount) || 0; // Ensure amount is a number
    const calculatedReturnBack = amount - (amount * 0.75);
    setFormData((prevData) => ({
      ...prevData,
      return_back: calculatedReturnBack.toFixed(2), // Set return_back with two decimal places
    }));
  }, [formData.amount]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:3000/api/paymentreturn', formData);
      if (response.status === 200) {
        setSuccess(true);
        // Reset the form data
        setFormData({
          order_id: '',
          by_whom: currentUser.name || '',
          amount: '',
          return_back: '', // Reset this field too
        });
      }
    } catch (error) {
      setError('Failed to submit the payment return.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Navbar />
      <div className="w-full max-w-md mt-10 p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Return Form</h2>

        {success && <p className="text-green-600 text-center mb-4">Payment return submitted successfully!</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Order ID */}
          <div className="mb-4">
            <label htmlFor="order_id" className="block text-gray-700 font-semibold mb-2">Order ID</label>
            <input
              type="text"
              id="order_id"
              name="order_id"
              value={formData.order_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* By Whom */}
          <div className="mb-4">
            <label htmlFor="by_whom" className="block text-gray-700 font-semibold mb-2">By Whom</label>
            <input
              type="text"
              id="by_whom"
              name="by_whom"
              value={formData.by_whom}
              readOnly
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.01"
              required
            />
          </div>

          {/* Return Back */}
          <div className="mb-4">
            <label htmlFor="return_back" className="block text-gray-700 font-semibold mb-2">Return Back</label>
            <input
              type="text"
              id="return_back"
              name="return_back"
              value={formData.return_back}
              readOnly
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Payment Return'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentReturnForm;
