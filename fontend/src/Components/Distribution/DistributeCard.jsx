import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';

const DistributeCard = ({ distribute, deleteDistribute }) => {
    // Function to format the date to YYYY/MM/DD
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://t4.ftcdn.net/jpg/01/57/55/09/360_F_157550958_u0iu2oEcvY5NOA0KZyniBTuU7u1tnDIX.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {distribute._id.slice(0, 12)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                        <strong>NIC:</strong>  {distribute.FarmerNIC}<br />
                        <strong>Name:</strong> {distribute.name}<br />
                        <strong>Address:</strong> {distribute.address}<br />
                        <strong>Contact Number:</strong> {distribute.number}<br />
                        <strong>Category type:</strong> {distribute.category}<br />
                        <strong>Type:</strong> {distribute.type}<br />
                        <strong>Amount:</strong> {distribute.amount}<strong>kg</strong><br />
                        <strong>Date:</strong> {formatDate(distribute.Date)} <br />
                        
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                    size="small" 
                    sx={{ backgroundColor: '#B90E0A', color: 'white', '&:hover': { backgroundColor: 'darkred' } }} 
                    onClick={() => deleteDistribute(distribute._id)}
                >
                    Delete
                </Button>
                <Link to={`/showdetails/${distribute._id}`} style={{ textDecoration: 'none' }}>
                    <Button
                        style={{marginLeft:-5}}
                        size="small"
                        sx={{ 
                            backgroundColor: '#006400', 
                            color: 'white', 
                            '&:hover': { backgroundColor: '#004d00' }, 
                            marginLeft: '90px' 
                        }} 
                    >
                        Update
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default DistributeCard;
