import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import axios from 'axios';

export const Finance_Dashboard = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]); // Initialize as empty array
  const [processDelivery, setProcessDelivery] = useState([]);

  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/financial/");
        setDeliveryNotes(response.data);
        console.log(response.data);
  
        const tempApproved = {};

        response.data.forEach((delivery) => {
          const approvedBy = delivery.approved_by.trim();

          // If approvedBy already exists in the object, increment the count, otherwise set it to 1
          if (tempApproved[approvedBy]) {
            tempApproved[approvedBy].count += 1;
          } else {
            tempApproved[approvedBy] = { name: approvedBy, count: 1 };
          }
        });

        // Convert object to array for chart data
        setProcessDelivery(Object.values(tempApproved));

      } catch (error) {
        console.error("Error fetching delivery notes", error);
      }
    };
    fetchDeliveryNotes();
  }, []);
  
  // Calculate total and distribution safely
  const total = deliveryNotes.reduce((acc, delivery) => acc + delivery.amount, 0);
  const distribution = deliveryNotes.length;

  return (
    <>
      <Navbar />
      <div className='mt-36'>
        <div>
          <h1 className='text-4xl text-black font-bold text-center'>
            Finance Manager Dashboard
          </h1>
        </div>

        <div className='flex justify-center gap-10 mt-10'>
          <div className='bg-green-600 w-44 flex flex-col justify-center items-center py-2 rounded-md'>
            <h1 className='text-2xl font-semibold'>Rs. {total}</h1>
            <h2 className='text-white'>Total Amount</h2>
            <hr className='bg-black' />
          </div>

          <div className='bg-green-600 w-44 flex flex-col justify-center items-center py-2 rounded-md'>
            <h1 className='text-2xl  font-semibold'>{distribution}</h1>
            <h2 className='text-white'>Total Distributions</h2>
            <hr className='bg-black' />
          </div>

          
        </div>

        <div className='flex justify-center gap-10 mt-10'>
          <Link to={'/deliverynote'} >
            <div className='bg-green-600 w-44 flex flex-col justify-center items-center py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-white hover:border-4 hover:border-green-700'>
              <h1 style={{fontFamily:'sans-serif'}} className='text-xl text-center font-semibold'>Create Delivery Note</h1>
            </div>
          </Link>

          <Link to={'/destribution'} >
            <div className='bg-green-600 w-44 flex flex-col justify-center items-center py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-white hover:border-4 hover:border-green-700'>
              <h1 style={{fontFamily:'sans-serif'}} className='text-xl text-center font-semibold'>Create Distribution</h1>
            </div>
          </Link>
        </div>

        <div >
          <div className='w-4/12 h-96 mx-auto mt-20 flex flex-col justify-center items-center'>
          <h1 className='text-2xl '>Approved By Chart</h1>
            <ResponsiveContainer >
              <BarChart
                data={processDelivery} // Now using an array for chart data
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /> {/* Updated to match the key 'name' */}
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count" // Showing the count of approvals
                  fill="#835dc5"
                  shape={<Rectangle fill="#835dc5" stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};
