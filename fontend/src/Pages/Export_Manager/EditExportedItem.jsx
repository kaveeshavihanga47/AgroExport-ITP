import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "../../Components/Navbar";

const EditExportedItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exportData, setExportData] = useState({
        customerID: "",
        orderID: "",
        item: "",
        quantity: "",
        date: "",
        name: "",
        country: "",
        postalCode: "",
        address: "",
        exportCost: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExport = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/exports/${id}`);
                setExportData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching export data:", err);
                setError("Failed to load export data");
                setLoading(false);
            }
        };

        fetchExport();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExportData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/exports/${id}`, exportData);
            alert("Export updated successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error updating export:", err);
            alert("Failed to update export");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const styles = {
        body: {
            backgroundImage: "url('https://img.freepik.com/free-vector/hand-drawn-delivery-concept-with-truck_23-2149147759.jpg?t=st=1727250714~exp=1727254314~hmac=d6ee03623c3e0131cc3199398888e8d3e9eb9a18ef0c72d44fd645db7d7b6cab&w=1060')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            margin: "0",
            padding: "0",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        container: {
            maxWidth: "600px",
            margin: "50px auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
        title: {
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
        },
        label: {
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#555",
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            transition: "border-color 0.3s",
        },
        inputFocus: {
            borderColor: "#007bff",
            outline: "none",
            boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "4px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        mediaQuery: {
            '@media (max-width: 600px)': {
                container: {
                    margin: "20px",
                    padding: "15px",
                },
                button: {
                    fontSize: "14px",
                }
            }
        }
    };

    return (
        <div style={{...styles.body}}>
            <Navbar/>
            <div style={styles.container}>
                <h1 style={styles.title}>Edit Exported Item</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="customerID" style={styles.label}>Customer ID</label>
                    <input
                        type="text"
                        id="customerID"
                        name="customerID"
                        value={exportData.customerID}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="orderID" style={styles.label}>Order ID</label>
                    <input
                        type="text"
                        id="orderID"
                        name="orderID"
                        value={exportData.orderID}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="item" style={styles.label}>Item</label>
                    <input
                        type="text"
                        id="item"
                        name="item"
                        value={exportData.item}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="quantity" style={styles.label}>Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={exportData.quantity}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="date" style={styles.label}>Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={exportData.date.split('T')[0]}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="name" style={styles.label}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={exportData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="country" style={styles.label}>Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={exportData.country}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="postalCode" style={styles.label}>Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={exportData.postalCode}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="address" style={styles.label}>Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={exportData.address}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="exportCost" style={styles.label}>Export Cost</label>
                    <input
                        type="number"
                        id="exportCost"
                        name="exportCost"
                        step="0.01"
                        value={exportData.exportCost}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                    >
                        Update Export
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditExportedItem;
