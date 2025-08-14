import React, { useState } from 'react';
import axios from "axios";
import NavBar from '../Navbar';

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        backgroundImage: "url('https://thumbs.dreamstime.com/b/development-seedling-growth-planting-seedlings-young-plant-morning-light-nature-background-134486434.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: '20px',
    },
    form: {
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '0 auto',
    },
    label: {
        display: 'block',
        margin: '10px 0 5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#66afe9',
        outline: 'none',
    },
    submit: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        width: '100%',
    },
    submitHover: {
        backgroundColor: '#218838',
    },
    errorMessage: {
        color: 'red',
        fontSize: '14px',
        margin: '10px 0',
        textAlign: 'center',
    },
};

const InsertDistribute = () => {
    const [distributeData, setDistributeData] = useState({
        DOID: "",
        FarmerNIC: "",
        name: "",
        address: "",
        number: "",
        category: "",
        type: "",
        amount: "",
        Date: "", // Store only the date
        Time: "", // Store the time
    });
    const [category, setCategory] = useState('');
    const [typeOptions, setTypeOptions] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle negative amount validation
        if (name === "amount" && value < 0) {
            setError('Amount cannot be negative');
        } else {
            setError(''); // Clear error if valid
        }

        setDistributeData({
            ...distributeData,
            [name]: value,
        });
    };

    // Function to update type options based on selected category
    const updateTypeOptions = (selectedCategory) => {
        setCategory(selectedCategory);
        if (selectedCategory === 'fertilizer') {
            setTypeOptions(['Urea', 'DAP', 'Potash', 'NPK']);
        } else if (selectedCategory === 'seeds') {
            setTypeOptions(['Maize', 'Wheat', 'Rice', 'Soybean']);
        } else {
            setTypeOptions([]);
        }
        setDistributeData({
            ...distributeData,
            type: "", // Reset type
            amount: "", // Reset amount
        });
    };

    // NIC validation function
    const validateNic = () => {
        const nicPattern = /^[0-9]{9}V$/;
        if (!nicPattern.test(distributeData.FarmerNIC)) {
            setError('NIC should be 9 numbers followed by a capital "V"');
            return false;
        }
        setError('');
        return true;
    };

    // Phone number validation function
    const validatePhoneNumber = () => {
        const phonePattern = /^0[0-9]{9}$/;
        if (!phonePattern.test(distributeData.number)) {
            setError('Phone number should be 10 digits and start with 0');
            return false;
        }
        setError('');
        return true;
    };

    // Function to format date to YYYY/MM/DD
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    // Capture the current time in HH:MM format
    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateNic() && validatePhoneNumber() && distributeData.amount > 0) {
            // Capture the current time and format the date
            const formattedData = {
                ...distributeData,
                Date: formatDate(distributeData.Date),
                Time: getCurrentTime(), // Set the current time
            };

            axios.post("http://localhost:3000/api/distribution", formattedData)
                .then(() => {
                    alert('Form submitted successfully!');
                    setDistributeData({
                        DOID: "",
                        FarmerNIC: "",
                        name: "",
                        address: "",
                        number: "",
                        category: "",
                        type: "",
                        amount: "",
                        Date: "",
                        Time: "",
                    });
                })
                .catch((error) => {
                    console.error("There was an error submitting the form:", error);
                    alert("Failed to submit form. Please try again.");
                });
        } else if (distributeData.amount <= 0) {
            setError('Amount must be greater than 0');
        }
    };

    return (
        <div style={styles.body}>
            <NavBar />
            <form style={{ ...styles.form, marginTop: '60px' }} onSubmit={handleSubmit}>

                <h2>Order Fertilizer and Seeds</h2><br />

                <label style={styles.label} htmlFor="FarmerNIC">Farmer NIC:</label>
                <input 
                    style={styles.input} 
                    type="text" 
                    id="FarmerNIC" 
                    name="FarmerNIC" 
                    value={distributeData.FarmerNIC}
                    onChange={handleChange}
                    required 
                />
                {error && <p style={styles.errorMessage}>{error}</p>}
                <br />

                <label style={styles.label} htmlFor="name">Name:</label>
                <input 
                    style={styles.input} 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={distributeData.name}
                    onChange={handleChange} 
                    required 
                /><br />

                <label style={styles.label} htmlFor="address">Address:</label>
                <input 
                    style={styles.input} 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={distributeData.address}
                    onChange={handleChange} 
                    required 
                /><br />

                <label style={styles.label} htmlFor="number">Contact Number:</label>
                <input 
                    style={styles.input} 
                    type="text" 
                    id="number" 
                    name="number" 
                    value={distributeData.number}
                    onChange={handleChange} 
                    required 
                /><br />

                <label style={styles.label} htmlFor="category">Category:</label>
                <select 
                    style={styles.input} 
                    id="category" 
                    name="category" 
                    onChange={(e) => {
                        updateTypeOptions(e.target.value);
                        handleChange(e);
                    }} 
                    required
                >
                    <option value="">--Select Category--</option>
                    <option value="fertilizer">Fertilizer</option>
                    <option value="seeds">Seeds</option>
                </select><br />

                <label style={styles.label} htmlFor="type">Type:</label>
                <select 
                    style={styles.input} 
                    id="type" 
                    name="type" 
                    onChange={handleChange} 
                    required
                >
                    <option value="">--Select Type--</option>
                    {typeOptions.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select><br />

                <label style={styles.label} htmlFor="amount">Amount:(kg)</label>
                <input 
                    style={styles.input} 
                    type="number" 
                    id="amount" 
                    name="amount" 
                    value={distributeData.amount}
                    onChange={handleChange} 
                    required 
                />
                {distributeData.amount < 0 && <p style={styles.errorMessage}>Amount cannot be negative</p>}
                <br />

                <label style={styles.label} htmlFor="Date">Date:</label>
                <input 
                    style={styles.input} 
                    type="date" 
                    id="Date" 
                    name="Date" 
                    value={distributeData.Date}
                    onChange={handleChange} 
                    required 
                /><br />

                <input 
                    style={styles.submit} 
                    type="submit" 
                    value="Submit" 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.submitHover.backgroundColor} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submit.backgroundColor}
                />
            </form>
        </div>
    );
};

export default InsertDistribute;
