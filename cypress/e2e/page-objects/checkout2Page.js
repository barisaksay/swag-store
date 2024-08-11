class checkout2Page{
    finishButton="a[class='btn_action cart_button']";
    cancelButton="[class='cart_cancel_link btn_secondary']";
    checkoutCompletedURL="https://www.saucedemo.com/v1/checkout-complete.html";
    successMessageLocator=".complete-header";
    successMessageText="THANK YOU FOR YOUR ORDER";
    orderCompletedURL="https://www.saucedemo.com/checkout-complete.html";
    orderCompletedLocator="h2[data-test='complete-header']";

    taxPercentage = 8;

    clickFinishButton(){
        cy.get(this.finishButton)
            .click()
            return this;
    }

    clickCancelButton(){
        cy.get(this.cancelButton)
            .click()
            return this;
    }
}

export default checkout2Page;
