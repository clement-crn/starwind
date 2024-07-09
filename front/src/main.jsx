import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/login/Login.tsx"
import PrivateRoute from "./components/privateroot/index.ts"
import App from "./App.jsx"
import Home from "./pages/home/index.ts"
import { AuthProvider } from "./context/AuthContext.tsx"

const router = createBrowserRouter([
  { path: "/", element: <PrivateRoute component={App} /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
])
ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  //</React.StrictMode>
)
