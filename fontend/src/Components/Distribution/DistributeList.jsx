import React, { useState, useEffect } from "react";
import axios from "axios";
import DistributeCard from "./DistributeCard";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../Navbar";

const DistributeList = () => {
  const [distribution, setDistribution] = useState([]);
  const [filteredDistribution, setFilteredDistribution] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch distribution data
    axios
      .get("http://localhost:3000/api/distribution")
      .then((res) => {
        setDistribution(res.data);
        setFilteredDistribution(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  useEffect(() => {
    // Filter based on search query
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = distribution.filter((distribute) =>
      distribute.FarmerNIC.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredDistribution(filtered);
  }, [searchQuery, distribution]);

  // Function to delete a distribution
  const deleteDistribute = (id) => {
    axios
      .delete(`http://localhost:3000/api/distribution/${id}`)
      .then(() => {
        // Update state after successful deletion
        setFilteredDistribution(
          filteredDistribution.filter((distribute) => distribute._id !== id)
        );
        setDistribution(
          distribution.filter((distribute) => distribute._id !== id)
        );
        alert("Deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the item:", error);
        alert("Failed to delete the item. Please try again.");
      });
  };

  // Calculate total amounts for fertilizer and seeds
  const calculateTotals = () => {
    let totalFertilizer = 0;
    let totalSeeds = 0;

    filteredDistribution.forEach((distribute) => {
      if (distribute.category === "Fertilizer") {
        totalFertilizer += distribute.amount;
      } else if (distribute.category === "Seeds") {
        totalSeeds += distribute.amount;
      }
    });

    return { totalFertilizer, totalSeeds };
  };

  const { totalFertilizer, totalSeeds } = calculateTotals();

  const distributeList =
    filteredDistribution.length === 0
      ? "No distribution found!"
      : filteredDistribution.map((distribute, index) => (
          <DistributeCard
            key={index}
            distribute={distribute}
            deleteDistribute={deleteDistribute}
          />
        ));

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Farmer NIC",
      "Name",
      "Address",
      "Contact Number",
      "Category",
      "Amount",
      "Date",
    ];
    const tableRows = [];

    // Populate the rows for the table
    filteredDistribution.forEach((distribution) => {
      const distributionData = [
        distribution.FarmerNIC,
        distribution.name,
        distribution.address,
        distribution.number,
        distribution.category,
        distribution.amount,
        distribution.Date,
      ];
      tableRows.push(distributionData);
    });

    // Set title for the PDF
    doc.text("Agro Export Company", 14, 15); // Title
    doc.text("Order Distribution List", 14, 25); // Subtitle

    // Create the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90, // Start the table below the image
    });

    // Save the PDF
    doc.save("Order List.pdf");
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ ...styles.innerContainer, marginTop: "80px" }}>
      <div className="mb-4">
    <input
        type="text"
        placeholder="Search by Farmer NIC..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-60 mt-10 p-3 border border-gray-800 ml-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
</div>

        <div style={styles.button}>
          <button className="bg-green-700 px-2 py-1 rounded-md text-white hover:bg-green-500" onClick={generatePDF}>Download PDF</button>
        </div>

        <div style={styles.list}>{distributeList}</div>
      </div>
    </div>
  );
};

// Styles object
const styles = {
  innerContainer: {
    marginTop: "16px",
    width: "100%",
  },
  searchBar: {
    marginTop: "20px",
    textAlign: "center",
    
  },
  searchBarInput: {
    width: "300px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    margin: "10px 0",
    textAlign: "center",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    padding: "20px",
    marginTop: "20px",
    textAlign: "center",
  },
};

export default DistributeList;
