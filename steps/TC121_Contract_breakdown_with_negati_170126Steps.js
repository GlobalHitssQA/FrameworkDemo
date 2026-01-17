const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.login();
});

Given('a contract with negative value categories is available', async function () {
  const isAvailable = await contractBreakdownPage.verifyContractWithNegativeValuesExists();
  expect(isAvailable).toBeTruthy();
});

When('the user selects a contract with negative value categories', async function () {
  await contractBreakdownPage.selectContractWithNegativeValues();
});

Then('the system loads the selected contract and displays the total value component', async function () {
  const isDisplayed = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed showing all applicable categories', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const categoriesCount = await contractBreakdownPage.getBreakdownCategoriesCount();
  expect(categoriesCount).toBeGreaterThan(0);
});

Then('the categories with negative values are displayed correctly with minus sign and proper monetary format', async function () {
  const negativeValues = await contractBreakdownPage.getNegativeValueCategories();
  expect(negativeValues.length).toBeGreaterThan(0);
  for (const value of negativeValues) {
    const isValidFormat = await contractBreakdownPage.validateNegativeMonetaryFormat(value);
    expect(isValidFormat).toBeTruthy();
  }
});

Then('the total contract value reflects the correct algebraic sum including negative values', async function () {
  const displayedTotal = await contractBreakdownPage.getTotalContractValue();
  const calculatedSum = await contractBreakdownPage.calculateAlgebraicSumOfCategories();
  expect(displayedTotal).toBeCloseTo(calculatedSum, 2);
});