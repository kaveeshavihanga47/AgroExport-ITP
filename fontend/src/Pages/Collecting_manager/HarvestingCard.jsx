import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';

const HarvestingCard = ({ Details, onDeleteH }) => {

  // Date formatting function to remove the time part
  const formatDate = (dateString) => dateString.slice(0, 10);

  // Handle delete function
  const handleDeleteH = () => {
    onDeleteH(Details._id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img.freepik.com/premium-photo/3d-illustration-different-farms-isolated-round-4-piece-landscape-farm-agriculture_741212-23.jpg"
          alt="farm image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            HarID: {Details.HarID}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            NIC: {Details.farmerNIC}
            <br />
            Name: {Details.Name}
            <br/>
            Address: {Details.Address}
            <br/>
            Contact Number: {Details.CNumber}
            <br/>
            Category: {Details.Category}
            <br />
            Quantity: {Details.Quantity}
            <br />
            Date: {formatDate(Details.Date)} {/* Correctly formatting the date */}
            <br />
            Time: {Details.Time}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* Delete button */}
        <Button
          size="small"
          sx={{
            color: 'white',
            backgroundColor: '#c62828', // Dark red color
            '&:hover': {
              backgroundColor: '#b71c1c', // Slightly darker shade for hover
            },
            padding: '6px 16px',
            fontSize: '0.875rem',
          }}
          onClick={handleDeleteH}
        >
          Delete
        </Button>

        {/* Update link */}
        <Link
          className="btn float-right"
          style={{
            backgroundColor: 'darkgreen',
            color: 'white',
            borderColor: 'darkgreen',
            padding: '6px 16px',
            fontSize: '0.875rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            border: '1px solid darkgreen',
            height: '36.5px',
          }}
          to={`/showdetailH/${Details._id}`}
        >
          UPDATE
        </Link>
      </CardActions>
    </Card>
  );
};

export default HarvestingCard;
