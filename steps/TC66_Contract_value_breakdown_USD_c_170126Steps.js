const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a contract with USD currency handling is available', async function () {
  await contractBreakdownPage.verifyUsdContractIsAvailable();
});

When('the user selects the contract with USD currency', async function () {
  await contractBreakdownPage.selectUsdContract();
});

Then('the system displays the operation screen with the total contract value component', async function () {
  const isVisible = await contractBreakdownPage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the USD Cash item is visible in the breakdown', async function () {
  const isUsdCashVisible = await contractBreakdownPage.isUsdCashItemVisible();
  expect(isUsdCashVisible).toBeTruthy();
});

When('the user inspects the text color of the USD Cash item', async function () {
  this.usdCashTextColor = await contractBreakdownPage.getUsdCashTextColor();
});

Then('the text color matches the hexadecimal code specified in the Figma Look and Feel', async function () {
  const expectedColor = contractBreakdownPage.getExpectedUsdCashTextColor();
  const actualColor = this.usdCashTextColor;
  expect(actualColor).toBe(expectedColor);
});