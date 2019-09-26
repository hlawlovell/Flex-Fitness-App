import React from "react"
import {Helmet} from "react-helmet";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../components/common.css'
import {Bar} from 'react-chartjs-2';

const Home = () => (
  <div>
    {/*Handles head elements*/}
    <Helmet>
      <title>Flex</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>

    {/*Page Content*/}
    <h1>Home</h1>
    < Bar data={{
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
        label: "My First dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
        }]
    }} />
    {/*Nav bar*/}
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
