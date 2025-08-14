import React, { useContext, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import Navbar from "../Components/Navbar";


export const SignIn = () => {

  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      const response = await axios.post("http://localhost:3000/api/user/login", formData);
      const user = await response.data;
      setCurrentUser(user);
      console.log(user);
      if (user.role === "Financial Manager") {
        console.log(user.role)
        navigate(`/financedashboard`);
    } else if (user.role === "Inventory Manager") {
        navigate(`/inventorylist`);
    }else if (user.role === "Export Manager") {
      navigate(`/exportdashboard`);
    }
    else if (user.role === "Customer") {
        navigate(`/`)
    }else if(user.role === "Distributor Manager") {
      navigate(`/distributelist`)
    }else if(user.role === "Delivery Manager") {
      navigate(`/deliverydashboard`)
    }else if(user.role === "Supplier Manager") {
      navigate(`/supplierdashboard`)
    }else if(user.role === "Collection Manager") {
      navigate(`/harvestinglist`)
    }else if(user.role === "Order Manager") {
      navigate(`/orderlist`)
    }
    else if (user){
        navigate(`/financedashboard`);
    }else if(user.role === "Distributor Manager") {
        navigate(`/insertdistribute`)
    }
    else {
        alert("Invalid credentials");
    }

    } catch (error) {
      console.error("Error logging in", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar/>
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Login
        </h2>
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
        <div className="mb-6">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};


