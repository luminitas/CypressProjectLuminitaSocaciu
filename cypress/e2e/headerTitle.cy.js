import HeaderTitle from '../page-objects/HeaderTitle';

describe('Header Title Verification', () => {
  const expectedHeaderTitleText = 'Digital Innovation.';
  const desktopViewport = { width: 1280, height: 720 }; // Example desktop resolution
  const mobileViewport = 'iphone-x'; // Example mobile device preset

  let headerTitle; // Declare a variable to hold the Page Object instance

  beforeEach(() => {
    // Initialize the Page Object before each test
    headerTitle = HeaderTitle; // Using the exported singleton instance
    headerTitle.visit(); // Navigate to the home page
  });

  context('Desktop View', () => {
    beforeEach(() => {
      // Set viewport for desktop tests
      cy.viewport(desktopViewport.width, desktopViewport.height);
    });

    it('should verify header title text, font size, font weight, and visibility on desktop', () => {
      headerTitle.verifyHeaderTitleVisibility();
      headerTitle.verifyHeaderTitleText(expectedHeaderTitleText);
      headerTitle.verifyHeaderTitleFontSize('50px'); // Based on inspection (desktop)
      headerTitle.verifyHeaderTitleFontWeight('700'); // Based on inspection (desktop)
    });
  });

  context('Mobile View', () => {
    beforeEach(() => {
      // Set viewport for mobile tests
      cy.viewport(mobileViewport);
    });

    it('should verify header title text, font size, font weight, and visibility on mobile', () => {
      headerTitle.verifyHeaderTitleVisibility();
      headerTitle.verifyHeaderTitleText(expectedHeaderTitleText);
      headerTitle.verifyHeaderTitleFontSize('32px'); // Based on inspection (mobile)
      headerTitle.verifyHeaderTitleFontWeight('700'); // Based on inspection (mobile)
    });
  });
});