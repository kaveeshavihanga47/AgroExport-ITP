import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function UpdateDistribute() {
    const [distribute, setDistribute] = useState({
        FarmerNIC: "",
        name: "",
        address: "",
        number: "",
        category: "",
        type: "",
        amount: "",
        Date: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/distribution/${id}`)
            .then((res) => {
                setDistribute({
                    FarmerNIC: res.data.FarmerNIC,
                    name: res.data.name,
                    address: res.data.address,
                    number: res.data.number,
                    category: res.data.category,
                    type: res.data.type,
                    amount: res.data.amount,
                    Date: res.data.Date,
                });
            })
            .catch((err) => {
                console.log("Error from update Distribution", err);
            });
    }, [id]);

    const onChange = (e) => {
        setDistribute({ ...distribute, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            FarmerNIC: distribute.FarmerNIC,
            name: distribute.name,
            address: distribute.address,
            number: distribute.number,
            category: distribute.category,
            type: distribute.type,
            amount: distribute.amount,
            Date: distribute.Date,
        };

        axios
            .put(`http://localhost:3000/api/distribution/${id}`, data)
            .then((res) => {
                navigate(`/showdetails/${id}`);
            })
            .catch((err) => {
                console.log("Error in update");
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex justify-center items-center">
            <Navbar/>
            <div className="w-full mt-20 max-w-lg bg-white shadow-lg rounded-lg p-8 mx-4">
                <div className="mb-6">
                    <Link
                        to="/distributelist"
                        className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                        Show Distribution List
                    </Link>
                </div>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="FarmerNIC" className="text-gray-700 font-semibold">
                            Farmer NIC
                        </label>
                        <input
                            type="text"
                            placeholder="Farmer NIC"
                            name="FarmerNIC"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={distribute.FarmerNIC}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name" className="text-gray-700 font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={distribute.name}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address" className="text-gray-700 font-semibold">
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={distribute.address}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="number" className="text-gray-700 font-semibold">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            placeholder="Contact Number"
                            name="number"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={distribute.number}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category" className="text-gray-700 font-semibold">
                            Category
                        </label>
                        <input
                            type="text"
                            placeholder="Category"
                            name="category"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={distribute.category}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type" className="text-gray-700 font-semibold">
                            Type
                        </label>
                        <input
                            type="text"
                            placeholder="Type"
                            name="type"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={distribute.type}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount" className="text-gray-700 font-semibold">
                            Amount
                        </label>
                        <input
                            type="text"
                            placeholder="Amount"
                            name="amount"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={distribute.amount}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Date" className="text-gray-700 font-semibold">
                            Date
                        </label>
                        <input
                            type="text"
                            placeholder="Date"
                            name="Date"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={distribute.Date}
                            onChange={onChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateDistribute;
