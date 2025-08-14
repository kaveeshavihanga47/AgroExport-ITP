import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';

const PaymentReturnList = () => {
    const [paymentReturns, setPaymentReturns] = useState([]); // Initialized as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentReturns = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/paymentreturn');
                setPaymentReturns(response.data);
                console.log(response.data) // Adjust this if your API returns a different structure
            } catch (error) {
                setError('Failed to fetch payment returns.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentReturns();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <Navbar />
            <div className="w-full max-w-4xl mt-20 p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Payment Returns</h2>

                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">By Whom</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Return Back</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(paymentReturns) && paymentReturns.length > 0 ? (
                            paymentReturns.map((paymentReturn) => (
                                <tr key={paymentReturn._id} className="border-b text-center">
                                    <td className="px-4 py-2">{paymentReturn.order_id}</td>
                                    <td className="px-4 py-2">{paymentReturn.by_whom}</td>
                                    <td className="px-4 py-2">{paymentReturn.amount}</td>
                                    <td className="px-4 py-2">{paymentReturn.return_back}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-2">No records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentReturnList;
