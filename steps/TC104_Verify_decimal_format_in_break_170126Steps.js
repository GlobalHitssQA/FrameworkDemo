const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('there is a contract with monetary values containing decimals', async function () {
  await contractBreakdownPage.verifyContractWithDecimalsExists();
});

When('the user selects a contract with decimal monetary values', async function () {
  await contractBreakdownPage.selectContractWithDecimals();
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

Then('all amounts are displayed with two decimals in format $X,XXX.XX', async function () {
  const allAmountsValid = await contractBreakdownPage.verifyAllAmountsHaveCorrectDecimalFormat();
  expect(allAmountsValid).toBe(true);
});

Then('the displayed values match the system values with correct rounding to two decimals', async function () {
  const valuesMatch = await contractBreakdownPage.verifyDisplayedValuesMatchSystemValues();
  expect(valuesMatch).toBe(true);
});