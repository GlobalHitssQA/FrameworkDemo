const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LineDeactivationPage = require('../pages/LineDeactivationPage');

let lineDeactivationPage;

Given('a user with line deactivation permissions is authenticated', async function () {
  lineDeactivationPage = new LineDeactivationPage(this.page);
  await lineDeactivationPage.navigateToLogin();
  await lineDeactivationPage.loginWithDeactivationPermissions();
});

Given('an active line exists in SOLD plan with active In Pool package', async function () {
  await lineDeactivationPage.verifyActiveLineInSOLDPlan();
  await lineDeactivationPage.verifyActiveInPoolPackage();
});

Given('connection to INSTANT LINK, BSCS7 and active network is established', async function () {
  await lineDeactivationPage.verifyInstantLinkConnection();
  await lineDeactivationPage.verifyBSCS7Connection();
  await lineDeactivationPage.verifyNetworkConnection();
});

Given('In Pool calculation Shell is implemented', async function () {
  await lineDeactivationPage.verifyInPoolShellImplementation();
});

When('the user executes the line deactivation process for the SOLD plan line with active In Pool package', async function () {
  await lineDeactivationPage.selectLineForDeactivation();
  await lineDeactivationPage.initiateDeactivationProcess();
  await lineDeactivationPage.confirmDeactivation();
});

Then('the system accepts the deactivation request and processes the line deprovisioning', async function () {
  const requestAccepted = await lineDeactivationPage.isDeactivationRequestAccepted();
  expect(requestAccepted).toBeTruthy();
  const deprovisioningProcessed = await lineDeactivationPage.isDeprovisioningProcessed();
  expect(deprovisioningProcessed).toBeTruthy();
});

Then('the line appears as inactive in INSTANT LINK with deactivated services and 7 APNs unconfigured', async function () {
  await lineDeactivationPage.navigateToInstantLink();
  const lineStatus = await lineDeactivationPage.getLineStatusInInstantLink();
  expect(lineStatus).toBe('inactive');
  const servicesDeactivated = await lineDeactivationPage.areServicesDeactivatedInInstantLink();
  expect(servicesDeactivated).toBeTruthy();
  const apnsUnconfigured = await lineDeactivationPage.getUnconfiguredAPNsCount();
  expect(apnsUnconfigured).toBe(7);
});

Then('in BSCS7 the In Pool 10MB package associated to the line appears cancelled and no longer participates in calculations', async function () {
  await lineDeactivationPage.navigateToBSCS7();
  const packageStatus = await lineDeactivationPage.getInPoolPackageStatusInBSCS7();
  expect(packageStatus).toBe('cancelled');
  const participatesInCalculations = await lineDeactivationPage.doesPackageParticipateInCalculations();
  expect(participatesInCalculations).toBeFalsy();
});

Then('the In Pool calculation Shell excludes the deactivated line in the next shared pool calculation', async function () {
  await lineDeactivationPage.navigateToInPoolShell();
  const lineIncluded = await lineDeactivationPage.isLineIncludedInShellCalculation();
  expect(lineIncluded).toBeFalsy();
  const calculationFormula = await lineDeactivationPage.getShellCalculationFormula();
  expect(calculationFormula).toContain('active SOLD lines × 10 MB');
});

Then('proportional billing is generated for In Pool consumption until the deactivation date', async function () {
  await lineDeactivationPage.navigateToBillingSection();
  const proportionalChargeGenerated = await lineDeactivationPage.isProportionalChargeGenerated();
  expect(proportionalChargeGenerated).toBeTruthy();
  const chargeDetails = await lineDeactivationPage.getProportionalChargeDetails();
  expect(chargeDetails.includesUsageDays).toBeTruthy();
  expect(chargeDetails.includesExcessConsumption).toBeDefined();
});

Then('VoLTE services are deactivated in network systems HLR, HSS and IMS with SERVICE_VOLTE parameter removed', async function () {
  await lineDeactivationPage.navigateToNetworkSystems();
  const hlrStatus = await lineDeactivationPage.getVoLTEStatusInHLR();
  expect(hlrStatus).toBe('deactivated');
  const hssStatus = await lineDeactivationPage.getVoLTEStatusInHSS();
  expect(hssStatus).toBe('deactivated');
  const imsStatus = await lineDeactivationPage.getVoLTEStatusInIMS();
  expect(imsStatus).toBe('deactivated');
  const serviceVoLTEExists = await lineDeactivationPage.doesServiceVoLTEParameterExist();
  expect(serviceVoLTEExists).toBeFalsy();
});

Then('the line deactivation is typified in SIAC Unico with date, time, user and SOLD plan', async function () {
  await lineDeactivationPage.navigateToSIACUnico();
  const transactionRecord = await lineDeactivationPage.getDeactivationTransactionRecord();
  expect(transactionRecord.date).toBeDefined();
  expect(transactionRecord.time).toBeDefined();
  expect(transactionRecord.user).toBeDefined();
  expect(transactionRecord.plan).toBe('SOLD');
});