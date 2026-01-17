const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ManufacturePlanPage = require('../pages/ManufacturePlanPage');

let manufacturePlanPage;

Given('a line is provisioned with MANUFACTURE plan with included services', async function () {
  manufacturePlanPage = new ManufacturePlanPage(this.page);
  await manufacturePlanPage.navigateToProvisioning();
  await manufacturePlanPage.selectManufacturePlan();
  await manufacturePlanPage.provisionLine();
  const isActive = await manufacturePlanPage.verifyLineIsActive();
  expect(isActive).toBeTruthy();
  const includedServices = await manufacturePlanPage.getIncludedServices();
  expect(includedServices.voice).toBe('10 min');
  expect(includedServices.sms).toBe('10 SMS');
  expect(includedServices.data).toBe('100 MB');
});

When('the user consumes 5 SMS from the MANUFACTURE plan line', async function () {
  await manufacturePlanPage.navigateToConsumptionSimulator();
  await manufacturePlanPage.simulateSmsConsumption(5);
  await manufacturePlanPage.confirmConsumption();
});

When('the user checks the remaining SMS balance', async function () {
  await manufacturePlanPage.navigateToBalanceInquiry();
  await manufacturePlanPage.selectSmsBalanceOption();
});

Then('the system should show 5 remaining SMS from 10 included', async function () {
  const remainingSms = await manufacturePlanPage.getRemainingSmsBalance();
  expect(remainingSms).toBe(5);
  const totalIncluded = await manufacturePlanPage.getTotalIncludedSms();
  expect(totalIncluded).toBe(10);
});

Then('the invoice should not show charges for the 5 consumed SMS', async function () {
  await manufacturePlanPage.navigateToInvoiceSection();
  await manufacturePlanPage.openCurrentBillingCycle();
  const smsCharges = await manufacturePlanPage.getSmsChargesFromInvoice();
  expect(smsCharges).toBe(0);
  const smsDetail = await manufacturePlanPage.getSmsConsumptionDetail();
  expect(smsDetail.consumed).toBe(5);
  expect(smsDetail.charged).toBe(0);
  expect(smsDetail.includedUsed).toBe(5);
});