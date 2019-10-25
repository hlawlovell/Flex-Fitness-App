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


const myDate = new Date();

const Days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
]

class WorkoutTracker extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: Days[myDate.getDay()]+" - "+myDate.getDate()+"/"+myDate.getMonth()+"/"+myDate.getFullYear(),
            exercises: [
                {
                    exercise: 'bench',
                    weight: '100',
                    reps: '5',
                },
                {
                    exercise: 'squat',
                    weight: '200',
                    reps: '3',
                },
              ]
        }
    }

    test = () => {

    }

    previousDay = () => {
        var d = myDate;
        d.setDate(d.getDate() - 1);
        this.setState({ date: Days[d.getDay()]+" - "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear(),
                        exercises:[
                            "Bench","Jumps"
                        ]});
     };

     nextDay = () => {
        var d = myDate;
        d.setDate(d.getDate() + 1);
        this.setState({ date: Days[d.getDay()]+" - "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear(),
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
                        <a id="adButton" className={classNames("fa fa-plus fa-3x")}></a>
                    </div>
                </Container> 
            </div>
        )
    }
}

export default WorkoutTracker;