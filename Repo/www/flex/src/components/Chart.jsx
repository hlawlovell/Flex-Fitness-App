import React, {Component} from "react"
import {Line} from 'react-chartjs-2';
import { Container, Row, Col } from "react-bootstrap";
import '../components/Home.css'
import axios from 'axios';


class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                    label: "",
                    backgroundColor: 'rgb(86, 199, 201)',
                    borderColor:'white',
                    data:[],
                }]     
            }
        }
    }

    componentDidMount() {
        let currentComponent = this;
        //request data from backend
        axios({
            method: 'get',
            url:"http://localhost:8000/flexcard/",
            withCredentials: true
          })
        .then(function (response) {
            var result = Object.values(response.data.flexscores);
            var i=8;
            if(result.length<i)
                while(result.length<i)
                    result.unshift(0)
            else
                result = result.slice(result.length-9,result.length-1)
            console.log(result)
            currentComponent.setState({
                chartData:{
                    labels: ["", "", "", "", "", "", "", ""],
                    datasets: [{
                        label: "",
                        backgroundColor: 'rgb(86, 199, 201)',
                        borderColor:'white',
                        data:result,
                    }]     
                }
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    loadSquats = () => {
        //request data from backend
        let currentComponent = this;

        axios({
            method: 'get',
            url:"http://localhost:8000/flexcard/",
            withCredentials: true
          })
        .then(function (response) {
            var result = Object.values(response.data.squat);
            var i=8;
            if(result.length<i)
                while(result.length<i)
                    result.unshift(0)
            else
                result = result.slice(result.length-9,result.length-1)
            console.log(result)
            currentComponent.setState({
                chartData:{
                    labels: ["", "", "", "", "", "", "", ""],
                    datasets: [{
                        label: "",
                        backgroundColor: 'rgb(170, 106, 198)',
                        borderColor:'white',
                        data:result
                    }]     
                }
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    loadBench = () => {
        let currentComponent = this;

        axios({
            method: 'get',
            url:"http://localhost:8000/flexcard/",
            withCredentials: true
          })
        .then(function (response) {
            var result = Object.values(response.data.bench);
            var i=8;
            if(result.length<i)
                while(result.length<i)
                    result.unshift(0)
            else
                result = result.slice(result.length-9,result.length-1)
            console.log(result)
            currentComponent.setState({
                chartData:{
                    labels: ["", "", "", "", "", "", "", ""],
                    datasets: [{
                        label: "",
                        backgroundColor: 'rgb(119, 183, 219)',
                        borderColor:'white',
                        data:result,
                    }]     
                }
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    loadDeads = () => {
        let currentComponent = this;

        axios({
            method: 'get',
            url:"http://localhost:8000/flexcard/",
            withCredentials: true
          })
        .then(function (response) {
            var result = Object.values(response.data.deadlift);
            var i=8;
            if(result.length<i)
                while(result.length<i)
                    result.unshift(0)
            else
                result = result.slice(result.length-9,result.length-1)
            console.log(result)
            currentComponent.setState({
                chartData:{
                    labels: ["", "", "", "", "", "", "", ""],
                    datasets: [{
                        label: "",
                        backgroundColor: 'rgb(86, 199, 201)',
                        borderColor:'white',
                        data:result,
                    }]     
                }
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }
   
    loadFlex = () => {
        let currentComponent = this;

        axios({
            method: 'get',
            url:"http://localhost:8000/flexcard/",
            withCredentials: true
          })
        .then(function (response) {
            var result = Object.values(response.data.flexscores);
            var i=8;
            if(result.length<i)
                while(result.length<i)
                    result.unshift(0)
            else
                result = result.slice(result.length-9,result.length-1)
            console.log(result)
            currentComponent.setState({
                chartData:{
                    labels: ["", "", "", "", "", "", "", ""],
                    datasets: [{
                        label: "",
                        backgroundColor: ' rgb(86, 199, 201)',
                        borderColor:'white',
                        data:result,
                    }]     
                }
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        return(
            <Container id="flexModuleWrap">
                <Row  id="scoreRow">
                    <Col>
                        <h1 onClick={this.loadFlex}>210</h1>
                        <Row id="flexScores">
                            <Col><h2 onClick={this.loadSquats}>210</h2></Col>
                            <Col><h2 onClick={this.loadBench}>140</h2></Col>
                            <Col><h2 onClick={this.loadDeads}>280</h2></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
            <Row id="chartRow">
              <div id="chartContainer">
                <div className="lineChart">
                    < Line 
                        data={this.state.chartData}
                        options={{
                            legend:{display:false} ,
                            layout:{
                                padding:{left: 0, right: 0, top: 0, bottom: 0}
                            },
                            scales: {
                                xAxes: [{
                                    gridLines: {drawOnChartArea: true, fontColor: 'white'
                                    },ticks: {fontColor: 'white'}
                                }],
                                yAxes: [{
                                    gridLines: {drawOnChartArea: false},
                                    ticks: {fontColor: 'white'}
                                }]
                            }
                        }
                    }
                    />
                </div>
            </div>
            </Row>
        </Row>
        <Row>
            <Col></Col>
        </Row>
        </Container>
        )
    }
}

export default Chart;