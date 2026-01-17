const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MexdolarContractPage = require('../pages/MexdolarContractPage');

let mexdolarContractPage;

Given('the user is authenticated in Acticenter with access to Banco Persona Moral contracts', async function () {
  mexdolarContractPage = new MexdolarContractPage(this.page);
  await mexdolarContractPage.navigateToActicenter();
  await mexdolarContractPage.login();
  await mexdolarContractPage.verifyMainScreenDisplayed();
});

When('the user searches and selects a Mexdolar type Banco Persona Moral contract', async function () {
  await mexdolarContractPage.openContractSearch();
  await mexdolarContractPage.searchMexdolarContract();
  await mexdolarContractPage.selectMexdolarContract();
});

Then('the system displays the selected Mexdolar contract information', async function () {
  const isContractInfoVisible = await mexdolarContractPage.isContractInfoDisplayed();
  expect(isContractInfoVisible).toBeTruthy();
  const contractType = await mexdolarContractPage.getContractType();
  expect(contractType).toContain('Mexdolar');
});

Then('the buy\/sell icon should be displayed in disabled or unavailable state', async function () {
  const isIconDisabled = await mexdolarContractPage.isBuySellIconDisabled();
  expect(isIconDisabled).toBeTruthy();
});

When('the user attempts to click on the buy\/sell icon', async function () {
  await mexdolarContractPage.attemptClickBuySellIcon();
});

Then('the system should not allow interaction and should not open any operation functionality', async function () {
  const isOperationPanelVisible = await mexdolarContractPage.isOperationPanelVisible();
  expect(isOperationPanelVisible).toBeFalsy();
});

Then('the contract should only display information in view-only mode without buy or sell options', async function () {
  const isViewOnlyMode = await mexdolarContractPage.isContractInViewOnlyMode();
  expect(isViewOnlyMode).toBeTruthy();
  const areBuyOptionsAvailable = await mexdolarContractPage.areBuyOptionsAvailable();
  expect(areBuyOptionsAvailable).toBeFalsy();
  const areSellOptionsAvailable = await mexdolarContractPage.areSellOptionsAvailable();
  expect(areSellOptionsAvailable).toBeFalsy();
});