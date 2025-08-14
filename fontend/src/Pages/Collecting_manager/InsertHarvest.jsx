import React, { useState } from 'react';
import axios from "axios";
import NavbarC from './NavbarC';
import NavBar from '../../Components/Navbar';

const InsertHarvest = () => {
    const [harvestData, setHarvestData] = useState({
        farmerNIC: "",
        Name: "",
        Address: "",
        CNumber: "",
        Category: "",
        Quantity: "",
        Date: "",
        Time: "",
    });

    const [nicError, setNicError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // NIC validation logic
        if (name === "farmerNIC") {
            if (value.length < 9 || value.length > 12) {
                setNicError("NIC must be between 9 and 12 characters.");
            } else {
                setNicError("");  // Clear error if valid
            }
        }

        setHarvestData({
            ...harvestData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nicError) {
            alert("Please provide a valid NIC number");
            return;
        }

        if (!harvestData.Date) {
            alert("Please provide a valid date and time");
            return;
        }

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];  // Returns the date in "YYYY-MM-DD" format
        };

        const formattedData = {
            ...harvestData,
            Date: formatDate(harvestData.Date),  // Format the date before sending
        };

        axios.post("http://localhost:3000/api/collecting", formattedData)
            .then(() => {
                alert("Successfully submitted!");
                setHarvestData({
                    farmerNIC: "",
                    Name: "",
                    Address: "",
                    CNumber: "",
                    Category: "",
                    Quantity: "",
                    Date: "",
                    Time: "",
                });
            })
            .catch((error) => {
                console.error("There was an error submitting the form!", error);
            });
    };

    // Inline styles object
    const styles = {
        formContainer: {
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            padding: '20px',
            position: 'relative',
            backgroundColor: 'rgba(249, 249, 249, 0.8)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            overflow: 'hidden',
        },
        formBackground: {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundImage: "url('https://www.ugaoo.com/cdn/shop/articles/shutterstock_239402917.jpg?v=1661858650')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.7) contrast(3.2)',
            zIndex: '-1',
        },
        heading: {
            textAlign: 'center',
            color: '#105a3b',
            marginBottom: '20px',
        },
        inputContainer: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px',
            color: '#11432a',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease',
        },
        inputFocus: {
            borderColor: '#66afe9',
            outline: 'none',
        },
        select: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
        },
        submitButton: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        submitButtonHover: {
            backgroundColor: '#0056b3',
        },
        error: {
            color: 'red',
        },
    };

    return (
        <div>
            <NavBar />
            <h2 style={{...styles.heading, marginTop: '50px', color:"black", fontSize:"40px"}}>Harvesting Detail Form</h2>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <div style={styles.formBackground}></div>
                <div style={styles.inputContainer}>
                    <label htmlFor="farmerNIC" style={styles.label}>Farmer NIC:</label>
                    <input
                        type="text"
                        id="farmerNIC"
                        name="farmerNIC"
                        value={harvestData.farmerNIC}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {nicError && <p style={styles.error}>{nicError}</p>}
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="name" style={styles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="Name"
                        value={harvestData.Name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="address" style={styles.label}>Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="Address"
                        value={harvestData.Address}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="contact_number" style={styles.label}>Contact Number:</label>
                    <input
                        type="tel"
                        id="contact_number"
                        name="CNumber"
                        value={harvestData.CNumber}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="category" style={styles.label}>Category:</label>
                    <select
                        id="category"
                        name="Category"
                        value={harvestData.Category}
                        onChange={handleChange}
                        style={styles.select}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Cashew">Cashew</option>
                        <option value="Coconut">Coconut</option>
                        <option value="Corn">Corn</option>
                        <option value="Pepper">Pepper</option>
                    </select>
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="Quantity" style={styles.label}>Quantity:</label>
                    <input
                        type="number"
                        id="Quantity"
                        name="Quantity"
                        value={harvestData.Quantity}
                        onChange={handleChange}
                        style={styles.input}
                        min="1"
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="date" style={styles.label}>Select Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="Date"
                        value={harvestData.Date.split('T')[0]}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="time" style={styles.label}>Select Time:</label>
                    <input
                        type="time"
                        id="time"
                        name="Time"
                        value={harvestData.Time}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <input
                        type="submit"
                        value="Submit"
                        style={styles.submitButton}
                    />
                </div>
            </form>
        </div>
    );
};

export default InsertHarvest;
