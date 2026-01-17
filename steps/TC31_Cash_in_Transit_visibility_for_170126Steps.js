const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValuationBreakdownPage = require('../pages/ValuationBreakdownPage');

let valuationBreakdownPage;

Given('the user is authenticated in Acticenter with Patrimonial, Private or Wealth Management banking permissions', async function () {
  valuationBreakdownPage = new ValuationBreakdownPage(this.page);
  await valuationBreakdownPage.navigateToActicenter();
  await valuationBreakdownPage.loginWithBankingPermissions();
  await valuationBreakdownPage.verifyMainScreenIsDisplayed();
});

When('the user selects a Casa de Bolsa contract from the contract selector', async function () {
  await valuationBreakdownPage.openContractSelector();
  await valuationBreakdownPage.selectCasaDeBolsaContract();
  await valuationBreakdownPage.verifyContractIsLoaded();
});

When('the user clicks on the Total Contract Value component to expand the breakdown', async function () {
  await valuationBreakdownPage.clickTotalContractValueComponent();
  await valuationBreakdownPage.verifyBreakdownPopupIsDisplayed();
});

Then('the Cash in Transit item should not be displayed in the breakdown list', async function () {
  const isCashInTransitVisible = await valuationBreakdownPage.isCashInTransitItemVisible();
  expect(isCashInTransitVisible).toBe(false);
});