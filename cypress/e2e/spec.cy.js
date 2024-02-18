describe('Primer test', () => {
  it('Hestia es accessible', () => {
    cy.visit('https://daw.inspedralbes.cat')
    cy.contains('8083').click()
    cy.url().should('include', '8083/login')
    cy.get('input[name="user"]').type('admin')
    cy.get('button[type="submit"]').click()
    cy.get('button:contains("Inici de sessió")')
      .should('exist')
      .should('be.visible');
  });
})



