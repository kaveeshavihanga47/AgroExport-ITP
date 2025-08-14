import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Navbar from '../Navbar';

function ShowDistributeDetail() {
  const [distribute, setDistribute] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/distribution/${id}`)
      .then((res) => {
        setDistribute(res.data);
      })
      .catch(() => {
        console.log("Error from ShowDistributionDetails");
      });
  }, [id]);

  const TableItem = (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6 p-6">
     
      <table className="table-auto w-full text-left">
        <tbody>
          <tr className="border-b">
            <th className="px-4 py-2">ID</th>
            <td className="px-4 py-2">{distribute.FarmerNIC}</td>
          </tr>
          <tr className="border-b">
            <th className="px-4 py-2">Name</th>
            <td className="px-4 py-2">{distribute.name}</td>
          </tr>
          <tr className="border-b">
            <th className="px-4 py-2">Address</th>
            <td className="px-4 py-2">{distribute.address}</td>
          </tr>
          <tr className="border-b">
            <th className="px-4 py-2">Contact Number</th>
            <td className="px-4 py-2">{distribute.number}</td>
          </tr>
          <tr className="border-b">
            <th className="px-4 py-2">Category</th>
            <td className="px-4 py-2">{distribute.category}</td>
          </tr>
          <tr className="border-b">
            <th className="px-4 py-2">Amount</th>
            <td className="px-4 py-2">{distribute.amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (

    <div>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-8 px-4">
       
       <div className="col-md-10 mx-auto mt-10">
         <br />
         <Link to="/" className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
           Back to Main
         </Link>
       </div>
       <br />
       <div className="col-md-8 mx-auto mt-10">
         <h1 className="text-center text-white text-4xl font-bold">Distribution Detail</h1>
         <p className="text-center text-white text-lg">This is full detail of orders</p>
         <hr className="my-4 border-t-2 border-white" />
       </div>
       <div className="col-md-10 mx-auto">
         {TableItem}
       </div>
       <div className="col-md-6 mx-auto mt-6">
         <Link
           to={`/updatedetails/${distribute._id}`}
           className="btn bg-blue-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 focus:outline-none">
           Update Order
         </Link>
       </div>
     </div>
    </div>
    
  );
}

export default ShowDistributeDetail;
