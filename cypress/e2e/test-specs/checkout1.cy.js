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

    it("should complete checkout successfully",()=>{
        InventoryPage.addToCart(0)
                    .goToCart()
        CartPage.clickCheckoutButton()
        Checkout1Page.typeFirstName(firstname)
                     .typeLastName(lastname)
                     .typePostcode(postalcode)
                     .clickContinueButton()

    })


 })