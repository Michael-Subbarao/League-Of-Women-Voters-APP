//before each enter a real address
before(function () {
    cy.visit('/')
    cy.get('.lwvrep_inputForm').type('123 Main St, New York, NY');
    cy.get('.lwvrep_submit').click();
    cy.get('.lwvrep_icons').first().click();
})

describe('Card', () => {
    it('should expand when clicked', () => {
        cy.get('.lwvrep_name_wrapper').first().click();
        cy.get('.lwvrep_open').should('exist');
    });

    it('should render address', () => {
        cy.get('.lwvrep_photo_wrapper').first().should('contain', 'Washington 1600 Pennsylvania Avenue Northwest DC 20500');
    });

    it('should render phone number', () => {
        cy.get('.lwvrep_contact_wrapper').first().should('contain', '(202) 456-1111');
    });

    it('should render office', () => {
        cy.get('.lwvrep_office').first().should('contain', 'President of the United States');
    });

    it('should render photo', () => {
        cy.get('.lwvrep_name_wrapper').eq(2).click();
        cy.get('.lwvrep_open').should('exist');
        cy.get('.lwvrep_photo_wrapper').should('exist');
    });

    it('should render all channels of contact', () => {
        cy.get('.lwvrep_Facebook').should('exist');
        cy.get('.lwvrep_Twitter').should('exist');
        cy.get('.lwvrep_Youtube').should('exist');
    });
        
    it('should collapse when clicked', () => {
        cy.get('.lwvrep_name_wrapper').first().click();
        cy.get('.lwvrep_card').first().should('have.class', 'lwvrep_half');
    });
});