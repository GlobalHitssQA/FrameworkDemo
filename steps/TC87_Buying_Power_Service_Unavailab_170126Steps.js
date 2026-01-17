const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let mockRoute;

Given('the Buying Power service is unavailable for Casa de Bolsa contracts', async function() {
  contractValuePage = new ContractValuePage(this.page);
  mockRoute = await contractValuePage.mockBuyingPowerServiceFailure();
});

Given('the user is authenticated in Acticenter', async function() {
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForAuthentication();
});

When('the user selects a Casa de Bolsa contract', async function() {
  await contractValuePage.selectCasaDeBolsaContract();
});

Then('the system attempts to load the total contract value component', async function() {
  const isComponentLoading = await contractValuePage.isContractValueComponentLoading();
  expect(isComponentLoading).toBeTruthy();
});

Then('the system displays an appropriate error message for Buying Power or shows $0.00 with error indication', async function() {
  const hasErrorState = await contractValuePage.hasBuyingPowerErrorState();
  expect(hasErrorState).toBeTruthy();
});

When('the user opens the contract value breakdown popup', async function() {
  await contractValuePage.openBreakdownPopup();
});

Then('the popup displays error or indeterminate value for Buying Power MXN', async function() {
  const buyingPowerState = await contractValuePage.getBuyingPowerMXNState();
  expect(buyingPowerState.hasError || buyingPowerState.isIndeterminate).toBeTruthy();
});

Then('the other available items display correctly', async function() {
  const otherItemsDisplayed = await contractValuePage.areOtherBreakdownItemsDisplayedCorrectly();
  expect(otherItemsDisplayed).toBeTruthy();
});

Then('the application continues functioning without interruption', async function() {
  const isAppFunctional = await contractValuePage.isApplicationFunctional();
  expect(isAppFunctional).toBeTruthy();
  await contractValuePage.verifyNoConsoleErrors();
});