const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('a contract with extremely large monetary values is available', async function () {
  await contractValuePage.verifyLargeValueContractIsAvailable();
});

When('the user selects a contract with extremely high monetary values', async function () {
  await contractValuePage.selectContractWithLargeValues();
});

Then('the system loads the selected contract', async function () {
  const isLoaded = await contractValuePage.isContractLoaded();
  expect(isLoaded).toBe(true);
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the system displays the popup with the breakdown of items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the large values are displayed completely without truncation', async function () {
  const areValuesComplete = await contractValuePage.verifyValuesNotTruncated();
  expect(areValuesComplete).toBe(true);
});

Then('the amounts show correct thousand separators in format $X,XXX,XXX.XX', async function () {
  const hasCorrectFormat = await contractValuePage.verifyMonetaryFormat();
  expect(hasCorrectFormat).toBe(true);
});

Then('the popup maintains its correct visual structure without text overflow', async function () {
  const hasNoOverflow = await contractValuePage.verifyPopupHasNoOverflow();
  expect(hasNoOverflow).toBe(true);
});

Then('the total contract value correctly shows the sum of all items including large values', async function () {
  const isSumCorrect = await contractValuePage.verifyTotalValueCalculation();
  expect(isSumCorrect).toBe(true);
});