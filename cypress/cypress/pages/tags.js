export class Tags {
    clickTagsLink() {
        cy.get('a[data-test-nav="tags"]').click();
    }

    clickInternalTagsLink() {
        cy.get('button[data-test-tags-nav="internal"]').click();
    }

    clickCreateNewTag() {
        cy.get('a[href="#/tags/new/"]').first().click();
    }

    typeName(text) {
        cy.get('input[id=tag-name]').type(text);
    }

    typeSlug(text) {
        cy.get('input[id=tag-slug]').type(text);
    }

    typeDescription(text) {
        cy.get('textarea[id=tag-description]').type(text);
    }

    clickSave() {
        cy.get('button[data-test-button="save"]').click();
    }

    verifyConfirmation(message) {
        cy.get('button[data-test-button="save"]').should('contain.text', message);
    }

    verifyError(error) {
        cy.get('p[class="response"]').should('contain.text', error);
    }

    verifyInternalTagsCreated(message) {
        cy.get('a[class="ember-view gh-btn gh-btn-green"]').should('not.contain.text', message);;
    }

    clickOnTagCreated() {
        cy.get('a[title="Edit tag"]').first().click();
    }

    clearContentName() {
        cy.get('input[id=tag-name]').clear();
    }

    clearContentSlug() {
        cy.get('input[id=tag-slug]').clear();
    }

    clearContentDescription() {
        cy.get('textarea[id=tag-description]').clear();
    }

    clickOnViewTag() {
        cy.get('a[class="gh-view-tag-link"]').invoke('removeAttr', 'target').click();
    }

    verifyModifiedTag(message) {
        cy.get('h2[class="error-description"]').should('not.contain.text', message);
    }
}