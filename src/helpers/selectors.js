/**
 * Get the day object for the current day
 * @param {{
 *  days,
 *  appointments,
 *  interviewers
 * }} state contains the current state object
 * @param {string} day the name of the current day
 * @returns {{
 *  id,
 *  name,
 *  appointments,
 *  interviewers,
 *  spots,
 * }} the object for the current day
 */
export function getDayObj (state, day) {
  return state.days.find(element => element.name === day)
};

/**
 *  Get all the appointments for the current
 * @param {{
 *  days,
 *  appointments,
 *  intervewers
 * }} state the current state object
 * @param {string} day the name of the current day 
 * @returns {
 *  [{
 *   id,
 *   time,
 *   interview,    
 *  }]
 * } an array containing all the appointments for the current day
 */
export function getAppointmentsForDay(state, day) {
  const dayObj = getDayObj(state, day);

  // If dayObj exists return dayObj.appointments, else return an empty array
  const dayAppointmentIDs = (dayObj && dayObj.appointments) || [];
  const dayAppointments = dayAppointmentIDs.map(id => state.appointments[id]);
  return dayAppointments;
};

/**
 * Fill in an interview with a student name and interviewer id,
 * replacing the intervewer id with the full interviewer objet
 * @param {{
 *  days,
 *  appointments,
 *  intervewers
 * }} state the current state object
 * @param {
 *  null || {
 *    interviewer (number),
 *    student
 *  }
 * } interview an interview with a student name and an intervewer id 
 * @returns {
 *  null || {
 *    intervewer (object),
 *    student
 *  } 
 * } the same interview with the interviewer id
 *   replaced with the intervewer object from the state object
 */
export function getInterview(state, interview) {
 
  if(!interview) return null;

  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID];
  
  return {...interview, interviewer};
};

/**
 * Get all the interviewers for the current day
 * @param {{
 *  days,
 *  appointments,
 *  interviewers
 * }} state the current state object
 * @param {string} day the name of the current day 
 * @returns {[
 *  {
 *    id,
 *    name,
 *    avatar
 *  }
 * ]} a list of all the interviewers for the current day
 */
export function getInterviewersForDay(state, day) {
  const dayObj = getDayObj(state, day);
  // If dayObj exists return dayObj.appointmentws, else return an empty arrayw
  const dayInterviewerIDs = (dayObj && dayObj.interviewers) || [];
  const dayInterviewers = dayInterviewerIDs.map(id => state.interviewers[id]);
  return dayInterviewers;
};

/**
 * Get the total spots remaining for the given day
 * @param {{
 *  days,
 *  appointments,
 *  interviewers
 * }} state the current state object
 * @param {string} day the name of the given day
 * @returns {number} the number of appointments
 *                   available for the given day
 */
export function getSpotsForDay(state, day) {
  return getAppointmentsForDay(state, day)
    // increment the counter for every appointment with a null interview
  .reduce(((counter, nextAppointment) => (
    nextAppointment.interview ? (counter): (counter + 1)
    )), 0);
};