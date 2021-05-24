import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios'
import Backend from './Backend'

class Chart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    async componentDidMount(){
        const today = new Date() 
        const month = today.getMonth() + 1
        let backend = new Backend()
        let response = await backend.getMonth(month)
        this.setState({data: response})
        return response
    }

    async changeData(input){
        let backend = new Backend()
        let response = await backend.getMonth(input)
        this.setState({data: response})
        return response
    }
    
    returnDates(){
        let response = [] 
        for(let i = 0; i < this.state['data'].length; ++i){
            response[i] = this.state['data'][i]['date']
        }
        return(response)
    }
    
    returnWeights(){
        let response = [] 
        for(let i = 0; i < this.state['data'].length; ++i){
            response[i] = this.state['data'][i]['weight']
        }
        return(response)
    }

    createChart(){
        let chartData = {
            
            labels: this.returnDates(),
            datasets: [{
                label: "Weight Progress", 
                data: this.returnWeights(),
                backgroundColor: ['rgba(0, 152, 255, 1)'],
                borderColor: ['rgba(0, 152, 255, 1)']
            }]
        
        }
        return chartData
    }

    log(){
        console.log(this.state)
    }
    
    render(){
        let data = this.createChart() 
        console.log(data) 
        return(
           <div>
                Weight Progress
                <Line
                    data={this.createChart()}
                    options={{
                        title:{
                          display:true,
                          text:"Weight Progress",
                          fontSize:2
                        },
                        scales:{
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend:{
                          display:false,
                          position:'right'
                        }
                      }}
                />
            </div>
        )
    }
}
export default Chart;
