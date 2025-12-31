describe('emag.ro TV Selection Category', () => {

  //Define selectors
  const selectors = {
    cookieAcceptButton: 'body > div.gdpr-cookie-banner.js-gdpr-cookie-banner.py-2.px-0.show > div > div.col-xs-12.col-sm-4.col-md-3.col-lg-2.cookie-banner-buttons > button.fs-12.btn.btn-primary.btn-block.js-accept.gtm_h76e8zjgoo', // For the "Accept cookies" button
	
    // Category Navigation
    categoryTvAudioVideoFotoSelector: 'body > div.main-container-outer.acc-toolbox-target-container > div.megamenu-container.megamenu-always-open > div > div.megamenu-list-container > ul > li:nth-child(4) > a', // Link to 'TV, Audio-Video & Foto'
    categoryTelevizoareSelector: 'body > div.main-container-outer.acc-toolbox-target-container > div.megamenu-container.megamenu-always-open > div > div.megamenu-details > div:nth-child(3) > div.megamenu-details-department-items > ul > li:nth-child(1) > div.megamenu-group.collapse.megamenu-group-4078 > a:nth-child(1)', // Link to 'Televizoare' 

    // Filters
    filterBrandSection: '#js-filter-6415-collapse > div.filter-body.js-scrollable', // The parent div for brand filters
    brandFilterLabel: 'label[for^="brand"] span.label', // Generic label for a brand filter
    // Specific brand filter selector (e.g., for Samsung) - will find the label that contains the text
    brandFilterInputForSamsung: '#js-filter-6415-collapse > div.filter-body.js-scrollable > a:nth-child(1)',
    loaderOverlay: 'div.js-product-loader-overlay.product-loader-overlay--active', // Appears when products are loading

    // Product Listings
    productCard: 'div.card-item.card-standard.js-product-data.js-card-clickable', // Each individual product card
    productNameLink: 'a.card-v2-title.fw-semibold.mb-1.jsproduct-url', // Link to product page
    productPrice: 'p.product-new-price', // The price element
    productRatingLabel: 'div.star-rating-inner::before', // Rating
    
    // Product Detail Page (for verification)
    productPageTitle: '.page-title h1',
	
	
	addToCartButton: 'button.btn.btn-xl.btn-emag.btn-block.main-button.gtm_680klw.yeahIWantThisProduct', // The main "Add to cart" button
  cartNotification: '.modal-content', // The popup confirmation
  cartNotificationClose: 'button.close.gtm_6046yfqs', // Close button for popup
  cartIconCount: 'span.jewel.jewel-danger.px-h', // Cart icon counter
  };

  const brandToFilter = 'Samsung'; // The brand to filter by
  const minRating = 3;
  const baseUrl = 'https://www.emag.ro/';

  // To store the details of the most expensive TV found
  let mostExpensiveTv = null;
  let maxPrice = -1;

  beforeEach(() => {
    cy.visit(baseUrl);
    // Accept cookies if the banner appears (Emag usually shows it on first visit)
    cy.get('body').then(($body) => {
      if ($body.find(selectors.cookieAcceptButton).length) {
        cy.get(selectors.cookieAcceptButton).click();
        cy.wait(500); //Wait until the banner disappears
      }
    });
  });

  it(`should select TV category, filter by ${brandToFilter}, and navigate to the most expensive TV (rating >= ${minRating}) product page`, () => {
    // 1. Navigate to the "Televizoare" (TVs) category

    // Hover over "TV Audio-Video & Foto" to make 'Televizoare' visible
    cy.get(selectors.categoryTvAudioVideoFotoSelector).trigger('mouseover');
    cy.log('Hovered over main menu sections');

    // Click on "Televizoare"
    cy.get(selectors.categoryTelevizoareSelector)
      .should('be.visible')
      .click();
    cy.url().should('include', '/televizoare'); // Verify navigation to Televizoare page
    cy.log('Clicked "Televizoare" and verified URL');

    // 2. Filter by the desired brand (e.g., Samsung)
    // Find the brand filter section
    cy.get(selectors.filterBrandSection).should('be.visible');

    // Find the specific brand label and click it to activate the filter
    cy.get(selectors.filterBrandSection)
      .find(selectors.brandFilterLabel)
      .contains(brandToFilter)
      .scrollIntoView() // Ensure it's in view
      .click({ force: true }); // Use force: true if the checkbox/label isn't directly clickable

    cy.log(`Clicked filter for brand: ${brandToFilter}`);

    //Wait for the filter to apply and the product list to update
    //Wait for the loader overlay to disappear, which signifies content has loaded
    cy.get(selectors.loaderOverlay, { timeout: 10000 }).should('not.exist');
    cy.url().should('include', `/brand/${brandToFilter.toLowerCase()}/`); // Verify URL changed due to filter
    cy.get(selectors.productCard).should('be.visible'); //ensure products are displayed

    // 3. Iterate through product cards to find eligible TVs
    cy.get(selectors.productCard)
      .should('have.length.gt', 0) // Ensure at least one product card is present
      .each(($productCard) => {
        const name = $productCard.find(selectors.productNameLink).text().trim();
        const priceText = $productCard.find(selectors.productPrice).text().trim();
        const ratingLabel = $productCard.find(selectors.productRatingLabel).attr('ariaLabel');
        const productRelativeLink = $productCard.find(selectors.productNameLink).attr('href');

        //Parsing Data
        let price = NaN;
        if (priceText) {
          // emag uses '.' for thousands separator and ',' for decimal
          price = parseFloat(priceText.replace(/\./g, '').replace(',', '.').replace(' Lei', '').trim());
        }

        let rating = NaN;
        if (ratingLabel) {
          // Extract "4.5"
          const ratingMatch = ratingLabel.match('[+-]?([0-9]*[.])?[0-9]+');
          if (ratingMatch && ratingMatch[1]) {
            rating = parseFloat(ratingMatch[1]);
          }
        }

        // Basic validation for extracted data
        if (isNaN(price) || isNaN(rating) || !name || !productRelativeLink) {
          cy.log(`Skipping product "${name || 'Unknown'}" due to missing/invalid data (Price: ${priceText}, Rating: ${ratingLabel}).`);
          return; // Skip this product if data is incomplete or invalid
        }

        cy.log(`Found TV: "${name}" - Price: ${price} Lei - Rating: ${rating} stars`);

        //Filter by Rating and find the most expensive
        if (rating >= minRating) {
          if (price > maxPrice) {
            maxPrice = price;
            // Store the full link, as emag's product links are usually absolute after being generated
            mostExpensiveTv = {
              name: name,
              price: price,
              rating: rating,
              link: productRelativeLink.startsWith('http') ? productRelativeLink : baseUrl + productRelativeLink // Ensure absolute URL
            };
          }
        }
      })
      .then(() => { // After the .each() loop completes, then() executes
        expect(mostExpensiveTv, 'Most expensive eligible TV should have been identified.').to.not.be.null;
        cy.log(`Most expensive eligible TV selected: "${mostExpensiveTv.name}" at ${mostExpensiveTv.price} Lei with ${mostExpensiveTv.rating} stars.`);
        
        // 4. Navigate to the product detail page of the most expensive TV
        cy.visit(mostExpensiveTv.link);
      });

    // 5. Verify that we are on the correct product detail page
    cy.get(selectors.productPageTitle)
      .should('be.visible')
      .and('contain.text', mostExpensiveTv.name); // Check if the page title contains the selected TV name
    cy.log(`Assertion: Navigated to the product page for "${mostExpensiveTv.name}".`);
	 cy.get(selectors.productPageTitle)
      .should('be.visible')
      .and('contain.text', mostExpensiveTv.name); // Check if the page title contains the selected accessory's name
    cy.log(`Assertion: Navigated to the product page for "${mostExpensiveTv.name}".`);
	 cy.get(selectors.addToCartButton).should('be.visible').click();

    // 6. Verify Action (Check for success modal or cart count update)
    // Scenario A: Success Modal appears
    cy.get('body').then(($body) => {
      if ($body.find(selectors.cartNotification).length > 0) {
        cy.get(selectors.cartNotification).should('contain.text', 'Produsul a fost adaugat in cos');
        cy.log('Assertion: Success modal appeared.');
        
        // Optional: Close modal
        cy.get(selectors.cartNotificationClose).first().click();
      } else {
        // Scenario B: No modal, check cart icon count
        cy.get(selectors.cartIconCount).should('contain.text', '1');
        cy.log('Assertion: Cart icon count updated.');
    }
  });
});
