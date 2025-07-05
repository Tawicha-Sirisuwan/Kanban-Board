import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { API_URL } from '../config'  // 🔹 ถ้ามีไฟล์ config.tsx

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง')
      return
    }

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('✅ Registration successful!')
        navigate('/login')
      } else {
        alert(`Failed to register: ${data.detail || 'Unknown error'}`)
      }
    } catch (err) {
      console.error('Register error:', err)
      alert('Network error. Please try again.')
    }
  }

  return (
    <div className="register-page">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2 className="register-title">Create Account</h2>

        <div className="register-logo-wrapper">
          <div className="register-logo-circle">R</div>
        </div>

        <div className="register-input-group">
          <label className="register-input-label" htmlFor="username">Username</label>
          <input
            id="username"
            className="register-input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="register-input-group">
          <label className="register-input-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="register-input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="register-input-group">
          <label className="register-input-label" htmlFor="password">Password</label>
          <div className="register-password-field">
            <input
              id="password"
              className="register-input-field"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="register-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >👁</span>
          </div>
        </div>

        <div className="register-input-group">
          <label className="register-input-label" htmlFor="confirm-password">Confirm Password</label>
          <div className="register-password-field">
            <input
              id="confirm-password"
              className="register-input-field"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="register-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >👁</span>
          </div>
        </div>

        <button className="register-button" type="submit">REGISTER</button>

        <p className="register-login-link">
          Already have an account? <Link to="/login" className="register-login-link-a">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
