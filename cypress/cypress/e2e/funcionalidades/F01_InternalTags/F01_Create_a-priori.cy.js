const { Tags } = require('../../../pages/tags');
const { Login } = require('../../../pages/login');

describe('F01-Crear tags internos', () => {

  const tags = new Tags();
  const login = new Login();
  let tagData = [];

  beforeEach(() => {
    login.login();

    cy.fixture('tags').then((data) => {
      tagData = data;
    });
    cy.wait(2000)
  });

  it('F01_E1-Crear tag interno con datos completos', function () {
    var count = 0;
    tagData.forEach((data) => {
      count++;
      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      cy.screenshot('a-priori/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '. Paso 1')

      tags.clickCreateNewTag();
      tags.typeName(data.name);
      tags.typeSlug(data.slug);
      tags.typeDescription(data.description);
      cy.screenshot('a-priori/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('a-priori/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '.  Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01_E2-Crear tag interno con datos completos y descripción larga', function () {
    var count = 0;
    tagData.forEach((data) => {
      count++;
      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      cy.screenshot('a-priori/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Paso 1')

      tags.clickCreateNewTag();
      tags.typeName(data.name);
      tags.typeSlug(data.slug);
      tags.typeDescription(data.longDescription);
      cy.screenshot('a-priori/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('a-priori/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01_E3-Crear tag interno con datos incompletos', function () {
    var count = 0;
    tagData.forEach((data) => {
      count++;
      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      cy.screenshot('a-priori/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 1')

      tags.clickCreateNewTag();
      tags.typeSlug(data.slug);
      tags.typeDescription(data.description);
      cy.screenshot('a-priori/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('a-priori/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01_E4-Consultar tag creado', function () {
    tags.clickTagsLink();
    cy.screenshot('a-priori/F01/E4-Consultar tag creado. Paso 1')

    tags.clickInternalTagsLink();
    cy.screenshot('a-priori/F01/E4-Consultar tag creado. Paso 2')

    tags.verifyInternalTagsCreated('Create a new tag');
    cy.screenshot('a-priori/F01/E4-Consultar tag creado. Resultado')
  })
});