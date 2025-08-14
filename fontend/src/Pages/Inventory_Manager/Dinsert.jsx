import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';


const Dinsert = () => {
    const [inventory, setInventory] = useState({
        Employee_Id: "",
        transfer_id: "",
        material_id: "",
        material_type: "",
        warehouse: "",
        quantity: "",
        transfer_date_time: "",
        received_by: "",
        checked_by: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventory({
            ...inventory,
            [name]: value,
        });
        console.log(inventory);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await axios.post('http://localhost:3000/api/inventory', inventory); // Replace with your API endpoint
            console.log(response.data); // Handle the response as needed
            // Optionally, reset the form
            setInventory({
                Employee_Id: "",
                transfer_id: "",
                material_id: "",
                material_type: "",
                warehouse: "",
                quantity: "",
                transfer_date_time: "",
                received_by: "",
                checked_by: "",
            });
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <div>
            <Navbar />
           
            <style>{`
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f7f9fc;
                    margin: 0;
                    padding: 20px;
                }
                h2 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 20px;
                }
                form {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .form-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #555;
                }
                input[type="text"], 
                input[type="number"], 
                input[type="datetime-local"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    transition: border-color 0.3s;
                }
                input[type="text"]:focus, 
                input[type="number"]:focus, 
                input[type="datetime-local"]:focus {
                    border-color: #28a745; /* Change border color on focus */
                    outline: none;
                }
                button[type="submit"] {
                    width: 100%;
                    padding: 10px;
                    background-color: #28a745;
                    color: #ffffff;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button[type="submit"]:hover {
                    background-color: #218838; /* Darker green on hover */
                }
            `}</style>

            <h2 className='mt-20 text-3xl font-semibold '><u>Inventory Entry Form</u></h2>

            <form id="inventoryForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="employeeId">Employee ID:</label>
                    <input type="text" id="employeeId" name="Employee_Id" value={inventory.Employee_Id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="transferId">Transfer ID:</label>
                    <input type="text" id="transferId" name="transfer_id" value={inventory.transfer_id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="materialId">Material ID:</label>
                    <input type="text" id="materialId" name="material_id" value={inventory.material_id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="materialType">Material Type:</label>
                    <input type="text" id="materialType" name="material_type" value={inventory.material_type} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="warehouse">Warehouse:</label>
                    <input type="text" id="warehouse" name="warehouse" value={inventory.warehouse} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" value={inventory.quantity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="transferDateTime">Transfer Date & Time:</label>
                    <input type="datetime-local" id="transferDateTime" name="transfer_date_time" value={inventory.transfer_date_time} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="receivedBy">Received By:</label>
                    <input type="text" id="receivedBy" name="received_by" value={inventory.received_by} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="checkedBy">Checked By:</label>
                    <input type="text" id="checkedBy" name="checked_by" value={inventory.checked_by} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Dinsert;
