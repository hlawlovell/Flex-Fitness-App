import React, {Component} from "react"
import { Container, ListGroup } from "react-bootstrap";
import '../components/workout.css'
import App from '../components/newExercise.jsx'
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import Cookies from 'js-cookie';

axios.defaults.headers.common['Authorization'] = `Token ${Cookies.get('Authorization')}`

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

    componentDidMount() {
        var d = myDate;
        let currentComponent = this;
        //request data from backend
        axios({
            method: 'get',
            url:"http://localhost:8000/dashboard/"+d.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+d.getDate()+"/",
            withCredentials: true
          })
        .then(function (response) {
            currentComponent.setState({ date: Days[d.getDay()]+" - "+d.getDate()+"/"+(myDate.getMonth()+1)+"/"+d.getFullYear(),
            exercises:response.data.exercises});
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    previousDay = () => {
        //decrease day by 1
        var d = myDate;
        d.setDate(d.getDate() - 1);
        let currentComponent = this;
        //request data from backend
        axios({
            method: 'get',
            url:"http://localhost:8000/dashboard/"+d.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+d.getDate()+"/",
            withCredentials: true
          })
        .then(function (response) {
            currentComponent.setState({exercises:[]});
            currentComponent.setState({ date: Days[d.getDay()]+" - "+d.getDate()+"/"+(myDate.getMonth()+1)+"/"+d.getFullYear(),
            exercises:response.data.exercises});
          })
          .catch(function (error) {
            console.log(error);
          });
     };

     nextDay = () => {
        var d = myDate;
        d.setDate(d.getDate() + 1);
        let currentComponent = this;
        axios({
            method: 'get',
            url:"http://localhost:8000/dashboard/"+d.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+d.getDate()+"/",
            withCredentials: true
          })        .then(function (response) {
            currentComponent.setState({exercises:[]});
            currentComponent.setState({ date: Days[d.getDay()]+" - "+d.getDate()+"/"+(myDate.getMonth()+1)+"/"+d.getFullYear(),
            exercises:response.data.exercises});
            
          })
          .catch(function (error) {
            console.log(error);
          });
    };
    handleDelete = () => {
        alert("Button Clicked!");
      };
    render(){

        const items = this.state.exercises.map(function(item){
            
        const Trigger = () => <div><a class="new1">{item.title}</a><a className="new2">{item.sets.length}</a></div>;

             return(
                <ListGroup.Item className={classNames("noselect","exerciseWrapper")} onDelete={this.handleDelete} >
                    <Collapsible className={classNames("noselect","exerciseLabel")} trigger={<Trigger />}>
                    <p className="exerciseRepsWrap">{item.sets.map(function(set){
                        return(
                            <a className="exerciseReps">{set[0]+"x"+set.substring(2)}</a>
                        )})}<a className={classNames("fa fa-trash","deleteWorkout")} onClick={this.deleteEntry}></a></p>
                    </Collapsible>
                </ListGroup.Item>     
                );
          });

        
        return(
            <div className="WorkoutTracker">
                <Container id="workoutWrap" style={workoutWrapStyle}>
                    <div id="workouts" style={dayViewWrapStyle}>
                        <ListGroup>
                        <ListGroup.Item><div id="daySelect"><a className={classNames("arrow","left","fa fa-chevron-left fa-lg","noselect")} 
                                        onClick={this.previousDay}></a>{this.state.date}<a className={classNames("noselect","arrow","right","fa fa-chevron-right fa-lg")}   onClick={this.nextDay}></a></div></ListGroup.Item>
                        {items}
                        </ListGroup>
                    </div>
                    <div id="adButtonWrap" >
                        <App url={this.state.date} />
                    </div>
                </Container> 
            </div>
        )
    }
}

export default WorkoutTracker;