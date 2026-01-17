const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a Casa de Bolsa Individual contract', async function () {
  await acticenterPage.selectCasaDeBolsaIndividualContract();
  await acticenterPage.verifyContractLoaded();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the USD Cash item is visible in the breakdown', async function () {
  const isUsdCashVisible = await acticenterPage.isUsdCashItemVisible();
  expect(isUsdCashVisible).toBeTruthy();
});

Then('the USD Cash item displays the amount in US dollars corresponding to the Casa de Bolsa contract', async function () {
  const usdCashValue = await acticenterPage.getUsdCashValue();
  expect(usdCashValue).toMatch(/^\$[\d,]+(\.\d{2})?\s*(USD|usd)?$/);
});