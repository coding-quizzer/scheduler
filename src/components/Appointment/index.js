import React, { useState } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import './styles.scss'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


const Appointment = (props) => {
  
  
  const { time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  // useState for student and interviewer are set in the Appointment component
  // so that they can persist after an error occurs
  const [interviewer, setInterviewer] = useState(interview?.interviewer.id || null);
  const [student, setStudent] = useState(interview?.student || "");
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition('SAVING');
    props.bookInterview(props.id, interview)
    .then(() => {
      transition('SHOW')
    })
    .catch(() => {transition('ERROR_SAVE', true)});
  };

  const cancel = () => {
    transition('DELETING', true)
    props.cancelInterview(props.id)
    .then(() => {
      setStudent("")
      setInterviewer(null)
      transition('EMPTY')
    })
    .catch(() => transition('ERROR_DELETE', true));
  };
  
    return (
      <article className="appointment" data-testid="appointment">
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
      {mode === CREATE && <Form interviewers={interviewers} onCancel={back} onSave={save} interviewer={interviewer} setInterviewer={setInterviewer} student={student} setStudent={setStudent} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={cancel} onCancel={back} />}
      {mode === EDIT && <Form interviewers={interviewers} onCancel={back} onSave={save} interviewer={interviewer || interview?.interviewer.id} setInterviewer={setInterviewer} student={student || interview?.student} setStudent={setStudent} />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={back}/>}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment"} onClose={back} />}
    </article>
  );
};

export default Appointment;