// Ignorar errores de reproducción de medios en Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('The play() request was interrupted')) {
    return false;
  }
  return true;
});

describe('F01-Acceder al blog con contraseña', () => {
  beforeEach(() => {
    cy.login();
  });

  it('F01-E3-Escenario Negativo - Acceder al sitio con contraseña incorrecta', function () {
    cy.visit('/');
    cy.visit('http://localhost:2368/private/?r=%2F');
    cy.get('input[type="password"]').click();
    cy.get('input')
      .type('TEST.123{enter}')
    cy.url().should('include', '/private');
    cy.screenshot('F01-Acceder al sitio con contraseña-E3')
  })
});