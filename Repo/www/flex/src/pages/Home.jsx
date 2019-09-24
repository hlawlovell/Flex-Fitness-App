import React from "react"
import { Link } from "@reach/router"

const Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <Link to="/">Landing</Link> 
      <Link to="/login">Login</Link>
    </nav>
  </div>
)
export default Home;
