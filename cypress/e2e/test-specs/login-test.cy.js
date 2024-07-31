import loginPage from "../page-objects/loginPage";
import login from '../../fixtures/login-data.json';

const {validUsername,wrongUsername,correctPassword,wrongPassword,lockedoutUser}=login


describe('Login page tests',()=>{
    let LoginPage = new loginPage();

    beforeEach(()=>{
        cy.visit("/")
    })
 
    it('login successful',{tags:'@regression'},()=>{
        LoginPage.enterUsername(validUsername)
        .enterPassword(correctPassword)
        .submitLoginFormButton()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/v1/inventory.html')
        cy.get('.inventory_list').should('be.visible')
    })

    it('login-logout successful',()=>{
        LoginPage.enterUsername(validUsername)
                  .enterPassword(correctPassword)
                  .submitLoginFormButton()
        cy.url().should('eq','https://www.saucedemo.com/v1/inventory.html')

        LoginPage.logoutUser()
        cy.url().should('eq','https://www.saucedemo.com/v1/index.html')

    })

    it('wrong credentials: wrong username,correct password',()=>{
        LoginPage.enterUsername(wrongUsername)
        .enterPassword(correctPassword)
        .submitLoginFormButton()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('wrong credentials: correct username,wrong password',()=>{
        LoginPage.enterUsername(validUsername)
        .enterPassword(wrongPassword)
        .submitLoginFormButton()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('empty username field',()=>{
        LoginPage.enterPassword(correctPassword)
        .submitLoginFormButton()
            //assertion
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Username is required')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")

    })

    it('empty password field',()=>{
        LoginPage.enterUsername(validUsername)
        .submitLoginFormButton()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Password is required')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")


    })

    it('locked out user - unsuccessful login',()=>{
        LoginPage.enterUsername(lockedoutUser)
        .enterPassword(correctPassword)
        .submitLoginFormButton()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/v1/')
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','locked out')
    })

})
