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
    console.log(appointments);
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


  const setDay = (day) => setState(prev => ({...prev, day}));


  const bookInterview = (id, interview) => {
    
    return axios({
      method: 'put',
      url: `/api/appointments/${id}`,
      data: {interview}
    })
    .then(() => {
     
      
      setState(prev => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview}
        };
        const appointments = {
          ...prev.appointments,
          [id]: appointment
        };
        const newState = {...prev, appointments};
        const days = updateDaySpots(newState, getDayObj);
        return {...newState, days}
      })
    })
  };

  const cancelInterview = (id) => {
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      
      
      setState(prev => {
        const appointment = {
          ...prev.appointments[id],
          interview: null
        }
        const appointments = {
          ...prev.appointments,
          [id]: appointment
        }
        const newState = {...prev, appointments}
        const days = updateDaySpots(newState, getDayObj);
        return ({...newState, days});
      })
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