const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a contract with negative values in at least one item is available', async function () {
  await contractBreakdownPage.verifyContractWithNegativeValuesExists();
});

When('the user selects the contract with negative values', async function () {
  await contractBreakdownPage.selectContractWithNegativeValues();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays the popup with the breakdown of items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the negative amounts are displayed with minus sign before currency symbol in format -$X,XXX.XX', async function () {
  const negativeAmountsFormatted = await contractBreakdownPage.verifyNegativeAmountsFormat();
  expect(negativeAmountsFormatted).toBeTruthy();
});

Then('the total contract value correctly reflects the algebraic sum including negative amounts', async function () {
  const isTotalCorrect = await contractBreakdownPage.verifyTotalContractValueCalculation();
  expect(isTotalCorrect).toBeTruthy();
});