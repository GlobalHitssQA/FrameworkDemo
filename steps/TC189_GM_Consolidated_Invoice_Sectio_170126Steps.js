const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GMInvoicePage = require('../pages/GMInvoicePage');

let gmInvoicePage;

Given('the billing cycle has been executed with consumption in all plans', async function() {
  gmInvoicePage = new GMInvoicePage(this.page);
  await gmInvoicePage.verifyBillingCycleCompleted();
});

Given('the In Pool Shell has been executed', async function() {
  await gmInvoicePage.verifyInPoolShellExecuted();
});

When('I access the GM consolidated invoice', async function() {
  await gmInvoicePage.navigateToConsolidatedInvoice();
  await gmInvoicePage.waitForInvoiceToLoad();
});

Then('I should see the Receipt Summary section with all required items', async function() {
  const isVisible = await gmInvoicePage.isReceiptSummarySectionVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see Servicios In Pool item in the summary', async function() {
  const isVisible = await gmInvoicePage.isServiciosInPoolItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see Servicios In Pool Granel item in the summary', async function() {
  const isVisible = await gmInvoicePage.isServiciosInPoolGranelItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see Servicios Adicionales item in the summary', async function() {
  const isVisible = await gmInvoicePage.isServiciosAdicionalesItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see Trafico Local item in the summary', async function() {
  const isVisible = await gmInvoicePage.isTraficoLocalItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see LDI item in the summary', async function() {
  const isVisible = await gmInvoicePage.isLDIItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see Roaming item in the summary', async function() {
  const isVisible = await gmInvoicePage.isRoamingItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see Cargos del Mes item in the summary', async function() {
  const isVisible = await gmInvoicePage.isCargosMesItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see IGV item in the summary', async function() {
  const isVisible = await gmInvoicePage.isIGVItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see Total item in the summary', async function() {
  const isVisible = await gmInvoicePage.isTotalItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see the Servicios Adicionales section with non-SOLD plan consumption details', async function() {
  const isVisible = await gmInvoicePage.isServiciosAdicionalesSectionVisible();
  expect(isVisible).toBeTruthy();
  const hasNonSoldDetails = await gmInvoicePage.hasNonSoldPlanConsumptionDetails();
  expect(hasNonSoldDetails).toBeTruthy();
});

Then('I should see the Detalle Trafico section with Plan column for each line', async function() {
  const isVisible = await gmInvoicePage.isDetalleTraficoSectionVisible();
  expect(isVisible).toBeTruthy();
  const hasPlanColumn = await gmInvoicePage.hasPlanColumnInDetalleTrafico();
  expect(hasPlanColumn).toBeTruthy();
});

Then('I should see the Detalle Trafico SOLD section with In Pool telemetry consumption', async function() {
  const isVisible = await gmInvoicePage.isDetalleTraficoSOLDSectionVisible();
  expect(isVisible).toBeTruthy();
  const hasInPoolData = await gmInvoicePage.hasInPoolTelemetryConsumption();
  expect(hasInPoolData).toBeTruthy();
});

Then('I should see the LDI section with international traffic details', async function() {
  const isVisible = await gmInvoicePage.isLDISectionVisible();
  expect(isVisible).toBeTruthy();
  const hasTrafficDetails = await gmInvoicePage.hasLDITrafficDetails();
  expect(hasTrafficDetails).toBeTruthy();
});

Then('I should see the Roaming section with international roaming details', async function() {
  const isVisible = await gmInvoicePage.isRoamingSectionVisible();
  expect(isVisible).toBeTruthy();
  const hasRoamingDetails = await gmInvoicePage.hasRoamingTrafficDetails();
  expect(hasRoamingDetails).toBeTruthy();
});