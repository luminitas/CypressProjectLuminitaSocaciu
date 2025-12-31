class HeaderTitle {
  constructor() {
    this.url = 'https://www.airportlabs.com/';
    // This is the selector provided in the request
    this.headerTitleSelector = 'body > div.load-first > div > div.container.header-text > h1:nth-child(1)';
  }

  /**
   * Navigates to the AirportLabs home page.
   */
  visit() {
    cy.visit(this.url);
  }

  /**
   * Gets the Cypress chainable for the header title element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getHeaderTitleElement() {
    return cy.get(this.headerTitleSelector);
  }

  /**
   * Verifies the visibility of the header title.
   */
  verifyHeaderTitleVisibility() {
    this.getHeaderTitleElement().should('be.visible');
    cy.log('Assertion: Header title is visible.');
  }

  /**
   * Verifies the text content of the header title.
   * @param {string} expectedText The expected text string.
   */
  verifyHeaderTitleText(expectedText) {
    this.getHeaderTitleElement().should('have.text', expectedText);
    cy.log(`Assertion: Header title text matches "${expectedText}".`);
  }

  /**
   * Verifies the font size of the header title.
   * @param {string} expectedSize The expected font size (e.g., '50px').
   */
  verifyHeaderTitleFontSize(expectedSize) {
    this.getHeaderTitleElement().should('have.css', 'font-size', expectedSize);
    cy.log(`Assertion: Header title font size is "${expectedSize}".`);
  }

  /**
   * Verifies the font weight of the header title.
   * @param {string | number} expectedWeight The expected font weight (e.g., '700' for bold).
   */
  verifyHeaderTitleFontWeight(expectedWeight) {
    this.getHeaderTitleElement().should('have.css', 'font-weight', expectedWeight);
    cy.log(`Assertion: Header title font weight is "${expectedWeight}".`);
  }
}

// Export an instance of the HomePage class to be used as a singleton in tests
export default new HeaderTitle();