import React, { useContext, useState } from 'react';
import './Navbar.css';
import UserContext from '../UserContext';
import logo from '../assets/logo.jpg'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {currentUser} = useContext(UserContext)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandle = () => {
    localStorage.removeItem('user');
     window.location.href = '/'
  }

  return (
    <nav className="navbar w-full" >
       
      <div className="navbar-logo flex flex-row items-center gap-x-5">
        <img src={logo} alt="Logo" className="logo w-14 h-14" />
        <a href="/" className=''>AgroExport</a>
      </div>
      {currentUser?.role === 'Financial Manager' &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/financedashboard">Dashboard</a></li>
        <li><a href="/alldeliverynote">All delivery</a></li>
        <li><a href="/distributorlist">All distribution</a></li>
        <li><a href="/cancaledorders">Cancelled Orders</a></li>
        <li><a href="/" onClick={logoutHandle}>Logout</a></li>
      </ul>}
      
      {currentUser?.role === 'Customer' &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/insertdistribute">Distribution</a></li>
        <li><a href="/addorder">Order</a></li>
        <li><a href="/insertH">Collecting</a></li>
        <li><a href="/myorders">My orders</a></li>
        <li><a href='/' onClick={logoutHandle}>Logout</a></li>
      </ul>}

      {currentUser?.role === 'Distributor Manager' &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/insertdistribute">Add Distrubute</a></li>
        <li><a href="/distributelist">Distribute List</a></li>
        <li><a href="/destribution">Payment Form</a></li>
        <li><a href='/' onClick={logoutHandle}>Logout</a></li>
      </ul>}

      {currentUser?.role === 'Export Manager' &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/exportdashboard">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/Insertexportdata">Add Export</a></li>
        <li><a href="/recieveorders">Receive Orders</a></li>
        <li><a href="/viewExporteditems">All Exports</a></li>
        <li><a href="/Ongoingorders">Ongoing Orders</a></li>
        <li><a href='/' onClick={logoutHandle}>Logout</a></li>
      </ul>}

      {currentUser?.role === 'Inventory Manager' &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/inventorylist">Inventory List</a></li>
        <li><a href="/insert">Add Inventory</a></li>
        <li><a href="/Insertexportdata">Add Export</a></li>
        <li><a href="/" onClick={logoutHandle}>Logout</a></li>
      </ul>} 

      {currentUser?.role === 'Order Manager' &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/orderlist">All Orders</a></li>
        <li><a href="/addorder">Add Order</a></li>
        <li><a href="/insert">Add Inventory</a></li>
        <li><a href="/" onClick={logoutHandle}>Logout</a></li>
      </ul>} 

      {(currentUser?.role === 'Collection Manager') &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/harvestinglist">View harvesting</a></li>
        <li><a href="/insertH">Add harvesting</a></li>
        <li><a href="/" onClick={logoutHandle}>Logout</a></li>
      </ul>} 

      {(currentUser?.role === 'Delivery Manager') &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/deliverydashboard">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/FarmerPaymentList">Paymented</a></li>
        <li><a href="/insertemployee">Add Employee</a></li>
        <li><a href="/insert">Add Inventory</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="/" onClick={logoutHandle}>Logout</a></li>
      </ul>} 

      {(currentUser?.role === 'Supplier Manager') &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/supplierdashboard">Dashboard</a></li>
        <li><a href="/supplier">Add Supplier</a></li>
        <li><a href="/supplierlist">All Suppliers</a></li>
        <li><a href="/" onClick={logoutHandle}>Logout</a></li>
      </ul>} 

      {!currentUser?.token &&<ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="/signup">Sign Up</a></li>
        <li><a href="/signin">Login</a></li>
      </ul>}

      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};


export default Navbar;
