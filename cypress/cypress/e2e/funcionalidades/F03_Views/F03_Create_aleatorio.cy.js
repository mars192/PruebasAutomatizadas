const { Views } = require('../../../pages/views');
const { Login } = require('../../../pages/login');

import { faker } from '@faker-js/faker';

describe('F03-Crear vista', () => {

  const views = new Views();
  const login = new Login();
  let viewTypeData = [];

  beforeEach(() => {
    login.login();

    cy.fixture('viewTypes').then((data) => {
      viewTypeData = data;
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
    viewTypeData.forEach(() => {
      count++;
      const name = faker.book.publisher()
      views.visitView(viewTypeData[count - 1].url);
      views.clickOnCreateView();
      cy.screenshot('aleatorio/F03/E1-Crear vista. Ejecución: ' + count + '. Paso 1')

      views.typeName(name)
      cy.screenshot('aleatorio/F03/E1-Crear vista. Ejecución: ' + count + '. Paso 2')

      views.saveView()
      views.confirmViewCreated(name)
      cy.screenshot('aleatorio/F03/E1-Crear vista. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F03-E2-Crear vista con nombre largo', function () {
    var count = 0;
    viewTypeData.forEach(() => {
      count++;
      const longName = faker.lorem.paragraph(1);
      views.visitView(viewTypeData[count - 1].url);
      views.clickOnCreateView();
      cy.screenshot('aleatorio/F03/E2-Crear vista con nombre largo. Ejecución: ' + count + '. Paso 1')

      views.typeName(longName)
      cy.screenshot('aleatorio/F03/E2-Crear vista con nombre largo. Ejecución: ' + count + '. Paso 2')

      views.saveView()
      views.confirmViewCreated(longName)
      cy.screenshot('aleatorio/F03/E2-Crear vista  con nombre largo. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  })
});