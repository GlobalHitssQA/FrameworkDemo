const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ManufacturePlanPage = require('../pages/ManufacturePlanPage');

let manufacturePlanPage;

Given('a line is provisioned in MANUFACTURE plan with 100 MB of included data', async function() {
  manufacturePlanPage = new ManufacturePlanPage(this.page);
  await manufacturePlanPage.navigateToProvisioningSection();
  await manufacturePlanPage.provisionLineWithManufacturePlan();
  await manufacturePlanPage.setIncludedDataMB(100);
  const isProvisioned = await manufacturePlanPage.verifyLineProvisioned();
  expect(isProvisioned).toBeTruthy();
});

Given('I verify in BSCS7 that the line has 100 MB of included data in the cycle', async function() {
  await manufacturePlanPage.navigateToBSCS7Console();
  const includedData = await manufacturePlanPage.getIncludedDataFromBSCS7();
  expect(includedData).toBe('100 MB');
});

When('I consume 80 MB of data through APN2 within the billing cycle', async function() {
  await manufacturePlanPage.navigateToDataConsumptionSection();
  await manufacturePlanPage.selectAPN('APN2');
  await manufacturePlanPage.registerDataConsumption(80);
});

Then('the consumption is deducted from included data without additional charges', async function() {
  const remainingData = await manufacturePlanPage.getRemainingIncludedData();
  expect(remainingData).toBe('20 MB');
  const additionalCharges = await manufacturePlanPage.getAdditionalCharges();
  expect(additionalCharges).toBe('0.00');
});

When('I consume an additional 50 MB of data through APN2 exceeding the 100 MB included', async function() {
  await manufacturePlanPage.registerDataConsumption(50);
});

Then('the system registers 30 MB of excess at bulk rate of 0.2033 PEN per MB without tax', async function() {
  const excessData = await manufacturePlanPage.getExcessDataMB();
  expect(excessData).toBe('30');
  const bulkRate = await manufacturePlanPage.getBulkRatePerMB();
  expect(bulkRate).toBe('0.2033');
});

Then('I verify in the invoice that only the 30 MB excess is charged', async function() {
  await manufacturePlanPage.navigateToInvoiceSection();
  await manufacturePlanPage.openCurrentCycleInvoice();
});

Then('the invoice shows the charge only for the 30 MB excess at bulk rate', async function() {
  const invoiceExcessCharge = await manufacturePlanPage.getInvoiceExcessDataCharge();
  const expectedCharge = (30 * 0.2033).toFixed(2);
  expect(invoiceExcessCharge).toBe(expectedCharge);
  const includedDataCharge = await manufacturePlanPage.getInvoiceIncludedDataCharge();
  expect(includedDataCharge).toBe('0.00');
});