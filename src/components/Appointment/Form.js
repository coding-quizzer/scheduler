import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



const Form = (props) => {
  const {interviewers,  onSave, onCancel} = props
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setInterviewer(null);
    setStudent ("");
  }
  const cancel = () => {
    reset();
    onCancel();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(student, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid='student-name-input'
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form