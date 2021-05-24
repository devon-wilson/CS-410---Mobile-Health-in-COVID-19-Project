import React from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import Backend from './Backend'

//Weight loss since begining of this year (bar graph)
//BMI analysis, COVID analysis
//Average heartrate, COVID analysis

class Analytics extends React.Component{
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
  
    log(){
        console.log(this.state)
    }    
    
   
    returnOptions(){
    }

    render(){
        return (
            <div>
                Analytics
            </div>
          )
    }
}

export default Analytics;