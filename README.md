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

# Report

`npx playwright show-report` command to see the HTML report
