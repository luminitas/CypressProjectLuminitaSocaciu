describe('"Get in Touch" button Verification', () => {

  const buttonSelector = 'body > section > div > div.navbar-2.w-nav > div.navbar-row-2 > nav > a.button.w-inline-block';
  const expectedButtonText = 'Get in Touch';
  const homepageUrl = 'https://airportlabs.com/'; 
  const successPagePath = '/other/get-in-touch'; 
  const successMessageSelector = '#w-node-_29bd628d-3f47-3bf3-29bc-20db2cb97179-33e38ef7 > div > div > div.w-layout-grid.contact-grid > div.div-block-66 > a > h3'; // An element's selector on the page that appears after clicking

  beforeEach(() => {
    // Visit the page where the button is located
    cy.visit(homepageUrl);
  });

  //Verify Button Properties (Visibility & Text) ---
  it('verify the button is visible and has the correct text', () => {
    cy.get(buttonSelector)
      .should('exist') // Ensure the element is present in the DOM
      .as('theButton'); // Alias the button for easier reuse

    //Verify Visibility
    cy.get('@theButton').should('be.visible');
    cy.log('Assertion: Button is visible.');

    //Verify Text (Label)
    cy.get('@theButton').should('have.text', expectedButtonText);
    cy.log(`Assertion: Button has the correct text: "${expectedButtonText}".`);
  });


  //Verify Button Functionality - Navigation to the next page
  it('should verify button functionality by navigating to a new page', () => {
    cy.get(buttonSelector)
      .should('be.visible') // Ensure visible before interacting
      .should('not.be.disabled') // Ensure enabled before interacting
      .as('theButton');

    // Click the button
    cy.get('@theButton').click();
    cy.log('Action: Button clicked.');

    // Verify the URL changed to the expected success page
    cy.url().should('include', successPagePath);
    cy.log(`Assertion: URL changed to include "${successPagePath}".`);
  });


  //Verify Button Functionality
  it('should verify button functionality by performing an action on the same page', () => {
    // Ensure the success message is NOT visible initially
    cy.get(successMessageSelector).should('not.exist');
    cy.log('Pre-check: Success message is not present initially.');

    // Click the button
    cy.get(buttonSelector)
      .should('be.visible')
      .should('not.be.disabled')
      .click();
    cy.log('Action: Button clicked.');

    // Verify the success message now exists and is visible
    cy.get(successMessageSelector)
      .should('be.visible')
      .and('contain.text', 'contact@airportlabs.com'); // Check its text
    cy.log('Assertion: Success message appeared and is visible.');
  });
});