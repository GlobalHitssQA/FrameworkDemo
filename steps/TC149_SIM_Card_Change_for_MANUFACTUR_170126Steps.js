const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SimChangePage = require('../pages/SimChangePage');

let simChangePage;
let testData = {
  previousIccid: '',
  newIccid: '',
  msisdn: ''
};

Given('the user is authenticated with SIM change permissions', async function() {
  simChangePage = new SimChangePage(this.page);
  await simChangePage.navigateToLogin();
  await simChangePage.loginWithSimChangePermissions();
  const isLoggedIn = await simChangePage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Given('an active line exists with MANUFACTURE plan', async function() {
  await simChangePage.navigateToLineManagement();
  testData.msisdn = await simChangePage.selectActiveManufactureLine();
  testData.previousIccid = await simChangePage.getCurrentIccid();
  const planName = await simChangePage.getLinePlanName();
  expect(planName).toContain('MANUFACTURE');
});

Given('a new SIM card is available', async function() {
  await simChangePage.navigateToSimInventory();
  testData.newIccid = await simChangePage.getAvailableSimCard();
  const isAvailable = await simChangePage.isSimCardAvailable(testData.newIccid);
  expect(isAvailable).toBeTruthy();
});

When('the user executes the SIM change process entering the new ICCID', async function() {
  await simChangePage.navigateToSimChangeModule();
  await simChangePage.selectLineForSimChange(testData.msisdn);
  await simChangePage.enterNewIccid(testData.newIccid);
  await simChangePage.confirmSimChangeRequest();
});

Then('the system accepts the SIM change request and processes the update', async function() {
  const confirmationMessage = await simChangePage.getSimChangeConfirmation();
  expect(confirmationMessage).toContain('SIM change processed successfully');
  const requestStatus = await simChangePage.getSimChangeRequestStatus();
  expect(requestStatus).toBe('COMPLETED');
});

Then('the line appears in INSTANT LINK with new ICCID and MANUFACTURE plan', async function() {
  await simChangePage.navigateToInstantLink();
  await simChangePage.searchLineInInstantLink(testData.msisdn);
  const iccidInInstantLink = await simChangePage.getIccidFromInstantLink();
  expect(iccidInInstantLink).toBe(testData.newIccid);
  const ratePlan = await simChangePage.getRatePlanFromInstantLink();
  expect(ratePlan).toContain('MANUFACTURE');
});

Then('the APNs APN1 through APN7 are configured correctly', async function() {
  const configuredApns = await simChangePage.getConfiguredApnsFromInstantLink();
  const expectedApns = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  for (const apn of expectedApns) {
    expect(configuredApns).toContain(apn);
  }
});

Then('the BSCS7 Free Units remain configured with 10 min VOICE, 10 SMS and 100 MB', async function() {
  await simChangePage.navigateToBscs7();
  await simChangePage.searchLineInBscs7(testData.msisdn);
  const freeUnits = await simChangePage.getFreeUnitsFromBscs7();
  expect(freeUnits.voiceMinutes).toBe(10);
  expect(freeUnits.smsCount).toBe(10);
  expect(freeUnits.dataMb).toBe(100);
  const iccidInBscs7 = await simChangePage.getIccidFromBscs7();
  expect(iccidInBscs7).toBe(testData.newIccid);
});

Then('the VoLTE services are provisioned correctly in HLR, HSS and IMS', async function() {
  await simChangePage.navigateToNetworkProvisioning();
  await simChangePage.searchLineInNetworkSystems(testData.msisdn);
  const hlrVolteStatus = await simChangePage.getVolteStatusFromHlr();
  expect(hlrVolteStatus).toBe('ACTIVE');
  const hssVolteStatus = await simChangePage.getVolteStatusFromHss();
  expect(hssVolteStatus).toBe('ACTIVE');
  const imsVolteStatus = await simChangePage.getVolteStatusFromIms();
  expect(imsVolteStatus).toBe('ACTIVE');
});

Then('the APNs APN3 and APN7 allow eSIM profile download without cost', async function() {
  await simChangePage.navigateToApnConfiguration();
  const apn3Config = await simChangePage.getApnConfiguration('APN3');
  expect(apn3Config.esimDownloadEnabled).toBeTruthy();
  expect(apn3Config.esimDownloadCost).toBe(0);
  const apn7Config = await simChangePage.getApnConfiguration('APN7');
  expect(apn7Config.esimDownloadEnabled).toBeTruthy();
  expect(apn7Config.esimDownloadCost).toBe(0);
});

Then('the SIM change transaction is registered in SIAC Unico with timestamp, user, previous ICCID and new ICCID', async function() {
  await simChangePage.navigateToSiacUnico();
  await simChangePage.searchTransactionInSiacUnico(testData.msisdn);
  const transaction = await simChangePage.getSimChangeTransactionDetails();
  expect(transaction.previousIccid).toBe(testData.previousIccid);
  expect(transaction.newIccid).toBe(testData.newIccid);
  expect(transaction.timestamp).toBeDefined();
  expect(transaction.userId).toBeDefined();
  expect(transaction.transactionType).toBe('SIM_CHANGE');
});