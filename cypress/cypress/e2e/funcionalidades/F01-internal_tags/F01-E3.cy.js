// Ignorar errores de reproducción de medios en Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('The play() request was interrupted')) {
    return false;
  }
  return true;
});

describe('F02-Crear tags internos', () => {
  beforeEach(() => {
    cy.login();
  });

  it('F01-E3-Escenario negativo - Consultar tags internos creados', function () {
    cy.visit('/');
    cy.get('a[href="#/tags/"]').click();
    cy.get('button[data-test-tags-nav="internal"]').click()
    cy.get('a[class="ember-view gh-btn gh-btn-green"]')
      .should('not.contain.text', 'Create a new tag');
    cy.screenshot('F02-Crear tags internos-E3')
  });
});