const { SignUp } = require('../../../pages/signUp');
const { Login } = require('../../../pages/login');

describe('F02-Sign up', () => {

  const signUp = new SignUp();
  const login = new Login();
  let signUpData = [];

  beforeEach(() => {
    login.login();

    cy.fixture('signUp').then((data) => {
      signUpData = data;
    });
    cy.wait(2000)
  });

  it('F02_E1-Suscribirse al sitio con correo incorrecto', function () {
    var count = 0;
    signUpData.forEach((data) => {
      count++;
      signUp.clicOnViewSite();
      cy.screenshot('a-priori/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 1')

      cy.wait(1000)
      signUp.typeEmail(data.incorrectEmail);
      cy.screenshot('a-priori/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 2')

      signUp.clicOnSuscribe();
      cy.screenshot('a-priori/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 3')

      signUp.verifyError();
      cy.screenshot('a-priori/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F02_E2-Suscribirse al sitio con correo correcto', function () {
    var count = 0;
    signUpData.forEach((data) => {
      count++;
      signUp.clicOnViewSite();
      cy.screenshot('a-priori/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 1')

      cy.wait(1000)
      signUp.typeEmail(data.email);
      cy.screenshot('a-priori/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 2')

      signUp.clicOnSuscribe();
      cy.screenshot('a-priori/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 3')

      signUp.verifyError();
      cy.screenshot('a-priori/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });
});