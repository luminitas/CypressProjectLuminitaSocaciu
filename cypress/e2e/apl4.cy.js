describe('Hidden Logo Verification', () => {
  // Replace with your actual selector
  const hiddenLogoSelector = 'body > section > div > div.navbar-2.w-nav > div.navbar-row-2 > nav > a.desktop-brand.w-nav-brand.w--current > img'; 

  it('should force a hidden logo to be visible and verify its dimensions', () => {
    cy.visit('https://www.airportlabs.com');

    // 1. Get the element that currently has display: none
    cy.get(hiddenLogoSelector)
      .should('have.css', 'display', 'none') // Optional: Confirm it starts hidden
      .invoke('css', 'display', 'block') 
      .should('be.visible') // Now it should pass visibility check
      .then(($img) => {
        // 3. Verify Dimensions > 0
        const width = $img[0].clientWidth || $img[0].naturalWidth;
        const height = $img[0].clientHeight || $img[0].naturalHeight;

        cy.log(`Forced Logo Dimensions: ${width}px x ${height}px`);

        expect(width).to.be.greaterThan(0);
        expect(height).to.be.greaterThan(0);
        //Negative assertion for the logo
         cy.wrap($logo).should('not.have.css', 'display', 'none');
      });
  });
});