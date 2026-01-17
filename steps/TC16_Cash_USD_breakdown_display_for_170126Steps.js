const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterPage;

Given('I am authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterContractPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('I select a Casa de Bolsa Persona Moral contract from the contract selector', async function () {
  await acticenterPage.openContractSelector();
  await acticenterPage.selectCasaBolsaPersonaMoralContract();
});

Then('the system displays the total contract value component', async function () {
  const isVisible = await acticenterPage.isTotalContractValueVisible();
  expect(isVisible).toBeTruthy();
});

When('I click on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValue();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Cash USD item appears in the breakdown list', async function () {
  const isCashUsdVisible = await acticenterPage.isCashUsdItemVisible();
  expect(isCashUsdVisible).toBeTruthy();
});

Then('the Cash USD value is displayed with USD currency format', async function () {
  const cashUsdValue = await acticenterPage.getCashUsdValue();
  const hasValidUsdFormat = acticenterPage.isValidUsdCurrencyFormat(cashUsdValue);
  expect(hasValidUsdFormat).toBeTruthy();
});