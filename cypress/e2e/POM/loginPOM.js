class loginPOM{
    constructor() {
    }
        visit(){
        cy.visit('/')
        }
        typeUsername(username){
            cy.get('[data-test="username"]')
                .type(username);
        }
        typePassword(password){
            cy.get('[data-test="password"]')
                .type(password)
        }
        clickLogin(){
            cy.get('#login-button').click()
    
        }

        clickLogout(){
            cy.get('.bm-burger-button > button').click()
            cy.get('#logout_sidebar_link').click()
            cy.url().should('eq','https://www.saucedemo.com/v1/index.html')
        }
}

export default loginPOM;