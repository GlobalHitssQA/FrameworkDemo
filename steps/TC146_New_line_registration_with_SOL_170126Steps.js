const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LineRegistrationPage = require('../pages/LineRegistrationPage');
const InstantLinkPage = require('../pages/InstantLinkPage');
const BSCS7Page = require('../pages/BSCS7Page');
const SIACUnicoPage = require('../pages/SIACUnicoPage');

let lineRegistrationPage;
let instantLinkPage;
let bscs7Page;
let siacUnicoPage;
let registeredLineNumber;

Given('the user is authenticated with line registration permissions', async function() {
  lineRegistrationPage = new LineRegistrationPage(this.page);
  await lineRegistrationPage.navigateToRegistration();
  await lineRegistrationPage.verifyUserAuthenticated();
});

Given('a SIM card is available for activation', async function() {
  await lineRegistrationPage.verifySIMCardAvailable();
});

Given('the SOLD plan and In Pool 10MB package are configured', async function() {
  await lineRegistrationPage.verifySOLDPlanConfigured();
  await lineRegistrationPage.verifyInPool10MBConfigured();
});

When('the user initiates new line registration selecting SOLD plan with corresponding parameters', async function() {
  await lineRegistrationPage.selectSOLDPlan();
  await lineRegistrationPage.fillRegistrationParameters();
  await lineRegistrationPage.submitRegistration();
  registeredLineNumber = await lineRegistrationPage.getRegisteredLineNumber();
});

Then('the system accepts the registration request and processes line provisioning', async function() {
  const isAccepted = await lineRegistrationPage.verifyRegistrationAccepted();
  expect(isAccepted).toBe(true);
});

Then('the line appears provisioned in INSTANT LINK with SOLD plan', async function() {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  await instantLinkPage.searchLine(registeredLineNumber);
  const plan = await instantLinkPage.getLinePlan();
  expect(plan).toBe('SOLD');
});

Then('the line has APNs APN1 APN2 APN3 APN4 APN5 APN6 APN7 configured', async function() {
  const configuredAPNs = await instantLinkPage.getConfiguredAPNs();
  const expectedAPNs = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  expect(configuredAPNs).toEqual(expect.arrayContaining(expectedAPNs));
});

Then('in BSCS7 the line has In Pool 10MB package automatically assigned for APN1 and APN4', async function() {
  bscs7Page = new BSCS7Page(this.page);
  await bscs7Page.navigateToBSCS7();
  await bscs7Page.searchLine(registeredLineNumber);
  const packageInfo = await bscs7Page.getInPoolPackageInfo();
  expect(packageInfo.packageName).toContain('In Pool 10MB');
  expect(packageInfo.apns).toContain('APN1');
  expect(packageInfo.apns).toContain('APN4');
});

Then('the package shows zero cost in UDR_LT_01', async function() {
  const cost = await bscs7Page.getUDRCost('UDR_LT_01');
  expect(cost).toBe(0);
});

Then('consumption on APN2 APN5 APN6 is charged at bulk rates', async function() {
  const bulkRates = await bscs7Page.getBulkRatesForAPNs(['APN2', 'APN5', 'APN6']);
  expect(bulkRates.dataRate).toBe(0.2033);
  expect(bulkRates.voiceRate).toBe(0.07);
  expect(bulkRates.smsRate).toBe(0.05);
});

Then('the line has SERVICE_VOLTE active', async function() {
  const volteStatus = await instantLinkPage.getServiceVoLTEStatus();
  expect(volteStatus).toBe('active');
});

Then('APNs APN3 and APN7 are configured for eSIM profile download', async function() {
  const esimAPNs = await instantLinkPage.getESIMConfiguredAPNs();
  expect(esimAPNs).toContain('APN3');
  expect(esimAPNs).toContain('APN7');
  const esimCost = await instantLinkPage.getESIMDownloadCost();
  expect(esimCost).toBe(0);
});

Then('the line is included in shared pool calculation before pre-billing', async function() {
  const poolCalculation = await bscs7Page.getSharedPoolCalculation();
  expect(poolCalculation.includedLines).toContain(registeredLineNumber);
  expect(poolCalculation.formula).toContain('SOLD lines × 10 MB');
});

Then('the registration transaction is recorded in SIAC Unico with date time user and SOLD plan', async function() {
  siacUnicoPage = new SIACUnicoPage(this.page);
  await siacUnicoPage.navigateToSIACUnico();
  await siacUnicoPage.searchTransaction(registeredLineNumber);
  const transaction = await siacUnicoPage.getTransactionDetails();
  expect(transaction.date).toBeTruthy();
  expect(transaction.time).toBeTruthy();
  expect(transaction.user).toBeTruthy();
  expect(transaction.plan).toBe('SOLD');
});