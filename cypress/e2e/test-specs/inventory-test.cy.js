import inventoryPage from "../page-objects/inventoryPage"
import login from '../../fixtures/login-data.json';
import cartPage from "../page-objects/cartPage";
const {validUsername,correctPassword}=login


describe("inventory page tests",()=>{

let InventoryPage = new inventoryPage()
let CartPage = new cartPage()
    beforeEach(()=>{
        cy.login(validUsername,correctPassword)
    })


    it("should add an item to cart",{tags:'@regression'},()=>{
        InventoryPage.addToCart(3)
        cy.get('@itemName')
        .should('be.a', 'string')
        .then((productName)=>{
            InventoryPage.goToCart()
            cy.get(CartPage.cartItemName).should("have.text",productName)

        })
    })

    it.only("should remove added item from cart",()=>{
        InventoryPage.addToCart(3);
        InventoryPage.removeFromCart(3)
    })
    
    it("should sort items High to Low",{tags:'@regression'},()=>{
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

    it("iterates over all items and push names to array", () => {
        let itemNamesArray = [];
        cy.get(".inventory_item").each((item) => {
            cy.wrap(item).find(".inventory_item_name").then((item) => {
                let itemName = item.text();
                itemNamesArray.push(itemName);
            });
        }).then(() => {
            cy.log(itemNamesArray);
        });
    });
})
