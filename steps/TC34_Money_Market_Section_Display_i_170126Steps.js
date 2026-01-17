const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToApplication();
  await contractValuationPage.login();
});

Given('the user selects a contract with money market investments', async function () {
  await contractValuationPage.searchAndSelectContractWithMoneyMarket();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuationPage.clickTotalContractValueComponent();
});

Then('the system displays the popup with the complete contract value breakdown', async function () {
  const isPopupVisible = await contractValuationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Money Market section is visible in the breakdown list', async function () {
  const isMoneyMarketVisible = await contractValuationPage.isMoneyMarketSectionVisible();
  expect(isMoneyMarketVisible).toBeTruthy();
});

Then('the Money Market label is aligned to the left', async function () {
  const isLeftAligned = await contractValuationPage.isMoneyMarketLabelLeftAligned();
  expect(isLeftAligned).toBeTruthy();
});

Then('the Money Market monetary value is aligned to the right', async function () {
  const isRightAligned = await contractValuationPage.isMoneyMarketValueRightAligned();
  expect(isRightAligned).toBeTruthy();
});