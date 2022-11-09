beforeEach(() => {
  // reset database
  cy.request('GET', '/api/debug/reset');

  // 1. Visits the root of our web server
  cy.visit('/')
    .contains('Monday');
})
describe('Appointments', () => {
  it('should book an interview', () => {

    // 2. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();

      
    // 3. Enters the name
    cy.get("[placeholder='Enter Student Name']")
    .type('Lydia Miller-Jones');

    // 4. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
    .click();

    // 5. Clicks the save button
    cy.contains("Save").click();

    // 6. Sees the booked appointment
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones', 'Sylvia Palmer')

  });

  it('should edit an interview', () => {
    // 1. Visits the root of our web server

    // 2. Clicks the edit button for the existing appointment

    // 3. Changes the name and interviewer

    // 4. Clicks the save button

    // 5. Sees the edit to the appointment
  });

  it('should cancel an interview', () => {
    // 1. Visits the root of our web server

    // 2. Clicks the delete button for the existing appointment

    // 3. Clicks the appointment button

    // 4. Sees that the appointment slot is empty
  })
});