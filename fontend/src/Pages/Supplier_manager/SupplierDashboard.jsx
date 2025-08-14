import React, { useState, useEffect } from "react";
import {SupplierList} from "./SupplierList";
import SupplierChart from "./SupplierChart";
import axios from "axios";
import Navbar from "../../Components/Navbar";

export const SupplierDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/supplier");
        setSuppliers(response.data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };

    fetchSuppliers();
  }, []);

  return (
   <div>
    <Navbar/>
     <div className="bg-white mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center py-2">Supplier Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <SupplierChart suppliers={suppliers} />
      </div>
      <SupplierList />
    </div>
   </div>
  );
};

