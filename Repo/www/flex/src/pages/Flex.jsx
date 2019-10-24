import React from "react"
import MetaTags from 'react-meta-tags';
import { Container, Row, Col } from "react-bootstrap";
import Chart from '../components/Chart'
import Nav from '../components/nav'
import '../components/common.css'
import '../components/Home.css'
import Logo from '../components/Logo';


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
              <Col></Col>
              <Col xs={12} id="scoreWrapper">
                <h1>200</h1>
                <Row id="flexScores">
                    <Col><h2>200</h2></Col>
                    <Col><h2>200</h2></Col>
                    <Col><h2>200</h2></Col>
                  </Row>
                </Col>
              <Col></Col>
            </Row>
            <Row id="homeRow4">
              <div id="chartContain">
                <div id="chartWrap"><Chart /></div>
              </div>
            </Row>
            <Row id="homeRow5">
              <Nav  selected={"home"}/>
            </Row>
          </Container> 
          </div>
        </div>
      )
}
export default Flex;
