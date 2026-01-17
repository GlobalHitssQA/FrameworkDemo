const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractTotalValuePage = require('../pages/ContractTotalValuePage');

let contractTotalValuePage;
let testResults;
let coverageReport;

Given('the development environment is configured with the unit test framework', async function () {
  contractTotalValuePage = new ContractTotalValuePage(this.page);
  const isConfigured = await contractTotalValuePage.verifyTestFrameworkConfigured();
  expect(isConfigured).toBeTruthy();
});

Given('the contract total value component is implemented', async function () {
  const isImplemented = await contractTotalValuePage.verifyComponentImplemented();
  expect(isImplemented).toBeTruthy();
});

When('I execute the unit tests for the contract total value component', async function () {
  testResults = await contractTotalValuePage.executeUnitTests();
});

Then('the unit tests should run without errors', async function () {
  const hasErrors = await contractTotalValuePage.checkTestErrors(testResults);
  expect(hasErrors).toBeFalsy();
});

Then('the tests should validate the correct calculation of the accumulated total value', async function () {
  const calculationTestPassed = await contractTotalValuePage.verifyTotalCalculationTests(testResults);
  expect(calculationTestPassed).toBeTruthy();
});

Then('the tests should confirm the sum of all items matches the displayed total value', async function () {
  const sumValidationPassed = await contractTotalValuePage.verifySumMatchesTotalTests(testResults);
  expect(sumValidationPassed).toBeTruthy();
});

Then('the tests should validate the monetary format presentation meets defined standards', async function () {
  const formatTestPassed = await contractTotalValuePage.verifyMonetaryFormatTests(testResults);
  expect(formatTestPassed).toBeTruthy();
});

Then('the code coverage should be greater than 80 percent', async function () {
  coverageReport = await contractTotalValuePage.getCodeCoverageReport();
  const coveragePercentage = await contractTotalValuePage.extractCoveragePercentage(coverageReport);
  expect(coveragePercentage).toBeGreaterThan(80);
});