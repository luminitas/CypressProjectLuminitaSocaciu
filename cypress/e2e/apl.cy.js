describe('Verify title text, font size/weight, visibility on desktop and mobile', () => {

  const titleSelector = 'body > div.load-first > div > div.container.header-text > h1:nth-child(1)';

  const targetUrl = 'https://airportlabs.com';

  const exectedText = 'Digital Innovation.';

  const desktopStyles = {
    fontSize: '32px',
    fontWeight: '700',//bold
  };

  const mobileStyles = {
    fontSize: '24px', 
    fontWeight: '700',
  };

  context('Desktop View', () => {
    beforeEach(() => {
      // Set viewport to a standard desktop size 
      cy.viewport(1280, 720);
      cy.visit(targetUrl);
    });

  it('should display the correct title styles on Desktop', () => {
      cy.get(titleSelector)
        .should('be.visible')
        .and('have.text', expectedText)
        .and('have.css', 'font-size', desktopStyles.fontSize)
        .and('have.css', 'font-weight', desktopStyles.fontWeight);
    });
  });
  
  context('Mobile View', () => {
    beforeEach(() => {
      // Set viewport to a standard mobile size (e.g., iPhone X)
      cy.viewport('iphone-x'); 
      cy.visit(targetUrl);
    });
  });

  it('Checks title text', () => {
    cy.visit('https://airportlabs.com/')
    cy.get('body > div.load-first > div > div.container.header-text > h1:nth-child(1)')
      .should('be.visible')
      .and('have.text', 'Digital Innovation.')

   it('should display the correct title styles on Mobile', () => {
      cy.get(titleSelector)
        .should('be.visible')
        .and('have.text', expectedText)
        .and('have.css', 'font-size', mobileStyles.fontSize)
        .and('have.css', 'font-weight', mobileStyles.fontWeight);
    });
  });
});