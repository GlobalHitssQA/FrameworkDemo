const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in Acticenter with a valid contract selected', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.authenticateUser();
  await acticenterPage.selectFirstAvailableContract();
  const isContractDisplayed = await acticenterPage.isContractScreenDisplayed();
  expect(isContractDisplayed).toBeTruthy();
});

When('the user clicks on the Contract Value and Composition component', async function () {
  await acticenterPage.clickContractValueComponent();
});

Then('the system displays the breakdown popup with contract details', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the popup shows Buying Power, Cash, and Funds sections', async function () {
  const hasBuyingPower = await acticenterPage.isBuyingPowerSectionVisible();
  const hasCash = await acticenterPage.isCashSectionVisible();
  const hasFunds = await acticenterPage.isFundsSectionVisible();
  expect(hasBuyingPower).toBeTruthy();
  expect(hasCash).toBeTruthy();
  expect(hasFunds).toBeTruthy();
});

When('the user selects a different contract using the search function without closing the popup', async function () {
  await acticenterPage.clickSearchFunction();
  await acticenterPage.selectDifferentContract();
});

Then('the system automatically closes the previous breakdown popup', async function () {
  const isPopupClosed = await acticenterPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});

Then('the Contract Value and Composition component displays the new contract data', async function () {
  const hasNewContractData = await acticenterPage.isNewContractDataDisplayed();
  expect(hasNewContractData).toBeTruthy();
});

Then('the breakdown popup is not displayed', async function () {
  const isPopupHidden = await acticenterPage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});