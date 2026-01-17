const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SimChangePage = require('../pages/SimChangePage');
const InstantLinkPage = require('../pages/InstantLinkPage');
const Bscs7Page = require('../pages/Bscs7Page');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');
const NetworkServicesPage = require('../pages/NetworkServicesPage');
const SiacUnicoPage = require('../pages/SiacUnicoPage');

let simChangePage;
let instantLinkPage;
let bscs7Page;
let inPoolCalculationPage;
let networkServicesPage;
let siacUnicoPage;
let testData;

Given('I am authenticated as a user with SIM change permissions', async function() {
  simChangePage = new SimChangePage(this.page);
  await simChangePage.navigateToSimChangeModule();
  await simChangePage.verifyUserHasSimChangePermissions();
});

Given('there is an active line on SOLD plan with existing In Pool package', async function() {
  testData = {
    lineNumber: this.parameters.lineNumber,
    currentIccid: this.parameters.currentIccid,
    plan: 'SOLD',
    inPoolPackage: '10MB'
  };
  await simChangePage.searchLine(testData.lineNumber);
  await simChangePage.verifyLineIsActive();
  await simChangePage.verifyLinePlan(testData.plan);
  await simChangePage.verifyInPoolPackageExists(testData.inPoolPackage);
});

Given('a new SIM card is available for assignment', async function() {
  testData.newIccid = this.parameters.newIccid;
  await simChangePage.verifyNewSimAvailable(testData.newIccid);
});

When('I execute the SIM change process entering the new ICCID', async function() {
  await simChangePage.enterNewIccid(testData.newIccid);
  await simChangePage.submitSimChangeRequest();
  await simChangePage.waitForProcessingComplete();
});

Then('the system accepts the SIM change request and processes the update', async function() {
  const status = await simChangePage.getSimChangeStatus();
  expect(status).toBe('PROCESSED');
  const confirmationMessage = await simChangePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('SIM change completed successfully');
});

Then('the line appears in INSTANT LINK with the new ICCID and SOLD plan', async function() {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  await instantLinkPage.searchByIccid(testData.newIccid);
  const lineIccid = await instantLinkPage.getLineIccid();
  expect(lineIccid).toBe(testData.newIccid);
  const linePlan = await instantLinkPage.getLinePlan();
  expect(linePlan).toBe('SOLD');
});

Then('the APNs APN1 through APN7 are correctly configured', async function() {
  const expectedApns = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  const configuredApns = await instantLinkPage.getConfiguredApns();
  for (const apn of expectedApns) {
    expect(configuredApns).toContain(apn);
  }
});

Then('the In Pool 10MB package remains active in BSCS7 with the new ICCID', async function() {
  bscs7Page = new Bscs7Page(this.page);
  await bscs7Page.navigateToBscs7();
  await bscs7Page.searchByIccid(testData.newIccid);
  const packageStatus = await bscs7Page.getInPoolPackageStatus();
  expect(packageStatus).toBe('ACTIVE');
  const packageSize = await bscs7Page.getInPoolPackageSize();
  expect(packageSize).toBe('10MB');
});

Then('the line is included in the In Pool shared pool calculation', async function() {
  inPoolCalculationPage = new InPoolCalculationPage(this.page);
  await inPoolCalculationPage.navigateToInPoolCalculation();
  await inPoolCalculationPage.searchLineInPool(testData.newIccid);
  const isIncluded = await inPoolCalculationPage.isLineIncludedInCalculation();
  expect(isIncluded).toBe(true);
  const calculationFormula = await inPoolCalculationPage.getCalculationFormula();
  expect(calculationFormula).toContain('SOLD lines × 10 MB');
});

Then('the VoLTE services are provisioned correctly in HLR HSS and IMS', async function() {
  networkServicesPage = new NetworkServicesPage(this.page);
  await networkServicesPage.navigateToNetworkServices();
  await networkServicesPage.searchByIccid(testData.newIccid);
  const hlrStatus = await networkServicesPage.getVolteStatusInHlr();
  expect(hlrStatus).toBe('PROVISIONED');
  const hssStatus = await networkServicesPage.getVolteStatusInHss();
  expect(hssStatus).toBe('PROVISIONED');
  const imsStatus = await networkServicesPage.getVolteStatusInIms();
  expect(imsStatus).toBe('PROVISIONED');
});

Then('the APNs APN3 and APN7 allow eSIM profile download without cost', async function() {
  await instantLinkPage.navigateToApnConfiguration();
  const apn3EsimEnabled = await instantLinkPage.isEsimDownloadEnabled('APN3');
  expect(apn3EsimEnabled).toBe(true);
  const apn3Cost = await instantLinkPage.getEsimDownloadCost('APN3');
  expect(apn3Cost).toBe(0);
  const apn7EsimEnabled = await instantLinkPage.isEsimDownloadEnabled('APN7');
  expect(apn7EsimEnabled).toBe(true);
  const apn7Cost = await instantLinkPage.getEsimDownloadCost('APN7');
  expect(apn7Cost).toBe(0);
});

Then('the SIM change transaction is registered in SIAC Unico with all required details', async function() {
  siacUnicoPage = new SiacUnicoPage(this.page);
  await siacUnicoPage.navigateToSiacUnico();
  await siacUnicoPage.searchTransaction(testData.lineNumber, 'SIM_CHANGE');
  const transactionExists = await siacUnicoPage.isTransactionRegistered();
  expect(transactionExists).toBe(true);
  const transactionDetails = await siacUnicoPage.getTransactionDetails();
  expect(transactionDetails.date).toBeTruthy();
  expect(transactionDetails.time).toBeTruthy();
  expect(transactionDetails.user).toBeTruthy();
  expect(transactionDetails.previousIccid).toBe(testData.currentIccid);
  expect(transactionDetails.newIccid).toBe(testData.newIccid);
  expect(transactionDetails.plan).toBe('SOLD');
});