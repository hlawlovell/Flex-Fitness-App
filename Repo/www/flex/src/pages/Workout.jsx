import React from "react"
import {Helmet} from "react-helmet";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../components/common.css'


const Workout = () => (
  <div>
    {/*Handles head elements*/}
    <Helmet>
      <title>Flex</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>

    {/*Page Content*/}
    <h1>Workout</h1>

    {/*Nav bar*/}
    <Container-fluid>
      <Navbar variant="light" bg="light" fixed="bottom">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="" className="selected">Workout</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
      </Navbar>
    </Container-fluid>
  </div>
)
export default Workout;
