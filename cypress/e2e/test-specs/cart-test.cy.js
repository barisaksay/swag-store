import cartPOM from "./POM/cartPOM";

import inventoryPOM from "./POM/inventoryPOM";

describe('Cart Page functionalities', function () {
    let validUsername = 'standard_user'
    let validPassword = 'secret_sauce'
    let cartPage = new cartPOM();
    let inventoryPage = new inventoryPOM();
    beforeEach(()=>{
        cy.login(validUsername,validPassword)
    })

    it('go back to inventory page',()=>{
        inventoryPage.goToCart()
        cartPage.continueShoppingButton()
    })

    it('continues to checkout',()=>{
        inventoryPage.goToCart()
        cartPage.goToCheckoutButton()
    })

    it('correct item is shown in the cart',()=>{
        inventoryPage.addToCart(1)
        cy.get('@itemName')
            .should('be.a','string')
            .then((productName)=>{
                inventoryPage.goToCart()
                cy.contains('.inventory_item_name',productName)
            })


    })


});