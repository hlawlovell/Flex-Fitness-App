import React from "react"
import { Link } from "@reach/router"

const Landing = () => (
  <div>
    <h1>Landing</h1>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/login">login</Link> 
    </nav>
  </div>
)
export default Landing;