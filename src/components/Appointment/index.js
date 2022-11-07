import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";
import './styles.scss'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const Appointment = (props) => {

  
  const { time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition('SAVING');
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
          onEdit={() => transition("EDIT")}
          onDelete={() => transition("CONFIRM")}
        />
        )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={save}/>}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={cancel} onCancel={() => back()} />}
      {mode === EDIT && <Form student={interview.student} interviewers={interviewers} interviewer={interview.interviewer.id} onCancel={() => back()} />}
    </article>
  )
}

export default Appointment;