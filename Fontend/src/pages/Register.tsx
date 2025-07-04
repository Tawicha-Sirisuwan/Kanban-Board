import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    console.log({ username, email, password })
    // TODO: call register API here
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
            placeholder="johndoe@example.com"
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
            >
              👁
            </span>
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
            >
              👁
            </span>
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
