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
        cy.writeFile('cypress/fixtures/tagsDescruptionMockaroo.json', response.body);
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
  });

  it('F01-E1-Crear tag interno con datos completos', () => {
    tagData.forEach((data) => {
      const randomIndex = random(tagsCategories.length - 1);
      const category = tagsCategories[randomIndex];

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeName(`${randomIndex} - ${category.category} - ${data.name}`);
      tags.typeSlug(`${data.slug} - ${category.category}`);
      tags.typeDescription(data.description);
      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('F01-E1-Crear tags internos');
      cy.visit('/')
      cy.wait(1000);
    });
  });

  it('F01-E2-Crear tag interno con descripción larga', () => {
    tagData.forEach((data) => {
      const randomIndex = random(tagsCategories.length - 1);
      const category = tagsCategories[randomIndex];

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeName(`${randomIndex} - ${category.category} - ${data.name}`);
      tags.typeSlug(`${data.slug} - ${category.category}`);
      tags.typeDescription(data.longDescription);
      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('F01-E2-Crear tags internos');
      cy.visit('/')
      cy.wait(1000);
    });
  });

  it('F01-E3-Crear tag interno con datos incompletos', () => {
    tagData.forEach((data) => {
      const randomIndex = random(tagsCategories.length - 1);
      const category = tagsCategories[randomIndex];

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeSlug(`${data.slug} - ${category.category}`);
      tags.typeDescription(data.description);
      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('F01-E3-Crear tags internos');
      cy.visit('/')
      cy.wait(1000);
    });
  });

  it('F01-E4-Consultar tag creado', () => {
    tags.clickTagsLink();
    tags.clickInternalTagsLink();
    tags.verifyInternalTagsCreated('Create a new tag');
    cy.screenshot('F01-E4-Crear tags internos');
  });
});

function random(max) {
  return Math.floor(Math.random() * (max + 1));
}
