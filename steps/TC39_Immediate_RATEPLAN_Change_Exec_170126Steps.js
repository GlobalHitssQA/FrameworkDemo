const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PlanChangePage = require('../pages/BSCS7PlanChangePage');

let bscs7Page;
let requestDateTime;
let planChangeResult;
let lineStatus;
let activationDate;
let servicesStatus;

Given('I record the current system date and time before requesting the plan change', async function() {
  bscs7Page = new BSCS7PlanChangePage(this.page);
  requestDateTime = await bscs7Page.recordCurrentDateTime();
  expect(requestDateTime).toBeTruthy();
});

When('I execute a plan change from source RATEPLAN to destination RATEPLAN in BSCS7', async function() {
  await bscs7Page.navigateToPlanChangeSection();
  await bscs7Page.selectSourceRateplan();
  await bscs7Page.selectDestinationRateplan();
  planChangeResult = await bscs7Page.executePlanChange();
});

Then('the system processes the plan change request successfully', async function() {
  const isProcessed = await bscs7Page.verifyPlanChangeProcessed();
  expect(isProcessed).toBe(true);
});

Then('I verify in BSCS7 that the RATEPLAN was updated immediately', async function() {
  lineStatus = await bscs7Page.queryCurrentLineStatus();
  const isUpdatedImmediately = await bscs7Page.verifyRateplanUpdatedImmediately();
  expect(isUpdatedImmediately).toBe(true);
});

Then('the new plan activation date matches the request date', async function() {
  activationDate = await bscs7Page.getNewPlanActivationDate();
  const requestDate = requestDateTime.split(' ')[0];
  const activationDateOnly = activationDate.split(' ')[0];
  expect(activationDateOnly).toBe(requestDate);
});

Then('all new RATEPLAN attributes including services APNs and VoLTE are active on the same day', async function() {
  servicesStatus = await bscs7Page.verifyAllServicesActive();
  expect(servicesStatus.services).toBe(true);
  expect(servicesStatus.includedPackages).toBe(true);
  expect(servicesStatus.apns).toBe(true);
  expect(servicesStatus.volte).toBe(true);
});