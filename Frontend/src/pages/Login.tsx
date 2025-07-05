import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "./Login.css";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
       
        localStorage.setItem("token", data.access_token);
        alert(`✅ Welcome, ${data.username}`);
    
        navigate("/"); // หรือเปลี่ยนเป็นหน้าอื่นที่คุณมี
      } else {
        alert("❌ Login Failed: " + data.detail);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("⚠️ Network Error. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome</h2>

        <div className="login-logo-wrapper">
          <div className="logo-circle">A</div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="identifier">
            Email or Username
          </label>
          <input
            id="identifier"
            className="input-field"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <div className="password-field">
            <input
              id="password"
              className="input-field"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </div>
        </div>

        <button className="login-button" type="submit">
          LOGIN
        </button>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/register" className="signup-link-a">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
