const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a Banco Persona Moral contract with an associated Mexdolar account', async function () {
  await acticenterPage.selectBancoPersonaMoralContract();
  await acticenterPage.verifyContractLoaded();
  await acticenterPage.verifyTotalValueComponentDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the USD Cash section is visible in the breakdown', async function () {
  const isUsdCashVisible = await acticenterPage.isUsdCashSectionVisible();
  expect(isUsdCashVisible).toBeTruthy();
});

Then('the USD Cash amount matches the Mexdolar account balance', async function () {
  const usdCashAmount = await acticenterPage.getUsdCashAmount();
  const mexdolarBalance = await acticenterPage.getMexdolarAccountBalance();
  expect(usdCashAmount).toBe(mexdolarBalance);
});