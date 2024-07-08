import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "../src/components/login/Login.tsx"
import PrivateRoute from "../src/components/privateroot/PrivateRoot.tsx"
import App from "./App.jsx"

const router = createBrowserRouter([
  { path: "/", element: <PrivateRoute component={App} /> },
  { path: "/login", element: <Login /> },
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
