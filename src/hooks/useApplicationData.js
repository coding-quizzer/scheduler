import { useState, useEffect } from "react";
import axios from "axios";
import { getDayObj } from "helpers/selectors";
export default function useApplicationData() {
  const defaultState = {
    day: 'Monday',
    days: [],
    appointments: {}
  }
  const [state, setState] = useState(defaultState)

  const updateDaySpots = (state, setState, getDayObj, callback) => {
    const newDay = {...getDayObj(state, state.day)};
    newDay.spots = callback(newDay.spots);
    const days = [...state.days];
    days[newDay.id - 1] = newDay;
    setState(prev => ({...prev, days}));
  }

  const setDay = (day) => setState(prev => ({...prev, day}));


  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios({
      method: 'put',
      url: `/api/appointments/${id}`,
      data: {interview}
    })
    .then(() => {
      setState(prev => ({
        ...prev, 
        appointments
      }))
    })
    .then(() => {
     updateDaySpots(state, setState, getDayObj, (spots) => spots-1)
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState(prev => ({
        ...prev,
        appointments
      }))
    })
    .then(() => {
     updateDaySpots(state, setState, getDayObj, (spots) => spots + 1)
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
} 