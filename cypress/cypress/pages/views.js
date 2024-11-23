export class Views {
    validateView() {
        try {
            if (cy.get('button[title="Edit current view..."]').should('exist')) {
                cy.get('button[title="Edit current view..."]').click()
            } else {
                cy.get('button[data-test-button="delete-custom-view"]').click()
            }
        } catch (error) {

        }
    }

    visitView(url) {
        cy.visit(url)
    }

    clickOnCreateView() {
        cy.get('button[data-test-button="add-view"]').click()

    }

    typeName(text) {
        cy.wait(1000)
        cy.get('input[class="ember-text-field gh-input ember-view"]').type(text);
    }

    saveView() {
        cy.get('button[data-test-button="save-custom-view"]').click();
    }

    confirmViewCreated(name) {
        cy.get(`a[title="${name}"]`)
            .should('exist');
    }

    resetViews(url) {
        this.visitView(url)
    }

    clickOnModifyView() {
        cy.get('button[data-test-button="edit-view"]').click()
    }

    clicOnDeleteView() {
        cy.get('button[data-test-button="delete-custom-view"]').click()
    }
}