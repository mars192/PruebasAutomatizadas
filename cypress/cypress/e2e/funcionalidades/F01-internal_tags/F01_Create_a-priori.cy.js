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
  });

  it('F01-E1-Crear tag interno con datos completos', function () {
    tagData.forEach((data) => {
      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeName(data.name);
      tags.typeSlug(data.slug);
      tags.typeDescription(data.description);
      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('F01-E1-Crear tags internos')
      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01-E2-Crear tag interno con datos completos y descripción de larga', function () {
    tagData.forEach((data) => {
      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeName(data.name);
      tags.typeSlug(data.slug);
      tags.typeDescription(data.longDescription);
      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('F01-E2-Crear tags internos')
      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01-E3-Crear tag interno con datos incompletos', function () {
    tagData.forEach((data) => {
      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeSlug(data.slug);
      tags.typeDescription(data.description);
      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('F01-E3-Crear tags internos')
      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01-E4-Consultar tag creado', function () {
    tags.clickTagsLink();
    tags.clickInternalTagsLink();
    tags.verifyInternalTagsCreated('Create a new tag');
    cy.screenshot('F01-E4-Crear tags internos')
  })
});