import React from 'react'
import { Bar, Bubble } from 'react-chartjs-2'
import axios from 'axios'
import Backend from './Backend'
import GaugeChart from 'react-gauge-chart' 

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
            current: {
                feet: 5,
                inches: 7,
                c_weight: "",
                symptoms: "false",
                exposure: ""
            },
            data: [],
            bmi: 0,
            weight: [],
            heartrate: []
        }
    }
  
    async componentDidMount(){
        const today = new Date() 
        const _month = today.getMonth() + 1
        this.setState({date:{month: _month}}) 
        this.setState({date:{utc: today}}) 
        
        let backend = new Backend()
        let start = 0 
        let end = 0  

        for(let i = 1; i < _month + 1; ++i){
            let response = await backend.getMonth(i)
            this.setState(state => ({data: state.data.concat([response])}))

            if(response[0]){
                start = response[0].weight
                end = response[response.length - 1].weight
                this.setState(state => ({weight: state.weight.concat([(end - start)])}))
            }
           
            else
                this.setState(state => ({weight: state.weight.concat([0])}))
        }
        
        this.setBMI()        
        this.setCurrent()
    }

    returnLatest(){
        const today = new Date() 
        const month = today.getMonth() + 1
        for(let i = month; i >= 0; --i){
            if(this.state.data[i])
                return this.state.data[i][this.state.data[i].length - 1]
        } 
        return null
    }
   
    setCurrent(){
        let data = this.returnLatest()
        this.setState({current:{c_weight: data['weight']}})
        this.setState({current:{exposure: data['exposure']}})
        this.setState({current:{symptoms: data['symptoms']}})
    }    

    returnMonths(){
        let response = []
        for(let i = 0; i < this.state['data'].length; ++i)
            response.push(monthNames[i])
        return response
    } 

    setBMI(){
        let meters = ((this.state.current.feet * 12) + this.state.current.inches) / 39.370079
        let lbs = this.returnLatest()
        if(lbs){
            let kg = (lbs['weight'] / 2.204623)
            this.setState({bmi: (kg/Math.pow(meters,2)).toFixed(1)})
        }
    }

    getAverage(){
        console.log(this.state.heartrate)
    }

    createChart(){
        let chartData = {
            labels: this.returnMonths(),
            datasets: [{
                label: "Net Gain/Loss Progress in 2021",
                data: this.state.weight,
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

    analyzeBMI(){
        if(this.state.bmi < 18.5)
            return("underweight") 
        if(this.state.bmi >= 18.5 && this.state.bmi < 25)
            return("healthy")
        if(this.state.bmi >= 25 && this.state.bmi < 30)
            return("overweight") 
        if(this.state.bmi >= 30)
            return("obese") 
    }

    render(){
        let today = (this.state.date.utc).toString()
        let weight = this.state.current.c_weight
        let category = this.analyzeBMI()
        let message = "" 
        if(category == "healthy")
            message = "At " + this.state.bmi + " you are " + category + " and at a low risk of dying from COVID."
        if(category == "underweight" || category == "overweight")
            message = "At " + this.state.bmi + " you are " + category + " and at a higher risk of dying from COVID."
        if(category == "obese")
            message = "At " + this.state.bmi + " you are " + category + " and at a high risk of dying from COVID."

        return (
            <div>
                Lastest data as of {today}
                <center>
                <text>
                BMI 
                <br></br> 
                {message} 
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