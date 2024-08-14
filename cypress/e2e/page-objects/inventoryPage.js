class inventoryPage {

    inventoryList='.inventory_list'
    inventoryItem='.inventory_item';
    itemName ='.inventory_item_name';
    itemPrice='.inventory_item_price';
    itemPriceDetailPage=".inventory_details_price"
    addToCartButton="button.btn_primary";
    removeButton=".btn_secondary";
    backToInventoryButton=".inventory_details_back_button"
    goToCartButton="a.shopping_cart_link";
    cartURL="/v1/cart.html";
    inventoryURL="/v1/inventory.html";

    
    

    addToCart(nthItem){

    // stores the item name in the alias "itemName", it can be used in test separately
    cy.get(this.itemName)
    .eq(nthItem - 1)
    .invoke('text')
    .as('itemName')

    //reads and aliases item price for later use during verification. eg:verifying correct price is shown at different stages
    cy.get(this.itemPrice)
    .eq(nthItem - 1)
    .invoke('text')
    .as("itemPrice")

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
            //sorting Z-A
        } else if(index==1){
          cy.get(".product_sort_container").select(index);

          let names=[];
          cy.get(".inventory_item_name")
          .each((item)=>{
            let nameText = item.text()
            cy.log(nameText)
            names.push(nameText)})

            .then(()=>{
              cy.log(names)
              if(names[0]<names[1]){
                throw new Error("Sorting is not working as expected");
              }
            })
        } else if(index===0){
          cy.get(".product_sort_container").select(index);

          let names=[];
          cy.get(".inventory_item_name")
          .each((item)=>{
            let nameText = item.text()
            cy.log(nameText)
            names.push(nameText)})

            .then(()=>{
              cy.log(names)
              if(names[0]>names[1]){
                throw new Error("Sorting is not working as expected");
              }
            })

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
