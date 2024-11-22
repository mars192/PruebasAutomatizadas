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

  it('F01-E5-Modificar tag con datos completos', function () {
    tagData.forEach((data) => {
      tags.clickTagsLink();
      tags.clickOnTagCreated();
      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      tags.typeName(Math.floor(Math.random() * tagsCategories.length) + " - " + tagsCategories[random(tagsCategories.length - 1)].category + " - " + data.name);
      tags.typeSlug(data.slug + " - " + tagsCategories[random(tagsCategories.length - 1)].category);
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
      tags.typeName(Math.floor(Math.random() * tagsCategories.length) + " - " + tagsCategories[random(tagsCategories.length - 1)].category + " - " + data.name);
      tags.typeSlug(data.slug + " - " + tagsCategories[random(tagsCategories.length - 1)].category);
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
      tags.typeSlug(data.slug + " - " + tagsCategories[random(tagsCategories.length - 1)].category);
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

function random(max) {
  return Math.floor(Math.random() * (max + 1));
}