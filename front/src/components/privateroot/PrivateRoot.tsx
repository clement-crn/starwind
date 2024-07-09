import React, { PropsWithChildren, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const PrivateRoute: React.FC = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated)
  }, [])

  // Redirect to login if not authenticated
  if (isAuthenticated === false) {
    return <Navigate to="/login" />
  }

  // Render child routes
  return children
}

export default PrivateRoute
