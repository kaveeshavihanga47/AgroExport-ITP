import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";

const Insertexportdata = () => {
  const [exportData, setExportData] = useState({
    customerID: "",
    orderID: "",
    quantity: "",
    item: "",
    date: "",
    name: "",
    country: "",
    postalCode: "",
    address: "",
    exportCost: "",
  });
//add vali
  const [errors, setErrors] = useState({
    quantity: "",
    date: "",
  });

  // Validation functions
  const validateQuantity = (quantity) => {
    if (quantity < 1 || quantity > 50000) {
      return "Quantity must be between 1 and 50,000.";
    }
    return "";
  };

  const validateDate = (date) => {
    const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
    if (date < today) {
      return "Date cannot be in the past.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate Quantity and Date on each change
    if (name === "quantity") {
      const quantityError = validateQuantity(value);
      setErrors((prevErrors) => ({ ...prevErrors, quantity: quantityError }));
    }

    if (name === "date") {
      const dateError = validateDate(value);
      setErrors((prevErrors) => ({ ...prevErrors, date: dateError }));
    }

    setExportData({
      ...exportData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation before submit
    const quantityError = validateQuantity(exportData.quantity);
    const dateError = validateDate(exportData.date);

    if (quantityError || dateError) {
      setErrors({ quantity: quantityError, date: dateError });
      alert("Please fix validation errors before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/exports", exportData);
      console.log("Data submitted successfully:", response.data);
      setExportData({
        customerID: "",
        orderID: "",
        quantity: "",
        item: "",
        date: "",
        name: "",
        country: "",
        postalCode: "",
        address: "",
        exportCost: "",
      });
      alert("Export data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit export data.");
    }
  };

  // Inline CSS styles
  const styles = {
    body: {
      backgroundImage: "url('https://img.freepik.com/free-vector/hand-drawn-delivery-concept-with-truck_23-2149147759.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      margin: 0,
      padding: 0,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    formContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      maxWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      fontSize: "1.8rem",
      marginBottom: "20px",
    },
    form: {
      display: "grid",
      gridGap: "15px",
    },
    label: {
      fontSize: "1rem",
      color: "#333",
      fontWeight: "600",
    },
    input: {
      padding: "10px",
      width: "100%",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
    },
    inputFocus: {
      borderColor: "#007BFF",
    },
    button: {
      padding: "12px",
      backgroundColor: "#007BFF",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    errorText: {
      color: "red",
      fontSize: "0.9rem",
      marginBottom: "5px",
    },
  };

  return (
    <div style={styles.body}>
      <Navbar />
      <div style={{ ...styles.formContainer }}>
        <h2 style={{ ...styles.heading, marginTop: "50px" }}>Add an Export Form</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
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

          <label htmlFor="quantity" style={styles.label}>Quantity</label>
          {errors.quantity && <p style={styles.errorText}>{errors.quantity}</p>}
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="50000"
            value={exportData.quantity}
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

          <label htmlFor="date" style={styles.label}>Date</label>
          {errors.date && <p style={styles.errorText}>{errors.date}</p>}
          <input
            type="date"
            id="date"
            name="date"
            value={exportData.date}
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
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Insertexportdata;
