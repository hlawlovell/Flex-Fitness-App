import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "react-bootstrap";
import WorkoutTracker from '../components/workoutTracker'
import Nav from '../components/nav'
import '../components/common.css'


const Workout = () => {
  return (
    <div className="wrapper">
      <MetaTags>
        <title>Workout</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </MetaTags>
      <div className="content"> 
      <WorkoutTracker />
      <Container>
          <Nav  selected={"workout"}/>
      </Container>
      </div>
    </div>
  )
}
export default Workout;