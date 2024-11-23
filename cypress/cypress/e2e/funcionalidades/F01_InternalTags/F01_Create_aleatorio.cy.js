const { Tags } = require('../../../pages/tags');
const { Login } = require('../../../pages/login');

import { faker } from '@faker-js/faker';

describe('F01-Crear tags internos', () => {

  const tags = new Tags();
  const login = new Login();
  const numCasos = 5;

  beforeEach(() => {
    login.login();
    cy.wait(2000)
  })

  it('F01-E1-Crear tag interno con datos completos', function () {
    var count = 0;
    for (let i = 0; i < numCasos; i++) {
      count++;
      const name = faker.animal.dog();
      const slug = faker.animal.type();
      const description = name + " - " + slug + ": " + faker.lorem.paragraph();

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      cy.screenshot('aleatorio/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '. Paso 1')

      tags.clickCreateNewTag();
      tags.typeName(name);
      tags.typeSlug(slug);
      tags.typeDescription(description);
      cy.screenshot('aleatorio/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('aleatorio/F01/E1-Crear tag interno con datos completos. Ejecución: ' + count + '. Resultado')
      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01-E2-Crear tag interno con datos completos y descripción larga', function () {
    var count = 0;
    for (let i = 0; i < numCasos; i++) {
      count++;
      const name = faker.animal.dog();
      const slug = faker.animal.type();
      const description = name + " - " + slug + ": " + faker.lorem.paragraph(15);

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      cy.screenshot('aleatorio/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Paso 1')

      tags.clickCreateNewTag();
      tags.typeName(name);
      tags.typeSlug(slug);
      tags.typeDescription(description);
      cy.screenshot('aleatorio/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('aleatorio/F01/E2-Crear tag interno con datos completos y descripción larga. Ejecución: ' + count + '. Resultado')
      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01-E3-Crear tag interno con datos incompletos', function () {
    var count = 0;
    for (let i = 0; i < numCasos; i++) {
      count++;
      const slug = faker.animal.type();
      const description = slug + ": " + faker.lorem.paragraph();

      tags.clickTagsLink();
      tags.clickInternalTagsLink();
      tags.clickCreateNewTag();
      cy.screenshot('aleatorio/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 1')

      tags.typeSlug(slug);
      tags.typeDescription(description);
      cy.screenshot('aleatorio/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 2')

      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('aleatorio/F01/E3-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01-E4-Consultar tag creado', function () {
    tags.clickTagsLink();
    cy.screenshot('aleatorio/F01/E4-Consultar tag creado. Paso 1')

    tags.clickInternalTagsLink();
    cy.screenshot('aleatorio/F01/E4-Consultar tag creado. Paso 2')

    tags.verifyInternalTagsCreated('Create a new tag');
    cy.screenshot('aleatorio/F01/E4-Consultar tag creado. Resultado')
  })
});