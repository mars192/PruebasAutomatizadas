export class Login {
    login() {
        cy.visit('/signin'); // Cambia la ruta de inicio de sesión si es diferente
        cy.get('input[name="identification"]').type('ma.rodriguezs123456@uniandes.edu.co',);
        cy.get('input[name="password"]').type('Prueba123456', { log: false });
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard'); // Verificar que llegue al dashboard
    }
}