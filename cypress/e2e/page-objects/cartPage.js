class cartPage{

    //locators
    continueShoppingButton="a.btn_secondary";
    checkoutButton=".btn_action";
    inventoryPageURL="/v1/inventory.html";
    checkoutStepOneURL="/v1/checkout-step-one.html";


    clickContinueShoppingButton(){
        cy.get(this.continueShoppingButton).contains('Continue Shopping')
            .click()
        cy.location('pathname').should('eq',this.inventoryPageURL)
    }
    clickCheckoutButton(){
        cy.get(this.checkoutButton).contains('CHECKOUT')
            .click()
        cy.location('pathname').should('eq',this.checkoutStepOneURL)
    }
}

export default cartPage;