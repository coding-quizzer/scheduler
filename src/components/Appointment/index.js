import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import useVisualMode from "hooks/useVisualMode";
import './styles.scss'

const EMPTY = "EMPTY";
const SHOW = "SHOW"
const Appointment = (props) => {
  const { id, time, interview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  
    return (
      <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  )
}

export default Appointment;