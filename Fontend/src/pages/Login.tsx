import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [identifier, setIdentifier] = useState(""); // ✅ ใช้แทน email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      loginWith: identifier.includes("@") ? "email" : "username",
      identifier,
      password,
    });

    // TODO: ส่งค่า identifier + password ไป API
    // API ฝั่ง backend ควรเช็คได้ทั้ง email หรือ username จาก field เดียว
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
