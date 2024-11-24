const { Tags } = require('../../../pages/tags');
const { Login } = require('../../../pages/login');

describe('F01-Modificar tags internos', () => {
  const tags = new Tags();
  const login = new Login();

  let tagData = [];
  let tagsCategories = [];

  before(() => {
    cy.request('https://my.api.mockaroo.com/tags_schema.json?key=83de8ac0')
      .then((response) => {
        cy.writeFile('cypress/fixtures/tagsMockaroo.json', response.body);
      });

    cy.request('https://my.api.mockaroo.com/tags_categories_schema.json?key=83de8ac0')
      .then((response) => {
        cy.writeFile('cypress/fixtures/tagsDescriptionMockaroo.json', response.body);
      });
  });

  beforeEach(() => {
    login.login();

    cy.fixture('tagsMockaroo').then((data) => {
      tagData = data;
    });

    cy.fixture('tagsDescruptionMockaroo').then((dataCategory) => {
      tagsCategories = dataCategory;
    });
    cy.wait(2000)
  });

  it('F01_E5-Modificar tag con datos completos', function () {
    var count = 0;
    tagData.forEach((data) => {
      count++
      tags.clickTagsLink();
      tags.clickOnTagCreated();
      cy.screenshot('pseudo/F01/E5-Modificar tag con datos completos. Ejecución: ' + count + '. Paso 1')

      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      cy.screenshot('pseudo/F01/E5-Modificar tag con datos completos. Ejecución: ' + count + '. Paso 2')

      tags.typeName(Math.floor(Math.random() * tagsCategories.length) + " - " + tagsCategories[random(tagsCategories.length - 1)].category + " - " + data.name);
      tags.typeSlug(data.slug + " - " + tagsCategories[random(tagsCategories.length - 1)].category);
      tags.typeDescription(data.description);
      cy.screenshot('pseudo/F01/E5-Modificar tag con datos completos. Ejecución: ' + count + '. Paso 3')

      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('pseudo/F01/E5-Modificar tag con datos completos. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01_E6-Modificar tag con datos completos y descripción de larga', function () {
    var count = 0;
    tagData.forEach((data) => {
      count++
      tags.clickTagsLink();
      tags.clickOnTagCreated();
      cy.screenshot('pseudo/F01/E6-Modificar tag con datos completos y descripción larga. Ejecución: ' + count + '. Paso 1')

      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      cy.screenshot('pseudo/F01/E6-Modificar tag con datos completos y descripción larga. Ejecución: ' + count + '. Paso 2')

      tags.typeName(Math.floor(Math.random() * tagsCategories.length) + " - " + tagsCategories[random(tagsCategories.length - 1)].category + " - " + data.name);
      tags.typeSlug(data.slug + " - " + tagsCategories[random(tagsCategories.length - 1)].category);
      tags.typeDescription(data.longDescription);
      cy.screenshot('pseudo/F01/E6-Modificar tag con datos completos y descripción larga. Ejecución: ' + count + '. Paso 3')

      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('pseudo/F01/E6-Modificar tag con datos completos y descripción larga. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01_E7-Crear tag interno con datos incompletos', function () {
    var count = 0;
    tagData.forEach((data) => {
      count++
      tags.clickTagsLink();
      tags.clickOnTagCreated();
      cy.screenshot('pseudo/F01/E7-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 1')

      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      cy.screenshot('pseudo/F01/E7-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 2')

      tags.typeSlug(data.slug + " - " + tagsCategories[random(tagsCategories.length - 1)].category);
      tags.typeDescription(data.description);
      cy.screenshot('pseudo/F01/E7-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 3')

      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('pseudo/F01/E7-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    })
  });

  it('F01_E8-Consultar tag modificado', function () {
    tags.clickTagsLink();
    cy.screenshot('pseudo/F01/E8-Consultar tag modificado. Paso 1')

    tags.clickOnTagCreated();
    cy.screenshot('pseudo/F01/E8-Consultar tag modificado. Paso 2')

    tags.clickOnViewTag();
    tags.verifyModifiedTag('Page not found');
    cy.screenshot('pseudo/F01/E8-Consultar tag modificado. Resultado')
  })
});

function random(max) {
  return Math.floor(Math.random() * (max + 1));
}