class cartPOM{
    constructor() {}

    continueShoppingButton(){
        cy.get('a.btn_secondary').contains('Continue Shopping')
            .click()
        cy.location('pathname').should('eq','/v1/inventory.html')
    }
    goToCheckoutButton(){
        cy.get('a.btn_secondary').contains('Continue Shopping')
            .click()
        cy.location('pathname').should('eq','/v1/inventory.html')
    }
}

export default cartPOM;