describe('template spec', () => {
  it('Login', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')


    cy.get("div input[class*=oxd-input]").first().type("Admin")
    cy.get("div input[type*=password]").type("admin123")

    cy.get("button").contains("Login").click()

    cy.get('span h6').should('have.text', 'Dashboard')
  })
})