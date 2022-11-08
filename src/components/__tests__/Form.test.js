import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders when no student name or interviewer are provided as props", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name, if provided", () => {
    const student = "Lydia Miller-Jones";
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} student={student}/>);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue(student);
  });

  it("validates that the student name is not blank", () => {
    /* 1. Creaate the mock onSave function */

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop. the student prop should be blank or undefined */

    /* 3. Click the save button */

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock onSave function */

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop whould be null */

    /* 3. Click the save button */

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

  });

  it("calls onSave function when the name and interviewer is defined", () => {
    /* 1. Create the mock onSave function */

    /* 2. Render the form with interviewers, name and the onSave mock function passed as an onSave prop */

    /* 3. Click the save button */

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/pleasae select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

});