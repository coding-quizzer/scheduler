import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByRole, getByPlaceholderText, queryByText, getByAltText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => { 
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByRole(appointment, 'img', { alt:/Add/i}));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {target: {value: 'Lydia Miller-Jones'}})
    fireEvent.click(getAllByTestId(appointment, 'interviewer-item')[0]);
    fireEvent.click(getByText(appointment, /Save/i));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
    
    const monday = getAllByTestId(container, 'day').find(day => getByText(day, 'Monday'));
    
    expect(getByText(monday, /No spots remaining/i))
  });

  it("loads data, cancels an interview and increases the spots for Monday by 1", async () => {
    // 1. Render the Application
    const { container} = render(<Application />);

    // 2. Wait until the text "Archie Cohen is displayed."

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment').find(appoint => queryByText(appoint, 'Archie Cohen'));

    
    
    // 3. Click the "delete" button on the first non-empty appointment
    fireEvent.click(getByAltText(appointment, /delete/i));
    
    // 4. Click the "cancel" button on the confirm menu
    expect(getByText(appointment, /Are you sure you want to delete?/i))
    fireEvent.click(getByText(appointment, /Cancel/i));
    
    // 5. Click the "delete" button again
    
    fireEvent.click(getByAltText(appointment, /delete/i));
    // 6. Click the "confirm" button
    expect(getByText(appointment, /Are you sure you want to delete?/i))
    fireEvent.click(getByText(appointment, /Confirm/i));
    expect(getByText(appointment, "Deleting"));
    
    // 7. Wait until the image with the alt text 'Empty' is displayed
    await waitForElement(() => getByAltText(appointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
    const monday = getAllByTestId(container, 'day').find(day => getByText(day, "Monday"));
    expect(getByText(monday, "2 spots remaining"));
  })

  it("loads data, edits an interview and keeps the spots remaining for monday the same", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment').find(appoint => queryByText(appoint, 'Archie Cohen'));
    
    // 3. Click the edit button on the booked appointment
    fireEvent.click(getByAltText(appointment, 'Edit'));

    // 4. Enter Willy Wonka as the student name and use Sylvia Palmer as the interviewer
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), { target: { value: 'Willy Wonka' } });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    
    // 5. Click the Save button
    fireEvent.click(getByText(appointment, 'Save'));
    
    // 6. Check that Saving is displayed on the screen
    expect(getByText(appointment, 'Saving'));

    // 7. Wait until "Willy Wonka" text is in the appointment
    await waitForElement(() => getByText(appointment, "Willy Wonka"));

    // 8. Check that the DayListItem Monday has the text "1 day remaining"
    const monday = getAllByTestId(container, 'day').find(day => getByText(day, 'Monday'));
    expect(getByText(monday, '1 spot remaining'));

    debug();

  })

  it("shows the save error when failing to save an appointment", () => {})

  it("shows the delete error when failing to delete an appointment", () => {})
});

