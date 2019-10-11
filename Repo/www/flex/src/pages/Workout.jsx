import React from "react"
import MetaTags from 'react-meta-tags';
import { Container, Row, Col } from "react-bootstrap";
import Nav from '../components/nav'
import '../components/common.css'


const Workout = () => {
  return (
    <div class="wrapper">
      <MetaTags>
        <title>Page 1</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet" />
      </MetaTags>
      <div class="content"> 
      <Container>
        <Row>
        <Col>1 of 3</Col>
        <Col xs={6}><h1>Flex</h1></Col>
        <Col>3 of 3</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container> 
      <Container>
          <Nav  selected={"workout"}/>
      </Container>
      </div>
    </div>
  )
}
export default Workout;
