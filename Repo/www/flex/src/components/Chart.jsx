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
                    data: [195,200,200,205,205,207,210,210],
                }]     
            }
        }
    }

    loadSquats = () => {
        this.setState({
            chartData:{
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                label: "",
                backgroundColor: 'rgb(170, 106, 198)',
                borderColor:'white',
                data: [180,190,190,200,200,202,205,210],
                }]     
            }
        })
    }
    loadBench = () => {
        this.setState({
            chartData:{
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                label: "",
                backgroundColor: 'rgb(247, 122, 140)',
                borderColor:'white',
                data: [120,125,130,130,132,138,140,140],
                }]     
            }
        })
    }
    loadDeads = () => {
        this.setState({
            chartData:{
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                label: "",
                backgroundColor: 'rgb(119, 183, 219)',
                borderColor:'white',
                data: [260,265,265,270,270,275,280,280],
                }]     
            }
        })
    }
    loadFlex = () => {
        this.setState({
            chartData:{
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                label: "",
                backgroundColor: 'rgb(86, 199, 201)',
                borderColor:'white',
                data: [195,200,200,205,205,207,210,210],
                }]     
            }
        })
    }

    render(){
        return(
            <Container>
                <Row>
                <Col></Col>
                <Col s={12} id="scoreWrapper">
              <h1 onClick={this.loadFlex}>210</h1>
              <Row id="flexScores">
                  <Col><h2 onClick={this.loadSquats}>210</h2></Col>
                  <Col><h2 onClick={this.loadBench}>140</h2></Col>
                  <Col><h2 onClick={this.loadDeads}>280</h2></Col>
                </Row>
              </Col>
            <Col></Col>
          </Row>
          <Row>
            <div id="chartContain">
              <div id="chartWrap">
                <div className="lineChart">
                < Line 
                    data={this.state.chartData}
                    options={{
                        legend:{display:false} ,
                        layout:{
                            padding:{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    drawOnChartArea: true,
                                    fontColor: 'white'
                                },ticks: {
                                    fontColor: 'white'
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    drawOnChartArea: false
                                    
                                },
                                ticks: {
                                    fontColor: 'white'
                                }
                            }]
                        }
                    }
                }
                />
            </div>
            </div>
            </div>
        </Row>
        </Container>
        )
    }
}

export default Chart;