const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForAuthentication();
});

Given('the user has selected a contract with debt fund investments', async function () {
  await contractValuePage.selectContractWithDebtFunds();
});

When('the user views the operation screen', async function () {
  await contractValuePage.waitForOperationScreen();
});

Then('the total contract value component should be displayed', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the contract value breakdown popup should be displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the item named Fondos de deuda should be visible in the breakdown list', async function () {
  const isItemVisible = await contractValuePage.isFondosDeDeudaItemVisible();
  expect(isItemVisible).toBeTruthy();
});

Then('the Fondos de deuda item should match the specified Look and Feel design', async function () {
  const itemText = await contractValuePage.getFondosDeDeudaItemText();
  expect(itemText).toBe('Fondos de deuda');
  
  const hasCorrectStyling = await contractValuePage.verifyFondosDeDeudaStyling();
  expect(hasCorrectStyling).toBeTruthy();
});