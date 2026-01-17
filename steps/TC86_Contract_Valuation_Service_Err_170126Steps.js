const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('the valuation service is unavailable', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.mockValuationServiceUnavailable();
});

Given('I am authenticated in Acticenter', async function () {
  await contractValuationPage.navigateToActicenter();
  await contractValuationPage.verifyUserIsAuthenticated();
});

When('I select a contract from Bank or Brokerage House', async function () {
  await contractValuationPage.selectContract();
});

Then('the system should display an appropriate error message for valuation failure', async function () {
  const errorMessage = await contractValuationPage.getValuationErrorMessage();
  expect(errorMessage).toBeTruthy();
  await contractValuationPage.verifyErrorMessageIsAppropriate(errorMessage);
});

Then('I should be able to continue navigating other modules in Acticenter', async function () {
  await contractValuationPage.verifyOtherModulesAreAccessible();
  await contractValuationPage.navigateToAnotherModule();
  await contractValuationPage.verifyModuleLoadsSuccessfully();
});