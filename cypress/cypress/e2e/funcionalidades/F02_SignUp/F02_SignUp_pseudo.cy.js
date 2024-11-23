const { SignUp } = require('../../../pages/signUp');
const { Login } = require('../../../pages/login');

describe('F02-Sign up', () => {

  const signUp = new SignUp();
  const login = new Login();
  let signUpData = [];

  before(() => {
    cy.request('https://my.api.mockaroo.com/sign_up.json?key=83de8ac0')
      .then((response) => {
        cy.writeFile('cypress/fixtures/signUpMockaroo.json', response.body);
      });
  });

  beforeEach(() => {
    login.login();

    cy.fixture('signUpMockaroo').then((data) => {
      signUpData = data;
    });
    cy.wait(2000)
  });

  it('F02-E1-Suscribirse al sitio con correo incorrecto', function () {
    var count = 0;
    signUpData.forEach((data) => {
      count++;
      signUp.clicOnViewSite();
      cy.screenshot('pseudo/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 1')

      cy.wait(1000)
      signUp.typeEmail(data.incorrectEmail);
      cy.screenshot('pseudo/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 2')

      signUp.clicOnSuscribe();
      cy.screenshot('pseudo/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Paso 3')

      signUp.verifyError();
      cy.screenshot('pseudo/F02/E1-Suscribirse al sitio con correo incorrecto. Ejecucón: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F02_E2-Suscribirse al sitio con correo correcto', function () {
    var count = 0;
    signUpData.forEach((data) => {
      count++;
      signUp.clicOnViewSite();
      cy.screenshot('pseudo/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 1')

      cy.wait(1000)
      signUp.typeEmail(data.email);
      cy.screenshot('pseudo/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 2')

      signUp.clicOnSuscribe();
      cy.screenshot('pseudo/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Paso 3')

      signUp.verifyError();
      cy.screenshot('pseudo/F02/E2-Suscribirse al sitio con correo correcto. Ejecucón: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });
});