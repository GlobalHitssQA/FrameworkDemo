const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterContractPage;

Given('the user is authenticated in Acticenter', async function () {
  acticenterContractPage = new ActicenterContractPage(this.page);
  await acticenterContractPage.navigateToActicenter();
  await acticenterContractPage.login();
  const isMainScreenVisible = await acticenterContractPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Mexdolar Persona Moral contract', async function () {
  await acticenterContractPage.openContractSearch();
  await acticenterContractPage.searchMexdolarPersonaMoralContract();
  await acticenterContractPage.selectFirstContractResult();
});

Then('the contract is displayed in read-only mode', async function () {
  const isReadOnly = await acticenterContractPage.isContractInReadOnlyMode();
  expect(isReadOnly).toBeTruthy();
});

Then('the operations icon is disabled', async function () {
  const isOperationsIconDisabled = await acticenterContractPage.isOperationsIconDisabled();
  expect(isOperationsIconDisabled).toBeTruthy();
});

Then('the buy\/sell module is not accessible', async function () {
  const isBuySellAccessible = await acticenterContractPage.canAccessBuySellModule();
  expect(isBuySellAccessible).toBeFalsy();
});

Then('only contract values can be consulted without operation options', async function () {
  const hasContractValues = await acticenterContractPage.areContractValuesVisible();
  const hasOperationOptions = await acticenterContractPage.areOperationOptionsVisible();
  expect(hasContractValues).toBeTruthy();
  expect(hasOperationOptions).toBeFalsy();
});