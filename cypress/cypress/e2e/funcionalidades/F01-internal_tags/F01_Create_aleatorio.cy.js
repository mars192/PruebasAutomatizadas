const { Tags } = require('../../../pages/tags');
const { Login } = require('../../../pages/login');

import { faker } from '@faker-js/faker';

describe('F01-Crear tags internos', () => {

  const tags = new Tags();
  const login = new Login();
  const numCasos = 5;

  beforeEach(() => {
    login.login();
  })

  it('F01-E1-Crear tag interno con datos completos', function () {
    for (let i = 0; i < numCasos; i++) {
      const name = faker.animal.dog();
      const slug = faker.animal.type();
      const description = name + " - " + slug + ": " + faker.lorem.paragraph();

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeName(name);
      tags.typeSlug(slug);
      tags.typeDescription(description);
      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('F01-E1-Crear tags internos')
      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01-E2-Crear tag interno con datos completos y descripción de larga', function () {
    for (let i = 0; i < numCasos; i++) {
      const name = faker.animal.dog();
      const slug = faker.animal.type();
      const description = name + " - " + slug + ": " + faker.lorem.paragraph(15);

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeName(name);
      tags.typeSlug(slug);
      tags.typeDescription(description);
      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('F01-E1-Crear tags internos')
      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01-E3-Crear tag interno con datos incompletos', function () {
    for (let i = 0; i < numCasos; i++) {

      const slug = faker.animal.type();
      const description = slug + ": " + faker.lorem.paragraph();

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      tags.typeSlug(slug);
      tags.typeDescription(description);
      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('F01-E3-Crear tags internos')
      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01-E4-Consultar tag creado', function () {
    tags.clickTagsLink();
    tags.clickInternalTagsLink();
    tags.verifyInternalTagsCreated('Create a new tag');
    cy.screenshot('F01-E4-Crear tags internos')
  })
});