import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";


export default function Application(props) {
  const defaultState = {
    day: 'Monday',
    days: [],
    appointments: []
  }
  const [state, setState] = useState(defaultState);

  const setDay = (day) => setState({...state, day});
  const setDays = (days) => setState({...state, days});
  const setAppointments = (appointments) => setState({...state, appointments});

  useEffect(() => {
    axios.get('/api/days')
      .then((response) => setDays(response.data))
  }, [])

   const appointments = {
    "1": {
      id: 1,
      time: "12pm",
    },
    "2": {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer:{
          id: 3,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    "3": {
      id: 3,
      time: "2pm",
    },
    "4": {
      id: 4,
      time: "3pm",
      interview: {
        student: "Archie Andrews",
        interviewer:{
          id: 4,
          name: "Cohana Roy",
          avatar: "https://i.imgur.com/FK8V841.jpg",
        }
      }
    },
    "5": {
      id: 5,
      time: "4pm",
    }
  };

  const appointmentList = Object.values(appointments);

  const appointmentBody = appointmentList.map(appointment => (
    <Appointment
      key={appointment.id}
      {...appointment}
    />
  ))

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentBody}
      </section>
    </main>
  );
}
