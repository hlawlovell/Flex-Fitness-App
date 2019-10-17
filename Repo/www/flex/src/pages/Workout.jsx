import React from "react"
import MetaTags from 'react-meta-tags';
import { Container, ListGroup } from "react-bootstrap";
import Nav from '../components/nav'
import '../components/common.css'
import Logo from '../components/Logo';


const dayViewWrapStyle = {
  'padding-top':'5%',
  width: '90%',
  margin:'0 auto',
  position:'relative'
};

const workoutWrapStyle = {
  width:'100%',
  height:'90%',
  position:'relatve'
};

const Workout = () => {
  return (
    <div class="wrapper">
      <MetaTags>
        <title>Workout</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet" />
      </MetaTags>
      <div class="content"> 
      <Container id="workoutWrap" style={workoutWrapStyle}>
      <Logo />
        <div id ="workouts" style={dayViewWrapStyle}>
        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        </div>
      </Container> 
      <Container>
          <Nav  selected={"workout"}/>
      </Container>
      </div>
    </div>
  )
}
export default Workout;