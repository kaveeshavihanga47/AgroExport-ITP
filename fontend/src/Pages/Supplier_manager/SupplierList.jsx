import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null); // Track which supplier is being edited
  const [editedData, setEditedData] = useState({
    name: "",
    nic: "",
    contact: "",
    email: "",
    category: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    nic: "",
    contact: "",
    email: ""
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/supplier");
        setSuppliers(response.data);
        setLoading(false);
      } catch (err) {
        setError("There was an error fetching the suppliers.");
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/supplier/${id}`);
      setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
    } catch (error) {
      console.error("There was an error deleting the supplier:", error);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier._id);
    setEditedData({
      name: supplier.name,
      nic: supplier.nic,
      contact: supplier.contact,
      email: supplier.email,
      category: supplier.category
    });
    setErrors({ name: "", nic: "", contact: "", email: "" });
  };

  const handleEditSubmit = async (id) => {
    if (!validateForm()) {
      return; 
    }
    try {
      await axios.put(`http://localhost:3000/api/supplier/${id}`, editedData);
      setSuppliers(
        suppliers.map((supplier) =>
          supplier._id === id ? { ...supplier, ...editedData } : supplier
        )
      );
      setEditingSupplier(null); 
    } catch (error) {
      console.error("There was an error updating the supplier:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Name validation: letters only
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(editedData.name)) {
      newErrors.name = "Name can contain letters and spaces only.";
      valid = false;
    }

    // NIC validation: 9 digits followed by 'V' or 12 digits
    const nicPattern = /^(?:\d{9}[Vv]|\d{12})$/;
    if (!nicPattern.test(editedData.nic)) {
      newErrors.nic = "NIC should be 9 digits followed by 'V' or 'v', or 12 digits.";
      valid = false;
    }

    // Contact validation: exactly 10 digits, numbers only
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(editedData.contact)) {
      newErrors.contact = "Contact number must be exactly 10 digits.";
      valid = false;
    }

    // Email validation: should follow email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(editedData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Supplier List", 20, 10);

    doc.autoTable({
      head: [["ID", "Name", "NIC", "Contact", "Email", "Category"]],
      body: suppliers.map(supplier => [
        supplier._id,
        supplier.name,
        supplier.nic,
        supplier.contact,
        supplier.email,
        supplier.category
      ]),
    });

    doc.save("supplier-list.pdf");
  };

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading suppliers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-16 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-bold font-serif text-gray-800 mb-6 text-center">All Suppliers</h2>

        {/* Search Input */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by ID, name, NIC, contact, email, or category"
            className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* PDF Generate Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        </div>

        {filteredSuppliers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-gray-50 shadow-md rounded-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">NIC</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier._id} className="border-b border-gray-200">
                    {editingSupplier === supplier._id ? (
                      <>
                        <td className="px-4 py-2">{supplier._id}</td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            name="name"
                            value={editedData.name}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                          />
                          {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            name="nic"
                            value={editedData.nic}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                          />
                          {errors.nic && <p className="text-red-500">{errors.nic}</p>}
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            name="contact"
                            value={editedData.contact}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                          />
                          {errors.contact && <p className="text-red-500">{errors.contact}</p>}
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="email"
                            name="email"
                            value={editedData.email}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                          />
                          {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </td>
                        <td className="px-4 py-2">
                          <select
                            name="category"
                            value={editedData.category}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                          >
                            <option value="corn">Corn</option>
                            <option value="pepper">Pepper</option>
                            <option value="cashew">Cashew</option>
                            <option value="coconut">Coconut</option>
                          </select>
                        </td>
                        <td className="px-4 py-2 flex space-x-2">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                            onClick={() => handleEditSubmit(supplier._id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition duration-300"
                            onClick={() => setEditingSupplier(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{supplier._id}</td>
                        <td className="px-4 py-2">{supplier.name}</td>
                        <td className="px-4 py-2">{supplier.nic}</td>
                        <td className="px-4 py-2">{supplier.contact}</td>
                        <td className="px-4 py-2">{supplier.email}</td>
                        <td className="px-4 py-2">{supplier.category}</td>
                        <td className="px-4 py-2 flex space-x-2">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                            onClick={() => handleEdit(supplier)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                            onClick={() => handleDelete(supplier._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">No suppliers found.</p>
        )}
      </div>
    </div>
  );
};
