beforeEach(() => {
  // reset database
  cy.request('GET', '/api/debug/reset');

  cy.visit('/')
    .contains('Monday');
})
describe('Appointments', () => {
  it('should book an interview', () => {

    cy.get("[alt=Add]")
      .first()
      .click();

      
    cy.get("[placeholder='Enter Student Name']").type('Lydia Miller-Jones');
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones', 'Sylvia Palmer')

  });

  it('should edit an interview', () => {

    cy.contains('.appointment__card--show', 'Archie Cohen')
    .get("[alt='Edit']")
    .click({ force: true });

    cy.get("[value='Archie Cohen']").clear().type('Lydia Miller-Jones');
    cy.get("[alt='Tori Malcolm'").click();

    cy.contains('Save')
      .click();

    cy.contains('.appointment__card--show', 'Tori Malcolm', 'Lydia Miller-Jones')
  });

  it('should cancel an interview', () => {

    cy.contains('.appointment__card--show', 'Archie Cohen')
      .get("[alt='Delete")
      .click({ force: true});
    
    cy.contains('Confirm').click();
    
    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');

  })
});