const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the BSCS7 system is operational with SOLD plan configured', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToSystem();
  await billingPage.verifySystemOperational();
  await billingPage.verifySoldPlanConfigured();
});

Given('bulk rates are configured at {float} PEN per MB without tax', async function (rate) {
  await billingPage.verifyBulkRateConfiguration(rate);
});

Given('active lines exist in SOLD plan', async function () {
  await billingPage.verifyActiveLinesInSoldPlan();
});

When('I configure lines in SOLD plan with data consumption of {int} MB on APN2 gmsa and {int} MB on APN5 onstarlmxp and {int} MB on APN6 onstarwifi', async function (apn2Mb, apn5Mb, apn6Mb) {
  await billingPage.configureApnConsumption('APN2', 'gmsa', apn2Mb);
  await billingPage.configureApnConsumption('APN5', 'onstarlmxp', apn5Mb);
  await billingPage.configureApnConsumption('APN6', 'onstarwifi', apn6Mb);
});

Then('the system registers {int} MB total traffic in UDR_LT_01 table distributed across specified APNs', async function (totalMb) {
  const registeredTraffic = await billingPage.getRegisteredTrafficFromUdrTable();
  expect(registeredTraffic).toBe(totalMb);
});

When('I execute the standard BSCS7 billing process for SOLD plan lines', async function () {
  await billingPage.executeBillingProcess();
});

Then('the system processes APN2 APN5 and APN6 traffic with configured bulk rate', async function () {
  await billingPage.verifyTrafficProcessedWithBulkRate();
});

When('I verify the rate applied to APN2 APN5 and APN6 traffic', async function () {
  await billingPage.openRateVerificationSection();
});

Then('the bulk rate of {float} PEN per MB without tax is applied to {int} MB consumed', async function (rate, mb) {
  const appliedRate = await billingPage.getAppliedBulkRate();
  expect(appliedRate).toBe(rate);
  const consumedMb = await billingPage.getConsumedMegabytes();
  expect(consumedMb).toBe(mb);
});

When('I calculate the total amount billed for bulk traffic from these APNs', async function () {
  await billingPage.calculateBulkTrafficTotal();
});

Then('the total amount is {float} PEN without tax for {int} MB at {float} rate', async function (expectedTotal, mb, rate) {
  const totalAmount = await billingPage.getBulkTrafficTotalAmount();
  expect(totalAmount).toBeCloseTo(expectedTotal, 2);
});

When('I verify the Additional Services section of the invoice shows bulk traffic concept for APN2 APN5 and APN6', async function () {
  await billingPage.navigateToAdditionalServicesSection();
});

Then('the invoice displays in Additional Services the data consumption with {int} MB billed at bulk for {float} PEN without tax', async function (mb, amount) {
  const isDisplayed = await billingPage.verifyBulkTrafficInAdditionalServices(mb, amount);
  expect(isDisplayed).toBe(true);
});

When('I confirm this traffic is not included in SOLD Traffic Detail section nor In Pool concepts', async function () {
  await billingPage.navigateToSoldTrafficDetailSection();
});

Then('APN2 APN5 and APN6 traffic does not appear in SOLD Traffic Detail section and only shows in standard traffic detail with bulk rate', async function () {
  const isExcludedFromSold = await billingPage.verifyTrafficExcludedFromSoldDetail();
  expect(isExcludedFromSold).toBe(true);
  const isInStandardDetail = await billingPage.verifyTrafficInStandardDetailWithBulkRate();
  expect(isInStandardDetail).toBe(true);
});