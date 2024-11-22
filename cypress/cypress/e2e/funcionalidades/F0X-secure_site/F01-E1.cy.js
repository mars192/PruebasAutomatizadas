// Ignorar errores de reproducción de medios en Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('The play() request was interrupted')) {
    return false;
  }
  return true;
});

describe('F01-Acceder al blog con contraseña', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('F01-E1-Escenario positivo - Configurar contraseña', function () {

    cy.visit('/');
    cy.get('a[href="#/settings/"]').click();
    cy.get('a[id="locksite"]').click();
    cy.get('div[data-testid="locksite"]')
      .find('button')
      .click()
    cy.get('button[data-state="unchecked"]').click();
    cy.get('div[data-testid="locksite"]')
      .find('input')
      .clear()
      .type("Prueba.123")
    cy.screenshot('F01-Acceder al sitio con contraseña-E1.1')
    cy.get('div[data-testid="locksite"]')
      .find('span')
      .contains('Save')
      .click()
    cy.get('div[data-testid="locksite"]')
      .should('contain.text', 'Your site is password protected');
    cy.screenshot('F01-Acceder al sitio con contraseña-E1.2')
  })
});