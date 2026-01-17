const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('a contract with very large monetary values is available', async function () {
  await contractValuePage.verifyLargeValueContractIsAvailable();
});

When('the user selects a contract with values exceeding {float}', async function (minValue) {
  await contractValuePage.selectContractWithLargeValues(minValue);
});

Then('the system loads the contract and displays the total value component without errors', async function () {
  await contractValuePage.verifyContractLoadedSuccessfully();
  await contractValuePage.verifyTotalValueComponentIsVisible();
});

When('the user clicks on the component to display the breakdown popup', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the popup is displayed showing all contract items', async function () {
  await contractValuePage.verifyBreakdownPopupIsVisible();
  await contractValuePage.verifyAllContractItemsAreDisplayed();
});

Then('the large values are displayed correctly with currency format and thousand separators', async function () {
  const isFormatCorrect = await contractValuePage.verifyLargeValuesHaveCorrectFormat();
  expect(isFormatCorrect).toBe(true);
});

Then('the value text does not overflow or overlap with other popup elements', async function () {
  const hasNoOverflow = await contractValuePage.verifyValuesDoNotOverflow();
  expect(hasNoOverflow).toBe(true);
});

Then('the total contract value correctly calculates and displays the sum of all items including large values', async function () {
  const isTotalCorrect = await contractValuePage.verifyTotalValueCalculation();
  expect(isTotalCorrect).toBe(true);
});