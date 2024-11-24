const { SignUp } = require('../../../pages/signUp');
const { Login } = require('../../../pages/login');

import { faker } from '@faker-js/faker';

describe('F02-Sign up', () => {

  const signUp = new SignUp();
  const login = new Login();
  const numCasos = 5;

  beforeEach(() => {
    login.login();
    cy.wait(2000)
  })

  it('F02_E1-Suscribirse al sitio con correo incorrecto', function () {
    var count = 0;
    for (let i = 0; i < numCasos; i++) {
      count++;
      signUp.clicOnViewSite();
      cy.screenshot('aleatorio/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 1')

      cy.wait(1000)
      signUp.typeEmail(faker.person.fullName());
      cy.screenshot('aleatorio/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 2')

      signUp.clicOnSuscribe();
      cy.screenshot('aleatorio/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 3')

      signUp.verifyError();
      cy.screenshot('aleatorio/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F02_E2-Suscribirse al sitio con correo correcto', function () {
    var count = 0;
    for (let i = 0; i < numCasos; i++) {
      count++;
      signUp.clicOnViewSite();
      cy.screenshot('aleatorio/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 1')

      cy.wait(1000)
      signUp.typeEmail(faker.internet.email());
      cy.screenshot('aleatorio/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 2')

      signUp.clicOnSuscribe();
      cy.screenshot('aleatorio/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 3')

      signUp.verifyError();
      cy.screenshot('aleatorio/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    }
  })
});