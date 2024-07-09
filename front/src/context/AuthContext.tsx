import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
} from "react"
import AuthService from "../utils/AuthService"

interface AuthContextType {
  isAuthenticated: boolean | undefined
  setIsAuthenticated: Dispatch<React.SetStateAction<boolean | undefined>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  )

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      console.log(user, "user")
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated)
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
