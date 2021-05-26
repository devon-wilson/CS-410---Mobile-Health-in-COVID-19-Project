import React from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import axios from 'axios'
import Backend from './Backend'
import GaugeChart from 'react-gauge-chart' 

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
            date: {
                month: "",
                utc: ""
            },
            height: {
                feet: 5,
                inches: 7
            },
            bmi: 0,
            data: [],
            difference: []
        }
    }
  
    async componentDidMount(){
        const today = new Date() 
        const month = today.getMonth() + 1
        this.setState({date:{month: month}}) 
        this.setState({date:{utc: today}}) 
        
        let backend = new Backend()
        let start = 0 
        let end = 0  

        for(let i = 1; i < month + 1; ++i){
            let response = await backend.getMonth(i)
            this.setState(state => ({data: state.data.concat([response])}))
            
            if(response[0]){
                start = response[0].weight
                end = response[response.length - 1].weight
                this.setState(state => ({difference: state.difference.concat([(end - start)])}))
            }
           
            else
                this.setState(state => ({difference: state.difference.concat([0])}))
        }
        
        this.setBMI()        
    }

    returnLatest(){
        for(let i = this.state.month; i >= 0; --i) 
        {
            if(this.state.data[i])
            {
                return this.state.data[i][this.state.data[i].length - 1]
            }
        } 
        return null
    }
    
    returnMonths(){
        let response = []
        for(let i = 0; i < this.state['data'].length; ++i)
            response.push(monthNames[i])
        return response
    } 

    setBMI(){
        let meters = ((this.state.height.feet * 12) + this.state.height.inches) / 39.370079
        let lbs = this.returnLatest()
        if(lbs) 
        {
            let kg = (lbs['weight'] / 2.204623)
            this.setState({bmi: kg/(Math.pow(meters,2).toFixed(1))})
        }
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
  
    returnDate(){
        return this.state.date.utc
    }    

    render(){
        let today = new Date()
        let today_string = today.toString() 
        console.log(this.state.bmi) 
        return (
            <div>
                Lastest data as of {today_string}
                <center>
                <br></br> 
                <text>
                    Your BMI:
                </text>
                <GaugeChart id="gauge-chart5"
                    className="bmi" 
                    textColor="black" 
                    aniDelay={250}
                    arcPadding={0.01} 
                    arcWidth={0.15} 
                    nrOfLevels={4}
                    cornerRadius={5}
                    arcsLength={[1, 2, 3, 6]}
                    colors={['blue', '#5BE12C', '#F5CD19', '#EA4228']}
                    percent={this.state.bmi/100}
                    formatTextValue={value => value}
                    needleColor="grey"
                    style={{width: '35%'}}
                />
                </center>
                <Bar
                    data={this.createChart()}
                    width={324}
                    height={95} 
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

export default Analytics;