import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

moment.locale("en-GB");

const localizer = momentLocalizer(moment);

class ChemCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cal_events: [
        //State is updated via componentDidMount
      ],
    };
  }

  convertDate = (date) => {
    return moment.utc(date).toDate();
  };

  async componentDidMount() {
    const obj = [
      {
        start: new Date("2021-05-02"),
        end: new Date("2021-05-02"),
        name: "test product",
        allDay: true,
        title: "chemapp",
      },

      {
        start: new Date("2021-05-02"),
        end: new Date("2021-05-02"),
        name: " product",
        allDay: true,
        title: "diff",
      },
    ];
    this.setState({
      cal_events: [...obj],
    });
  }

  eventStyleGetter(event, start, end, isSelected) {
    console.log(event);
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  }

  render() {
    const { cal_events } = this.state;

    return (
      <div className="Calendar">
        <div style={{ height: 700 }}>
          <Calendar
            localizer={localizer}
            events={cal_events}
            //step={960}
            defaultView="month"
            views={["month", "week"]}
            defaultDate={new Date()}
            onSelectSlot={this.slotSelected}
            onSelectEvent={this.eventSelected}
            eventPropGetter={this.eventStyleGetter}
          />
        </div>
      </div>
    );
  }
}

export default ChemCalendar;