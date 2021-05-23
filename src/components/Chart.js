import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import Backend from './Backend'

class Chart extends React.Component{
    constructor(){
        super()
        this.state = {
            data: []
        }
    }

    async getData(input){
        let backend = new Backend()
        let response = await backend.getMonth(input)
        console.log(response)
        this.setState({data: response}) 
        return response
    }

    test(){
        console.log("f")
    }
    
    render(){
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

/*
const Chart = () => {
    return <div>Chart</div> 
}
export default Chart;
*/

/*
const Chart = () => {
    const [chartData, setChartData] = useState({});
    const [date, setDate] = useState([]);
    const [weight, setWeight] = useState([]);
    
    const chart = () => {
        let userData = [];
        let userWeight = [];
    }

        let backend = new Backend()
        //backend.getmonth(5).then(value => console.log(value))
        let data = null
        backend.getmonth(5).then(value => console.log(value))
        console.log(data)
    
    const getmonth = async (input) => {
        const params = {
            params: {
               month: input
            }
        }
        let response = await axios.get("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/month", params)
        //let response = await axios.get("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/month", {params: {month : 5}})
        let data = JSON.parse(response.data['body'])
        console.log(data['Items'])
    }
    //getmonth('5')
    
    const getdate = async(input) => {
        const params = {
            params: {
                date: input
            }
        }
        let response = await axios.get("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/date", params)
        console.log(response['data'])

    }
    //getdate('2021-05-15')
    
    const put = async(input) => {
        const params = {
            date: input['date'],
            exposure: input['exposure'],
            heartrate: input['heartrate'],
            month: input['month'],
            symptoms: input['symptoms'],
            weight: input['weight'],
        }
        console.log(params)
        let response = await axios.post("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/date", params)
        console.log(response)
    }
    const item = {
        date: '4',
        exposure: 'false',
        heartrate: '80',
        month: '3',
        symptoms: 'false',
        weight: '190'
    } 
    //put(item)

    return (
        <div>
            <Line
                data={{
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [
                        {
                            label: 'Weight Progress'
                        }
                    ]
                }}
                height = {50}
                width = {100}                        
            />
        </div>
    )
}

export default Chart
*/