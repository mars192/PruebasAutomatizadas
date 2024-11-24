const { Tags } = require('../../../pages/tags');
const { Login } = require('../../../pages/login');

describe('F01-Crear tags internos', () => {
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

  it('F01_E1-Crear tag interno con datos completos', () => {
    var count = 0;
    tagData.forEach((data) => {
      count++;
      const randomIndex = random(tagsCategories.length - 1);
      const category = tagsCategories[randomIndex];

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      cy.screenshot('pseudo/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '. Paso 1')

      tags.clickCreateNewTag();
      tags.typeName(`${randomIndex} - ${category.category} - ${data.name}`);
      tags.typeSlug(`${data.slug} - ${category.category}`);
      tags.typeDescription(data.description);
      cy.screenshot('pseudo/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('pseudo/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    });
  });

  it('F01_E2-Crear tag interno con datos completos y descripción larga', () => {
    var count = 0;
    tagData.forEach((data) => {
      count++;
      const randomIndex = random(tagsCategories.length - 1);
      const category = tagsCategories[randomIndex];

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      cy.screenshot('pseudo/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Paso 1')

      tags.clickCreateNewTag();
      tags.typeName(`${randomIndex} - ${category.category} - ${data.name}`);
      tags.typeSlug(`${data.slug} - ${category.category}`);
      tags.typeDescription(data.longDescription);
      cy.screenshot('pseudo/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('pseudo/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    });
  });

  it('F01_E3-Crear tag interno con datos incompletos', () => {
    var count = 0;
    tagData.forEach((data) => {
      count++;
      const randomIndex = random(tagsCategories.length - 1);
      const category = tagsCategories[randomIndex];

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      cy.screenshot('pseudo/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 1')

      tags.clickCreateNewTag();
      tags.typeSlug(`${data.slug} - ${category.category}`);
      tags.typeDescription(data.description);
      cy.screenshot('pseudo/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('pseudo/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    });
  });

  it('F01_E4-Consultar tag creado', () => {
    tags.clickTagsLink();
    cy.screenshot('pseudo/F01/E4-Consultar tag creado. Paso 1')

    tags.clickInternalTagsLink();
    cy.screenshot('pseudo/F01/E4-Consultar tag creado. Paso 2')

    tags.verifyInternalTagsCreated('Create a new tag');
    cy.screenshot('pseudo/F01/E4-Consultar tag creado. Resultado')
  });
});

function random(max) {
  return Math.floor(Math.random() * (max + 1));
}
