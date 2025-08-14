import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import "jspdf-autotable";
import Navbar from "../../../Components/Navbar";

export const DistributorList = () => {
  const [distributors, setDistributors] = useState([]);
  const [editDistributor, setEditDistributor] = useState(null);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/destributor");
      setDistributors(response.data);
    } catch (error) {
      console.error("Error fetching distributors", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/destributor/${id}`);
      setDistributors(distributors.filter((dist) => dist._id !== id));
      alert("Distributor deleted successfully!");
    } catch (error) {
      console.error("Error deleting distributor", error);
      alert("Failed to delete distributor");
    }
  };

  const handleEditToggle = (distributor) => {
    setEditDistributor(distributor);
    setErrors({}); // Clear any previous errors when editing a new distributor
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!editDistributor.nic || editDistributor.nic.length > 12) {
      validationErrors.nic = "NIC must be 12 characters or less.";
    }
    if (editDistributor.quantity < 0) {
      validationErrors.quantity = "Quantity cannot be negative.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSaveEdit = async () => {
    if (!validateForm()) {
      return; // Prevent saving if validation fails
    }

    try {
      await axios.put(`http://localhost:3000/api/destributor/${editDistributor._id}`, editDistributor);
      fetchDistributors();
      setEditDistributor(null);
      alert("Distributor updated successfully!");
    } catch (error) {
      console.error("Error updating distributor", error);
      alert("Failed to update distributor");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // Apply field-specific validation before setting the state
    if (name === "quantity" && value < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        quantity: "Quantity cannot be negative."
      }));
    } else if (name === "nic" && value.length > 12) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nic: "NIC must be 12 characters or less."
      }));
    } else {
      // Clear errors if the input is valid
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null
      }));
    }
    setEditDistributor({ ...editDistributor, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Distributor List", 14, 16);

    const tableColumn = ["ID", "NIC", "Needs", "Quantity", "Status"];
    const tableRows = [];

    distributors.forEach((distributor) => {
      const distributorData = [
        distributor._id,
        distributor.nic,
        distributor.needs,
        distributor.quantity,
        distributor.status,
      ];
      tableRows.push(distributorData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("distributor_list.pdf");
  };

  // Function to filter distributors based on search query
  const filteredDistributors = distributors.filter((distributor) => {
    return (
      distributor._id.toString().includes(searchQuery) || // Search by Need ID
      distributor.nic.includes(searchQuery) ||          // Search by NIC
      distributor.needs.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by Needs
      distributor.quantity.toString().includes(searchQuery) || // Search by Quantity
      distributor.status.toLowerCase().includes(searchQuery.toLowerCase())   // Search by Status
    );
  });

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mt-20 mb-6 text-green-600 text-center">Distributor Management</h2>

        <div className="flex flex-row gap-x-2 mb-4">
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Generate PDF
          </button>

          <Link to={`/destribution`}>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Add Distribution
            </button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Need ID, NIC, Needs, Quantity, Status"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="py-2 px-4">Need ID</th>
              <th className="py-2 px-4">NIC</th>
              <th className="py-2 px-4">Needs</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDistributors.map((distributor) => (
              <tr key={distributor._id} className="border-t text-center ">
                <td className="py-2 px-4">{distributor._id}</td>
                <td className="py-2 px-4">{distributor.nic}</td>
                <td className="py-2 px-4">{distributor.needs}</td>
                <td className="py-2 px-4">{distributor.quantity}</td>
                <td className="py-2 px-4">{distributor.status}</td>
                <td className="py-2 px-4 flex">
                  <button
                    onClick={() => handleEditToggle(distributor)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(distributor._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editDistributor && (
          <div className="mt-6 bg-white p-4 border rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-green-600">Edit Distributor</h3>
            <div className="mb-4">
              <label className="block text-green-600 mb-2">NIC</label>
              <input
                type="text"
                name="nic"
                value={editDistributor.nic}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.nic && <p className="text-red-500">{errors.nic}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-green-600 mb-2">Needs</label>
              <input
                type="text"
                name="needs"
                value={editDistributor.needs}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-600 mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={editDistributor.quantity}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-green-600 mb-2">Status</label>
              <input
                type="text"
                name="status"
                value={editDistributor.status}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <button
              onClick={handleSaveEdit}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-500"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
