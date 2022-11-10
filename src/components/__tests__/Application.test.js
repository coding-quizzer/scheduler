import React from "react";

import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByPlaceholderText, queryByText, getByAltText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => { 
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {target: {value: "Lydia Miller-Jones"}})
    fireEvent.click(getAllByTestId(appointment, 'interviewer-item')[0]);
    fireEvent.click(getByText(appointment, 'Save'));
    
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const monday = getAllByTestId(container, 'day').find(day => getByText(day, "Monday"));
    
    expect(getByText(monday, "no spots remaining"))
  });

  it("loads data, cancels an interview and increases the spots for Monday by 1", async () => {    
    const { container} = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment').find(appoint => queryByText(appoint, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, 'Delete'));
    
    expect(getByText(appointment, "Are you sure you want to delete?"))
    fireEvent.click(getByText(appointment, 'Cancel'));
        
    fireEvent.click(getByAltText(appointment, 'Delete'));
    
    expect(getByText(appointment, "Are you sure you want to delete?"))
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting'));
    
    await waitForElement(() => getByAltText(appointment, 'Add'));

    const monday = getAllByTestId(container, 'day').find(day => getByText(day, "Monday"));
    expect(getByText(monday, "2 spots remaining"));
  });

  it("loads data, edits an interview and keeps the spots remaining for monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment').find(appoint => queryByText(appoint, "Archie Cohen"));
    
    fireEvent.click(getByAltText(appointment, 'Edit'));

    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), { target: { value: "Willy Wonka" } });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, 'Save'));
    
    expect(getByText(appointment, 'Saving'));

    await waitForElement(() => getByText(appointment, "Willy Wonka"));

    const monday = getAllByTestId(container, 'day').find(day => getByText(day, "Monday"));
    expect(getByText(monday, "1 spot remaining"));
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, 'Add'));
    
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), { target: { value: "Reddy Fox"} });
    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'));

    fireEvent.click(getByText(appointment, 'Save'));

    await waitForElement(() => getByText(appointment, 'Error'));
    expect(getByText(appointment,  "Could not save appointment"));
    fireEvent.click(getByAltText(appointment, 'Close'));
    expect(() => getByAltText('Add'));

  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment').find(appoint => queryByText(appoint, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, 'Delete'));
    fireEvent.click(getByText(appointment, 'Confirm'));

    await waitForElement(() => getByText(appointment, 'Error'));
    fireEvent.click(getByAltText(appointment, 'Close'));
    expect(() => getByText(appointment, 'Edit'))
  });
});

