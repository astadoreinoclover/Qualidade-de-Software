describe('Login testing and logged pages in Web in Desktop viewport', () => {

  beforeEach('Access login page and make login', () => {
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.clearAllCookies()

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("div input[class*=oxd-input]").first().type("Admin")
    cy.get("div input[type*=password]").type("admin123")

    cy.get("button").contains("Login").click()
    cy.wait(1200); 
  })

  it('Check Dashboard page', () => {
    cy.get('span h6').should('have.text', 'Dashboard')
    cy.contains('Time at Work').should('be.visible')
    cy.contains('My Actions').should('be.visible')
    cy.contains('Quick Launch').should('be.visible')
    cy.contains('Buzz Latest Posts').should('be.visible')
    cy.scrollTo(0, 100);
    cy.wait(2500); 
  })

  it('Navigate to Recruitment and switch to Vacancies', () => {
    cy.contains('Recruitment').should('be.visible').click();
    cy.wait(1000);
    cy.url().should('include', '/recruitment');
    cy.contains('Vacancies').should('be.visible').click();
    cy.wait(1000);
    cy.url().should('include', '/viewJobVacancy'); 
    cy.scrollTo(0, 700); 
    cy.wait(3000); 
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
    cy.scrollTo(500, 0); 
    cy.wait(4000);
  })

  it('Logout from the system', () => {
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').should('be.visible').click();
    cy.url().should('include', '/auth/login');
    cy.get("div input[class*=oxd-input]").first().should('be.visible');
  })
})
