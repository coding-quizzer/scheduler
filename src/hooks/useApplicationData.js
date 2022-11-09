import { useState, useEffect } from "react";
import axios from "axios";
import { getDayObj, getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {
  const defaultState = {
    day: 'Monday',
    days: [],
    appointments: {}
  }
  const [state, setState] = useState(defaultState);

  const getSpotsForDay = (state, day) => {
    const appointments = (getAppointmentsForDay(state, day));
    return getAppointmentsForDay(state, day)
    .reduce(((counter, nextAppointment) => (
      nextAppointment.interview ? (counter): (counter + 1)
      )), 0);
  }

  const updateDaySpots = (state, getDayObj) => {
    const newDay = {...getDayObj(state, state.day)};
    newDay.spots = getSpotsForDay(state, state.day);
    const days = [...state.days];
    days[newDay.id - 1] = newDay;

    return days;
  }

  const updateState = (setState, id, interview) => {
    
    setState(prev => {
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null
      };
      const appointments = {
        ...prev.appointments,
        [id]: appointment
      };
      const newState = {...prev, appointments};
      const days = updateDaySpots(newState, getDayObj);
      return {...newState, days}
    })

  }


  const setDay = (day) => setState(prev => ({...prev, day}));


  const bookInterview = (id, interview) => {
    
    return axios.put( `/api/appointments/${id}`, { interview })
    .then(() => {
      updateState(setState, id, interview);
    })
  };

  const cancelInterview = (id) => {
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      updateState(setState, id, null);
    })
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