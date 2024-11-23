const { Views } = require('../../../pages/views');
const { Login } = require('../../../pages/login');

describe('F03-Crear vista', () => {

  const views = new Views();
  const login = new Login();
  let viewData = [];
  let viewTypeData = [];

  beforeEach(() => {
    login.login();

    cy.fixture('viewTypes').then((data) => {
      viewTypeData = data;
    });

    cy.fixture('views').then((data) => {
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
      cy.screenshot('a-priori/F03/E1-Crear vista. Ejecución: ' + count + '. Paso 1')

      views.typeName(data.name)
      cy.screenshot('a-priori/F03/E1-Crear vista. Ejecución: ' + count + '. Paso 2')

      views.saveView()
      views.confirmViewCreated(data.name)
      cy.screenshot('a-priori/F03/E1-Crear vista. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F03-E2-Crear vista interno con nombre largo', function () {
    var count = 0;
    viewData.forEach((data) => {
      count++;
      views.visitView(viewTypeData[count - 1].url);
      views.clickOnCreateView();
      cy.screenshot('a-priori/F03/E2-Crear vista interno con nombre largo. Ejecución: ' + count + '. Paso 1')

      views.typeName(data.longName)
      cy.screenshot('a-priori/F03/E2-Crear vista interno con nombre largo. Ejecución: ' + count + '. Paso 2')

      views.saveView()
      views.confirmViewCreated(data.longName)
      cy.screenshot('a-priori/F03/E2-Crear vista interno con nombre largo. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  })
});