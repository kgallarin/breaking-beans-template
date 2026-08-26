describe('', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('User clicks load more to see more products', () => {
    cy.wait(1000).then(() => {
      cy.getBySel('load-more-products').click();
    });
  });
});
