const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.login();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user searches and selects a Mexdolar Persona Moral contract', async function () {
  await acticenterPage.searchContract('Mexdolar Persona Moral');
  await acticenterPage.selectMexdolarContract();
  await acticenterPage.verifyContractLoaded();
});

Then('the buy sell icon should be visually disabled', async function () {
  const isDisabled = await acticenterPage.isBuySellIconDisabled();
  expect(isDisabled).toBeTruthy();
});

Then('clicking on the buy sell icon should not trigger any action', async function () {
  await acticenterPage.clickBuySellIcon();
  const isOperationsModuleOpen = await acticenterPage.isOperationsModuleVisible();
  expect(isOperationsModuleOpen).toBeFalsy();
});

Then('no Lumina error message should be displayed', async function () {
  const hasLuminaError = await acticenterPage.isLuminaErrorVisible();
  expect(hasLuminaError).toBeFalsy();
});