import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/exports")
      .then((res) => {
        setEmployees(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const employeelist =
    employees.length === 0
      ? "No employees found"
      : employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ));

  return (
    <div className="showemployeelist">
      <div className="container">
        <div className="list">{employeelist}</div>
      </div>
    </div>
  );
};

export default EmployeeList;
