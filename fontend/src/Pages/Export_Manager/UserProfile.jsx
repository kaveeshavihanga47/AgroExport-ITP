import React, { useEffect, useState } from "react";

import { Link, useParams } from 'react-router-dom';
import Navbar from "./Navbar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams(); // Get the user ID from URL params

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched user data:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Navbar/>
      <header className="navbar">
        <h1 className="brand-name">Agro Export</h1>
      </header>

      <div className="profile-card">
        <div className="avatar-circle">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            alt="Profile"
            className="profile-avatar"
          />
        </div>
        <h2 className="username">{user.name}</h2>
        <p className="user-email">{user.email}</p>

        <div className="actions">
          <Link to={`/ChangeUsername/${user._id}`}>
            <button className="action-btn">Change Username</button>
          </Link>
          <button className="action-btn">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
