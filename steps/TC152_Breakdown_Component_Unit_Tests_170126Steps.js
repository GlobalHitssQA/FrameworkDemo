const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BreakdownTestPage = require('../pages/BreakdownTestPage');

let breakdownTestPage;
let testResults;
let coverageReport;

Given('the development environment is properly configured', async function() {
  breakdownTestPage = new BreakdownTestPage(this.page);
  const isConfigured = await breakdownTestPage.verifyDevelopmentEnvironment();
  expect(isConfigured).toBeTruthy();
});

Given('the unit testing framework is installed', async function() {
  const isInstalled = await breakdownTestPage.verifyTestingFrameworkInstalled();
  expect(isInstalled).toBeTruthy();
});

Given('the breakdown component is implemented', async function() {
  const isImplemented = await breakdownTestPage.verifyBreakdownComponentExists();
  expect(isImplemented).toBeTruthy();
});

When('I execute the unit tests for the breakdown value component', async function() {
  testResults = await breakdownTestPage.executeBreakdownUnitTests();
});

Then('the unit tests should run without errors', async function() {
  const hasErrors = await breakdownTestPage.checkTestsForErrors(testResults);
  expect(hasErrors).toBeFalsy();
});

Then('the tests should validate correct presentation of all sections including Poder de compra and Efectivo and Fondos and Cedes and Mercado de dinero and Mercado de capitales', async function() {
  const sectionsValidated = await breakdownTestPage.verifySectionPresentationTests(testResults);
  expect(sectionsValidated.poderDeCompra).toBeTruthy();
  expect(sectionsValidated.efectivo).toBeTruthy();
  expect(sectionsValidated.fondos).toBeTruthy();
  expect(sectionsValidated.cedes).toBeTruthy();
  expect(sectionsValidated.mercadoDinero).toBeTruthy();
  expect(sectionsValidated.mercadoCapitales).toBeTruthy();
});

Then('the tests should validate the breakdown popup opens and closes correctly on click', async function() {
  const popupTestsValid = await breakdownTestPage.verifyPopupBehaviorTests(testResults);
  expect(popupTestsValid.opensCorrectly).toBeTruthy();
  expect(popupTestsValid.closesCorrectly).toBeTruthy();
});

Then('the tests should validate the vertical alignment of the breakdown with the main component', async function() {
  const alignmentTestsValid = await breakdownTestPage.verifyAlignmentTests(testResults);
  expect(alignmentTestsValid).toBeTruthy();
});

Then('the code coverage should be above 80 percent according to project standards', async function() {
  coverageReport = await breakdownTestPage.getCodeCoverageReport();
  const coveragePercentage = await breakdownTestPage.extractCoveragePercentage(coverageReport);
  expect(coveragePercentage).toBeGreaterThanOrEqual(80);
});