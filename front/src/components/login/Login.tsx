import React, { useState } from "react"
import AuthService from "../../utils/AuthService"
import Register from "../register"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Login = () => {
  const { setIsAuthenticated } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    AuthService.login(username, password).then(
      (data) => {
        if ("refresh" in data && "access" in data) {
          setIsAuthenticated(true)
          navigate("/home")
        }
      },
      (error) => {
        setMessage("Login failed.")
        console.log(error)
      }
    )
  }

  return (
    <>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}

        <Register />
      </div>
      {/* displau connected username
       */}
    </>
  )
}

export default Login
