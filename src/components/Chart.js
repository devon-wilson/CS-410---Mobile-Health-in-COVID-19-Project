import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import Backend from './Backend'

class Chart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
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

    async getData(input){
        let backend = new Backend()
        let response = await backend.getMonth(input)
        this.setState({data: response})
        return response
    }

    log(){
        console.log(this.state)
    }
   
    render(){
        this.log()
        return(
           <div>
                <button onClick={() => this.getData('5')} >
                    Button
                </button>
                Chart
            </div>
        )
    }
}
export default Chart;
