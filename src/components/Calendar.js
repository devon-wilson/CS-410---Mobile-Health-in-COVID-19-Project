import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { NavDropdown } from "react-bootstrap";

moment.locale("en-GB");

const localizer = momentLocalizer(moment);

class ChemCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: new Date().getMonth() + 1,
      cal_events: [
        //State is updated via componentDidMount
      ],
    };
  }

  async getmonth() {
    const { selectedMonth } = this.state;
    const params = {
      params: {
        month: selectedMonth,
      },
    };
    let response = await axios.get(
      "https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/month",
      params
    );
    let data = JSON.parse(response.data["body"]);
    let items = data["Items"];
    let events = [];
    

    for (let i = 0; i < items.length; i++) {
      let temp = {
        date: items[i].date,
        symptoms: items[i].symptoms,
        weight: items[i].weight,
        month: items[i].month,
        exposure: items[i].exposure,
        heartrate: items[i].heartrate,
        start: items[i].date,
        end: items[i].date ,
        title: "Weight: " + items[i].weight,
        allDay: 'true',
        name: "test exposure",
      };
      //events[i] = temp;
      events.push(temp)
      if(items[i].exposure == 'true')
      {
        let temp2 = {
          date: items[i].date, 
          start: items[i].date,
          end: items[i].date ,
          exposure: items[i].exposure,
          title: "COVID EXPOSURE",
          allDay: 'true',
          name: "exposure"
        }
        events.push(temp2)
      }
      else if(items[i].symptoms == 'true')
      {
        let temp2 = {
          date: items[i].date, 
          start: items[i].date,
          end: items[i].date ,
          symptoms: items[i].symptoms,
          title: "SYMPTOMS",
          allDay: 'true',
          name: "symptoms"
        }
        events.push(temp2)
      }
    }
    this.setState({
      cal_events: [...events],
    });
  }

  setDate() {
    const { selectedMonth } = this.state;
    if (selectedMonth < 10) {
      this.setState({ selectedMonth: selectedMonth }, () => this.getmonth());
    } else {
      this.setState({ selectedMonth: selectedMonth }, () => this.getmonth());
    }
  }

  componentDidMount() {
    this.setDate();
  }

  onChange = (date) => {
    const { selectedMonth } = this.state;
      this.setState({ selectedMonth: date.getMonth() + 1 }, () =>
        this.setDate());
  };

  getBackground = (events) => {
    console.log(events.symptoms);
    console.log(events.exposure);
    if (events.exposure == "True" || events.exposure == "true") {
      return "#D82E3F";
    } else if (events.symptoms == "True" || events.symptoms == "true") {
      console.log("should see yellow");
      return "#FBC740";
    } else {
      console.log("nothing worked");
      return "#3581D8";
    }
  };

  render() {
    const { cal_events, selectedMonth } = this.state;
    return (
      <div className="Calendar">
        <div style={{ height: 700 }}>
          <Calendar
            onNavigate={this.onChange}
            localizer={localizer}
            events={cal_events}
            defaultView="month"
            views={["month", "week", "day"]}
            defaultDate={new Date()}
            eventPropGetter={(events) => {
              let newStyle = {
                backgroundColor: "",
                borderRadius: "0px",
                opacity: 0.8,
                color: "white",
                border: "0px",
                display: "block",
              };
              newStyle.backgroundColor = this.getBackground(events);
              return {
                className: "",
                style: newStyle,
              };
            }}
          />
        </div>
      </div>
    );
  }
}

export default ChemCalendar;