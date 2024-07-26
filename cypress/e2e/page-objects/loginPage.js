


class LoginPage{

    //login locators
     usernameLocator = 'input[data-test="username"]';
     passwordLocator = 'input[data-test="password"]';
     loginButtonLocator = '#login-button';

    //login methods

    enterUsername(username){
        cy.get(this.usernameLocator)
            .should('be.visible')
            .type(username)
            return this;
    }

    enterPassword(password){
        cy.get(this.passwordLocator)
            .should('be.visible')
            .type(password)
            return this
    }    

    submitLoginFormButton(){
        cy.get(this.loginButtonLocator)
            .click()
            return this
    }

    logoutUser(){

        cy.get('div.bm-burger-button').find('button')
        .click()
        
        cy.get('#logout_sidebar_link').contains("Logout")
            .click()
            return this
    }
}

export default LoginPage;
