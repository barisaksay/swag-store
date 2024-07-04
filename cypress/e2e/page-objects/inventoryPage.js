class inventoryPage {
    constructor(){}

    addToCart(nthItem){
    // stores the item name in the alias "itemName", it can be used in test separately

        //solution: below code selects the nth item from the item list,
        //reads its name via invoke('text') and aliases it, so it can be used outside
        //the POM method, ie in the test itself. For ex: see the --add to cart-- test.
    cy.get('.inventory_item_name')
    .eq(nthItem - 1)
    .invoke('text')
    .as('itemName')

    //clicks on add button
    cy.get('button.btn_primary.btn_inventory')
    .eq(nthItem - 1)
    .click()
    }

    removeFromCart(nth){
        // cy.get('button.btn_secondary.btn_inventory')
        // .click()

        //improved
        cy.get('.inventory_item')
        .eq(nth-1)
        .then((item)=>{
            item.find(".btn_secondary")//.click()
        })
    
    
    }

    sortItems(){}

    goToCart() {
        cy.get('a.shopping_cart_link').click()
        cy.location('pathname').should('equal', '/v1/cart.html')
      }
}

export default inventoryPOM
