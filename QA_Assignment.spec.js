/// <reference types = "cypress"/>

it('should edit user profile email, DOB and password successfully', () => {
    // catch known exceptions on webpage and allow test to continue
    cy.on('uncaught:exception', (err,runnable)=>{
        expect(err.message).to.include('Uncaught ReferenceError: $ is not defined at  landing?username=ubiquity&password=P%40ss123%23UbiQuity:86 and missing logo')
        return false
    })
    // Go to test page
    cy.visit('http://54.253.214.197:8081/')
    // Enter credentials
    cy.get('#username').type('ubiquity')
    cy.get('#password').type('P@ss123#UbiQuity')
    cy.get('.btn').click()
    // Go to Edit Profile
    cy.get('[href="/editprofile"]').click()
    cy.get('#IntroText > :nth-child(1)').should('have.text','Please enter your details below.')
    // Edit Email, DOB and PW
    cy.get('#Email > .field-value > .textfield').clear().type('StormeSquirrel@Lightning.com')
    cy.get('#DateOfBirth > .field-value > .textfield').clear().type('13/11/2005')
    cy.get('#NewPassword > .field-value > .textfield').clear().type('StormeSquirrel')
    cy.get('#ConfirmNewPassword > .field-value > .textfield').clear().type('StormeSquirrel')
    cy.get('.submit-button').click()
    // Verify changes accepted
    cy.get('#SuccessMessage').should('have.text','Update is successful! Please see updated information below')
    // Verify changes persist on page    
    cy.get('#Email > .field-value > .textfield').should('have.value','StormeSquirrel@Lightning.com')
    cy.get('#DateOfBirth > .field-value > .textfield').should('have.value','13/11/2005')    
    cy.get('#NewPassword > .field-value > .textfield').should('have.value','StormeSquirrel')
    cy.get('#ConfirmNewPassword > .field-value > .textfield').should('have.value','StormeSquirrel')
})