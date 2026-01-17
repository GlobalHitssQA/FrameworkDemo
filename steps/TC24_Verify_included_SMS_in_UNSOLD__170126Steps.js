const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SMSPlanPage = require('../pages/SMSPlanPage');

let smsPlanPage;

Given('a line is provisioned with UNSOLD - SHOWROOM plan with {int} included SMS', async function(includedSMS) {
  smsPlanPage = new SMSPlanPage(this.page);
  await smsPlanPage.navigateToProvisioning();
  await smsPlanPage.selectPlan('UNSOLD - SHOWROOM');
  await smsPlanPage.provisionLine();
  const planDetails = await smsPlanPage.getPlanDetails();
  expect(planDetails.includedSMS).toBe(includedSMS);
});

When('the user sends {int} SMS during the billing cycle', async function(smsCount) {
  await smsPlanPage.navigateToSMSSimulation();
  await smsPlanPage.simulateSMSSending(smsCount);
  const consumedSMS = await smsPlanPage.getConsumedSMSCount();
  expect(consumedSMS).toBe(smsCount);
});

When('the user checks the remaining SMS balance', async function() {
  await smsPlanPage.navigateToBalanceConsultation();
  await smsPlanPage.refreshBalance();
});

Then('the system should show {int} SMS remaining from the {int} included', async function(remaining, total) {
  const remainingSMS = await smsPlanPage.getRemainingSMSBalance();
  expect(remainingSMS).toBe(remaining);
  const totalIncluded = await smsPlanPage.getTotalIncludedSMS();
  expect(totalIncluded).toBe(total);
});

Then('the invoice should not show any charge for the {int} SMS consumed', async function(smsCount) {
  await smsPlanPage.navigateToInvoice();
  const smsCharges = await smsPlanPage.getSMSChargesFromInvoice();
  expect(smsCharges).toBe(0);
  const invoiceDetails = await smsPlanPage.getInvoiceSMSDetails();
  expect(invoiceDetails.consumedWithinIncluded).toBe(smsCount);
  expect(invoiceDetails.additionalCharges).toBe(0);
});