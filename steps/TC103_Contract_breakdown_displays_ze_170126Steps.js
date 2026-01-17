const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a contract with at least one item without monetary balance is available', async function () {
  await contractBreakdownPage.verifyContractWithZeroBalanceItemExists();
});

When('the user selects a contract that has at least one item without monetary balance', async function () {
  await contractBreakdownPage.selectContractWithZeroBalanceItem();
});

Then('the system loads the selected contract', async function () {
  const isLoaded = await contractBreakdownPage.isContractLoaded();
  expect(isLoaded).toBe(true);
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the system displays the popup with the complete breakdown of items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

When('the user identifies the items that have no monetary balance', async function () {
  await contractBreakdownPage.identifyZeroBalanceItems();
});

Then('the items without balance are displayed with the value $0.00', async function () {
  const zeroBalanceItems = await contractBreakdownPage.getZeroBalanceItems();
  for (const item of zeroBalanceItems) {
    const value = await contractBreakdownPage.getItemValue(item);
    expect(value).toMatch(/\$0\.00/);
  }
});

Then('all applicable items for the contract are present even showing $0.00', async function () {
  const allItemsPresent = await contractBreakdownPage.verifyAllApplicableItemsArePresent();
  expect(allItemsPresent).toBe(true);
  const itemsWithZeroBalance = await contractBreakdownPage.getItemsDisplayingZeroBalance();
  expect(itemsWithZeroBalance.length).toBeGreaterThan(0);
});