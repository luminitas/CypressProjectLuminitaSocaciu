

describe('Social Media Links verification', () => {
    // Navigate to the page containing the links
    const url = 'https://airportlabs.com'; 
	
	beforeEach(() => {
		
		cy.visit(url);
		
	});
	
 it('should verify visibility, href correctness, and opened URL domain', () => {
    // Load social media link data from the fixture
    cy.fixture('socialLinks').then((socialLinks) => {
      // Iterate through each social link defined in the fixture
      socialLinks.forEach((link) => {
        cy.log(`--- Testing ${link.name} Link ---`);

        // 1. Verify visibility
        cy.get(link.selector)
          .should('be.visible')
          .as('socialLink'); // Alias the element for reuse

        // 2. Verify href correctness
        cy.get('@socialLink')
          .should('have.attr', 'href')
          .and('include', link.expectedHrefContains); // Check if href contains the expected part

        // 3. Verify opened URL domain (by removing target="_blank" and clicking)
        cy.get('@socialLink')
          .invoke('removeAttr', 'target') // Remove target="_blank" to open in same tab
          .click();

        // After clicking, the URL should have changed to the social media platform
        cy.url().should('include', link.expectedDomainContains); // Verify the domain part of the new URL

        // Go back to the original page to test the next link
        cy.go('back');
      });
    });
  });
});