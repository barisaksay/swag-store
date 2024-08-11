import checkout2Page from "../page-objects/checkout2Page";
import checkout1Page from "../page-objects/checkout1Page";
import inventoryPage from "../page-objects/inventoryPage";
import cartPage from "../page-objects/cartPage";
import login from '../../fixtures/login-data.json';
import checkoutUser from '../../fixtures/checkout-user-data.json';

const {validUsername,correctPassword}=login
const {firstname,lastname,postalcode}=checkoutUser


describe('checkout 2 page tests', () => { 

    let Checkout1Page = new checkout1Page();
    let CartPage = new cartPage();
    let InventoryPage = new inventoryPage();
    


    beforeEach(()=>{
        cy.login(validUsername,correctPassword);
    })

    it.only("tax is applied correctly",()=>{
        InventoryPage.addToCart(0)
        InventoryPage.goToCart();
            CartPage.clickCheckoutButton()
            Checkout1Page.typeFirstName(firstname)
            .typeLastName(lastname)
            .typePostcode(postalcode)
            .clickContinueButton()

            cy.get('.inventory_item_price').invoke("text").as('itemPriceCheckout')
            .then((itemPrice)=>{
                itemPrice=itemPrice.replace("$"," ")
                itemPrice=parseFloat(itemPrice)
                cy.log(itemPrice)


                cy.get('.summary_subtotal_label').invoke("text")
                .then((itemTotal)=>{
                    itemTotal=itemTotal.replace("Item total: $"," ")
                    itemTotal=parseFloat(itemTotal)
                    cy.log(itemTotal)

                    cy.wrap(itemTotal).should("eq",itemPrice)
                })
            })
         
    })
 })