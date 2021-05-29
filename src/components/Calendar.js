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
      selectedMonth: new Date().getMonth(),
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
    let events = [items.length];

    for (let i = 0; i < items.length; i++) {
      let temp = {
        date: items[i].date,
        symptoms: items[i].symptoms,
        weight: items[i].weight,
        month: items[i].month,
        exposure: items[i].exposure,
        heartrate: items[i].heartrate,
        start: items[i].date,
        end: items[i].date,
        title: "Weight: " + items[i].weight,
        allDay: true,
        name: "test exposure",
      };
      events[i] = temp;
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
    if (date.getMonth() !== selectedMonth) {
      this.setState({ selectedMonth: date.getMonth() + 1 }, () =>
        this.setDate()
      );
    }
  };

  getBackground = (events) => {
    console.log(events.symptoms);
    if (events.exposure == "true") {
      return "red";
    } else if (events.symptoms == "true") {
      return "yellow";
    } else {
      return "green";
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
