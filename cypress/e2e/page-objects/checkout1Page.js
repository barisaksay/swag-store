class Checkout1Page{
    //locators

    firstNameField="input[data-test='firstName']";
    lastNameField="input[data-test='lastName']";
    postcodeField="input[data-test='postalCode']";
    continueButton="input[class='btn_primary cart_button']";
    cancelButton="a[class='cart_cancel_link btn_secondary']";
    errorMessageCheckout1="h3[data-test='error']";


    //helpers

    typeFirstName(name){
        cy.get(this.firstNameField).focus().type(name)
        return this;
    }

    typeLastName(lastname){
        cy.get(this.lastNameField).focus().type(lastname)
        return this;
    }

    typePostcode(postcode){
        cy.get(this.lastNameField).focus().type(postcode)
        return this;
    }

    clickContinueButton(){
        cy.get(this.continueButton).click()
        return this;
    }

}