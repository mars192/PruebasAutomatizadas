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

  it('F01-E2-Escenario negativo - Crear tag interno con datos incompletos', function () {
    cy.visit('/');
    cy.get('a[href="#/tags/"]').click();
    cy.get('button[data-test-tags-nav="internal"]').click()
    cy.get('a[class="ember-view gh-btn gh-btn-green"]').click();
    cy.get('input[id=tag-name]').type("Prueba")
    cy.get('input[id=tag-slug]').type("Slug prueba")
    cy.get('textarea[id=tag-description]').type("Descripción prueba")
    cy.get('button[data-test-button="save"]').click();
    cy.get('button[data-test-button="save"]')
      .should('contain.text', 'Saved');
    cy.screenshot('F02-Crear tags internos-E2')
  })
});