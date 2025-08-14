import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF and autoTable

const Dcard = ({ item }) => {

  // Generate PDF function moved inside Dcard
  const generatePDF = (item) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 180); 
    doc.text(`Inventory Report for Employee ID: ${item.Employee_Id}`, 20, 10);

    doc.setFontSize(12);

    doc.autoTable({
      head: [
        [{ content: 'Field', styles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] } }, 
         { content: 'Value', styles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] } }]
      ],
      body: [
        ['Employee ID', item.Employee_Id],
        ['Material ID', item.material_id],
        ['Quantity', item.quantity],
        ['Material Type', item.material_type],
        ['Warehouse', item.warehouse],
        ['Transfer ID', item.transfer_id],
        ['Transfer Date', new Date(item.transfer_date_time).toLocaleString()],
        ['Received By', item.received_by],
        ['Checked By', item.checked_by],
      ],
      styles: {
        fontSize: 10,
        textColor: [0, 0, 0],
        halign: 'center',
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { top: 20 },
    });

    doc.save(`inventory_${item.Employee_Id}.pdf`);
  };

  const onDeleteClick = (Employee_Id) => {
    axios
      .delete(`http://localhost:3000/api/inventory/${encodeURIComponent(Employee_Id)}`)
      .then(() => {
        window.location.reload(); 
      })
      .catch((err) => {
        console.error("Delete error", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWT_xlJpOzgZxMvaJfipoDKhbyXlQRsZnKsQ&s"
            alt={item.material_type}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Employee ID: {item.Employee_Id}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Material type: {item.material_type}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Material ID: {item.material_id}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Quantity: {item.quantity}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Warehouse: {item.warehouse}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Transfer ID: {item.transfer_id}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Received By: {item.received_by}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Checked By: {item.checked_by}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Transfer Date & Time: {new Date(item.transfer_date_time).toLocaleString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button className='bg-red-600' size="small" color="primary" onClick={() => onDeleteClick(item.Employee_Id)}>
            DELETE
          </Button>
          <Link className="btn py-1 px-2 rounded-md text-white bg-blue-700 btn-outline-warning float-right" to={`/Dshow/${item.Employee_Id}`}>
            Details
          </Link>
          {/* Download PDF button */}
          <Button size="small" color="primary" onClick={() => generatePDF(item)}>
            Download PDF
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Dcard;





