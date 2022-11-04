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
  
  let renderedComponent;
  
  if (mode === SHOW) {
    renderedComponent = (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
      />);
  }

  if (mode === EMPTY) {
    renderedComponent = <Empty />;
  }
    return (
      <article className="appointment">
      <Header time={time} />
      {renderedComponent}
    </article>
  )
}

export default Appointment;