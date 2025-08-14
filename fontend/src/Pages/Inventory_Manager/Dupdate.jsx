import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Dupdate() {
  const [inventory, setInventory] = useState({
    Employee_Id: "",
    transfer_id: "",
    material_id: "",
    material_type: "",
    warehouse: "",
    quantity: "",
    transfer_date_time: "",
    received_by: "",
    checked_by: "",
  });

  const { Employee_Id } = useParams(); // Fetch Employee_Id from the URL
  const navigate = useNavigate(); // Navigation after update

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/inventory/${Employee_Id}`);
        setInventory(res.data); // Directly set the response data
      } catch (err) {
        console.error('Error fetching inventory data', err);
      }
    };

    fetchInventory();
  }, [Employee_Id]);

  const onChange = (e) => {
    setInventory({
      ...inventory,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert quantity to a number if applicable
      const updatedInventory = {
        ...inventory,
        quantity: Number(inventory.quantity), // Ensure quantity is a number
      };

      console.log('Updating inventory with data:', updatedInventory); // Log data being sent

      const response = await axios.put(`http://localhost:3000/api/inventory/${Employee_Id}`, updatedInventory);
      console.log('Update response:', response.data); // Log response from server
      navigate(`/Dshow/${Employee_Id}`); // Navigate back to Dshow after update
    } catch (err) {
      console.error('Error updating inventory:', err.response ? err.response.data : err.message); // Enhanced error logging
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Update Inventory</h2>
        <Link to="/inventorylist" className="btn btn-outline-warning mb-4 text-yellow-600 hover:text-yellow-800">
          Show Inventory
        </Link>
        <form noValidate onSubmit={onSubmit}>
          {/* Employee ID */}
          <div className="mb-4">
            <label htmlFor="Employee_Id" className="block text-gray-700 font-medium mb-2">Employee ID:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="Employee_Id"
              name="Employee_Id"
              value={inventory.Employee_Id}
              onChange={onChange}
              required
            />
          </div>

          {/* Transfer ID */}
          <div className="mb-4">
            <label htmlFor="transfer_id" className="block text-gray-700 font-medium mb-2">Transfer ID:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="transfer_id"
              name="transfer_id"
              value={inventory.transfer_id}
              onChange={onChange}
              required
            />
          </div>

          {/* Material ID */}
          <div className="mb-4">
            <label htmlFor="material_id" className="block text-gray-700 font-medium mb-2">Material ID:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="material_id"
              name="material_id"
              value={inventory.material_id}
              onChange={onChange}
              required
            />
          </div>

          {/* Material Type */}
          <div className="mb-4">
            <label htmlFor="material_type" className="block text-gray-700 font-medium mb-2">Material Type:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="material_type"
              name="material_type"
              value={inventory.material_type}
              onChange={onChange}
              required
            />
          </div>

          {/* Warehouse */}
          <div className="mb-4">
            <label htmlFor="warehouse" className="block text-gray-700 font-medium mb-2">Warehouse:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="warehouse"
              name="warehouse"
              value={inventory.warehouse}
              onChange={onChange}
              required
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity:</label>
            <input
              type="number" // Change input type to number
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="quantity"
              name="quantity"
              value={inventory.quantity}
              onChange={onChange}
              required
            />
          </div>

          {/* Transfer Date & Time */}
          <div className="mb-4">
            <label htmlFor="transfer_date_time" className="block text-gray-700 font-medium mb-2">Transfer Date & Time:</label>
            <input
              type="datetime-local" // Change to datetime-local
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="transfer_date_time"
              name="transfer_date_time"
              value={inventory.transfer_date_time} // Ensure this is in the correct format
              onChange={onChange}
              required
            />
          </div>

          {/* Received By */}
          <div className="mb-4">
            <label htmlFor="received_by" className="block text-gray-700 font-medium mb-2">Received By:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="received_by"
              name="received_by"
              value={inventory.received_by}
              onChange={onChange}
              required
            />
          </div>

          {/* Checked By */}
          <div className="mb-6">
            <label htmlFor="checked_by" className="block text-gray-700 font-medium mb-2">Checked By:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              id="checked_by"
              name="checked_by"
              value={inventory.checked_by}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Update Inventory
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dupdate; // Ensure this line is present
