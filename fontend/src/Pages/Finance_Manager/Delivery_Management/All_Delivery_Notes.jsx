import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../../UserContext";
import jsPDF from "jspdf";
import "jspdf-autotable"; // for table support
import Navbar from "../../../Components/Navbar";

export const All_Delivery_Notes = () => {
  const { currentUser } = useContext(UserContext);
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch delivery notes from backend
  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/financial/");
        setDeliveryNotes(response.data);
      } catch (error) {
        console.error("Error fetching delivery notes", error);
      }
    };
    fetchDeliveryNotes();
  }, []);

  // Delete record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/financial/${id}`);
      setDeliveryNotes(deliveryNotes.filter((note) => note._id !== id));
      alert("Record deleted successfully.");
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  // Approve record
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/financial/${id}`, {
        approved_by: currentUser.name,
      });
      alert("Record approved successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error approving record", error);
    }
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Delivery Notes Report", 14, 20);
    doc.autoTable({
      head: [
        ["Delivery ID", "Payment ID", "Process ID", "To Whom", "Approved by", "Amount", "Status"],
      ],
      body: deliveryNotes.map((note) => [
        note._id,
        note.payment_id,
        note.process_id,
        note.to_whom,
        note.approved_by || "N/A",
        note.amount,
        note.payment_status,
      ]),
    });
    doc.save("delivery_notes.pdf");
  };

  // Filter delivery notes based on search term
  const filteredNotes = deliveryNotes.filter((note) => {
    return (
      note.payment_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.process_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.to_whom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.approved_by ? note.approved_by.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
      note.amount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.payment_status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6 ">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Delivery Notes</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        <div className="float-end mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={generatePDF}
          >
            Download PDF
          </button>
          <Link to={`/deliverynote`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Delivery Note
            </button>
          </Link>
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-green-600">Delivery ID</th>
              <th className="py-3 px-6 text-left text-green-600">Payment ID</th>
              <th className="py-3 px-6 text-left text-green-600">Process ID</th>
              <th className="py-3 px-6 text-left text-green-600">To Whom</th>
              <th className="py-3 px-6 text-left text-green-600">Approved by</th>
              <th className="py-3 px-6 text-left text-green-600">Amount</th>
              <th className="py-3 px-6 text-left text-green-600">Status</th>
              <th className="py-3 px-6 text-center text-green-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.map((note) => (
              <tr key={note._id} className="border-b">
                <td className="py-3 px-6">
                  <Link to={`/updatedelivery/${note._id}`} className="text-blue-500 hover:underline">
                    {note._id}
                  </Link>
                </td>
                <td className="py-3 px-6">{note.payment_id}</td>
                <td className="py-3 px-6">{note.process_id}</td>
                <td className="py-3 px-6">{note.to_whom}</td>
                <td className="py-3 px-6">{note.approved_by}</td>
                <td className="py-3 px-6">{note.amount}</td>
                <td className="py-3 px-6">{note.payment_status}</td>
                <td className="py-3 px-6 text-center">
                  <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-500">
                    <Link to={`/updatedelivery/${note._id}`}>Edit</Link>
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleApprove(note._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
