import React from "react"
import {Helmet} from "react-helmet";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Chart from '../components/Chart'
import '../components/common.css'

const Home = () => (
  <div>
    {/*Handles head elements*/}
    <Helmet>
      <title>Flex</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>

    {/*Page Content*/}
    <h1>Home</h1>
    {/*Nav bar*/}
    <div className="housing">
      <div className="statChart" >
        <Chart  />
      </div>
    </div>
    <Container-fluid>
      <Navbar variant="light" bg="light" fixed="bottom">
          <Nav.Link href="" className="selected">Home</Nav.Link>
          <Nav.Link href="/workout">Workout</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
      </Navbar>
    </Container-fluid>
  </div>
)
export default Home;
