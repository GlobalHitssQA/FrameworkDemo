const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a Bank type contract', async function () {
  await acticenterPage.selectBankContract();
});

Then('the system loads the contract information and displays the total value component', async function () {
  const isVisible = await acticenterPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalValueComponent();
});

Then('a popup is displayed with the contract value breakdown', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Cash MXN item is visible in the breakdown', async function () {
  const isCashMxnVisible = await acticenterPage.isCashMxnItemVisible();
  expect(isCashMxnVisible).toBeTruthy();
});

Then('the Cash MXN amount matches the bank contract account balance', async function () {
  const cashMxnAmount = await acticenterPage.getCashMxnAmount();
  const expectedBalance = await acticenterPage.getExpectedAccountBalance();
  expect(cashMxnAmount).toBe(expectedBalance);
});