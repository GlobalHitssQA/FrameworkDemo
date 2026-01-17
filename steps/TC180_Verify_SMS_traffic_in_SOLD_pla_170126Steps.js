const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SoldPlanSmsPage = require('../pages/SoldPlanSmsPage');

let soldPlanSmsPage;

Given('a line is provisioned in the SOLD plan with SMS service enabled and no SMS included', async function () {
  soldPlanSmsPage = new SoldPlanSmsPage(this.page);
  await soldPlanSmsPage.navigateToProvisioningSection();
  await soldPlanSmsPage.provisionLineWithSoldPlan();
  await soldPlanSmsPage.enableSmsService();
  const smsStatus = await soldPlanSmsPage.getSmsServiceStatus();
  expect(smsStatus).toBe('active');
  const includedSms = await soldPlanSmsPage.getIncludedSmsCount();
  expect(includedSms).toBe(0);
});

When('the user sends 60 local SMS messages during the billing cycle', async function () {
  await soldPlanSmsPage.navigateToSmsTrafficSection();
  await soldPlanSmsPage.sendLocalSmsMessages(60);
});

Then('the system should register 60 SMS in the traffic table', async function () {
  const registeredSms = await soldPlanSmsPage.getRegisteredLocalSmsCount();
  expect(registeredSms).toBe(60);
});

Then('all 60 SMS should be charged at bulk rate without deducting included SMS', async function () {
  const chargeType = await soldPlanSmsPage.getSmsChargeType();
  expect(chargeType).toBe('bulk');
  const deductedIncluded = await soldPlanSmsPage.getDeductedIncludedSms();
  expect(deductedIncluded).toBe(0);
});

Then('the system should generate a charge of 3.00 soles without IGV for 60 local SMS at 0.05 per message', async function () {
  const localSmsCharge = await soldPlanSmsPage.getLocalSmsChargeWithoutIgv();
  expect(localSmsCharge).toBe(3.00);
  const ratePerMessage = await soldPlanSmsPage.getLocalSmsRatePerMessage();
  expect(ratePerMessage).toBe(0.05);
});

When('the user sends 8 roaming SMS messages', async function () {
  await soldPlanSmsPage.navigateToRoamingSmsSection();
  await soldPlanSmsPage.sendRoamingSmsMessages(8);
});

Then('the system should register 8 roaming SMS in the traffic table', async function () {
  const registeredRoamingSms = await soldPlanSmsPage.getRegisteredRoamingSmsCount();
  expect(registeredRoamingSms).toBe(8);
});

Then('the system should generate a charge of 0.40 soles without IGV for 8 roaming SMS at 0.05 per message', async function () {
  const roamingSmsCharge = await soldPlanSmsPage.getRoamingSmsChargeWithoutIgv();
  expect(roamingSmsCharge).toBe(0.40);
  const roamingRatePerMessage = await soldPlanSmsPage.getRoamingSmsRatePerMessage();
  expect(roamingRatePerMessage).toBe(0.05);
});