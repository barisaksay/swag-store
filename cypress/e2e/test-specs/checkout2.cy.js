import checkout2Page from "../page-objects/checkout2Page";
import checkout1Page from "../page-objects/checkout1Page";
import inventoryPage from "../page-objects/inventoryPage";
import cartPage from "../page-objects/cartPage";
import login from "../../fixtures/login-data.json";
import checkoutUser from "../../fixtures/checkout-user-data.json";

const { validUsername, correctPassword } = login;
const { firstname, lastname, postalcode } = checkoutUser;

describe("checkout 2 page tests", () => {
  let Checkout2Page = new checkout2Page();
  let Checkout1Page = new checkout1Page();
  let CartPage = new cartPage();
  let InventoryPage = new inventoryPage();

  beforeEach(() => {
    cy.login(validUsername, correctPassword);
  });

  it("correct item price is shown at the final checkout",{ tags: "@regression" },() => {
      InventoryPage.addToCart(0);
      cy.get("@itemPrice").then((itemPrice1) => {
        itemPrice1 = parseFloat(itemPrice1.replace("$", ""));

        InventoryPage.goToCart();
        CartPage.clickCheckoutButton();
        Checkout1Page.typeFirstName(firstname)
          .typeLastName(lastname)
          .typePostcode(postalcode)
          .clickContinueButton();

        cy.get(Checkout2Page.itemPriceLocator)
          .invoke("text")
          .then((itemPrice2) => {
            itemPrice2 = itemPrice2.replace("$", " ");
            itemPrice2 = parseFloat(itemPrice2);

            cy.wrap(itemPrice2).should("eq", itemPrice1);
          });
      });
    });

  it("total amount to pay is calculated correctly",{ tags: "@regression" },()=>{
    InventoryPage.addToCart(0);
    cy.get("@itemPrice").then((itemPrice1) => {
      itemPrice1 = parseFloat(itemPrice1.replace("$", ""));

      InventoryPage.goToCart();
      CartPage.clickCheckoutButton();
      Checkout1Page.typeFirstName(firstname)
        .typeLastName(lastname)
        .typePostcode(postalcode)
        .clickContinueButton();

        cy.get('.summary_total_label')        .invoke("text")
        .then((itemPrice2) => {
          itemPrice2 = itemPrice2.replace("Total: $", " ");
          itemPrice2 = parseFloat(itemPrice2);

          cy.wrap(itemPrice2).should("not.eq", itemPrice1);

          let totalDue= itemPrice1+(itemPrice1*8/100)
          
          totalDue = parseFloat(totalDue.toFixed(2))

          cy.wrap(itemPrice2).should("eq", totalDue);

        });
    });
  })

  it("user can complete order successfully",{ tags: "@regression" },()=>{
   InventoryPage.addToCart(2)
    .goToCart()
    CartPage.clickCheckoutButton()
    Checkout1Page.typeFirstName(firstname)
    .typeLastName(lastname)
    .typePostcode(postalcode)
    .clickContinueButton()
    Checkout2Page.clickFinishButton()
    //cy.get(Checkout2Page.successMessageLocator).should("have.text", Checkout2Page.successMessageText)
    cy.get(Checkout2Page.successMessageLocator).should("be.visible").and("have.text",Checkout2Page.successMessageText)

  })

  it("challenge: get every item name and store in aray", () => {
    let arrayNames = [];
    cy.get(".inventory_item")
      .each((item) => {
        // Find the .inventory_item_name within each .inventory_item
        cy.wrap(item)
          .find(".inventory_item_name")
          .invoke("text")
          .then((itemName) => {
            arrayNames.push(itemName);
          });
      })
      .then(() => {
        // log the final array outside the loop
        cy.log(arrayNames);
      });
  });

  it("challenge: get every item name and price and store in an array ", () => {
    let arrayNamesPrices = [];
    cy.get(".inventory_item")
      .each((item) => {
        // Find the .inventory_item_name within each .inventory_item
        cy.wrap(item)
          .find(".inventory_item_name")
          .invoke("text")
          .then((itemName) => {
            // Find the .inventory_item_price within the same .inventory_item
            cy.wrap(item)
              .find(".inventory_item_price")
              .invoke("text")
              .then((itemPrice) => {
                // Push both name and price into the array
                arrayNamesPrices.push({ name: itemName, price: itemPrice });
              });
          });
      })
      .then(() => {
        cy.log(arrayNamesPrices);
      });
  });
});
