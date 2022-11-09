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
    const { getByTestId } = render(<Form interviewers={interviewers} student={student}/>);
    expect(getByTestId("student-name-input")).toHaveValue(student);
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(<Form interviewers={interviewers} interviewer={1} onSave={onSave} student={''} />);
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
    const { getByText } = render(<Form interviewers={interviewers} interviewer={null} onSave={onSave} student={'Lydia Miller-Jones'}/>);
    fireEvent.click(getByText("Save"));

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

  });

  it("calls onSave function when the name and interviewer is defined", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
    <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
    
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    
    fireEvent.change(getByPlaceholderText("Enter Student Name"), { 
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});