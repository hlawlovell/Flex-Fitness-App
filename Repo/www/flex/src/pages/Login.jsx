import React from "react"
import { Link } from "@reach/router"

const Login = () => (
  <div>
    <h1>Login</h1>
    <nav>
      <Link to="/">Landing</Link> 
      <Link to="/home">Home</Link>
    </nav>
  </div>
)
export default Login;