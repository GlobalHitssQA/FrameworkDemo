const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ManufactureLinePage = require('../pages/ManufactureLinePage');

let manufacturePage;

Given('the user is authenticated with line registration permissions', async function () {
  manufacturePage = new ManufactureLinePage(this.page);
  await manufacturePage.navigateToLineRegistration();
  await manufacturePage.verifyUserAuthenticated();
});

Given('a SIM card is available for activation', async function () {
  await manufacturePage.verifySIMCardAvailable();
});

Given('the system has active connection to INSTANT LINK, BSCS7 and network', async function () {
  await manufacturePage.verifySystemConnections();
});

Given('the MANUFACTURE plan is configured in the system', async function () {
  await manufacturePage.verifyManufacturePlanConfigured();
});

When('the user executes the new line registration process selecting the MANUFACTURE plan with its corresponding parameters', async function () {
  await manufacturePage.selectManufacturePlan();
  await manufacturePage.fillLineRegistrationParameters();
  await manufacturePage.submitLineRegistration();
});

Then('the system accepts the registration request and processes the line provision', async function () {
  const isAccepted = await manufacturePage.verifyRegistrationAccepted();
  expect(isAccepted).toBeTruthy();
});

Then('the line is provisioned in INSTANT LINK with MANUFACTURE RATEPLAN and 7 productive APNs', async function () {
  await manufacturePage.navigateToInstantLink();
  const ratePlan = await manufacturePage.getProvisionedRatePlan();
  expect(ratePlan).toBe('MANUFACTURE');
  const apns = await manufacturePage.getConfiguredAPNs();
  expect(apns).toEqual(['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7']);
});

Then('the line has configured included units in BSCS7: 10 minutes VOICE, 10 SMS and 100 MB data', async function () {
  await manufacturePage.navigateToBSCS7();
  const freeUnits = await manufacturePage.getFreeUnitsConfiguration();
  expect(freeUnits.voiceMinutes).toBe(10);
  expect(freeUnits.smsCount).toBe(10);
  expect(freeUnits.dataMB).toBe(100);
});

Then('the excess consumption is billed at bulk rates: VOICE S\/.0.07\/min, SMS S\/.0.05\/message, DATA S\/.0.2033\/MB without IGV', async function () {
  const bulkRates = await manufacturePage.getBulkRatesConfiguration();
  expect(bulkRates.voicePerMin).toBe(0.07);
  expect(bulkRates.smsPerMessage).toBe(0.05);
  expect(bulkRates.dataPerMB).toBe(0.2033);
});

Then('the line has VoLTE enabled and APN3 and APN7 allow eSIM profile download', async function () {
  const volteEnabled = await manufacturePage.verifyVoLTEEnabled();
  expect(volteEnabled).toBeTruthy();
  const esimAPNs = await manufacturePage.getESIMConfiguredAPNs();
  expect(esimAPNs).toContain('APN3');
  expect(esimAPNs).toContain('APN7');
});

Then('the registration transaction is recorded in SIAC Unico with date, time, user and MANUFACTURE plan', async function () {
  await manufacturePage.navigateToSIACUnico();
  const transactionRecord = await manufacturePage.getTransactionRecord();
  expect(transactionRecord.date).toBeTruthy();
  expect(transactionRecord.time).toBeTruthy();
  expect(transactionRecord.user).toBeTruthy();
  expect(transactionRecord.plan).toBe('MANUFACTURE');
});