import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const styles = {
  form: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  h2: {
    textAlign: "center",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
};

const InsertEmployee = () => {
  // Manage state
  const [employeeData, setEmployeeData] = useState({
    employeeID: "",
    name: "",
    address: "",
    nic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
    console.log(employeeData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/employee", employeeData).then(() => {
      setEmployeeData({
        employeeID: "",
        name: "",
        address: "",
        nic: "",
      });
    });
  };

  return (
    <div>
      <Navbar/>
      <div className="mt-20">
      
      <h2 className="text-2xl text-white" style={styles.h2}>Employee Information Form</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label style={styles.label} htmlFor="employee_id">
            Employee ID:
          </label>
          <input
            style={styles.input}
            type="text"
            id="employee_id"
            name="employeeID"
            onChange={handleChange}
            value={employeeData.employeeID}
          />
        </div>
        <div>
          <label style={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={employeeData.name}
          />
        </div>
        <div>
          <label style={styles.label} htmlFor="address">
            Address:
          </label>
          <input
            style={styles.input}
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            value={employeeData.address}
          />
        </div>
        <div>
          <label style={styles.label} htmlFor="nic">
            NIC:
          </label>
          <input
            style={styles.input}
            type="text"
            id="nic"
            name="nic"
            onChange={handleChange}
            value={employeeData.nic}
          />
        </div>
        <div>
          <button style={styles.button} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default InsertEmployee;
