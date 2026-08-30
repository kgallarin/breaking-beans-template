describe('E2e - User Journey from Homepage to Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('User clicks to login button in the header nav, and proceeds to login page', () => {
    cy.getBySel('header-nav').should('be.visible');
    cy.getBySel('nav-header-login').should('be.visible').click();
  });
});
