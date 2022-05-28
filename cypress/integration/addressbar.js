//refresh page before each test
beforeEach(function () {
    cy.visit('/')
})

//write tests to check if addressbar renders
describe('Addressbar', () => {
    it('should render', () => {
        cy.get('.lwvrep_addressForm').should('exist');
    });
    it('should render cards with an address', () => {
        cy.get('.lwvrep_addressForm').should('exist');
        cy.get('.lwvrep_inputForm').type('123 Main St, New York, NY');
        cy.get('.lwvrep_submit').click();
        cy.get('.lwvrep_card').should('exist');
    });
    it('gives error with an invalid address', () => {
        cy.get('.lwvrep_addressForm').should('exist');
        cy.get('.lwvrep_inputForm').type('XXX Main St, New York, NY');
        cy.get('.lwvrep_submit').click();
        cy.get('.lwvrep_Errors').should('exist');
    });
    it('should not submit when address is empty', () => {
        cy.get('.lwvrep_addressForm').should('exist');
        cy.get('.lwvrep_submit').click();
        cy.get('.lwvrep_card').should('not.exist');
    });
});
