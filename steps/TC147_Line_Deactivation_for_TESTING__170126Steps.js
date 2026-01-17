const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LineDeactivationPage = require('../pages/LineDeactivationPage');

let lineDeactivationPage;

Given('a user with line deactivation permissions is authenticated', async function () {
  lineDeactivationPage = new LineDeactivationPage(this.page);
  await lineDeactivationPage.navigateToLoginPage();
  await lineDeactivationPage.loginWithDeactivationPermissions();
  const isAuthenticated = await lineDeactivationPage.isUserAuthenticated();
  expect(isAuthenticated).toBeTruthy();
});

Given('an active line exists in TESTING plan', async function () {
  await lineDeactivationPage.navigateToLineManagement();
  const lineExists = await lineDeactivationPage.verifyActiveLineInTestingPlan();
  expect(lineExists).toBeTruthy();
});

Given('connection to INSTANT LINK, BSCS7 and active network is established', async function () {
  const instantLinkConnected = await lineDeactivationPage.verifyInstantLinkConnection();
  const bscs7Connected = await lineDeactivationPage.verifyBSCS7Connection();
  const networkActive = await lineDeactivationPage.verifyNetworkConnection();
  expect(instantLinkConnected).toBeTruthy();
  expect(bscs7Connected).toBeTruthy();
  expect(networkActive).toBeTruthy();
});

When('the user executes the line deactivation process for the TESTING plan line', async function () {
  await lineDeactivationPage.selectLineForDeactivation();
  await lineDeactivationPage.initiateDeactivationProcess();
  await lineDeactivationPage.confirmDeactivation();
});

Then('the system accepts the deactivation request and processes the line deprovisioning', async function () {
  const requestAccepted = await lineDeactivationPage.isDeactivationRequestAccepted();
  const deprovisioningStarted = await lineDeactivationPage.isDeprovisioningInProgress();
  expect(requestAccepted).toBeTruthy();
  expect(deprovisioningStarted).toBeTruthy();
});

Then('the line appears as inactive in INSTANT LINK with deactivated services and unconfigured APNs', async function () {
  await lineDeactivationPage.navigateToInstantLink();
  const lineStatus = await lineDeactivationPage.getLineStatusInInstantLink();
  const servicesDeactivated = await lineDeactivationPage.areServicesDeactivatedInInstantLink();
  const apnsUnconfigured = await lineDeactivationPage.areAPNsUnconfigured();
  expect(lineStatus).toBe('inactive');
  expect(servicesDeactivated).toBeTruthy();
  expect(apnsUnconfigured).toBeTruthy();
});

Then('in BSCS7 the line has inactive status and proportional billing is generated if applicable', async function () {
  await lineDeactivationPage.navigateToBSCS7();
  const bscs7Status = await lineDeactivationPage.getLineStatusInBSCS7();
  const billingGenerated = await lineDeactivationPage.isProportionalBillingGenerated();
  expect(bscs7Status).toBe('inactive');
  expect(billingGenerated).toBeTruthy();
});

Then('VoLTE services are deactivated in HLR, HSS and IMS network systems', async function () {
  const hlrDeactivated = await lineDeactivationPage.isVoLTEDeactivatedInHLR();
  const hssDeactivated = await lineDeactivationPage.isVoLTEDeactivatedInHSS();
  const imsDeactivated = await lineDeactivationPage.isVoLTEDeactivatedInIMS();
  expect(hlrDeactivated).toBeTruthy();
  expect(hssDeactivated).toBeTruthy();
  expect(imsDeactivated).toBeTruthy();
});

Then('the SERVICE_VOLTE parameter is removed', async function () {
  const parameterRemoved = await lineDeactivationPage.isServiceVoLTEParameterRemoved();
  expect(parameterRemoved).toBeTruthy();
});

Then('the deactivation transaction is registered in SIAC Unico with date, time, user and TESTING plan', async function () {
  await lineDeactivationPage.navigateToSIACUnico();
  const transactionRegistered = await lineDeactivationPage.isDeactivationTransactionRegistered();
  const transactionDetails = await lineDeactivationPage.getTransactionDetails();
  expect(transactionRegistered).toBeTruthy();
  expect(transactionDetails.date).toBeTruthy();
  expect(transactionDetails.time).toBeTruthy();
  expect(transactionDetails.user).toBeTruthy();
  expect(transactionDetails.plan).toBe('TESTING');
});