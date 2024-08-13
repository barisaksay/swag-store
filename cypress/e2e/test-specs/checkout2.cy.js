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

  it("correct item price is shown at the final checkout",{tags:"@regression"}, () => {
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

  it.skip("challenge: get every item name and store in aray", () => {
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
});
