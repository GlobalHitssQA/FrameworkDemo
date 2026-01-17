const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ManufacturePlanPage = require('../pages/ManufacturePlanPage');

let manufacturePlanPage;

Given('a line is provisioned in MANUFACTURE plan with 10 included voice minutes and VoLTE enabled', async function () {
  manufacturePlanPage = new ManufacturePlanPage(this.page);
  await manufacturePlanPage.navigateToLineProvisioning();
  await manufacturePlanPage.provisionLineWithManufacturePlan();
  await manufacturePlanPage.enableVoLTE();
  await manufacturePlanPage.setIncludedVoiceMinutes(10);
  await manufacturePlanPage.confirmProvisioning();
  const isProvisioned = await manufacturePlanPage.isLineProvisionedSuccessfully();
  expect(isProvisioned).toBeTruthy();
});

Given('the system shows the line with 10 included minutes and SERVICE_VOLTE parameter active in BSCS7', async function () {
  await manufacturePlanPage.navigateToBSCS7();
  await manufacturePlanPage.searchProvisionedLine();
  const includedMinutes = await manufacturePlanPage.getIncludedMinutesFromBSCS7();
  const volteStatus = await manufacturePlanPage.getVoLTEStatusFromBSCS7();
  expect(includedMinutes).toBe('10');
  expect(volteStatus).toBe('ACTIVE');
});

When('the user makes 8 minutes of voice calls within the billing cycle', async function () {
  await manufacturePlanPage.navigateToCallSimulator();
  await manufacturePlanPage.simulateVoiceCall(8);
  await manufacturePlanPage.confirmCallExecution();
});

Then('the consumption is deducted from included minutes without additional charges', async function () {
  await manufacturePlanPage.navigateToConsumptionSummary();
  const remainingMinutes = await manufacturePlanPage.getRemainingIncludedMinutes();
  const additionalCharges = await manufacturePlanPage.getAdditionalCharges();
  expect(remainingMinutes).toBe('2');
  expect(additionalCharges).toBe('0.00');
});

When('the user makes 5 additional minutes of calls exceeding the 10 included minutes', async function () {
  await manufacturePlanPage.navigateToCallSimulator();
  await manufacturePlanPage.simulateVoiceCall(5);
  await manufacturePlanPage.confirmCallExecution();
});

Then('the system registers 3 excess minutes at bulk rate of 0.07 per minute without tax', async function () {
  await manufacturePlanPage.navigateToConsumptionDetails();
  const excessMinutes = await manufacturePlanPage.getExcessMinutes();
  const bulkRate = await manufacturePlanPage.getBulkRatePerMinute();
  expect(excessMinutes).toBe('3');
  expect(bulkRate).toBe('0.07');
});

Then('the invoice shows charges only for the 3 excess minutes at bulk rate', async function () {
  await manufacturePlanPage.navigateToInvoice();
  const invoiceExcessMinutes = await manufacturePlanPage.getInvoiceExcessMinutes();
  const invoiceExcessCharge = await manufacturePlanPage.getInvoiceExcessCharge();
  const includedMinutesCharge = await manufacturePlanPage.getIncludedMinutesCharge();
  expect(invoiceExcessMinutes).toBe('3');
  expect(invoiceExcessCharge).toBe('0.21');
  expect(includedMinutesCharge).toBe('0.00');
});

Then('the network records confirm calls were made using VoLTE technology', async function () {
  await manufacturePlanPage.navigateToNetworkRecords();
  const callTechnology = await manufacturePlanPage.getCallTechnology();
  expect(callTechnology).toBe('VoLTE');
});