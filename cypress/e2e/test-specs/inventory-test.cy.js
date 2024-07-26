import inventoryPage from "../page-objects/inventoryPage"
import loginData from "../data/login-data.json";
const {validUsername,correctPassword}=loginData


describe("inventory page tests",()=>{

let InventoryPage = new inventoryPage()
    beforeEach(()=>{
        cy.login(validUsername,correctPassword)
    })


    it("should add an item to cart",()=>{
        InventoryPage.addToCart(3)
        cy.get('@itemName')
        .should('be.a', 'string')
        .then((productName)=>{
            InventoryPage.goToCart()
            cy.contains('.inventory_item_name', productName)

        })
    })

    it("should remove added item from cart",()=>{
        InventoryPage.addToCart(3);
        InventoryPage.removeFromCart(3)
    })
    
    it("should sort items correctly",()=>{})

  
})
