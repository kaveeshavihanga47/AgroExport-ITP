import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        orderID: '',
        customerID: '',
        amount: 0,
        shippingfee: 0,
        totalprice: 0
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Function to generate Order ID
    const generateOrderID = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-11
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `O${year}${month}${day}${hours}${minutes}${seconds}`;
    };

    useEffect(() => {
        // Set initial Order ID
        const initialOrderID = generateOrderID();
        setFormData((prev) => ({ ...prev, orderID: initialOrderID }));

        // Automatically calculate total price whenever amount or shipping fee changes
        const totalprice = parseFloat(formData.amount) + parseFloat(formData.shippingfee);
        setFormData((prev) => ({ ...prev, totalprice }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate Customer ID to start with 'C' and followed by numbers
        if (name === 'customerID') {
            const customerIDRegex = /^C\d+$/;
            if (!customerIDRegex.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    customerID: 'Customer ID must start with "C" followed by numbers only'
                }));
            } else {
                setErrors((prev) => ({ ...prev, customerID: undefined })); // Clear error if valid
            }
        }
    };

    useEffect(() => {
        const { amount, shippingfee } = formData;
        const totalprice = parseFloat(amount) + parseFloat(shippingfee);
        setFormData((prev) => ({ ...prev, totalprice }));
    }, [formData.amount, formData.shippingfee]); // Dependency array includes amount and shippingfee

    const validate = () => {
        const newErrors = {};

        if (!formData.orderID) {
            newErrors.orderID = 'Order ID is required';
        }

        if (!formData.customerID) {
            newErrors.customerID = 'Customer ID is required';
        }

        if (formData.amount <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }

        if (formData.shippingfee < 0) {
            newErrors.shippingfee = 'Shipping Fee cannot be negative';
        }

        if (formData.totalprice < 0) {
            newErrors.totalprice = 'Total Price cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form data
        if (validate()) {
            try {
                // Submit the form data
                const response = await axios.post('http://localhost:3000/api/ordermanagement', formData);
                console.log('Order submitted:', response.data);
            } catch (error) {
                console.error('There was an error submitting the order:', error);
            } finally {
                // Reset the form immediately after the submission
                setFormData({
                    orderID: generateOrderID(), // Generate a new Order ID for next submission
                    customerID: '',
                    amount: 0,
                    shippingfee: 0,
                    totalprice: 0
                });
                setIsSubmitting(false); // Stop submitting state
            }
        } else {
            setIsSubmitting(false); // Stop submitting state on validation failure
        }
    };

    return (
       <div>
        <Navbar/>
         <form 
         
            onSubmit={handleSubmit} 
            style={{
                maxWidth: '500px', 
                margin: '100px auto', 
                padding: '20px', 
                borderRadius: '10px', 
                backgroundColor: '#f9f9f9', 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
            
            <h2 style={{ textAlign: 'center', color: '#333', fontSize:"25px", fontWeight:"bold" , marginBottom: '25px'}}>Update the Order</h2>

            <label style={{ fontWeight: 'bold', color: '#333' }}>Order ID:</label>
            <input 
                type="text" 
                name="orderID" 
                value={formData.orderID} 
                readOnly 
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '5px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    backgroundColor: '#e9ecef' // Light gray background for read-only input
                }}
            />
            <br />

            <label style={{ fontWeight: 'bold', color: '#333' }}>Customer ID:</label>
            <input 
                type="text" 
                name="customerID" 
                value={formData.customerID} 
                onChange={handleChange} 
                required 
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '5px', 
                    borderRadius: '5px', 
                    border: errors.customerID ? '1px solid red' : '1px solid #ccc',
                    fontSize: '16px'
                }}
            />
            {errors.customerID && <span style={{ color: 'red', fontSize: '12px' }}>{errors.customerID}</span>}
            <br />

            <label style={{ fontWeight: 'bold', color: '#333' }}>Amount:</label>
            <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                min="0" 
                required 
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '5px', 
                    borderRadius: '5px', 
                    border: errors.amount ? '1px solid red' : '1px solid #ccc',
                    fontSize: '16px'
                }}
            />
            {errors.amount && <span style={{ color: 'red', fontSize: '12px' }}>{errors.amount}</span>}
            <br />

            <label style={{ fontWeight: 'bold', color: '#333' }}>Shipping Fee:</label>
            <input 
                type="number" 
                name="shippingfee" 
                value={formData.shippingfee} 
                onChange={handleChange} 
                min="0" 
                required 
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '5px', 
                    borderRadius: '5px', 
                    border: errors.shippingfee ? '1px solid red' : '1px solid #ccc',
                    fontSize: '16px'
                }}
            />
            {errors.shippingfee && <span style={{ color: 'red', fontSize: '12px' }}>{errors.shippingfee}</span>}
            <br />

            <label style={{ fontWeight: 'bold', color: '#333' }}>Total Price:</label>
            <input 
                type="number" 
                name="totalprice" 
                value={formData.totalprice} 
                readOnly // Make totalprice read-only
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '20px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    backgroundColor: '#e9ecef' // Light gray background for read-only input
                }}
            />
            <br />

            <button 
                type="submit" 
                style={{
                    width: '100%', 
                    padding: '12px', 
                    backgroundColor: '#28a745', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </button>
        </form>
       </div>
    );
};

export default OrderForm;
