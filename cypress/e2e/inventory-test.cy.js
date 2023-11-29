import inventoryPOM from "./POM/inventoryPOM"
describe("inventory page tests",()=>{
    let inventoryPage = new inventoryPOM()
    let user ={
        username: "standard_user",
        password: "secret_sauce",
        lockedout: "locked_out_user"
    }

    beforeEach(()=>{
        cy.login(user.username,user.password)
    })


    it("should add an item to cart",()=>{
        inventoryPage.addToCart(3)
        cy.get('@itemName')
        .should('be.a', 'string')
        .then((productName)=>{
            inventoryPage.goToCart()
            cy.contains('.inventory_item_name', productName)

        })
    })

    it("should remove added item from cart",()=>{
        inventoryPage.addToCart(3);
        inventoryPage.removeFromCart(3)
    })
    
    it("should sort items correctly",()=>{})

  
})