describe('Login testing and logged pages in Web in Desktop viewport', () => {

  beforeEach('Access login page and make login', () => {
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.clearAllCookies()

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("div input[class*=oxd-input]").first().type("Admin")
    cy.get("div input[type*=password]").type("admin123")

    cy.get("button").contains("Login").click()
  })

  it('Check Dashboard page', () => {
    cy.get('span h6').should('have.text', 'Dashboard')
    cy.contains('Time at Work').should('be.visible')
    cy.contains('My Actions').should('be.visible')
    cy.contains('Quick Launch').should('be.visible')
    cy.contains('Buzz Latest Posts').should('be.visible')
  })

  it('Check Recruitment page', () => {
    cy.contains('Recruitment').should('be.visible').click()
    //Continuar testes da página recrutamento
  })

  it('Check Other page', () => {
    //Continuar testes de outra página
  })
})