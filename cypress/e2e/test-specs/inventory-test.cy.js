import inventoryPage from "../page-objects/inventoryPage"
import login from '../../fixtures/login-data.json';

const {validUsername,correctPassword}=login


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
    
    it("should sort items High to Low",()=>{
        InventoryPage.sortItems(3)
        
    })

    it("should sort items Low to High",()=>{
        InventoryPage.sortItems(2)
        
    })

    it("should sort items A-Z",()=>{
        InventoryPage.sortItems(1)
        
    })

    it("should sort items Z-A",()=>{
        InventoryPage.sortItems(0)
        
    })



    it("should go back to inventory page from detail page",()=>{
        InventoryPage.goToItemDetails(3)
        .goBackInventoryPage()
         cy.location('pathname').should('eq',InventoryPage.inventoryURL)


    })


    // it.only("test",()=>{
    //     cy.get(".inventory_item").eq(0).then((item)=>{
    //     cy.wrap(item).find(".inventory_item_name").invoke("text");
        
    //     })
    // })

  
})
