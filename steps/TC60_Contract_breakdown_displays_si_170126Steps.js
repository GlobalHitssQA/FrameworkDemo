const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.authenticate();
});

Given('the user has selected a contract with only one item having value and others at zero', async function () {
  await contractBreakdownPage.selectContractWithSingleActiveItem();
});

When('the user views the contract information', async function () {
  await contractBreakdownPage.waitForContractInfoToLoad();
});

Then('the total value component should be visible', async function () {
  const isVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup should be displayed showing all applicable items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const itemsCount = await contractBreakdownPage.getBreakdownItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

Then('the active item should display its corresponding monetary value on the right side', async function () {
  const activeItemValue = await contractBreakdownPage.getActiveItemValue();
  expect(activeItemValue).not.toBe('$0.00');
  expect(activeItemValue).toMatch(/\$[\d,]+\.\d{2}/);
});

Then('the items without monetary value should display zero pesos zero cents', async function () {
  const zeroItems = await contractBreakdownPage.getZeroValueItems();
  for (const itemValue of zeroItems) {
    expect(itemValue).toMatch(/\$0\.00|\$0\.00 MXN|\$0\.00 USD/);
  }
});

Then('the total value should match the single active item value', async function () {
  const totalValue = await contractBreakdownPage.getTotalValueFromComponent();
  const activeItemValue = await contractBreakdownPage.getActiveItemValue();
  expect(totalValue).toBe(activeItemValue);
});