import React from "react";
import axios from "axios";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Form,
} from "react-bootstrap";

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.date = React.createRef("date");
    this.weight = React.createRef("weight");
    this.heartrate = React.createRef("heartrate");
    this.exposure = React.createRef("exposure");
    this.symptoms = React.createRef("symptoms");
    this.weight = React.createRef("weight");
    this.handleNewForm = this.handleNewForm.bind(this);
    this.removeForm = this.removeForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      date: "",
    };
  }

  handleDelete(event) {
    event.preventDefault();
    let input = localStorage.getItem("date2");
    this.removeForm(input);
    console.log("were here " + localStorage.getItem("date2", event.target.value));
  }

  async removeForm(input) {
      console.log("input " + input);
    const params = {
      date: input,
    };
    const headers = {} 
    let response = await axios.delete("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/date", {params});
    console.log(response);
    console.log("should be removed; " + input);
  }

  handleExposure(event) {
    localStorage.setItem("exposure", event.target.value);
  }

  handleSymptoms(event) {
    localStorage.setItem("symptoms", event.target.value);
  }

  handleDateSet(event) {
      localStorage.setItem(("date2"), event.target.value);
      console.log("date2 " + event.target.value)
  }

  handleNewForm(event) {
    event.preventDefault();

    const inputs = event.target.getElementsByTagName("input");

    localStorage.setItem("date", inputs.date.value);
    localStorage.setItem("weight", inputs.weight.value);
    localStorage.setItem("heartrate", inputs.heartrate.value);
    //localStorage.setItem("exposure", inputs.exposure.value);  moved into seperate functions because, 
    //localStorage.setItem("symptoms", inputs.symptoms.value);  they are radio buttons and need to be handled differently
    // console.log(localStorage.getItem("date"));//--
    // console.log(localStorage.getItem("weight"));//--//---
    // console.log(localStorage.getItem("heartrate"));//--//---//-->> for testing
    // console.log(localStorage.getItem("exposure"));//--//---
    // console.log(localStorage.getItem("symptoms"));//--

    var d = new Date(localStorage.getItem("date"));

    let obj = {
      date: localStorage.getItem("date"),
      weight: localStorage.getItem("weight"),
      heartrate: localStorage.getItem("heartrate"),
      exposure: localStorage.getItem("exposure"),
      symptoms: localStorage.getItem("symptoms"),
      month: d.getMonth() + 1,
    };
    // console.log("month " + d.getMonth() + 1);//testing
    this.put(obj);
  }

  async put(input) {
    const params = {
      date: input["date"],
      exposure: input["exposure"],
      heartrate: input["heartrate"],
      month: input["month"],
      symptoms: input["symptoms"],
      weight: input["weight"],
    };
    let response = await axios.post(
      "https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/date",
      params
    );
    console.log(params);
    console.log(response);
  }

  componentDidMount() {
    const today = new Date();
    const month = today.getUTCMonth() + 1; //months from 1-12
    let month_string = month.toString();
    if (month_string.length != 2) month_string = "0" + month_string;
    const day = today.getUTCDate() - 1;
    let day_string = day.toString();
    if (day_string.length != 2) day_string = "0" + day_string;
    const year = today.getUTCFullYear();
    const utc = year + "-" + month_string + "-" + day_string;
    this.setState({ date: utc });
  }

  render() {
    return (
      <center>
        <p></p>
        <Form onSubmit={this.handleNewForm} onsubmit="return false">
          <header>
            <b>Add Form</b>
          </header>
          <p></p>
          <label>Date: </label>
          <input type="date" name="date"></input>
          <p></p>
          <label>Weight: </label>
          <input type="number" name="weight"></input>
          <p></p>
          <label>Heartrate: </label>
          <input type="number" name="heartrate"></input>
          <p></p>
          <div onChange={this.handleExposure}>
            <label>Exposure: </label>
            <input type="radio" value="false" name="exposure" value="false" /> No
            <input type="radio" value="true" name="exposure" value="true" /> Yes
          </div>
          <p></p>
          <div onChange={this.handleSymptoms}>
            <label>Symptoms: </label>
            <input type="radio" value="false" name="symptoms" /> No
            <input type="radio" value="true" name="symptoms" /> Yes
          </div>
          <p></p>
          <Button type="simpleQuery">Add</Button>
        </Form>

        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>

        <Form onSubmit={this.handleDelete} onsubmit="return false">
          <header>
            <b>Delete Form</b>
          </header>
          <p></p>
          <label>Date: </label>
          <div onChange={this.handleDateSet}>
            <input type="date" name="date2"></input>
          </div>
          <p></p>
          <Button variant="primary" type="submit">
            Delete
          </Button>
        </Form>
      </center>
    );
  }
}

export default AddForm;
