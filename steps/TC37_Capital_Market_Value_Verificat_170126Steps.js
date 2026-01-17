const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let referenceValue;

Given('I am authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.login();
});

Given('I have selected a contract with known capital market investments', async function () {
  await contractValuePage.searchAndSelectContract();
  await contractValuePage.waitForContractToLoad();
});

Given('I have obtained the reference value from the source system', async function () {
  referenceValue = await contractValuePage.getReferenceValueFromSource();
});

When('I click on the Total Contract Value component', async function () {
  await contractValuePage.clickTotalContractValue();
});

Then('the breakdown popup should be displayed with all sections', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('I should see the Capital Market section with its monetary value', async function () {
  const isCapitalMarketVisible = await contractValuePage.isCapitalMarketSectionVisible();
  expect(isCapitalMarketVisible).toBe(true);
});

Then('the Capital Market value should match the reference value', async function () {
  const capitalMarketValue = await contractValuePage.getCapitalMarketValue();
  const normalizedDisplayValue = contractValuePage.normalizeMonetaryValue(capitalMarketValue);
  const normalizedReferenceValue = contractValuePage.normalizeMonetaryValue(referenceValue);
  expect(normalizedDisplayValue).toBe(normalizedReferenceValue);
});

Then('the value should have currency format and be right-aligned', async function () {
  const hasCurrencyFormat = await contractValuePage.hasCapitalMarketCurrencyFormat();
  expect(hasCurrencyFormat).toBe(true);
  const isRightAligned = await contractValuePage.isCapitalMarketValueRightAligned();
  expect(isRightAligned).toBe(true);
});