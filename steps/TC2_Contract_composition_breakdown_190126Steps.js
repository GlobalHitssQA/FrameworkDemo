const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCompositionPage = require('../pages/ContractCompositionPage');

let contractPage;

Given('the user is authenticated in Acticenter', async function () {
  contractPage = new ContractCompositionPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.authenticateUser();
});

Given('the user has selected a Corporate Person contract in Brokerage House', async function () {
  await contractPage.selectCorporatePersonContract();
  await contractPage.selectBrokerageHouseContract();
});

When('the system loads the contract', async function () {
  await contractPage.waitForContractToLoad();
});

Then('the total contract value component should be displayed', async function () {
  const isVisible = await contractPage.isTotalContractValueVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractPage.clickTotalContractValue();
});

Then('a popup with detailed contract composition breakdown should be displayed', async function () {
  const isPopupVisible = await contractPage.isCompositionPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the popup should show the MXN Purchasing Power item with its corresponding amount', async function () {
  const isItemVisible = await contractPage.isPurchasingPowerMXNVisible();
  expect(isItemVisible).toBeTruthy();
  const amount = await contractPage.getPurchasingPowerMXNAmount();
  expect(amount).toMatch(/^\$[\d,]+\.\d{2}$/);
});

Then('the popup should show the USD Cash item with its dollar amount', async function () {
  const isItemVisible = await contractPage.isCashUSDVisible();
  expect(isItemVisible).toBeTruthy();
  const amount = await contractPage.getCashUSDAmount();
  expect(amount).toMatch(/^\$[\d,]+\.\d{2}$/);
});

Then('the popup should show all applicable items including Pending settlement and Debt funds and Coverage funds and Variable income funds and Cedes and promissory notes and Money market and Capital market', async function () {
  const items = [
    'pendingSettlement',
    'debtFunds',
    'coverageFunds',
    'variableIncomeFunds',
    'cedesAndPromissoryNotes',
    'moneyMarket',
    'capitalMarket'
  ];
  for (const item of items) {
    const isVisible = await contractPage.isBreakdownItemVisible(item);
    expect(isVisible).toBeTruthy();
  }
});

Then('each item should display its monetary value on the right side showing zero for items without balance', async function () {
  const allAmounts = await contractPage.getAllBreakdownAmounts();
  for (const amount of allAmounts) {
    expect(amount).toMatch(/^\$[\d,]+\.\d{2}$/);
  }
});

Then('the breakdown list should be vertically aligned with the total contract value component', async function () {
  const isAligned = await contractPage.isPopupVerticallyAligned();
  expect(isAligned).toBeTruthy();
});