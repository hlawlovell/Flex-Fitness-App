import React, {Component} from "react"
import { Container, ListGroup } from "react-bootstrap";
import '../components/workout.css'
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';


const dayViewWrapStyle = {
    'paddingTop':'5%',
    width: '90%',
    margin:'0 auto',
    position:'relative'
  };
  
  const workoutWrapStyle = {
    width:'100%',
    height:'90%',
    position:'relatve'
  }; 

  const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
}
  
class WorkoutTracker extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentView:"Today"
        }
    }

    previousDay = () => {
        this.setState({ currentView: "previous" });
     };

     nextDay = () => {
        this.setState({ currentView: "Next" });
     };


    render(){
        return(
            <div className="WorkoutTracker">
                <Container id="workoutWrap" style={workoutWrapStyle}>
                    <div id="workouts" style={dayViewWrapStyle}>
                    <ListGroup>
                    <ListGroup.Item><div id="daySelect"><a className={classNames("arrow","left","fa fa-chevron-left fa-lg")} onClick={this.previousDay}></a>{this.state.currentView}<a className={classNames("arrow","right","fa fa-chevron-right fa-lg")}   onClick={this.nextDay}></a></div></ListGroup.Item>
                    <ListGroup.Item>consectetur</ListGroup.Item>
                    <ListGroup.Item> consectetur</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                    </div>
                </Container> 
            </div>
        )
    }
}

export default WorkoutTracker;