const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in the system', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.performLogin();
});

Given('the user has access to the contract query functionality', async function () {
  await contractBreakdownPage.verifyContractQueryAccess();
});

When('the user selects a Bank contract for Physical or Moral Person without associated Mexdolar account', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectBankContractWithoutMexdolar();
});

Then('the system loads the contract correctly', async function () {
  const isLoaded = await contractBreakdownPage.isContractLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user clicks on the total contract value component to open the breakdown', async function () {
  await contractBreakdownPage.clickTotalContractValue();
});

Then('the popup with the breakdown list of contract value is displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user searches for the USD Cash item in the breakdown list', async function () {
  await contractBreakdownPage.searchForUsdCashItem();
});

Then('the USD Cash item is not displayed in the list for Bank contracts without Mexdolar account', async function () {
  const isUsdCashVisible = await contractBreakdownPage.isUsdCashItemVisible();
  expect(isUsdCashVisible).toBeFalsy();
});

When('the user selects a Brokerage contract without dollar balance', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectBrokerageContractWithoutDollarBalance();
});

When('the user verifies the USD Cash item', async function () {
  await contractBreakdownPage.clickTotalContractValue();
  await contractBreakdownPage.searchForUsdCashItem();
});

Then('the USD Cash item is displayed with value $0.00', async function () {
  const isVisible = await contractBreakdownPage.isUsdCashItemVisible();
  expect(isVisible).toBeTruthy();
  const usdCashValue = await contractBreakdownPage.getUsdCashValue();
  expect(usdCashValue).toBe('$0.00');
});