import React from "react";
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

const InterviewerList = (props) => {
  const { interviewers, setInterviewer, interviewer } = props;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((currentInterviewer) => {
          const{ id, name, avatar } = currentInterviewer;
          return (
            <InterviewerListItem
              key={id}
              id={id}
              name={name}
              avatar={avatar}
              selected={interviewer===id}
              setInterviewer={() => setInterviewer(id)}
            />
          )
          })}
      </ul>
    </section>
  )

}

export default InterviewerList;