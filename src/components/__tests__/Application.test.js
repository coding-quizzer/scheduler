import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByRole, getByPlaceholderText } from "@testing-library/react";

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
    console.log(prettyDOM(appointment));
  });
});

