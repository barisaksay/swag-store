class inventory {
    constructor(){}

    addToCart(nthItem){
    // stores the item name in the alias "itemName", it can be used in test separately
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

export default inventory