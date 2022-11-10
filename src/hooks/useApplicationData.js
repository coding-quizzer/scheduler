import { useState, useEffect } from "react";
import axios from "axios";
import { updatedState } from "helpers/updators";


export default function useApplicationData() {
  const defaultState = {
    day: 'Monday',
    days: [],
    appointments: {}
  }
  const [state, setState] = useState(defaultState);

  const setDay = (day) => setState(prev => ({...prev, day}));


  const bookInterview = (id, interview) => {
    return axios.put( `/api/appointments/${id}`, { interview })
    .then(() => setState(prev => updatedState(prev, id, interview)));
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState(prev => updatedState(prev, id, null)));
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