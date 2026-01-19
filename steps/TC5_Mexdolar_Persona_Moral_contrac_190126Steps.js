const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MexdolarContractPage = require('../pages/MexdolarContractPage');

let mexdolarContractPage;

Given('the user is authenticated in Acticenter with access to Persona Moral Mexdolar contracts', async function () {
  mexdolarContractPage = new MexdolarContractPage(this.page);
  await mexdolarContractPage.navigateToActicenter();
  await mexdolarContractPage.loginWithMexdolarAccess();
  const isLoggedIn = await mexdolarContractPage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

When('the user searches and selects a Persona Moral contract with associated Mexdolar account', async function () {
  await mexdolarContractPage.openContractSearch();
  await mexdolarContractPage.searchMexdolarPersonaMoralContract();
  await mexdolarContractPage.selectMexdolarContract();
  const isContractDisplayed = await mexdolarContractPage.isContractDisplayed();
  expect(isContractDisplayed).toBeTruthy();
});

When('the user clicks on the value and composition component to view the breakdown', async function () {
  await mexdolarContractPage.clickValueCompositionComponent();
  const isPopupVisible = await mexdolarContractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the cash amount should be displayed as "Efectivo USD" without conversion to Mexican pesos', async function () {
  const cashLabel = await mexdolarContractPage.getCashFieldLabel();
  expect(cashLabel).toContain('Efectivo USD');
  const hasNoMxnConversion = await mexdolarContractPage.verifyCashDisplayedInUSD();
  expect(hasNoMxnConversion).toBeTruthy();
});

Then('the contract should be displayed in view-only mode without operation options', async function () {
  const isViewOnly = await mexdolarContractPage.isContractInViewOnlyMode();
  expect(isViewOnly).toBeTruthy();
  const hasNoOperationOptions = await mexdolarContractPage.hasNoOperationOptions();
  expect(hasNoOperationOptions).toBeTruthy();
});

Then('the buy\/sell icon should be disabled and not allow opening operation options', async function () {
  const isBuySellDisabled = await mexdolarContractPage.isBuySellIconDisabled();
  expect(isBuySellDisabled).toBeTruthy();
  const cannotOpenOperations = await mexdolarContractPage.verifyBuySellNotClickable();
  expect(cannotOpenOperations).toBeTruthy();
});

Then('a visual indicator or message should inform that the contract is view-only', async function () {
  const hasViewOnlyIndicator = await mexdolarContractPage.hasViewOnlyIndicator();
  expect(hasViewOnlyIndicator).toBeTruthy();
  const indicatorMessage = await mexdolarContractPage.getViewOnlyMessage();
  expect(indicatorMessage).toBeTruthy();
});