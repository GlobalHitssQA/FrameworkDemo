const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const UnsoldShowroomPage = require('../pages/UnsoldShowroomPage');

let unsoldShowroomPage;

Given('a line is provisioned with UNSOLD SHOWROOM plan with 2GB data included', async function () {
  unsoldShowroomPage = new UnsoldShowroomPage(this.page);
  await unsoldShowroomPage.navigateToProvisioningSection();
  await unsoldShowroomPage.selectUnsoldShowroomPlan();
  await unsoldShowroomPage.provisionLine();
  const planStatus = await unsoldShowroomPage.getPlanStatus();
  expect(planStatus).toContain('UNSOLD - SHOWROOM');
  const dataIncluded = await unsoldShowroomPage.getDataIncluded();
  expect(dataIncluded).toBe('2 GB');
});

Given('the line has 100 minutes voice and 100 SMS included', async function () {
  const voiceIncluded = await unsoldShowroomPage.getVoiceMinutesIncluded();
  expect(voiceIncluded).toBe('100');
  const smsIncluded = await unsoldShowroomPage.getSmsIncluded();
  expect(smsIncluded).toBe('100');
});

When('the line consumes 1.5GB of data through configured APNs during billing cycle', async function () {
  await unsoldShowroomPage.navigateToConsumptionSection();
  await unsoldShowroomPage.simulateDataConsumption('1.5');
  await unsoldShowroomPage.waitForConsumptionRegistration();
});

Then('the system should register consumption of 1.5GB deducted from 2GB included', async function () {
  const consumedData = await unsoldShowroomPage.getConsumedData();
  expect(consumedData).toBe('1.5 GB');
  const consumptionStatus = await unsoldShowroomPage.getConsumptionStatus();
  expect(consumptionStatus).toContain('Incluido');
});

Then('the remaining data balance should show 0.5GB or 512MB', async function () {
  const remainingBalance = await unsoldShowroomPage.getRemainingDataBalance();
  const isValidBalance = remainingBalance === '0.5 GB' || remainingBalance === '512 MB';
  expect(isValidBalance).toBeTruthy();
});

When('the user verifies the invoice for the billing period', async function () {
  await unsoldShowroomPage.navigateToInvoiceSection();
  await unsoldShowroomPage.openCurrentBillingPeriodInvoice();
});

Then('the invoice should not show additional charges for the 1.5GB consumed', async function () {
  const additionalDataCharges = await unsoldShowroomPage.getAdditionalDataCharges();
  expect(additionalDataCharges).toBe('$0.00');
  const hasExtraCharges = await unsoldShowroomPage.hasExtraDataCharges();
  expect(hasExtraCharges).toBeFalsy();
});

Then('the consumption should be marked as included in the plan', async function () {
  const consumptionLabel = await unsoldShowroomPage.getDataConsumptionLabel();
  expect(consumptionLabel).toContain('Incluido');
  const invoiceDetailSection = await unsoldShowroomPage.getInvoiceDetailTrafficSection();
  expect(invoiceDetailSection).toContain('UNSOLD - SHOWROOM');
});