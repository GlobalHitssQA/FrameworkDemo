const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DormantPlanPage = require('../pages/DormantPlanPage');

let dormantPlanPage;

Given('a line is provisioned on DORMANT plan without included allowances', async function () {
  dormantPlanPage = new DormantPlanPage(this.page);
  await dormantPlanPage.navigateToProvisioning();
  await dormantPlanPage.selectDormantPlan();
  await dormantPlanPage.provisionLineWithoutIncludes();
  const planStatus = await dormantPlanPage.getPlanStatus();
  expect(planStatus).toContain('DORMANT');
});

Given('all productive APNs are enabled including APN1 APN2 APN3 APN4 APN5 APN6 and APN7', async function () {
  const apnList = await dormantPlanPage.getEnabledAPNs();
  expect(apnList).toContain('APN1');
  expect(apnList).toContain('APN2');
  expect(apnList).toContain('APN3');
  expect(apnList).toContain('APN4');
  expect(apnList).toContain('APN5');
  expect(apnList).toContain('APN6');
  expect(apnList).toContain('APN7');
});

When('the user consumes 3 SMS 5 voice minutes and 30 MB of data during the billing cycle', async function () {
  await dormantPlanPage.navigateToConsumptionSimulator();
  await dormantPlanPage.registerSMSConsumption(3);
  await dormantPlanPage.registerVoiceConsumption(5);
  await dormantPlanPage.registerDataConsumption(30);
  await dormantPlanPage.confirmConsumptionRegistration();
});

Then('the system registers all consumption as bulk traffic without applying included allowances', async function () {
  await dormantPlanPage.navigateToConsumptionDetails();
  const consumptionType = await dormantPlanPage.getConsumptionType();
  expect(consumptionType).toBe('GRANEL');
  const includedApplied = await dormantPlanPage.hasIncludedAllowancesApplied();
  expect(includedApplied).toBe(false);
});

When('the user attempts to download eSIM profile through APN3 or APN7', async function () {
  await dormantPlanPage.navigateToESIMManagement();
  await dormantPlanPage.initiateESIMDownload();
});

Then('the system allows eSIM profile download without restrictions', async function () {
  const downloadStatus = await dormantPlanPage.getESIMDownloadStatus();
  expect(downloadStatus).toBe('SUCCESS');
  const restrictionMessage = await dormantPlanPage.getRestrictionMessage();
  expect(restrictionMessage).toBeNull();
});

When('the user verifies the cycle invoice', async function () {
  await dormantPlanPage.navigateToInvoice();
  await dormantPlanPage.selectCurrentBillingCycle();
});

Then('the invoice shows 3 SMS charged at 0.05 soles each', async function () {
  const smsCharges = await dormantPlanPage.getSMSCharges();
  expect(smsCharges.quantity).toBe(3);
  expect(smsCharges.unitPrice).toBe(0.05);
  expect(smsCharges.total).toBe(0.15);
});

Then('the invoice shows 5 minutes charged at 0.07 soles each', async function () {
  const voiceCharges = await dormantPlanPage.getVoiceCharges();
  expect(voiceCharges.quantity).toBe(5);
  expect(voiceCharges.unitPrice).toBe(0.07);
  expect(voiceCharges.total).toBe(0.35);
});

Then('the invoice shows 30 MB charged at 0.2033 soles', async function () {
  const dataCharges = await dormantPlanPage.getDataCharges();
  expect(dataCharges.quantity).toBe(30);
  expect(dataCharges.total).toBeCloseTo(0.2033, 4);
});

Then('the total amount reflects complete bulk rate billing', async function () {
  const totalAmount = await dormantPlanPage.getTotalInvoiceAmount();
  const expectedTotal = 0.15 + 0.35 + 0.2033;
  expect(totalAmount).toBeCloseTo(expectedTotal, 2);
  const billingType = await dormantPlanPage.getBillingType();
  expect(billingType).toBe('GRANEL');
});