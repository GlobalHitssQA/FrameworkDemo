const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a contract with small monetary values close to zero is available', async function () {
  await contractBreakdownPage.verifyContractWithSmallValuesExists();
});

When('the user selects the contract with small monetary values', async function () {
  await contractBreakdownPage.searchAndSelectContractWithSmallValues();
});

Then('the system loads the selected contract', async function () {
  const isLoaded = await contractBreakdownPage.verifyContractIsLoaded();
  expect(isLoaded).toBe(true);
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the system displays the popup with the breakdown of items', async function () {
  const isPopupVisible = await contractBreakdownPage.verifyBreakdownPopupIsVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the small values are displayed correctly with two decimal format', async function () {
  const hasCorrectFormat = await contractBreakdownPage.verifySmallValuesHaveTwoDecimalFormat();
  expect(hasCorrectFormat).toBe(true);
});

Then('values greater than zero are not rounded to zero', async function () {
  const valuesNotRounded = await contractBreakdownPage.verifyValuesNotRoundedToZero();
  expect(valuesNotRounded).toBe(true);
});

Then('the total value correctly reflects the small monetary values in the sum', async function () {
  const totalIsCorrect = await contractBreakdownPage.verifyTotalIncludesSmallValues();
  expect(totalIsCorrect).toBe(true);
});