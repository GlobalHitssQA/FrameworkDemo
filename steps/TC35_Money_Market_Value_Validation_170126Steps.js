const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let referenceValue;

Given('I am authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigate();
  await contractValuePage.login();
});

Given('I have selected a contract with money market investments', async function () {
  await contractValuePage.searchAndSelectContract();
  await contractValuePage.waitForContractToLoad();
});

Given('I have obtained the reference value from the source system', async function () {
  referenceValue = await contractValuePage.getSourceSystemMoneyMarketValue();
});

When('I click on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValue();
});

Then('the popup with detailed value breakdown should be displayed', async function () {
  const isVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isVisible).toBe(true);
});

Then('the money market value should match the reference value', async function () {
  const displayedValue = await contractValuePage.getMoneyMarketValue();
  const normalizedDisplayed = contractValuePage.normalizeMonetaryValue(displayedValue);
  const normalizedReference = contractValuePage.normalizeMonetaryValue(referenceValue);
  expect(normalizedDisplayed).toBe(normalizedReference);
});

Then('the money market value should have currency format', async function () {
  const displayedValue = await contractValuePage.getMoneyMarketValue();
  const hasCurrencyFormat = contractValuePage.validateCurrencyFormat(displayedValue);
  expect(hasCurrencyFormat).toBe(true);
});

Then('the money market value should be right-aligned', async function () {
  const isRightAligned = await contractValuePage.isMoneyMarketValueRightAligned();
  expect(isRightAligned).toBe(true);
});