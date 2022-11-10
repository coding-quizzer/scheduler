import { getDayObj, getSpotsForDay } from './selectors';

const updateDaySpots = (state) => {
  const newDay = {...getDayObj(state, state.day)};
  newDay.spots = getSpotsForDay(state, state.day);
  const days = [...state.days];
  days[newDay.id - 1] = newDay;
  return days;
};

export const updatedState = (state, id, interview) => {

  const appointment = {
    ...state.appointments[id],
    interview: interview ? { ...interview } : null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const newState = {...state, appointments};
  const days = updateDaySpots(newState);
  return {...newState, days};
};