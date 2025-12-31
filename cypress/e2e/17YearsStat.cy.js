 describe('17+ Years stat verification using fixture', () => {
	 
	 const selector = 'body > div.load-second > div.our-impact > div:nth-child(2) > div:nth-child(1)';
	 
	 const url = 'https://airportlabs.com';
	 
	 
  beforeEach(() => {
	  //navigate to the url
	  cy.visit(url);
  });

  it('should verify the label/value and styles of the second div in the stats section using fixture data', () => {
	  //Load fixture data
	   cy.fixture('17YearsData').then((fixtureData) => {
      const { ourActivityInNumbers } = fixtureData;

      cy.get(selector).as('targetElement'); // Alias the element

      //Verify Text Content
      cy.log(`Verifying text content: "${ourActivityInNumbers.expectedText}"`);
      cy.get('@targetElement')
        .should('be.visible') // Ensure the element is visible
        .and('contain', ourActivityInNumbers.expectedText); // Verify it contains the expected text

      //Verify CSS
      cy.log('Verifying CSS styles');
      for (const prop in ourActivityInNumbers.expectedStyles) {
        if (ourActivityInNumbers.expectedStyles.hasOwnProperty(prop)) {
          const expectedValue = ourActivityInNumbers.expectedStyles[prop];
          cy.log(`Check style property "${prop}" with expected value "${expectedValue}"`);
          cy.get('@targetElement').should('have.css', prop, expectedValue);
        }
      }
    });
  });
});