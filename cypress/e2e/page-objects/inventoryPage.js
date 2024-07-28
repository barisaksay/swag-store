class inventoryPage {

    //locators
    inventoryItem='.inventory_item';
    itemName ='.inventory_item_name';
    addToCartButton="button.btn_primary.btn_inventory";
    removeButton=".btn_secondary";
    goToCartButton="a.shopping_cart_link";
    cartURL="/v1/cart.html";
    

    addToCart(nthItem){
    // stores the item name in the alias "itemName", it can be used in test separately

        /*solution: below code selects the nth item from the item list,
        reads its name via invoke('text') and aliases it, so it can be used outside
        the POM method, ie in the test itself. For ex: see the --add to cart-- test.*/

    cy.get(this.itemName)
    .eq(nthItem - 1)
    .invoke('text')
    .as('itemName')

    //clicks on add button
    cy.get(this.addToCartButton)
    .eq(nthItem - 1)
    .click()
    return this;
    }

    removeFromCart(nth){
        cy.get(this.inventoryItem)
        .eq(nth-1)
        .then((item)=>{
            item.find(this.removeButton).click()
        })
        return this;
    
    }

    sortItems(){}

    goToCart() {
        cy.get(this.goToCartButton).click()
        cy.location('pathname').should('equal', this.cartURL)
        return this;
      }
}

export default inventoryPage;
