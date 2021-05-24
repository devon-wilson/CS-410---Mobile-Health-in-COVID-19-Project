import React from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import axios from 'axios'
import Backend from './Backend'

//Weight loss since begining of this year (bar graph)
//BMI analysis, COVID analysis
//Average heartrate, COVID analysis

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]; 

class Analytics extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            difference: []
        }
    }
  
    async componentDidMount(){
        const today = new Date() 
        const month = today.getMonth() + 1
        let backend = new Backend()
        let start = 0 
        let end = 0  
        
        for(let i = 1; i < month + 1; ++i){
            let response = await backend.getMonth(i)
            this.setState(state => ({data: state.data.concat([response])}))
            
            if(response[0]){
                start = response[0].weight
                end = response[response.length - 1].weight
                console.log(month,start) 
                console.log(month,end)
                this.setState(state => ({difference: state.difference.concat([(end - start)])}))
            }
           
            else
                this.setState(state => ({difference: state.difference.concat([0])}))
        }
    }

    returnMonths(){
        let response = []
        for(let i = 0; i < this.state['data'].length; ++i)
            response.push(monthNames[i])
        return response
    } 

    createChart(){
        let chartData = {
            labels: this.returnMonths(),
            datasets: [{
                label: "Net Gain/Loss Progress in 2021",
                data: this.state.difference,
                backgroundColor: ['rgba(241, 0, 0, 0.71)'],
            }] 
        }
        return chartData
    } 
    
    log(){
        console.log(this.state)
    }    
   
    render(){
        return (
            <div>
                <Bar
                    data = {this.createChart()} 
                    options = {{
                        rotation: 270,
                        circumference: 180
                    }}
                />
            </div>
          )
    }
}

export default Analytics;