const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MexdolarContractPage = require('../pages/MexdolarContractPage');

let mexdolarContractPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  mexdolarContractPage = new MexdolarContractPage(this.page);
  await mexdolarContractPage.navigateToActicenter();
  const isMainScreenVisible = await mexdolarContractPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Mexdolar Persona Moral contract', async function () {
  await mexdolarContractPage.openContractSearch();
  await mexdolarContractPage.searchMexdolarPersonaMoralContract();
  await mexdolarContractPage.selectMexdolarContract();
});

Then('the contract information should be displayed', async function () {
  const isContractInfoVisible = await mexdolarContractPage.isContractInformationDisplayed();
  expect(isContractInfoVisible).toBeTruthy();
});

Then('the contract should be in view-only mode without operation options', async function () {
  const isViewOnlyMode = await mexdolarContractPage.isContractInViewOnlyMode();
  expect(isViewOnlyMode).toBeTruthy();
  const areOperationButtonsHidden = await mexdolarContractPage.areOperationButtonsHidden();
  expect(areOperationButtonsHidden).toBeTruthy();
});

Then('the system should not allow buy or sell operations on the contract', async function () {
  const isBuyButtonDisabledOrHidden = await mexdolarContractPage.isBuyOperationDisabled();
  const isSellButtonDisabledOrHidden = await mexdolarContractPage.isSellOperationDisabled();
  expect(isBuyButtonDisabledOrHidden).toBeTruthy();
  expect(isSellButtonDisabledOrHidden).toBeTruthy();
});