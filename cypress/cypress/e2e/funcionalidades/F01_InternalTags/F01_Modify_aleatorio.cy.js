const { Tags } = require('../../../pages/tags');
const { Login } = require('../../../pages/login');

import { faker } from '@faker-js/faker';

describe('F01-Modificar tags internos', () => {

  const tags = new Tags();
  const login = new Login();
  const numCasos = 5;

  beforeEach(() => {
    login.login();
    cy.wait(2000)
  });

  it('F01_E5-Modificar tag con datos completos', function () {
    var count = 0;
    for (let i = 0; i < numCasos; i++) {
      count++
      const name = faker.animal.dog();
      const slug = faker.animal.type();
      const description = name + " - " + slug + ": " + faker.lorem.paragraph();

      tags.clickTagsLink();
      tags.clickOnTagCreated();
      cy.screenshot('aleatorio/F01/E5-Modificar tag con datos completos. Ejecución: ' + count + '. Paso 1')

      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      cy.screenshot('aleatorio/F01/E5-Modificar tag con datos completos. Ejecución: ' + count + '. Paso 2')

      tags.typeName(name);
      tags.typeSlug(slug);
      tags.typeDescription(description);
      cy.screenshot('aleatorio/F01/E5-Modificar tag con datos completos. Ejecución: ' + count + '. Paso 3')

      tags.clickSave();
      tags.verifyConfirmation('Saved');
      cy.screenshot('aleatorio/F01/E5-Modificar tag con datos completos. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01_E6-Modificar tag con datos completos y descripción larga', function () {
    var count = 0;
    for (let i = 0; i < numCasos; i++) {
      count++
      const name = faker.animal.dog();
      const slug = faker.animal.type();
      const description = name + " - " + slug + ": " + faker.lorem.paragraph(15);

      tags.clickTagsLink();
      tags.clickOnTagCreated();
      cy.screenshot('aleatorio/F01/E6-Modificar tag con datos completos y descripción larga. Ejecución: ' + count + '. Paso 1')

      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      cy.screenshot('aleatorio/F01/E6-Modificar tag con datos completos y descripción larga. Ejecución: ' + count + '. Paso 2')

      tags.typeName(name);
      tags.typeSlug(slug);
      tags.typeDescription(description);
      cy.screenshot('aleatorio/F01/E6-Modificar tag con datos completos y descripción larga. Ejecución: ' + count + '. Paso 3')

      tags.clickSave();
      tags.verifyError('Description cannot be longer than 500 characters.');
      cy.screenshot('aleatorio/F01/E6-Modificar tag con datos completos y descripción larga. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01_E7-Crear tag interno con datos incompletos', function () {
    var count = 0;
    for (let i = 0; i < numCasos; i++) {
      count++
      const slug = faker.animal.type();
      const description = slug + ": " + faker.lorem.paragraph();

      tags.clickTagsLink();
      tags.clickOnTagCreated();
      cy.screenshot('aleatorio/F01/E7-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 1')

      tags.clearContentName();
      tags.clearContentSlug();
      tags.clearContentDescription();
      cy.screenshot('aleatorio/F01/E7-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 2')

      tags.typeSlug(slug);
      tags.typeDescription(description);
      cy.screenshot('aleatorio/F01/E7-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Paso 3')

      tags.clickSave();
      tags.verifyError('You must specify a name for the tag.');
      cy.screenshot('aleatorio/F01/E7-Crear tag interno con datos incompletos. Ejecución: ' + count + '. Resultado')

      cy.visit('/')
      cy.wait(1000);
    }
  })

  it('F01_E8-Consultar tag modificado', function () {
    tags.clickTagsLink();
    cy.screenshot('aleatorio/F01/E8-Consultar tag modificado. Paso 1')

    tags.clickOnTagCreated();
    cy.screenshot('aleatorio/F01/E8-Consultar tag modificado. Paso 2')

    tags.clickOnViewTag();
    tags.verifyModifiedTag('Page not found');
    cy.screenshot('aleatorio/F01/E8-Consultar tag modificado. Resultado')
  })
});