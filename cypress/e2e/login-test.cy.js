import LoginPage from "./POM/loginPOM";

describe('Login page tests',()=>{
    let loginPage = new LoginPage();

    let validUsername = 'standard_user'
    let validPassword = 'secret_sauce'
    let lockedOutUser= 'locked_out_user'

    beforeEach(()=>{
        loginPage.visit()
    })

    it('login successful',()=>{
        loginPage.typeUsername(validUsername)
        loginPage.typePassword(validPassword)
        loginPage.clickLogin()
        //assertions
        //cy.url().should('eq','https://www.saucedemo.com/inventory.html')
        //cy.get('.inventory_list').should('be.visible')
    })

    it('login-logout successful',()=>{
        loginPage.typeUsername(validUsername)
        loginPage.typePassword(validPassword)
        loginPage.clickLogin()
        loginPage.clickLogout()
    })

    it('wrong credentials: wrong username,correct password',()=>{
        loginPage.typeUsername('random-user')
        loginPage.typePassword(validPassword)
        loginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/")
    })

    it('wrong credentials: correct username,wrong password',()=>{
        loginPage.typeUsername(validUsername)
        loginPage.typePassword('wrong')
        loginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/")
    })

    it('empty username field',()=>{
        loginPage.typePassword(validPassword)
        loginPage.clickLogin()
            //assertion
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Username is required')
        cy.url().should('eq',"https://www.saucedemo.com/")

    })

    it('empty password field',()=>{
        loginPage.typeUsername(validUsername)
        loginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Password is required')
        cy.url().should('eq',"https://www.saucedemo.com/")


    })

    it('locked out user - unsuccessful login',()=>{
        loginPage.typeUsername(lockedOutUser)
        loginPage.typePassword(validPassword)
        loginPage.clickLogin()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/')
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','locked out')
    })

})