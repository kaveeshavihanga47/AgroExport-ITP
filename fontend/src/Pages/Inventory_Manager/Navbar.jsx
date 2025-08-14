import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <style>
        {`
          /* Global variables */
          :root {
            --primary-color: #007bff;
            --primary-hover-color: #0056b3;
            --secondary-color: #28a745;
            --secondary-hover-color: #218838;
            --text-color: #333;
            --light-text-color: #f0f0f0;
            --border-radius: 5px;
            --font-family: 'Arial', sans-serif;
          }

          /* General styles */
          body {
            margin: 0;
            font-family: var(--font-family);
            background-color: #f8f9fa; /* Subtle background color */
          }

          h1.Inventory {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--text-color);
            text-align: center;
            margin: 40px 0;
          }

          /* Navbar styling */
          .navbar {
            background-color: var(--primary-color);
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .navbar-brand {
            color: white;
            font-size: 1.8rem;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .navbar-brand:hover {
            color: var(--light-text-color);
            text-decoration: none;
          }

          /* Nav items */
          .navbar-nav .nav-item .nav-link {
            color: white;
            padding: 0.5rem 1.5rem;
            transition: color 0.3s ease;
          }

          .navbar-nav .nav-item .nav-link:hover {
            color: var(--light-text-color);
          }

          /* Active nav link */
          .navbar-nav .nav-item .nav-link.active {
            font-weight: bold;
            background-color: var(--primary-hover-color);
            border-radius: var(--border-radius);
          }

          /* Search container */
          .search-container {
            display: flex;
            align-items: center;
            margin: 0 20px;
          }

          .search-bar {
            width: 250px;
            padding: 0.6rem 1rem;
            border: 1px solid #ccc;
            border-radius: var(--border-radius);
            margin-right: 10px;
            transition: border-color 0.3s ease;
          }

          .search-bar:focus {
            border-color: var(--primary-color);
            outline: none;
          }

          .search-button {
            background-color: var(--secondary-color);
            color: white;
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .search-button:hover {
            background-color: var(--secondary-hover-color);
          }

          /* Responsive navbar toggler */
          .navbar-toggler {
            border: none;
            padding: 0.5rem;
          }

          .navbar-toggler-icon {
            width: 30px;
            height: 3px;
            background-color: white;
            border-radius: 1px;
            position: relative;
            transition: background-color 0.3s ease;
          }

          .navbar-toggler-icon::before,
          .navbar-toggler-icon::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: white;
            border-radius: 1px;
            transition: all 0.3s ease;
          }

          .navbar-toggler-icon::before {
            top: -8px;
          }

          .navbar-toggler-icon::after {
            bottom: -8px;
          }

          .navbar-toggler:hover .navbar-toggler-icon,
          .navbar-toggler:hover .navbar-toggler-icon::before,
          .navbar-toggler:hover .navbar-toggler-icon::after {
            background-color: var(--light-text-color);
          }

          /* Button styles */
          button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: var(--border-radius);
            background-color: var(--primary-color);
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: var(--primary-hover-color);
          }
        `}
      </style>
      
      <h1 className="Inventory">WELCOME TO INVENTORY</h1>

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/insert'>Form</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/'>Show</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 search-bar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success search-button" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
