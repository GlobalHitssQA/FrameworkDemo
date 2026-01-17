const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('a Casa de Bolsa contract is available for consultation', async function () {
  await contractValuePage.verifyCasaDeBolsaContractAvailable();
});

When('the user selects a Casa de Bolsa contract', async function () {
  await contractValuePage.selectCasaDeBolsaContract();
});

Then('the system displays the operation screen with the total contract value component', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Purchasing Power item is visible in the breakdown list', async function () {
  const isItemVisible = await contractValuePage.isPurchasingPowerItemVisible();
  expect(isItemVisible).toBeTruthy();
});

Then('the item name displays as {string} according to Look and Feel specifications', async function (expectedName) {
  const actualName = await contractValuePage.getPurchasingPowerItemName();
  expect(actualName).toBe(expectedName);
});