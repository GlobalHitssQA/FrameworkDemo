const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InstantLinkPage = require('../pages/InstantLinkPage');
const SiacUnicoPage = require('../pages/SiacUnicoPage');

let instantLinkPage;
let siacUnicoPage;
let transactionId;

Given('the user is authenticated in Instant Link with admin permissions', async function () {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToLogin();
  await instantLinkPage.loginWithAdminCredentials();
  await instantLinkPage.verifyAdminDashboardIsDisplayed();
});

Given('the connection between Instant Link and network elements is active', async function () {
  await instantLinkPage.navigateToNetworkStatus();
  await instantLinkPage.verifyNetworkElementsConnectionActive();
});

Given('the Life Cycle RATEPLAN configuration is synchronized', async function () {
  await instantLinkPage.navigateToRatePlanConfiguration();
  await instantLinkPage.verifyLifeCycleRatePlansAreSynchronized();
});

When('the user navigates to the GM line search section', async function () {
  await instantLinkPage.navigateToLineSearch();
});

When('the user searches for a General Motors line with the new Life Cycle', async function () {
  await instantLinkPage.searchGMLineWithLifeCycle();
});

When('the user selects the GM line from the search results', async function () {
  await instantLinkPage.selectFirstGMLineFromResults();
});

Then('the system displays the GM line information with current provisioning data', async function () {
  const lineInfo = await instantLinkPage.getLineProvisioningInfo();
  expect(lineInfo.lineNumber).toBeTruthy();
  expect(lineInfo.currentPlan).toBeTruthy();
  expect(lineInfo.provisioningStatus).toBeTruthy();
});

When('the user executes a plan change action for a Life Cycle RATEPLAN', async function () {
  await instantLinkPage.clickPlanChangeAction();
});

When('the user selects the SOLD RATEPLAN from the available options', async function () {
  await instantLinkPage.selectRatePlan('SOLD');
});

When('the user confirms the RATEPLAN change action', async function () {
  transactionId = await instantLinkPage.confirmRatePlanChange();
});

Then('Instant Link processes the request and sends RATEPLAN parameters to network elements', async function () {
  await instantLinkPage.waitForProvisioningComplete();
  const provisioningStatus = await instantLinkPage.getProvisioningStatus();
  expect(provisioningStatus).toBe('COMPLETED');
});

When('the user accesses the Instant Link logs section', async function () {
  await instantLinkPage.navigateToLogsSection();
});

When('the user searches for the recent RATEPLAN provisioning transaction', async function () {
  await instantLinkPage.searchTransactionInLogs(transactionId);
});

Then('the RATEPLAN parameters are correctly provisioned in network elements', async function () {
  const logDetails = await instantLinkPage.getTransactionLogDetails();
  expect(logDetails.hlrHssStatus).toBe('SUCCESS');
  expect(logDetails.imsStatus).toBe('SUCCESS');
  expect(logDetails.pcrfStatus).toBe('SUCCESS');
});

Then('the APNs and VoLTE services are configured according to the plan matrix', async function () {
  const serviceConfig = await instantLinkPage.getServiceConfiguration();
  expect(serviceConfig.apnsConfigured).toBe(true);
  expect(serviceConfig.volteEnabled).toBe(true);
});

Then('the Split Billing configuration is correctly applied', async function () {
  const billingConfig = await instantLinkPage.getSplitBillingConfiguration();
  expect(billingConfig.isConfigured).toBe(true);
});

When('the user navigates to SIAC Unico system', async function () {
  siacUnicoPage = new SiacUnicoPage(this.page);
  await siacUnicoPage.navigateToSiacUnico();
});

When('the user searches for the executed transaction', async function () {
  await siacUnicoPage.searchTransaction(transactionId);
});

Then('the transaction appears correctly typified in SIAC Unico', async function () {
  const transactionExists = await siacUnicoPage.verifyTransactionExists();
  expect(transactionExists).toBe(true);
});

Then('the transaction details show date time and action executed', async function () {
  const transactionDetails = await siacUnicoPage.getTransactionDetails();
  expect(transactionDetails.date).toBeTruthy();
  expect(transactionDetails.time).toBeTruthy();
  expect(transactionDetails.actionType).toBe('PLAN_CHANGE');
  expect(transactionDetails.ratePlan).toBe('SOLD');
});