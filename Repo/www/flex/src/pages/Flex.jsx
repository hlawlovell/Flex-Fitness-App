import React from "react"
import MetaTags from 'react-meta-tags';
import { Container, Row } from "react-bootstrap";
import Chart from '../components/Chart'
import Nav from '../components/nav'
import '../components/common.css'
import '../components/Home.css'
import Logo from '../components/Logo';

// const load = (date) => {
//   axios
//   .post('http://localhost:3000/flexcard/login', {
//     email,
//     password,
//   })
//   .then();
// }

const Flex = () => {


    return (
        <div className="wrapper">
          <MetaTags>
            <title>Page 1</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet" />
          </MetaTags>
          <div className="content"> 
          <Logo />
          <Container>
            <Row id="homeRow2">
            </Row>
            <Row id="homeRow3">
              <Chart />
            </Row>
            <Row id="homeRow4">
              <Nav  selected={"home"}/>
            </Row>
          </Container> 
          </div>
        </div>
      )
}
export default Flex;
