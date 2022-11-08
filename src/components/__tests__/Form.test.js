import React from "react";

import { render, cleanup, getByPlaceholderText, getByText } from "@testing-library/react";

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
});