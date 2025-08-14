import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

const EmploteeCaeds = ({employee}) => {
  return (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="140"
            image="https://img.freepik.com/free-psd/3d-illustration-cartoon-character-businessman-wearing-glasses-working-desktop-computer-desk-office_1150-52380.jpg?w=900&t=st=1727114585~exp=1727115185~hmac=f8057a592de093c693e1ddcf3285582110652ecdfb3f96af27fd1a94066cf30dg"
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {employee.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               {employee.employeeID}<br/>
               {employee.address} <br/>
               {employee.nic} 

            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            Share
            </Button>
        </CardActions>
        </Card>
  )
}

export default EmploteeCaeds
