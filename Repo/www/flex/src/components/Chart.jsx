import React, {Component} from "react"
import {Line} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                label: "",
                backgroundColor: 'rgb(86, 199, 201)',
                borderColor:'white',
                data: [110, 120, 125, 125, 135, 142, 145],
                }]     
            }
        }
    }
    render(){
        return(
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
        )
    }
}

export default Chart;