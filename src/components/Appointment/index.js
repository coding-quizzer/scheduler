import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";
import './styles.scss'
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const Appointment = (props) => {

  
  const { time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition('SHOW'));
  };

  const cancel = () => {
    transition('DELETING')
    props.cancelInterview(props.id)
    .then(() => transition('EMPTY'))
  }
  
    return (
      <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
        />
        )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={save}/>}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
    </article>
  )
}

export default Appointment;