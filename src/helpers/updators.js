import { getDayObj, getSpotsForDay } from './selectors';

/**
 * Get a day object with the updated spots value
 * @param {{
 *  days,
 *  appointments,
 *  interviewers
 * }} state the current state object
 * @returns {{
 *  id,
 *  name,
 *  appointments,
 *  interviewers,
 *  spots
 * }} a new day object with the spots value updated
 */
const updateDaySpots = (state) => {
  const newDay = {...getDayObj(state, state.day)};
  newDay.spots = getSpotsForDay(state, state.day);
  const days = [...state.days];
  days[newDay.id - 1] = newDay;
  return days;
};

/**
 * Get the updated state object after
 * an appointment is added, edited or deleted
 * @param {{
 *  days,
 *  appointments,
 *  interviewers
 * }} state the previous state object
 * @param {number} id the id of the changed appointment
 * @param {{
 *  student,
 *  interviewer
 * }} interview the newly created interview object
 * @returns {{
 *  days,
 *  appointments,
 *  interviewers
 * }}the new state object
 */

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