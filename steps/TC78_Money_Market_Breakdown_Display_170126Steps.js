const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and on the contract value screen', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToContractValueScreen();
});

Given('a contract without money market investments is available', async function () {
  await contractValuePage.verifyContractWithoutMoneyMarketExists();
});

When('the user selects a contract without money market investments', async function () {
  await contractValuePage.selectContractWithoutMoneyMarket();
});

Then('the contract is displayed with its total value', async function () {
  const isDisplayed = await contractValuePage.isContractTotalValueDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed with contract value details', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user locates the Money Market section in the breakdown list', async function () {
  await contractValuePage.locateMoneyMarketSection();
});

Then('the Money Market section displays a monetary value of {string}', async function (expectedValue) {
  const actualValue = await contractValuePage.getMoneyMarketValue();
  expect(actualValue).toBe(expectedValue);
});

When('the user clicks outside the breakdown component', async function () {
  await contractValuePage.clickOutsideBreakdownPopup();
});

Then('the popup closes correctly', async function () {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});