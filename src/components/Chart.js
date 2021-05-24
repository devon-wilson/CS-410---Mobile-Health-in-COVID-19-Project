import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios'
import Backend from './Backend'

class Chart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            month: 0
        }
    }

    async componentDidMount(){
        const today = new Date() 
        const month = today.getMonth() + 1
        let backend = new Backend()
        let response = await backend.getMonth(month)
        this.setState({data: response})
        this.setState({month: month}) 
        return response
    }

    async changeData(input){
        let backend = new Backend()
        let updateMonth = this.state.month + input 
        let response = await backend.getMonth(updateMonth)
        this.setState({data: response})
        this.setState({month: updateMonth}) 
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
                label: "Weight in lbs", 
                data: this.returnWeights(),
                backgroundColor: ['rgba(255, 146, 0, 1)'],
                borderColor: ['rgba(255, 146, 0, 1)']
            }]
        }
        return chartData
    }

    log(){
        console.log(this.state)
    }
    
    //<button style={{float:'right'}} onClick={() => this.changeData(1)}></button>
    //<button style={{float:'left'}} onClick={() => this.changeData(-1)}>
    render(){
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]; 
        return(
           <div>
                <p></p> 
                <center>
                <button onClick={() => this.changeData(-1)}>
                    Back
                </button>
                <button onClick={() => this.changeData(1)}>
                    Next
                </button>
                </center> 
                <center>
                {monthNames[this.state.month-1]} Progress
                </center> 
                <Line
                    data={this.createChart()}
                    width={324}
                    options={{
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
        )
    }
}
export default Chart;
