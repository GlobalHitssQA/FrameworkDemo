const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.waitForAuthentication();
});

Given('the user selects a contract with decimal monetary values in multiple categories', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectContractWithDecimalValues();
});

When('the system loads the contract', async function () {
  await contractBreakdownPage.waitForContractToLoad();
});

Then('the total value component should be displayed', async function () {
  const isVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component to expand the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup should display all categories with monetary values', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const categoriesCount = await contractBreakdownPage.getBreakdownCategoriesCount();
  expect(categoriesCount).toBeGreaterThan(0);
});

Then('each category should display monetary values with exactly two decimals', async function () {
  const allValuesHaveTwoDecimals = await contractBreakdownPage.verifyAllMonetaryValuesHaveTwoDecimals();
  expect(allValuesHaveTwoDecimals).toBeTruthy();
});

Then('values with more than two decimals should be rounded correctly according to mathematical rules', async function () {
  const roundingIsCorrect = await contractBreakdownPage.verifyDecimalRoundingIsCorrect();
  expect(roundingIsCorrect).toBeTruthy();
});