# Introduction
UI Test Automation with Playwright and Javascript

# Folder structure

```
  QA-Airalo-Exercise
  |                     
  └───tests                        All tests are found here
  └───fixtures                     Data files that are used within tests
  └───pageObject                   All selectors and methods for a certain page are found here                 
  └───utils
  │     │
  │     └───utils.js               All generic Playwright methods go here. It should be generic in nature.
  │                      
  └───playwright.config.js         Playwright config file
  
```

# Prerequisites

Node.js: Ensure that you have Node.js installed. You can download it from nodejs.org.<br>


# Installation

`npm i`<br>
`npm init playwright@latest`

# Run Playwright

`npx playwright test` command to run all the tests in headless mode

`npx playwright test --ui` opens Playwright app to run individual or all tests via the playwright dashboard. Once the dashboard opens, click play button to run the tests.

Note: `baseUrl` in the `playwright.config.json` is set to `https://www.airalo.com/` by default. 

# Report

`npx playwright show-report` command to see the HTML report

# Test Strategy / Approach Overview

The goal is to dynamically select and verify the eSIM data, as the first eSIM will not always be the same for a different country. The test follows these steps:

- Locate eSIM elements dynamically using Playwright locators by index. For example, the locator `simItemLocator` in the test has the index set to 0 `const simCardIndex = 0;` that selects the first eSIM by default, but can be easily changed to select any item from the list.
- Parameterize Test Data: test will work with any country, and product selection. For example, `const country = "Japan";` can be easily updated to test any country.
- Used assertions to compare the extracted eSIM details from the list (stored in .json file) with those on the product detail page to ensure they match.
