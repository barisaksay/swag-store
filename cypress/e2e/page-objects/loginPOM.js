class loginPOM{
    constructor() {
    }

        //locators
        usernameFieldLocator = '[data-test="username"]'
        passwordFieldLocator = '[data-test="password"]'
        loginButtonLocator = '#login-button'


        //methods
        visit(){
        cy.visit('/')
        }
        typeUsername(username){
            cy.get(this.usernameFieldLocator)
                .type(username);
        }
        typePassword(password){
            cy.get(this.passwordFieldLocator)
                .type(password)
        }
        clickLogin(){
            cy.get(this.loginButtonLocator).click()
    
        }

        clickLogout(){
            cy.get('.bm-burger-button > button').click()
            cy.get('#logout_sidebar_link').click()
            cy.url().should('eq','https://www.saucedemo.com/v1/index.html')
        }
}

export default loginPOM;