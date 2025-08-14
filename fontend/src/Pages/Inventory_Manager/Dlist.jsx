import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dcard from './Dcard';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Button from '@mui/material/Button';  // Import Button from Material UI
import Navbar from '../../Components/Navbar';

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  searchBar: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  searchInput: {
    width: '50%',
    padding: '10px',
    border: '2px solid #ced4da',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
  searchInputFocus: {
    outline: 'none',
    borderColor: '#007bff',
    boxShadow: '0px 0px 8px rgba(0, 123, 255, 0.5)',
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
    padding: '16px',
  },
  cardHover: {
    transition: 'transform 0.3s ease',
  },
  cardHovered: {
    transform: 'scale(1.05)',
  },
};

const Dlist = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/inventory')
      .then(res => {
        setInventory(res.data);
        setFilteredInventory(res.data);
      })
      .catch(() => {
        console.log('Error fetching data');
      });
  }, []);

  useEffect(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = inventory.filter(item =>
      item.Employee_Id.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredInventory(filtered);
  }, [searchQuery, inventory]);

  // Function to generate PDF for a specific inventory item
  const generatePDF = (item) => {
    const doc = new jsPDF();
    doc.text(`Inventory Report for Employee ID: ${item.Employee_Id}`, 20, 10);
    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['Employee ID', item.Employee_Id],
        ['Material ID', item.material_id],
        ['Quantity', item.quantity],
        ['Material Type', item.material_type],
        ['Warehouse', item.warehouse],
        ['Transfer ID', item.transfer_id],
        ['Transfer Date', item.transfer_date_time],
        ['Received By', item.received_by],
        ['Checked By', item.checked_by],
      ],
    });
    doc.save(`inventory_${item.Employee_Id}.pdf`);
  };

  // Function to generate PDF for all items
  const generateAllPDF = () => {
    const doc = new jsPDF();
    doc.text('Inventory Report for All Items', 20, 10);
    
    const bodyData = inventory.map(item => [
      item.Employee_Id,
      item.material_id,
      item.quantity,
      item.material_type,
      item.warehouse,
      item.transfer_id,
      new Date(item.transfer_date_time).toLocaleString(),
      item.received_by,
      item.checked_by
    ]);
    
    doc.autoTable({
      head: [['Employee ID', 'Material ID', 'Quantity', 'Material Type', 'Warehouse', 'Transfer ID', 'Transfer Date', 'Received By', 'Checked By']],
      body: bodyData
    });

    doc.save('inventory_all_items.pdf');
  };

  const inventoryList = filteredInventory.length === 0 
    ? <p>No inventory found!</p> 
    : filteredInventory.map((item, index) => (
        <Dcard 
          key={item.id || index} 
          item={item} 
          generatePDF={generatePDF} 
          style={styles.cardHover}
          onMouseOver={(e) => (e.currentTarget.style.transform = styles.cardHovered.transform)}
          onMouseOut={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
        />
      ));

  return (
   <div>
    <Navbar />
    <div style={styles.container} className="mt-20">
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by Employee ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      {/* Button to generate PDF for all items */}
      <Button variant="contained" color="primary" onClick={generateAllPDF}>
        Download All Items PDF
      </Button>
      <div style={styles.list}>{inventoryList}</div>
    </div>
   </div>
  );
};

export default Dlist;
