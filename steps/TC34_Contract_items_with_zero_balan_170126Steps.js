const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter with valid advisor credentials', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.enterUsername(process.env.ADVISOR_USERNAME || 'test_advisor');
  await contractBreakdownPage.enterPassword(process.env.ADVISOR_PASSWORD || 'test_password');
  await contractBreakdownPage.clickLoginButton();
  await contractBreakdownPage.waitForMainScreenToLoad();
});

When('the user selects a contract that has some items without balance or with zero value', async function () {
  await contractBreakdownPage.clickContractSearchIcon();
  await contractBreakdownPage.searchForContractWithZeroBalance();
  await contractBreakdownPage.selectContractFromResults();
  await contractBreakdownPage.waitForContractInfoToLoad();
});

When('the user clicks on the value and composition component to display the breakdown', async function () {
  await contractBreakdownPage.clickValueCompositionComponent();
});

Then('the system displays the popup with the complete list of applicable items for the contract', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const itemsCount = await contractBreakdownPage.getBreakdownItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

Then('the items without monetary value show exactly $0.00 with correct currency format', async function () {
  const zeroBalanceItems = await contractBreakdownPage.getItemsWithZeroBalance();
  for (const item of zeroBalanceItems) {
    const value = await contractBreakdownPage.getItemValue(item);
    expect(value).toMatch(/^\$0\.00$/);
  }
});

Then('no applicable item appears empty or without value', async function () {
  const allItems = await contractBreakdownPage.getAllBreakdownItems();
  for (const item of allItems) {
    const hasValue = await contractBreakdownPage.itemHasMonetaryValue(item);
    expect(hasValue).toBe(true);
  }
  await contractBreakdownPage.closeBreakdownPopup();
});