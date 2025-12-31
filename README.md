-- Installation instructions for the project:

1. Open cmd and type the following commands:

git clone https://github.com/luminitas/CypressProjectLuminitaSocaciu.git
cd CypressProjectLuminitaSocaciu

2. Install dependencies

npm install
// or
yarn install

3. How to run the tests in Cypress framework

npx cypress open

4. Run the tests

npx cypress run

//run specific test files

npx cypress run --spec "cypress/e2e/path/to/your/test.cy.js"

//run tests in a specific browser

npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge

 -- Cypress version npx cypress --version
 
 -- I used Cypress v15.8.1
  
 -- Project is structured using Page Object Model.
 
 In my case I only used it for the first test (because I completely forgot about creating the project using POM, my bad)as it follows: "HeaderTitle.js" in "page-objects" folder and "HeaderTitle.cy.js" in "e2e" folder.
 
 The folders of the project is divided as follows:
 
- cypress/e2e/: it contains test specifications. Each file contains a separate feature or user flow
- cypress/fixtures/: the folder contains static data (.json) for data-driven testing
- cypress/page-objects/: the folder contains the Page Object Model implementation. Each file represents a "page" / a major component of the application, containing selectors and methods for interacting with it. This separates UI logic from test logic.

-- Creating a github repository and commit my project to the newly created repository

1. Initialize Git in my local project:
   navigate to the location of my project on my machine and run the command:
   git init
2. Add the files of the project to the Git staging area:
   git add .
3. Commit the changes:
   git commit -m "suggestive message of the change(s)"
4. Link my local repository to the GitHub repository:
   git branch -m main
   git remote add origin https://github.com/luminitas/CypressProjectLuminitaSocaciu.git
5. Push my roject to GitHub:
   git push -u origin main
   
