import loginPage from "../page-objects/loginPage";
import inventoryPage from "../page-objects/inventoryPage";
import login from '../../fixtures/login-data.json';

const {validUsername,wrongUsername,correctPassword,wrongPassword,lockedoutUser}=login


describe('Login page tests',()=>{
    let LoginPage = new loginPage();
    let InventoryPage= new inventoryPage()

    beforeEach(()=>{
        cy.visit("/")
    })
 
    it('login successful',{tags:'@regression'},()=>{
        LoginPage.enterUsername(validUsername)
        .enterPassword(correctPassword)
        .submitLoginFormButton()

        cy.location('pathname').should('eq',LoginPage.loginRedirectURL)
        cy.get(InventoryPage.inventoryList).should('be.visible')
    })

    it('logout successful',{tags:'@regression'},()=>{
        LoginPage.enterUsername(validUsername)
                  .enterPassword(correctPassword)
                  .submitLoginFormButton()
                  cy.location('pathname').should('eq',LoginPage.loginRedirectURL)

        LoginPage.logoutUser()
        cy.location('pathname').should('eq',LoginPage.loginURL)

    })

    it('wrong creds: wrong username,correct password',{tags:'@regression'},()=>{
        LoginPage.enterUsername(wrongUsername)
        .enterPassword(correctPassword)
        .submitLoginFormButton()
        
        cy.get(LoginPage.errorLocator)
            .should('be.visible')
            .and('contain.text',LoginPage.errorText)
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('wrong creds: correct username,wrong password',()=>{
        LoginPage.enterUsername(validUsername)
        .enterPassword(wrongPassword)
        .submitLoginFormButton()
        
        cy.get(LoginPage.errorLocator)
            .should('be.visible')
            .and('contain.text',LoginPage.errorText)
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('missing creds:empty username field',()=>{
        LoginPage.enterPassword(correctPassword)
        .submitLoginFormButton()
            
        cy.get(LoginPage.errorLocator)
            .should('be.visible')
            .and('contain.text',LoginPage.missingFieldText)
        cy.url().should('eq',"https://www.saucedemo.com/v1/")

    })

    it('missing creds:empty password field',()=>{
        LoginPage.enterUsername(validUsername)
        .submitLoginFormButton()
        
        cy.get(LoginPage.errorLocator)
            .should('be.visible')
            .should('contain.text',LoginPage.missingFieldText)
        cy.url().should('eq',"https://www.saucedemo.com/v1/")


    })

    it('unsuccessful attempt:locked out user',()=>{
        LoginPage.enterUsername(lockedoutUser)
        .enterPassword(correctPassword)
        .submitLoginFormButton()
        
        cy.url().should('eq','https://www.saucedemo.com/v1/')
        cy.get(LoginPage.errorLocator)
            .should('be.visible').and('contain.text',LoginPage.lockedOutErrorText)
    })

})
