export function getDayObj (state, day) {
  return state.days.find(element => element.name === day)
};

export function getAppointmentsForDay(state, day) {
  const dayObj = getDayObj(state, day);

  // If dayObj exists return dayObj.appointmentws, else return an empty array
  const dayAppointmentIDs = (dayObj && dayObj.appointments) || [];
  const dayAppointments = dayAppointmentIDs.map(id => state.appointments[id]);
  return dayAppointments;
}

export function getInterview(state, interview) {
 
  if(!interview) return null;

  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID];
  
  return {...interview, interviewer};
};


export function getInterviewersForDay(state, day) {
  const dayObj = getDayObj(state, day);
  // If dayObj exists return dayObj.appointmentws, else return an empty arrayw
  const dayInterviewerIDs = (dayObj && dayObj.interviewers) || [];
  const dayInterviewers = dayInterviewerIDs.map(id => state.interviewers[id]);
  return dayInterviewers;
}