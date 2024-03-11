import loginPOM from "../page-objects/loginPOM";
import loginData from "../data/login-data";

describe('Login page tests',()=>{
    let LoginPage = new loginPOM();
    let LoginData = new loginData();

    beforeEach(()=>{
        LoginPage.visit("/")
    })

    it.only('login successful',()=>{
        LoginPage.typeUsername(LoginData.validUsername)
        LoginPage.typePassword(LoginData.correctPassword)
        LoginPage.clickLogin()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/v1/inventory.html')
        cy.get('.inventory_list').should('be.visible')
    })

    it('login-logout successful',()=>{
        LoginPage.typeUsername(LoginData.validUsername)
        LoginPage.typePassword(LoginData.correctPassword)
        LoginPage.clickLogin()
        LoginPage.clickLogout()
    })

    it('wrong credentials: wrong username,correct password',()=>{
        LoginPage.typeUsername(LoginData.wrongUsername)
        LoginPage.typePassword(LoginData.correctPassword)
        LoginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('wrong credentials: correct username,wrong password',()=>{
        LoginPage.typeUsername(LoginData.validUsername)
        LoginPage.typePassword(LoginData.wrongPassword)
        LoginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('empty username field',()=>{
        LoginPage.typePassword(LoginData.correctPassword)
        LoginPage.clickLogin()
            //assertion
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Username is required')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")

    })

    it('empty password field',()=>{
        LoginPage.typeUsername(LoginData.validUsername)
        LoginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Password is required')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")


    })

    it('locked out user - unsuccessful login',()=>{
        LoginPage.typeUsername(LoginData.lockedoutUser)
        LoginPage.typePassword(LoginData.correctPassword)
        LoginPage.clickLogin()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/v1/')
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','locked out')
    })

})