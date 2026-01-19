const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in Acticenter with valid credentials', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.login(process.env.ACTICENTER_USER, process.env.ACTICENTER_PASSWORD);
  const isLoggedIn = await acticenterPage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

When('the user selects a Bank type contract with cash in transit operations', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectBankContract();
  const isContractLoaded = await acticenterPage.isContractLoaded();
  expect(isContractLoaded).toBeTruthy();
});

When('the user clicks on the value and composition component to display the breakdown', async function () {
  await acticenterPage.clickValueCompositionComponent();
});

Then('the popup with the contract breakdown items is displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the {string} item is visible in the breakdown', async function (itemName) {
  const isItemVisible = await acticenterPage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
});

Then('the value shown in {string} matches the SAP prenotes service information', async function (itemName) {
  const displayedValue = await acticenterPage.getBreakdownItemValue(itemName);
  const sapPrenotesValue = await acticenterPage.getSapPrenotesValue();
  expect(displayedValue).toBe(sapPrenotesValue);
});

When('the user selects a Brokerage House type contract and opens the composition breakdown', async function () {
  await acticenterPage.closeBreakdownPopup();
  await acticenterPage.openContractSearch();
  await acticenterPage.selectBrokerageHouseContract();
  await acticenterPage.clickValueCompositionComponent();
});

Then('the popup displays showing applicable items', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the {string} item is not displayed for Brokerage House contracts', async function (itemName) {
  const isItemVisible = await acticenterPage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeFalsy();
});