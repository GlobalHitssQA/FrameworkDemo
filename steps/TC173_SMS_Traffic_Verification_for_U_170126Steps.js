const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SMSTrafficPage = require('../pages/SMSTrafficPage');

let smsTrafficPage;

Given('the user is authenticated in the system', async function () {
  smsTrafficPage = new SMSTrafficPage(this.page);
  await smsTrafficPage.navigateToSystem();
  await smsTrafficPage.login();
});

Given('the UNSOLD - SHOWROOM plan is configured in BSCS7', async function () {
  const isConfigured = await smsTrafficPage.verifyPlanConfiguredInBSCS7('UNSOLD - SHOWROOM');
  expect(isConfigured).toBeTruthy();
});

Given('the SMS service is enabled with correct tariffs', async function () {
  const isEnabled = await smsTrafficPage.verifySMSServiceEnabled();
  expect(isEnabled).toBeTruthy();
  const tariffsCorrect = await smsTrafficPage.verifySMSTariffs();
  expect(tariffsCorrect).toBeTruthy();
});

When('the user provisions a line in the UNSOLD - SHOWROOM plan', async function () {
  await smsTrafficPage.provisionLine('UNSOLD - SHOWROOM');
});

Then('the line should be provisioned correctly in the UNSOLD - SHOWROOM plan', async function () {
  const isProvisioned = await smsTrafficPage.verifyLineProvisioned('UNSOLD - SHOWROOM');
  expect(isProvisioned).toBeTruthy();
});

When('the user sends {int} local SMS messages during the billing cycle', async function (smsCount) {
  await smsTrafficPage.sendLocalSMS(smsCount);
});

Then('the system should register {int} SMS in the traffic table', async function (expectedCount) {
  const registeredCount = await smsTrafficPage.getSMSCountInTrafficTable();
  expect(registeredCount).toBe(expectedCount);
});

Then('the system should discount {int} SMS included in the plan', async function (includedSMS) {
  const discountedSMS = await smsTrafficPage.getDiscountedSMSCount();
  expect(discountedSMS).toBe(includedSMS);
});

Then('the system should mark {int} SMS as excess', async function (excessCount) {
  const excess = await smsTrafficPage.getExcessSMSCount();
  expect(excess).toBe(excessCount);
});

When('the user validates the excess charge for {int} SMS at bulk rate of {float} per message', async function (smsCount, rate) {
  await smsTrafficPage.navigateToChargesSection();
  await smsTrafficPage.validateExcessCharge(smsCount, rate);
});

Then('the system should generate a charge of {float} without IGV for the {int} SMS excess', async function (expectedCharge, smsCount) {
  const charge = await smsTrafficPage.getExcessSMSCharge();
  expect(charge).toBeCloseTo(expectedCharge, 2);
});

When('the user sends {int} roaming SMS messages', async function (roamingSMSCount) {
  await smsTrafficPage.sendRoamingSMS(roamingSMSCount);
});

Then('the system should charge {int} roaming SMS at bulk rate of {float} per message', async function (smsCount, rate) {
  const roamingRate = await smsTrafficPage.getRoamingSMSRate();
  expect(roamingRate).toBeCloseTo(rate, 2);
});

Then('the system should generate a charge of {float} without IGV for roaming SMS', async function (expectedCharge) {
  const roamingCharge = await smsTrafficPage.getRoamingSMSCharge();
  expect(roamingCharge).toBeCloseTo(expectedCharge, 2);
});