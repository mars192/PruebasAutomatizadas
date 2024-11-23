export class SignUp {
    clicOnViewSite() {
        cy.get('a[title="Open site in new tab"]').invoke('removeAttr', 'target').click();
    }

    typeEmail(text) {
        cy.get('input[id="header-email"]').type(text);
    }

    clicOnSuscribe() {
        cy.get('button[class="gh-button"]').first().click();
    }

    verifyError() {
        cy.get('p[data-members-error]').should('not.be.visible');
    }
}