import React, { useContext, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import UserContext from "../../UserContext";

export const AddOrder = () => {

  const {currentUser} = useContext(UserContext)
  const [formValues, setFormValues] = useState({
    orderID: "",
    customerID: "",
    amount: "",
    shippingfee: "",
    totalprice: "",
    customerEmail: currentUser.email,

  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    let formErrors = {};
    let isValid = true;

    if (!formValues.orderID) {
      isValid = false;
      formErrors.orderID = "Order ID is required";
    }
    if (!formValues.customerID) {
      isValid = false;
      formErrors.customerID = "Customer ID is required";
    }
    if (!formValues.amount || isNaN(formValues.amount) || Number(formValues.amount) <= 0) {
      isValid = false;
      formErrors.amount = "Valid amount is required";
    }
    if (!formValues.shippingfee || isNaN(formValues.shippingfee) || Number(formValues.shippingfee) < 0) {
      isValid = false;
      formErrors.shippingfee = "Valid shipping fee is required";
    }
    if (!formValues.totalprice || isNaN(formValues.totalprice) || Number(formValues.totalprice) <= 0) {
      isValid = false;
      formErrors.totalprice = "Valid total price is required";
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear success message when form is being submitted again
    setSuccessMessage("");

    if (validate()) {
      // Send the data to the backend
      axios
        .post("http://localhost:3000/api/ordermanagement", formValues)
        .then((response) => {
          console.log("Order added successfully!", response.data);

          // Show success message after the request is successful
          setErrors({});
          setSuccessMessage("Order added successfully!");

          // Clear the form immediately after successful submission
          setFormValues({
            orderID: "",
            customerID: "",
            amount: "",
            shippingfee: "",
            totalprice: ""
          });
        })
        .catch((error) => {
          console.error("There was an error adding the order!", error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-order-container" style={styles.container}>
        <h2 className="text-2xl" style={{...styles.heading, fontSize:"28px", marginTop:"90px"}}>Add New Order</h2>
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>} {/* Success message */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Order ID:</label>
            <input
              type="text"
              name="orderID"
              value={formValues.orderID}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.orderID && <p style={styles.errorText}>{errors.orderID}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Customer ID:</label>
            <input
              type="text"
              name="customerID"
              value={formValues.customerID}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.customerID && <p style={styles.errorText}>{errors.customerID}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formValues.amount}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.amount && <p style={styles.errorText}>{errors.amount}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Shipping Fee:</label>
            <input
              type="number"
              name="shippingfee"
              value={formValues.shippingfee}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.shippingfee && <p style={styles.errorText}>{errors.shippingfee}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Total Price:</label>
            <input
              type="number"
              name="totalprice"
              value={formValues.totalprice}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.totalprice && <p style={styles.errorText}>{errors.totalprice}</p>}
          </div>
          <button type="submit" style={styles.button}>Add Order</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    fontSize: '16px',
    boxSizing: 'border-box', // To include padding in the width
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    margin: '10px 0',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  }
};

export default AddOrder;
