import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

function ShowHRDetail() {
    const [harvestData, setHarvestData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/collecting/${id}`)
            .then((res) => {
                setHarvestData(res.data);
            })
            .catch(() => {
                console.log("Error from ShowHRDetail");
            });
    }, [id]);

    const TableItemH = (
        <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-gray-700 shadow-lg rounded-lg">
                <tbody className="bg-gray-50">
                    <tr className="bg-gray-200 border-b">
                        <th className="py-3 px-4">1</th>
                        <td className="py-3 px-4 font-bold">HarID</td>
                        <td className="py-3 px-4">{harvestData.HarID || "N/A"}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-3 px-4">2</th>
                        <td className="py-3 px-4 font-bold">Farmer NIC</td>
                        <td className="py-3 px-4">{harvestData.farmerNIC || "N/A"}</td>
                    </tr>
                    <tr className="bg-gray-200 border-b">
                        <th className="py-3 px-4">3</th>
                        <td className="py-3 px-4 font-bold">Name</td>
                        <td className="py-3 px-4">{harvestData.Name || "N/A"}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-3 px-4">4</th>
                        <td className="py-3 px-4 font-bold">Address</td>
                        <td className="py-3 px-4">{harvestData.Address || "N/A"}</td>
                    </tr>
                    <tr className="bg-gray-200 border-b">
                        <th className="py-3 px-4">5</th>
                        <td className="py-3 px-4 font-bold">Contact Number</td>
                        <td className="py-3 px-4">{harvestData.CNumber || "N/A"}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-3 px-4">6</th>
                        <td className="py-3 px-4 font-bold">Category</td>
                        <td className="py-3 px-4">{harvestData.Category || "N/A"}</td>
                    </tr>
                    <tr className="bg-gray-200 border-b">
                        <th className="py-3 px-4">7</th>
                        <td className="py-3 px-4 font-bold">Quantity</td>
                        <td className="py-3 px-4">{harvestData.Quantity || "N/A"}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-3 px-4">8</th>
                        <td className="py-3 px-4 font-bold">Date</td>
                        <td className="py-3 px-4">{harvestData.Date ? new Date(harvestData.Date).toLocaleDateString() : "N/A"}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4">9</th>
                        <td className="py-3 px-4 font-bold">Time</td>
                        <td className="py-3 px-4">{harvestData.Time || "N/A"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="showHRDetails min-h-screen bg-gray-100 p-6">
            <div className="col-md-10 m-auto">
                <Link to={"/"} className="btn btn-outline-danger float-right"><button className="bg-green-900 px-2 py-1 rounded-md text-lg font-semibold text-white hover:bg-green-500">Back to Main</button></Link>
            </div>
            
            <div className="col-md-8 m-auto mt-10">
                <h1 className="text-4xl font-bold text-center text-blue-600">Harvesting Details</h1>
                <p className="text-center text-lg text-gray-600">This is full details of Farmer newly harvest</p>
                <hr className="my-6 border-gray-300"/>
                {TableItemH}
            </div>

            <div className="col-md-5 m-auto mt-8">
                <Link
                    to={`/updateHDetails/${harvestData._id}`}
                >
                   <button className="bg-blue-700 px-32 py-1 rounded-md text-lg font-semibold text-white hover:bg-blue-500 "> Edit</button>
                </Link>
            </div>
        </div>
    );
}

export default ShowHRDetail;
