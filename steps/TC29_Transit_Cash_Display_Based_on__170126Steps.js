const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForAuthentication();
});

When('the user selects a Bank contract', async function () {
  await contractValuePage.selectBankContract();
});

When('the user selects a Brokerage House contract', async function () {
  await contractValuePage.selectBrokerageHouseContract();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValue();
});

Then('the breakdown popup should be displayed', async function () {
  const isVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isVisible).toBe(true);
});

Then('the Transit Cash item should be visible in the breakdown', async function () {
  const isVisible = await contractValuePage.isTransitCashVisible();
  expect(isVisible).toBe(true);
});

Then('the Transit Cash item should not be visible in the breakdown', async function () {
  const isVisible = await contractValuePage.isTransitCashVisible();
  expect(isVisible).toBe(false);
});