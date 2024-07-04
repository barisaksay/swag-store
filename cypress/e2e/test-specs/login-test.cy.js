import loginPage from "../page-objects/loginPage";
import loginData from "../data/login-data";

describe('Login page tests',()=>{
    let LoginPage = new loginPOM();
    let LoginData = new loginData();

    beforeEach(()=>{
        LoginPage.visit("/")
    })

    it('login successful',()=>{
        LoginPage.typeUsername(LoginData.validUsername)
        .typePassword(LoginData.correctPassword)
        .clickLogin()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/v1/inventory.html')
        cy.get('.inventory_list').should('be.visible')
    })

    it('login-logout successful',()=>{
        LoginPage.typeUsername(LoginData.validUsername)
                  .typePassword(LoginData.correctPassword)
                  .clickLogin()
        cy.url().should('eq','https://www.saucedemo.com/v1/inventory.html')

        LoginPage.clickLogout()
        cy.url().should('eq','https://www.saucedemo.com/v1/index.html')

    })

    it('wrong credentials: wrong username,correct password',()=>{
        LoginPage.typeUsername(LoginData.wrongUsername)
        .typePassword(LoginData.correctPassword)
        .clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('wrong credentials: correct username,wrong password',()=>{
        LoginPage.typeUsername(LoginData.validUsername)
        .typePassword(LoginData.wrongPassword)
        .clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('empty username field',()=>{
        LoginPage.typePassword(LoginData.correctPassword)
        .clickLogin()
            //assertion
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Username is required')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")

    })

    it('empty password field',()=>{
        LoginPage.typeUsername(LoginData.validUsername)
        .clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Password is required')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")


    })

    it('locked out user - unsuccessful login',()=>{
        LoginPage.typeUsername(LoginData.lockedoutUser)
        .typePassword(LoginData.correctPassword)
        .clickLogin()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/v1/')
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','locked out')
    })

})
