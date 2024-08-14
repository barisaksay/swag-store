
class LoginPage{

     usernameField = 'input[data-test="username"]';
     passwordField = 'input[data-test="password"]';
     loginButton = '#login-button';
     burgerMenuButton='[class="bm-burger-button"]'
     logoutButton='[id="logout_sidebar_link"]'
     loginURL="/v1/index.html"
     loginRedirectURL="/v1/inventory.html";
     errorLocator='[data-test="error"]';
     errorText='do not match';
     missingFieldText='is required';
     lockedOutErrorText='locked out';

    enterUsername(username){
        cy.get(this.usernameField)
            .should('be.visible')
            .type(username)
            return this;
    }

    enterPassword(password){
        cy.get(this.passwordField)
            .should('be.visible')
            .type(password)
            return this;
    }    

    submitLoginFormButton(){
        cy.get(this.loginButton)
            .click()
            return this;
    }

    logoutUser(){

            cy.get(this.burgerMenuButton).click()
            cy.get(this.logoutButton).click()
            return this;
    }
}

export default LoginPage;
