import React from 'react'
import { Button, FormGroup, FormControl, ControlLabel, Form } from "react-bootstrap"

class AddForm extends React.Component{
    
    constructor(props){
        super(props)

        this.state = {
            date: ""
        }
    } 
   
    componentDidMount(){
        const today = new Date()
        const month = today.getUTCMonth() + 1; //months from 1-12
        let month_string = month.toString()
        if(month_string.length != 2) 
            month_string = "0" + month_string
        const day = today.getUTCDate() - 1
        let day_string =  day.toString()
        if(day_string.length != 2)
            day_string = "0" + day_string
        const year = today.getUTCFullYear()
        
        const utc = year + "-" + month_string + "-" + day_string

        this.setState({date: utc})
    }

    render(){
        return(
            <center>
                <br></br> 
                <br></br> 
                <Form>
                    <label>Date: </label> 
                    <input type="date" value={this.state.date}></input>
                    <br></br> 
                    <br></br> 
                    <label>Weight: </label> 
                    <input type="number"></input>
                    <br></br> 
                    <br></br> 
                    <label>Heartrate: </label> 
                    <input type="number"></input>
                    <br></br> 
                    <br></br> 
                    <div>
                    <label>Exposure: </label> 
                    <input type="radio" value="False" name="exposure" value="false"/> No
                    <input type="radio" value="True" name="exposure" value="true"/> Yes
                    </div>
                    <div>
                    <br></br> 
                    <label>Symptoms: </label> 
                    <input type="radio" value="False" name="symptoms" value="false"/> No
                    <input type="radio" value="True" name="symptoms" value="true"/> Yes
                    </div>
                    <br></br> 
                    <br></br> 
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <br></br> 
                <br></br> 
            </center>
        )
    }
}

export default AddForm