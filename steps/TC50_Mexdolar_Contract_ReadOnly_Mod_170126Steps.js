const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MexdolarContractPage = require('../pages/MexdolarContractPage');

let mexdolarPage;

Given('the user is authenticated in Acticenter', async function () {
  mexdolarPage = new MexdolarContractPage(this.page);
  await mexdolarPage.navigateToActicenter();
  await mexdolarPage.login();
});

When('the user searches and selects a Mexdolar contract for Legal Entity', async function () {
  await mexdolarPage.searchContract('Mexdolar PM');
  await mexdolarPage.selectMexdolarPMContract();
});

Then('the system loads the Mexdolar PM contract and displays the value and composition component', async function () {
  const isValueComponentVisible = await mexdolarPage.isValueComponentVisible();
  expect(isValueComponentVisible).toBeTruthy();
  const isCompositionComponentVisible = await mexdolarPage.isCompositionComponentVisible();
  expect(isCompositionComponentVisible).toBeTruthy();
});

Then('the Total Valuation breakdown shows the Cash USD field', async function () {
  await mexdolarPage.openTotalValuationBreakdown();
  const isCashUSDVisible = await mexdolarPage.isCashUSDFieldVisible();
  expect(isCashUSDVisible).toBeTruthy();
});

Then('the Cash USD amount is displayed without exchange rate conversion', async function () {
  const cashUSDValue = await mexdolarPage.getCashUSDValue();
  const hasUSDFormat = await mexdolarPage.verifyCashUSDWithoutConversion(cashUSDValue);
  expect(hasUSDFormat).toBeTruthy();
});

When('the user attempts to access the buy or sell operation function', async function () {
  await mexdolarPage.attemptToAccessOperationFunction();
});

Then('the buy or sell component is disabled', async function () {
  const isBuyDisabled = await mexdolarPage.isBuyOperationDisabled();
  const isSellDisabled = await mexdolarPage.isSellOperationDisabled();
  expect(isBuyDisabled).toBeTruthy();
  expect(isSellDisabled).toBeTruthy();
});

Then('the Mexdolar PM contract is displayed in read-only mode without enabled operation options', async function () {
  const isReadOnlyMode = await mexdolarPage.isContractInReadOnlyMode();
  expect(isReadOnlyMode).toBeTruthy();
  const hasNoOperationOptions = await mexdolarPage.verifyNoOperationOptionsEnabled();
  expect(hasNoOperationOptions).toBeTruthy();
  await mexdolarPage.closeBreakdownPopup();
});