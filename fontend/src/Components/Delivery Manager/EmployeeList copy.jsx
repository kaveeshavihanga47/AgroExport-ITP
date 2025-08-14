import React, { useState,useEffect } from 'react'
import EmploteeCaeds from './EmploteeCaeds'
import axios from 'axios'
import "./EmployeeList.css"

const EmployeeList = () => {
    const [employees,setEmployees] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee').then((res)=>{
            setEmployees(res.data);
            console.log(res.data);
        }).catch(() => {
            console.log("error while fetching data");
        })
    },[])

    const EmployeesList= employees.length === 0 ? "no employee found" : employees.map((employee,index) => (<EmploteeCaeds key={index} employee={employee}/>))
  return (
    <div className='showEmployeeList'>
        <div className="container">
            <div className="list">{EmployeesList}</div>
        </div>
    </div>
  )
}

export default EmployeeList
