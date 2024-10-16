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

  it('Update My Info', () => {
    cy.get(':nth-child(6) > .oxd-main-menu-item').click();
    cy.url().should('include', '/pim/viewPersonalDetails');

    cy.get('input[name="firstName"]').clear().type('João'); 
    cy.get('input[name="middleName"]').clear().type('Maria');
    cy.get('input[name="lastName"]').clear().type('Silva'); 

    cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div.oxd-form-actions > button.oxd-button--medium.oxd-button--secondary')
      .should('be.enabled')
      .click();

    cy.get('input[name="firstName"]').should('have.value', 'João');
    cy.get('input[name="middleName"]').should('have.value', 'Maria');
    cy.get('input[name="lastName"]').should('have.value', 'Silva'); 
  }) 
})