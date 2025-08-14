import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

function UpdateHDetails() {
  const [harvestData, setHarvestData] = useState({
    HarID: "",
    farmerNIC: "",
    Name: "",
    Address: "",
    CNumber: "",
    Category: "",
    Quantity: "",
    Date: "",
    Time: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/collecting/${id}`)
      .then((res) => {
        setHarvestData({
          HarID: res.data.HarID,
          farmerNIC: res.data.farmerNIC,
          Name: res.data.Name,
          Address: res.data.Address,
          CNumber: res.data.CNumber,
          Category: res.data.Category,
          Quantity: res.data.Quantity,
          Date: res.data.Date,
          Time: res.data.Time,
        });
      })
      .catch((err) => {
        console.log("Error from Update Employee", err);
      });
  }, [id]);

  const onChange = (e) => {
    setHarvestData({
      ...harvestData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^07\d{8}$/;
    if (!phoneRegex.test(harvestData.CNumber)) {
      window.alert("Please enter a valid Sri Lankan contact number.");
      return;
    }

    const data = {
      HarID: harvestData.HarID,
      farmerNIC: harvestData.farmerNIC,
      Name: harvestData.Name,
      Address: harvestData.Address,
      CNumber: harvestData.CNumber,
      Category: harvestData.Category,
      Quantity: harvestData.Quantity,
      Date: harvestData.Date,
      Time: harvestData.Time,
    };

    axios
      .put(`http://localhost:3000/api/collecting/${id}`, data)
      .then((res) => {
        window.alert("Are you sure about updating!");
        navigate(`/showdetailH/${id}`);
      })
      .catch((err) => {
        console.log("Error in Update");
        window.alert("Error updating details. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-10">
      <Navbar/>
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-8 transform transition duration-500 hover:scale-105">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">
            Update Harvesting Details
          </h1>
          <Link
            to="/"
            className="text-lg text-gray-700 hover:text-gray-900 hover:underline transition duration-300"
          >
            Show Harvest Detail List
          </Link>
        </div>

        <form noValidate onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="HarID" className="block text-sm font-medium text-gray-600">HarID</label>
              <input
                type="text"
                placeholder="HarID"
                name="HarID"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.HarID}
                onChange={onChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="farmerNIC" className="block text-sm font-medium text-gray-600">Farmer NIC</label>
              <input
                type="text"
                placeholder="Farmer NIC"
                name="farmerNIC"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.farmerNIC}
                onChange={onChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="Name" className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="Name"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.Name}
                onChange={onChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="Address" className="block text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                placeholder="Address"
                name="Address"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.Address}
                onChange={onChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="CNumber" className="block text-sm font-medium text-gray-600">Contact Number</label>
              <input
                type="tel"
                placeholder="Contact Number"
                name="CNumber"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.CNumber}
                onChange={onChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="Category" className="block text-sm font-medium text-gray-600">Category</label>
              <select
                name="Category"
                className="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.Category}
                onChange={onChange}
              >
                <option value="">Select Category</option>
                <option value="Cashew">Cashew</option>
                <option value="Coconut">Coconut</option>
                <option value="Corn">Corn</option>
                <option value="Pepper">Pepper</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Quantity" className="block text-sm font-medium text-gray-600">Quantity</label>
              <input
                type="text"
                placeholder="Quantity"
                name="Quantity"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.Quantity}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Date" className="block text-sm font-medium text-gray-600">Date</label>
              <input
                type="date"
                name="Date"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.Date ? new Date(harvestData.Date).toISOString().split("T")[0] : ""}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Time" className="block text-sm font-medium text-gray-600">Time</label>
              <input
                type="time"
                name="Time"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={harvestData.Time}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/2 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700 focus:outline-none"
            >
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateHDetails;
