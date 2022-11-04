import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";


export default function Application(props) {
  const defaultState = {
    day: 'Monday',
    days: [],
    appointments: {}
  }

  const dailyAppointments = [];
  const [state, setState] = useState(defaultState);

  const setDay = (day) => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ])
    .then(all => {
      console.log(all[0].data);
      console.log(all[1].data)
    });
  }, [])

  const appointmentBody = dailyAppointments.map(appointment => (
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
