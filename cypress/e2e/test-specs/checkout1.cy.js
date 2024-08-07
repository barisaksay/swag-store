import checkout1Page from "../page-objects/checkout1Page";
import cartPage from "../page-objects/cartPage"
import inventoryPage from "../page-objects/inventoryPage";
import login from '../../fixtures/login-data.json';
import checkoutUser from '../../fixtures/checkout-user-data.json';

const {validUsername,correctPassword}=login
const {firstname,lastname,postalcode}=checkoutUser



describe('checkout step 1 tests', () => { 
    let Checkout1Page = new checkout1Page();
    let CartPage = new cartPage();
    let InventoryPage = new inventoryPage();
    
    beforeEach(()=>{
        cy.login(validUsername,correctPassword)
    });

    it("should complete checkout successfully-correct item is shown at checkout",()=>{
        InventoryPage.addToCart(0)
        cy.get('@itemName').then((itemName)=>{
            InventoryPage.goToCart()
            CartPage.clickCheckoutButton()
            Checkout1Page.typeFirstName(firstname)
                         .typeLastName(lastname)
                         .typePostcode(postalcode)
                         .clickContinueButton()
            cy.get(".inventory_item_name").should("have.text",itemName)
            
        })
    })
    //re-run
    it("should not complete without firstname",()=>{
        InventoryPage.addToCart(0)
            .goToCart()
        CartPage.clickCheckoutButton()
        Checkout1Page.typeLastName(lastname)
                         .typePostcode(postalcode)
                         .clickContinueButton()
        cy.get(Checkout1Page.errorElementLocator)
            .should("be.visible")
            .should("have.text",Checkout1Page.errorFirstNameMissingText)
        
    })

      //re-run
    it("should not complete without lastname",()=>{
        InventoryPage.addToCart(0)
            .goToCart()
        CartPage.clickCheckoutButton()
        Checkout1Page.typeFirstName(firstname)
                         .typePostcode(postalcode)
                         .clickContinueButton()
        cy.get(Checkout1Page.errorElementLocator)
            .should("be.visible")
            .should("have.text",Checkout1Page.errorLastNameMissingText)
        
    })
 })
