const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyMainScreenDisplayed();
});

When('the user selects a Bank Individual contract from the contract selector', async function () {
  await contractBreakdownPage.openContractSelector();
  await contractBreakdownPage.selectBankIndividualContract();
});

Then('the system displays the total contract value component', async function () {
  const isVisible = await contractBreakdownPage.isTotalContractValueVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValue();
});

Then('a popup with the contract value breakdown is displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the Cash MXN item is visible in the breakdown list with its monetary value', async function () {
  const isCashMXNVisible = await contractBreakdownPage.isCashMXNItemVisible();
  expect(isCashMXNVisible).toBe(true);
  const hasMonetaryValue = await contractBreakdownPage.cashMXNHasMonetaryValue();
  expect(hasMonetaryValue).toBe(true);
});

Then('the Purchasing Power MXN item is not visible in the breakdown', async function () {
  const isPurchasingPowerVisible = await contractBreakdownPage.isPurchasingPowerMXNVisible();
  expect(isPurchasingPowerVisible).toBe(false);
});