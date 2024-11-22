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

  it('F01-E5-Modificar tag con datos completos', function () {
    tagData.forEach((data) => {
      tags.clickTagsLink();
      tags.clickOnTagCreated();
      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      tags.typeName(data.name);
      tags.typeSlug(data.slug);
      tags.typeDescription(data.description);
      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('F01-E5-Modificar tag')
      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01-E6-Modificar tag con datos completos y descripción de larga', function () {
    tagData.forEach((data) => {
      tags.clickTagsLink();
      tags.clickOnTagCreated();
      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      tags.typeName(data.name);
      tags.typeSlug(data.slug);
      tags.typeDescription(data.longDescription);
      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('F01-E6-Modificar tag')
      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01-E7-Crear tag interno con datos incompletos', function () {
    tagData.forEach((data) => {
      tags.clickTagsLink();
      tags.clickOnTagCreated();
      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      tags.typeSlug(data.slug);
      tags.typeDescription(data.description);
      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('F01-E7-Crear tags internos')
      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01-E8-Consultar tag modificado', function () {
    tags.clickTagsLink();
    tags.clickOnTagCreated();
    tags.clickOnViewTag();
    tags.verifyModifiedTag('Page not found');
    cy.screenshot('F01-E8-Consutar tag modificado')
  })
});