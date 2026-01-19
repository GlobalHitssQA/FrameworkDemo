const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with fund operation permissions', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.login();
  const isLoggedIn = await contractValuePage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

When('the user selects a Casa de Bolsa contract from the fund operation flow', async function () {
  await contractValuePage.navigateToFundOperation();
  await contractValuePage.selectCasaDeBolsaContract();
  const isContractLoaded = await contractValuePage.isContractLoaded();
  expect(isContractLoaded).toBeTruthy();
});

Then('the component should display the total contract value with monetary format', async function () {
  const isValueComponentVisible = await contractValuePage.isValueComponentVisible();
  expect(isValueComponentVisible).toBeTruthy();
  const totalValue = await contractValuePage.getTotalContractValue();
  expect(totalValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});

When('the user clicks on the value and composition component', async function () {
  await contractValuePage.clickValueComponent();
});

Then('a popup should display the detailed contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the popup should show the {string} item with its monetary value on the right side', async function (itemName) {
  const isItemVisible = await contractValuePage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
  const itemValue = await contractValuePage.getBreakdownItemValue(itemName);
  expect(itemValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});

Then('the popup should show the {string} item with its dollar amount', async function (itemName) {
  const isItemVisible = await contractValuePage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
  const itemValue = await contractValuePage.getBreakdownItemValue(itemName);
  expect(itemValue).toMatch(/^(USD\s*)?\$?[\d,]+(\.\d{2})?$/);
});