import React from "react"
import AuthService from "../../utils/AuthService"
import { useAuth } from "../../context/AuthContext"

const Logout = () => {
  const { setIsAuthenticated } = useAuth()
  return (
    <button
      onClick={() => {
        AuthService.logout()
        setIsAuthenticated(false)
      }}
    >
      Logout
    </button>
  )
}

export default Logout
