
class LoginPage{

     usernameField = 'input[data-test="username"]';
     passwordField = 'input[data-test="password"]';
     loginButton = '#login-button';
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

        cy.get('div.bm-burger-button').find('button')
        .click()
        
        cy.get('#logout_sidebar_link').contains("Logout")
            .click()
            return this;
    }
}

export default LoginPage;
