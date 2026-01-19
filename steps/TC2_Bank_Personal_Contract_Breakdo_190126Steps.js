const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FundsOperationPage = require('../pages/FundsOperationPage');

let fundsOperationPage;

Given('I am authenticated in Acticenter', async function () {
  fundsOperationPage = new FundsOperationPage(this.page);
  await fundsOperationPage.navigateToLogin();
  await fundsOperationPage.login();
});

Given('I have navigated to the funds operation module', async function () {
  await fundsOperationPage.navigateToFundsOperationModule();
  const isModuleVisible = await fundsOperationPage.isFundsModuleVisible();
  expect(isModuleVisible).toBeTruthy();
});

When('I select a Bank Personal Physical contract with associated Mexdolar account', async function () {
  await fundsOperationPage.openContractSearch();
  await fundsOperationPage.selectBankPersonalContractWithMexdolar();
});

Then('the system loads the selected contract information', async function () {
  const isContractLoaded = await fundsOperationPage.isContractInformationLoaded();
  expect(isContractLoaded).toBeTruthy();
});

When('I click on the contract value and composition component', async function () {
  await fundsOperationPage.clickContractValueComponent();
});

Then('the popup with detailed breakdown of items is displayed', async function () {
  const isPopupVisible = await fundsOperationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the item {string} shows the peso balance from the bank contract core account', async function (itemName) {
  const isItemVisible = await fundsOperationPage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
  const itemValue = await fundsOperationPage.getBreakdownItemValue(itemName);
  expect(itemValue).toBeTruthy();
});

Then('the item {string} shows the dollar value from SAP for the Mexdolar account', async function (itemName) {
  const isItemVisible = await fundsOperationPage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
  const itemValue = await fundsOperationPage.getBreakdownItemValue(itemName);
  expect(itemValue).toBeTruthy();
});

Then('the items {string} {string} and {string} show their corresponding monetary values', async function (item1, item2, item3) {
  const items = [item1, item2, item3];
  for (const item of items) {
    const isVisible = await fundsOperationPage.isBreakdownItemVisible(item);
    expect(isVisible).toBeTruthy();
    const value = await fundsOperationPage.getBreakdownItemValue(item);
    expect(value).toBeTruthy();
  }
});

Then('the item {string} shows the accumulated pending operations amount', async function (itemName) {
  const isItemVisible = await fundsOperationPage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
  const itemValue = await fundsOperationPage.getBreakdownItemValue(itemName);
  expect(itemValue).toBeTruthy();
});

Then('the item {string} is displayed for bank contracts', async function (itemName) {
  const isItemVisible = await fundsOperationPage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
});

Then('the items {string} {string} and {string} show their monetary accumulated values', async function (item1, item2, item3) {
  const items = [item1, item2, item3];
  for (const item of items) {
    const isVisible = await fundsOperationPage.isBreakdownItemVisible(item);
    expect(isVisible).toBeTruthy();
    const value = await fundsOperationPage.getBreakdownItemValue(item);
    expect(value).toBeTruthy();
  }
});