const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.authenticate();
});

Given('the user selects a contract with values in multiple items like Purchasing power, Pending settlement, Debt funds, Hedge funds and Variable income funds', async function () {
  await contractBreakdownPage.searchAndSelectContractWithMultipleItems();
  const isVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the system displays the popup showing all applicable items for the contract', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('all items with value greater than zero are displayed with their respective amounts aligned to the right', async function () {
  const items = await contractBreakdownPage.getBreakdownItems();
  expect(items.length).toBeGreaterThan(0);
  
  for (const item of items) {
    const hasValue = await contractBreakdownPage.itemHasPositiveValue(item);
    expect(hasValue).toBeTruthy();
    
    const isAlignedRight = await contractBreakdownPage.isAmountAlignedRight(item);
    expect(isAlignedRight).toBeTruthy();
  }
});

Then('the breakdown list is vertically aligned with the total value component', async function () {
  const isAligned = await contractBreakdownPage.isBreakdownVerticallyAlignedWithTotalComponent();
  expect(isAligned).toBeTruthy();
});

Then('the sum of all items matches the total value shown in the component', async function () {
  const totalValue = await contractBreakdownPage.getTotalValueFromComponent();
  const sumOfItems = await contractBreakdownPage.calculateSumOfBreakdownItems();
  expect(sumOfItems).toBeCloseTo(totalValue, 2);
});