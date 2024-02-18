describe('Labs bàsic', () => {
  it('Portada', () => {
    cy.visit('https://daw.inspedralbes.cat')
    cy.get('div:contains("Ports oberts")')
      .should('exist')
      .should('be.visible');
  });
})



