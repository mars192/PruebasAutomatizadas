const { Views } = require('../../../pages/views');
const { Login } = require('../../../pages/login');

describe('F03-Crear vista', () => {

  const views = new Views();
  const login = new Login();
  let viewData = [];
  let viewTypeData = [];

  before(() => {
    cy.request('https://my.api.mockaroo.com/views.json?key=83de8ac0')
      .then((response) => {
        cy.writeFile('cypress/fixtures/viewsMockaroo.json', response.body);
      });
  });

  beforeEach(() => {
    login.login();

    cy.fixture('viewTypes').then((data) => {
      viewTypeData = data;
    });

    cy.fixture('viewsMockaroo').then((data) => {
      viewData = data;
    });
    cy.wait(2000)
  });

  afterEach(() => {
    var count = 0;
    viewTypeData.forEach(() => {
      cy.wait(2000);
      views.resetViews(viewTypeData[count].url)
      views.clickOnModifyView()
      views.clicOnDeleteView()
      count++;
      cy.visit('/')
      cy.wait(2000);
    })
  });

  it('F03-E1-Crear vista', function () {
    var count = 0;
    viewData.forEach((data) => {
      count++;
      views.visitView(viewTypeData[count - 1].url);
      views.clickOnCreateView();
      cy.screenshot('pseudo/F03/E1-Crear vista. Ejecución: ' + count + '. Paso 1')

      views.typeName(data.name)
      cy.screenshot('pseudo/F03/E1-Crear vista. Ejecución: ' + count + '. Paso 2')

      views.saveView()
      views.confirmViewCreated(data.name)
      cy.screenshot('pseudo/F03/E1-Crear vista. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F03-E2-Crear vista  con nombre largo', function () {
    var count = 0;
    viewData.forEach((data) => {
      count++;
      views.visitView(viewTypeData[count - 1].url);
      views.clickOnCreateView();
      cy.screenshot('pseudo/F03/E2-Crear vista con nombre largo. Ejecución: ' + count + '. Paso 1')

      views.typeName(data.longName)
      cy.screenshot('pseudo/F03/E2-Crear vista con nombre largo. Ejecución: ' + count + '. Paso 2')

      views.saveView()
      cy.wait(1000)
      cy.screenshot('pseudo/F03/E2-Crear vista con nombre largo. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  })
});