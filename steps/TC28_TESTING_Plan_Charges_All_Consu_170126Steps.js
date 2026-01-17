const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestingPlanPage = require('../pages/TestingPlanPage');

let testingPlanPage;

Given('a line is provisioned on the TESTING plan without included allowances', async function () {
  testingPlanPage = new TestingPlanPage(this.page);
  await testingPlanPage.navigateToProvisioningSection();
  await testingPlanPage.selectTestingPlan();
  await testingPlanPage.provisionLineWithoutIncludedAllowances();
  const planStatus = await testingPlanPage.getLinePlanStatus();
  expect(planStatus).toContain('TESTING');
  const hasIncluded = await testingPlanPage.hasIncludedAllowances();
  expect(hasIncluded).toBe(false);
});

Given('the pre-productive APNs are enabled for the line', async function () {
  const apnList = await testingPlanPage.getEnabledAPNs();
  expect(apnList).toContain('APN1');
  expect(apnList).toContain('APN2');
  expect(apnList).toContain('APN4');
  expect(apnList).toContain('APN5');
  expect(apnList).toContain('APN6');
});

When('the user consumes {int} SMS during the billing cycle', async function (smsCount) {
  await testingPlanPage.navigateToConsumptionSimulator();
  await testingPlanPage.simulateSmsConsumption(smsCount);
});

When('the user consumes {int} minutes of voice during the billing cycle', async function (minutes) {
  await testingPlanPage.simulateVoiceConsumption(minutes);
});

When('the user consumes {int} MB of data during the billing cycle', async function (megabytes) {
  await testingPlanPage.simulateDataConsumption(megabytes);
});

Then('the system records all consumption as bulk traffic without applying included allowances', async function () {
  await testingPlanPage.navigateToConsumptionDetail();
  const consumptionType = await testingPlanPage.getConsumptionChargeType();
  expect(consumptionType).toBe('GRANEL');
});

Then('the consumption detail shows no included allowances were applied', async function () {
  const includedApplied = await testingPlanPage.getIncludedAllowancesApplied();
  expect(includedApplied).toBe('0');
});

Then('all traffic is marked for bulk rate charging', async function () {
  const allBulkRate = await testingPlanPage.isAllTrafficBulkRate();
  expect(allBulkRate).toBe(true);
});

Then('the invoice shows {int} SMS charged at {float} soles each', async function (smsCount, rate) {
  await testingPlanPage.navigateToInvoiceSection();
  const smsCharges = await testingPlanPage.getSmsChargeDetails();
  expect(smsCharges.quantity).toBe(smsCount);
  expect(smsCharges.unitRate).toBe(rate);
  expect(smsCharges.total).toBe(smsCount * rate);
});

Then('the invoice shows {int} minutes charged at {float} soles per minute', async function (minutes, rate) {
  const voiceCharges = await testingPlanPage.getVoiceChargeDetails();
  expect(voiceCharges.quantity).toBe(minutes);
  expect(voiceCharges.unitRate).toBe(rate);
  expect(voiceCharges.total).toBe(minutes * rate);
});

Then('the invoice shows {int} MB charged at {float} soles per MB', async function (megabytes, rate) {
  const dataCharges = await testingPlanPage.getDataChargeDetails();
  expect(dataCharges.quantity).toBe(megabytes);
  expect(dataCharges.unitRate).toBeCloseTo(rate, 4);
  expect(dataCharges.total).toBeCloseTo(megabytes * rate, 2);
});

Then('the total invoice amount reflects no discounts applied', async function () {
  const expectedSms = 5 * 0.05;
  const expectedVoice = 10 * 0.07;
  const expectedData = 50 * 0.2033;
  const expectedTotal = expectedSms + expectedVoice + expectedData;
  const invoiceTotal = await testingPlanPage.getInvoiceTotal();
  const discountsApplied = await testingPlanPage.getDiscountsApplied();
  expect(discountsApplied).toBe(0);
  expect(invoiceTotal).toBeCloseTo(expectedTotal, 2);
});