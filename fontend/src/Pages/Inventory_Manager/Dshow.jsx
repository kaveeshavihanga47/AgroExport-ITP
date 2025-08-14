import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';

function Dshow() {
  const [inventory, setInventory] = useState({});
  const { Employee_Id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/inventory/${Employee_Id}`) // Ensure correct port and endpoint
      .then((res) => {
        setInventory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Employee_Id]);

  const TableItem = (
   <div>
    
    <div className="overflow-x-auto">
     
     <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
       <tbody>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">1</th>
           <td className="py-4 px-6 border-b border-gray-300">Employee ID</td>
           <td className="py-4 px-6 border-b border-gray-300">{inventory.Employee_Id}</td>
         </tr>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">2</th>
           <td className="py-4 px-6 border-b border-gray-300">Material ID</td>
           <td className="py-4 px-6 border-b border-gray-300">{inventory.material_id}</td>
         </tr>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">3</th>
           <td className="py-4 px-6 border-b border-gray-300">Material Type</td>
           <td className="py-4 px-6 border-b border-gray-300">{inventory.material_type}</td>
         </tr>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">4</th>
           <td className="py-4 px-6 border-b border-gray-300">Quantity</td>
           <td className="py-4 px-6 border-b border-gray-300">{inventory.quantity}</td>
         </tr>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">5</th>
           <td className="py-4 px-6 border-b border-gray-300">Warehouse</td>
           <td className="py-4 px-6 border-b border-gray-300">{inventory.warehouse}</td>
         </tr>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">6</th>
           <td className="py-4 px-6 border-b border-gray-300">Transfer ID</td>
           <td className="py-4 px-6 border-b border-gray-300">{inventory.transfer_id}</td>
         </tr>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">7</th>
           <td className="py-4 px-6 border-b border-gray-300">Received By</td>
           <td className="py-4 px-6 border-b border-gray-300">{inventory.received_by}</td>
         </tr>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">8</th>
           <td className="py-4 px-6 border-b border-gray-300">Checked By</td>
           <td className="py-4 px-6 border-b border-gray-300">{inventory.checked_by}</td>
         </tr>
         <tr className="hover:bg-gray-100 transition duration-200">
           <th scope="row" className="py-4 px-6 border-b border-gray-300 font-semibold">9</th>
           <td className="py-4 px-6 border-b border-gray-300">Transfer Date & Time</td>
           <td className="py-4 px-6 border-b border-gray-300">{new Date(inventory.transfer_date_time).toLocaleString()}</td>
         </tr>
       </tbody>
     </table>
   </div>
   </div> 
  );

  return (
    <div>
<div className="Dshow mt-28 bg-gray-100  min-h-screen flex flex-row items-center">
      <Navbar/>
     
       
      
      <div className="col-md-8 m-auto bg-white shadow-lg rounded-lg p-6">
      <Link to="/inventorylist" className=" bg-sky-800 text-white btn btn-outline-danger mb-4 rounded-md shadow-md px-4 py-2 hover:bg-red-500 hover:text-white transition duration-300">
         <button className='mb-10'>Back button</button>
        </Link>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Inventory Details</h1>
        <p className="text-center text-gray-600 mb-4">This is Inventory Details</p>
        <hr className="mb-6" />
        {TableItem}
        
      </div>
    
    </div>
    <div className="col-md-6 flex flex-row  m-auto mt-6 mb-5">
        <Link to={`/Dupdate/${Employee_Id}`} className="btn btn-outline-info btn-lg w-full text-center rounded-md shadow-md hover:bg-blue-500 hover:text-white transition duration-300">
          <button className='bg-blue-500 py-1 px-2 rounded-md font-semibold hover:scale-105'> Edit Inventory</button>
        </Link>
      </div>
   
    </div>
    
  );
}

export default Dshow;
