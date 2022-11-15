import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



const Form = (props) => {
  const {interviewers,  onSave, onCancel} = props
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = () => {
    setInterviewer(null);
    setStudent ("");
  }
  const cancel = () => {
    setError("");
    reset();
    onCancel();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(student, interviewer);
  }

  const handleClick = () => validate(student, interviewer);

  const validate = (name, interviewer) => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");

    props.onSave(name, interviewer);
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
          <section className="appointment__validation">{error}</section>
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
          <Button confirm onClick={handleClick}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form