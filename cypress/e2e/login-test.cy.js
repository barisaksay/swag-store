import LoginPage from "./POM/loginPOM";

describe('Login page tests',()=>{
    let loginPage = new LoginPage();

    let user ={
        username: "standard_user",
        password: "secret_sauce",
        lockedout: "locked_out_user"
    }

    beforeEach(()=>{
        loginPage.visit()
    })

    it('login successful',()=>{
        loginPage.typeUsername(user.username)
        loginPage.typePassword(user.password)
        loginPage.clickLogin()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/v1/inventory.html')
        cy.get('.inventory_list').should('be.visible')
    })

    it('login-logout successful',()=>{
        loginPage.typeUsername(user.username)
        loginPage.typePassword(user.password)
        loginPage.clickLogin()
        loginPage.clickLogout()
    })

    it('wrong credentials: wrong username,correct password',()=>{
        loginPage.typeUsername('random-user')
        loginPage.typePassword(user.password)
        loginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('wrong credentials: correct username,wrong password',()=>{
        loginPage.typeUsername(user.username)
        loginPage.typePassword('wrong')
        loginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','do not match')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")
    })

    it('empty username field',()=>{
        loginPage.typePassword(user.password)
        loginPage.clickLogin()
            //assertion
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Username is required')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")

    })

    it('empty password field',()=>{
        loginPage.typeUsername(user.username)
        loginPage.clickLogin()
        //assertions
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','Password is required')
        cy.url().should('eq',"https://www.saucedemo.com/v1/")


    })

    it('locked out user - unsuccessful login',()=>{
        loginPage.typeUsername(user.lockedout)
        loginPage.typePassword(user.password)
        loginPage.clickLogin()
        //assertions
        cy.url().should('eq','https://www.saucedemo.com/v1/')
        cy.get('[data-test="error"]')
            .should('be.visible')
            .should('contain.text','locked out')
    })

})