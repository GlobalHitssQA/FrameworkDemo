const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;
let apiResponse;

Given('the user is authenticated in Acticenter', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
  await valueCompositionPage.authenticate();
});

Given('a Persona Moral contract is selected', async function () {
  await valueCompositionPage.selectPersonaMoralContract();
  const isLoaded = await valueCompositionPage.isValueCompositionComponentVisible();
  expect(isLoaded).toBeTruthy();
});

When('the user clicks on the Value and Composition component', async function () {
  apiResponse = await valueCompositionPage.clickValueCompositionAndCaptureRequest();
});

Then('the system should invoke the AGAS21472 service', async function () {
  const serviceInvoked = await valueCompositionPage.verifyServiceInvocation(apiResponse, 'AGAS21472');
  expect(serviceInvoked).toBeTruthy();
});

Then('the service should return HTTP 200 with all breakdown items', async function () {
  expect(apiResponse.status).toBe(200);
  const breakdownItems = await valueCompositionPage.getBreakdownItemsFromResponse(apiResponse);
  const expectedItems = [
    'poderCompra',
    'efectivoMXN',
    'efectivoUSD',
    'pendientesPorLiquidar',
    'fondosDeuda',
    'fondosCobertura',
    'fondosRentaVariable',
    'cedesPagares',
    'mercadoDinero',
    'mercadoCapitales'
  ];
  for (const item of expectedItems) {
    expect(breakdownItems).toHaveProperty(item);
  }
});

Then('the breakdown popup should display all applicable items for Persona Moral', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const displayedItems = await valueCompositionPage.getAllDisplayedBreakdownItems();
  expect(displayedItems.length).toBeGreaterThan(0);
});

Then('the monetary values should be aligned to the right', async function () {
  const areValuesAligned = await valueCompositionPage.areMonetaryValuesRightAligned();
  expect(areValuesAligned).toBeTruthy();
});

Then('items with zero balance should display as zero currency', async function () {
  const zeroBalanceFormat = await valueCompositionPage.verifyZeroBalanceFormat();
  expect(zeroBalanceFormat).toBeTruthy();
});

When('the user verifies a Mexdolar contract', async function () {
  await valueCompositionPage.closeBreakdownPopup();
  await valueCompositionPage.selectMexdolarContract();
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the USD Cash item should be displayed without currency conversion', async function () {
  const usdCashVisible = await valueCompositionPage.isUSDCashItemVisible();
  expect(usdCashVisible).toBeTruthy();
  const hasNoConversion = await valueCompositionPage.verifyUSDCashWithoutConversion();
  expect(hasNoConversion).toBeTruthy();
});

When('the user verifies a contract without Mexdolar account', async function () {
  await valueCompositionPage.closeBreakdownPopup();
  await valueCompositionPage.selectNonMexdolarContract();
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the USD Cash item should not be displayed', async function () {
  const usdCashVisible = await valueCompositionPage.isUSDCashItemVisible();
  expect(usdCashVisible).toBeFalsy();
});