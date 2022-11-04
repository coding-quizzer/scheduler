export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(element => element.name === day)

  // If dayObj exists return dayObj.appointmentws, else return an empty arrayw
  const dayAppointmentIDs = (dayObj && dayObj.appointments) || [];
  const dayAppointments = dayAppointmentIDs.map(id => state.appointments[id]);
  return dayAppointments;
}

const state = {
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null},
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2}
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar":  "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      "id": 2,
      "name": "Tori Malcolm",
      "avatar": "https://i.imgur.com/Nmx0Qxo.png" 
    }
  },

};

export function getInterview(state, interview) {
 
  if(!interview) return null;

  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID];
  
  return {...interview, interviewer};
};