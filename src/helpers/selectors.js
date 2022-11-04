export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(element => element.name === day)

  // If dayObj exists return dayObj.appointmentws, else return an empty arrayw
  const dayAppointmentIDs = (dayObj && dayObj.appointments) || [];
  const dayAppointments = dayAppointmentIDs.map(id => state.appointments[id]);
  return dayAppointments;
}