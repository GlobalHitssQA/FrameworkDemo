const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MexdolarContractPage = require('../pages/MexdolarContractPage');

let mexdolarContractPage;

Given('the user is authenticated in Acticenter with access to Banco Persona Moral contracts', async function () {
  mexdolarContractPage = new MexdolarContractPage(this.page);
  await mexdolarContractPage.navigateToActicenter();
  await mexdolarContractPage.login();
  const isMainScreenDisplayed = await mexdolarContractPage.isMainScreenDisplayed();
  expect(isMainScreenDisplayed).toBeTruthy();
});

When('the user searches and selects a Mexdolar type contract from Banco Persona Moral', async function () {
  await mexdolarContractPage.clickSearchButton();
  await mexdolarContractPage.searchMexdolarContract();
  await mexdolarContractPage.selectMexdolarContract();
});

Then('the system displays the Mexdolar contract information in view only mode', async function () {
  const isViewOnlyMode = await mexdolarContractPage.isContractInViewOnlyMode();
  expect(isViewOnlyMode).toBeTruthy();
});

Then('all operation functionalities are disabled for the Mexdolar contract', async function () {
  const isBuyButtonDisabled = await mexdolarContractPage.isBuyButtonDisabled();
  const isSellButtonDisabled = await mexdolarContractPage.isSellButtonDisabled();
  const isTransferButtonDisabled = await mexdolarContractPage.isTransferButtonDisabled();
  expect(isBuyButtonDisabled).toBeTruthy();
  expect(isSellButtonDisabled).toBeTruthy();
  expect(isTransferButtonDisabled).toBeTruthy();
});

Then('attempting to access any operation functionality does not allow any action', async function () {
  await mexdolarContractPage.attemptToClickOperationButtons();
  const isStillInViewOnlyMode = await mexdolarContractPage.isContractInViewOnlyMode();
  expect(isStillInViewOnlyMode).toBeTruthy();
});

Then('no errors or Lumina calls are generated when trying to operate', async function () {
  const hasNoLuminaErrors = await mexdolarContractPage.verifyNoLuminaErrorsGenerated();
  const hasNoConsolErrors = await mexdolarContractPage.verifyNoConsoleErrors();
  expect(hasNoLuminaErrors).toBeTruthy();
  expect(hasNoConsolErrors).toBeTruthy();
});