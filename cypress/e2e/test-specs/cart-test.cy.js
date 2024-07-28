import cartPage from "../page-objects/cartPage";
import inventoryPage from "../page-objects/inventoryPage";
import loginData from "../data/login-data.json";

const {validUsername,correctPassword}=loginData


describe('Cart Page tests', function () {
   
    let CartPage = new cartPage();
    let InventoryPage = new inventoryPage()
    beforeEach(()=>{
        cy.login(validUsername,correctPassword)
    })

    it('go back to inventory page',()=>{
        InventoryPage.goToCart()
        CartPage.clickContinueShoppingButton()
    })

    it('continues to checkout',()=>{
        InventoryPage.goToCart()
        CartPage.clickCheckoutButton()
    })

    it('correct item is shown in the cart',()=>{
        InventoryPage.addToCart(1)
        cy.get('@itemName')
            .should('be.a','string')
            .then((productName)=>{
                InventoryPage.goToCart()
                cy.contains('.inventory_item_name',productName)
            })


    })


});