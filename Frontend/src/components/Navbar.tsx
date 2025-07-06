// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config"; // ใส่ path ที่คุณตั้งไว้
import "./Navbar.css";

interface User {
  name: string;
  avatar: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        setUser({
          name: data.username || data.email || "User",
          avatar: "./image/user_profile.jpg", // หรือดึงจาก data.avatar
        });
      } catch (err) {
        console.error("⚠️ Failed to fetch user", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null; // หรือ loading spinner ก็ได้

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">Kanban Board</h1>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <img src={user.avatar} alt="avatar" className="navbar-avatar" />
          <span className="navbar-username">{user.name}</span>
        </div>

        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
