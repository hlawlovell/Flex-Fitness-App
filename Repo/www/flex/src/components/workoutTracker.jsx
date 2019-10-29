import React, {Component} from "react"
import { Container, ListGroup } from "react-bootstrap";
import '../components/workout.css'
import App from '../components/newExercise.jsx'
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

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


const myDate = new Date();

const Days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
]

class WorkoutTracker extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: Days[myDate.getDay()]+" - "+myDate.getDate()+"/"+(myDate.getMonth()+1)+"/"+myDate.getFullYear(),
            exercises: []
        }
    }

    test = () => {

    }

    previousDay = () => {
        //decrease day by 1
        var d = myDate;
        d.setDate(d.getDate() - 1);
        
        //request data from backend
        axios.get("http://localhost:8000/dashboard/"+d.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+d.getDate()+"/")
        .then(res => {
                const exercises = res.data;
        })
        this.setState({ date: Days[d.getDay()]+" - "+d.getDate()+"/"+(myDate.getMonth()+1)+"/"+d.getFullYear(),
                        exercises:[]});
        
     };

     nextDay = () => {
        var d = myDate;
        d.setDate(d.getDate() + 1);
        axios.get("http://localhost:8000/dashboard/"+d.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+d.getDate()+"/")



        this.setState({ date: Days[d.getDay()]+" - "+d.getDate()+"/"+(myDate.getMonth()+1)+"/"+d.getFullYear(),
        exercises:[
            "Lunges","Chinups","Kicking"
        ]});
    };



    render(){
        
        const items = this.state.exercises.map(function(item){
            
            return(
                <ListGroup.Item><div  className="exerciseWrapper">
                    <a className="exerciseTitle">{item.exercise}</a>
                    <a className="exerciseWeight">{item.weight}</a>
                    <a className="exerciseReps">{item.reps}</a>
                    </div></ListGroup.Item>
                );
          });

        const item = this.state.exercises.map(function(item){
            return <ListGroup.Item> {item} </ListGroup.Item>;
          });
        return(
            <div className="WorkoutTracker">
                <Container id="workoutWrap" style={workoutWrapStyle}>
                    <div id="workouts" style={dayViewWrapStyle}>
                        <ListGroup>
                        <ListGroup.Item><div id="daySelect"><a className={classNames("arrow","left","fa fa-chevron-left fa-lg")} 
                                        onClick={this.previousDay}></a>{this.state.date}<a className={classNames("arrow","right","fa fa-chevron-right fa-lg")}   onClick={this.nextDay}></a></div></ListGroup.Item>
                        {items}
                        </ListGroup>
                    </div>
                    <div id="adButtonWrap">
                        <App />
                    </div>
                </Container> 
            </div>
        )
    }
}

export default WorkoutTracker;