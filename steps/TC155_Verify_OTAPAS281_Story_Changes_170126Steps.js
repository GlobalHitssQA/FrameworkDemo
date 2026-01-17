const { Given, When, Then, And } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('I have access to the contract value component', async function() {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToComponent();
  await contractValuePage.waitForComponentToLoad();
});

When('I verify the buying power MXN for Casa de Bolsa uses currentcash from Modulo Asesor', async function() {
  await contractValuePage.selectCasaDeBolsaContract();
  await contractValuePage.openContractBreakdown();
});

Then('the buying power should be displayed correctly according to updated specification', async function() {
  const buyingPowerValue = await contractValuePage.getBuyingPowerMXNValue();
  expect(buyingPowerValue).toBeTruthy();
  await contractValuePage.verifyBuyingPowerMXNIsVisible();
});

Then('I verify the cash MXN for Banco shows the axis account cash', async function() {
  await contractValuePage.closeBreakdownPopup();
  await contractValuePage.selectBancoContract();
  await contractValuePage.openContractBreakdown();
});

Then('the bank cash should be displayed correctly according to updated specification', async function() {
  const cashMXNValue = await contractValuePage.getCashMXNValue();
  expect(cashMXNValue).toBeTruthy();
  await contractValuePage.verifyCashMXNIsVisible();
});

Then('I verify the cash USD for Casa de Bolsa shows the dollar currency amount', async function() {
  await contractValuePage.closeBreakdownPopup();
  await contractValuePage.selectCasaDeBolsaContract();
  await contractValuePage.openContractBreakdown();
});

Then('the Casa de Bolsa USD cash should be displayed correctly', async function() {
  const cashUSDValue = await contractValuePage.getCashUSDValue();
  expect(cashUSDValue).toBeTruthy();
  await contractValuePage.verifyCashUSDIsVisible();
});

Then('I verify the cash USD for Banco PM with Mexdolar takes SAP value without conversion', async function() {
  await contractValuePage.closeBreakdownPopup();
  await contractValuePage.selectBancoPMMexdolarContract();
  await contractValuePage.openContractBreakdown();
});

Then('the Mexdolar balance should be displayed in USD without exchange rate conversion', async function() {
  const mexdolarValue = await contractValuePage.getMexdolarUSDValue();
  expect(mexdolarValue).toBeTruthy();
  await contractValuePage.verifyMexdolarValueHasNoConversion();
});

Then('I verify the transit cash concept only takes SAP prenotes information for Banco', async function() {
  await contractValuePage.closeBreakdownPopup();
  await contractValuePage.selectBancoContractWithPrenotes();
  await contractValuePage.openContractBreakdown();
});

Then('the transit cash should only be displayed for Banco contracts with prenotes data', async function() {
  const transitCashVisible = await contractValuePage.isTransitCashVisible();
  expect(transitCashVisible).toBe(true);
  await contractValuePage.verifyTransitCashShowsPrenotesData();
});

Then('I verify Mexdolar PM contracts are displayed in read-only mode', async function() {
  await contractValuePage.closeBreakdownPopup();
  await contractValuePage.selectMexdolarPMContract();
});

Then('the buy-sell icon should be disabled for Mexdolar contracts', async function() {
  const buySellDisabled = await contractValuePage.isBuySellIconDisabled();
  expect(buySellDisabled).toBe(true);
  await contractValuePage.verifyContractIsReadOnly();
});