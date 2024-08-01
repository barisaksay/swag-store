class inventoryPage {

    //locators
    inventoryItem='.inventory_item';
    itemName ='.inventory_item_name';
    itemPrice='.inventory_item_price';
    itemPriceDetailPage=".inventory_details_price"
    addToCartButton="button.btn_primary.btn_inventory";
    removeButton=".btn_secondary";
    backToInventoryButton=".inventory_details_back_button"
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

    sortItems(index){
        //conditional statements for sorting
        //if sorting price Low to High
        if (index == 2) {
          cy.get(".product_sort_container").select(index);

          let prices = [];
          cy.get(".inventory_item_price")
            .each((item) => {
              let priceValue = item.text().replace("$", "");
              let priceInt = parseFloat(priceValue);
              cy.log(priceInt);
              prices.push(priceInt);
            })
            .then(() => {
              cy.log(prices);
              if (prices[0] > prices[1]) {
                throw new Error("Sorting is not working as expected");
              }
            });
            //if sorting High to Low
        } else if(index==3){
            cy.get(".product_sort_container").select(index);

          let prices = [];
          cy.get(".inventory_item_price")
            .each((item) => {
              let priceValue = item.text().replace("$", "");
              let priceInt = parseFloat(priceValue);
              cy.log(priceInt);
              prices.push(priceInt);
            })
            .then(() => {
              cy.log(prices);
              
              if (prices[0] < prices[1]) {
                throw new Error("Sorting is not working as expected");
              }
            });
        }
        
    }

    goToCart() {
        cy.get(this.goToCartButton).click()
        cy.location('pathname').should('equal', this.cartURL)
        return this;
      }

    goToItemDetails(nthItem){
      cy.get(this.itemPrice)
      .eq(nthItem-1).as('item-price-inventory').then((price)=>{
        let itemPriceText=price.text();
        cy.log(itemPriceText)
        cy.wrap(itemPriceText)
        cy.get(this.itemName)
        .eq(nthItem - 1)
        .click()
        cy.get(this.itemPriceDetailPage).should("have.text",itemPriceText)
      })
      
      return this;
    }

    goBackInventoryPage(){
      cy.get(this.backToInventoryButton)
        .click({force:true})
        return this;
    }
}

export default inventoryPage;
