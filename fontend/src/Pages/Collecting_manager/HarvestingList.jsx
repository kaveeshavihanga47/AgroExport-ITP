import React, { useState, useEffect } from 'react';
import axios from "axios";
import HarvestingCard from './HarvestingCard'; // Assuming you have HarvestingCard as a separate component
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from '../../Components/Navbar';

const HarvestingList = () => {

  const [harvestDetails, setHarvestDetails] = useState([]);
  const [searchQueryH, setSearchQueryH] = useState("");
  const [filteredHarvestDetails, setFilteredHarvestDetails] = useState([]);

  // Filter harvest details based on search query
  useEffect(() => {
    const lowerCaseQueryH = searchQueryH.toLowerCase();

    const filteredH = harvestDetails.filter((harvestDetail) =>
      harvestDetail.HarID.toLowerCase().includes(lowerCaseQueryH)
    );
    setFilteredHarvestDetails(filteredH);
  }, [searchQueryH, harvestDetails]);

  // Fetch harvest details from API on component mount
  useEffect(() => {
    axios.get("http://localhost:3000/api/collecting")
      .then((res) => {
        setHarvestDetails(res.data);
        setFilteredHarvestDetails(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  // Delete harvest details by ID
  const onDeleteClickH = (id) => {
    // Add confirmation alert
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/api/collecting/${id}`)
        .then(() => {
          setHarvestDetails(harvestDetails.filter((harvestDetail) => harvestDetail._id !== id));
        })
        .catch((err) => {
          console.log("Delete error", err);
          window.alert("Error deleting the item.");
        });
    }
  };

  const generateHarPDF = () => {
    const docH = new jsPDF({ orientation: "landscape" });
    const tableColumnH = ["HarID", "farmerNIC", "Name", "Address", "Conumber", "Category", "Quantity", "Date", "Time"];
    const tableRowH = [];

    filteredHarvestDetails.forEach((harvestDetail) => {
      const formattedDate = new Date(harvestDetail.Date).toLocaleDateString('en-GB');
      const harvestTData = [
        harvestDetail.HarID,
        harvestDetail.farmerNIC,
        harvestDetail.Name,
        harvestDetail.Address,
        harvestDetail.CNumber,
        harvestDetail.Category,
        harvestDetail.Quantity,
        formattedDate,
        harvestDetail.Time
      ];
      tableRowH.push(harvestTData);
    });

    docH.autoTable(tableColumnH, tableRowH, { startY: 20 });
    docH.text("Collecting Details", 14, 15);
    docH.save("harvestDetail.pdf");
  };

  // Display the filtered list or a message if no results found
  const Hdetaillist = filteredHarvestDetails.length === 0 
    ? "No details found!" 
    : filteredHarvestDetails.map((harvestDetail, index) => 
        <HarvestingCard key={index} Details={harvestDetail} onDeleteH={onDeleteClickH} />
      );

  // Inline styling for the component
  const styles = {
    container: {
      marginTop: "10px"
    },
    searchBar: {
      marginBottom: "20px"
    },
    Hlist: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridGap: "10px"
    },
    button: {
      marginBottom: "20px"
    }
  };

  return (
    <div className="show_Hdetaillist">
      <Navbar/>
      <div className="container ml-10" style={{ ...styles.container, marginTop: "50px" }}>

        <div className="search-barH mt-20 w-72 ml-7 shadow-lg  border-2 border-gray-300 rounded-md p-2" style={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search HarID....." 
            value={searchQueryH} 
            onChange={(e) => setSearchQueryH(e.target.value)} 
          />
        </div>
        <div className="button" style={styles.button}>
          <button className='ml-5 bg-blue-600 text-white  py-1 px-2 hover:bg-green-700' onClick={generateHarPDF}>Download PDF</button>
        </div>
        <div className="Hlist" style={styles.Hlist}>
          {Hdetaillist}
        </div>
      </div>
    </div>
  );
};

export default HarvestingList;
