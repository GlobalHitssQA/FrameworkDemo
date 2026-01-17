const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const APN6ConnectivityPage = require('../pages/APN6ConnectivityPage');

let apn6Page;

Given('a line is provisioned with MANUFACTURE plan and APN6 configured for WiFi traffic', async function () {
  apn6Page = new APN6ConnectivityPage(this.page);
  await apn6Page.navigateToProvisioningModule();
  await apn6Page.selectManufacturePlan();
  await apn6Page.configureAPN6ForWiFi();
  await apn6Page.submitProvisioning();
  const isProvisioned = await apn6Page.isLineProvisionedSuccessfully();
  expect(isProvisioned).toBeTruthy();
});

When('I verify in BSCS7 that APN6 is assigned and active for the line', async function () {
  await apn6Page.navigateToBSCS7Console();
  await apn6Page.searchLineInBSCS7();
  await apn6Page.openAPNConfiguration();
});

Then('the system displays APN6 associated with the line in productive status', async function () {
  const apnStatus = await apn6Page.getAPN6Status();
  expect(apnStatus).toBe('ACTIVO');
  const apnName = await apn6Page.getAPN6Name();
  expect(apnName).toBe('onstarawificp');
});

When('I initiate a data session through APN6 for WiFi traffic from the device', async function () {
  await apn6Page.navigateToDataSessionModule();
  await apn6Page.initiateWiFiDataSession();
});

Then('the system establishes the data session correctly through APN6', async function () {
  const sessionStatus = await apn6Page.getDataSessionStatus();
  expect(sessionStatus).toBe('ESTABLECIDA');
  const sessionAPN = await apn6Page.getSessionAPNType();
  expect(sessionAPN).toContain('APN6');
});

When('I perform WiFi data traffic through APN6', async function () {
  await apn6Page.executeWiFiTrafficTest();
  await apn6Page.waitForTrafficCompletion();
});

Then('the traffic flows correctly and is recorded in UDR_LT_01 table', async function () {
  await apn6Page.navigateToUDRRecords();
  const trafficRecord = await apn6Page.searchTrafficInUDRLT01();
  expect(trafficRecord).toBeTruthy();
  const recordStatus = await apn6Page.getUDRRecordStatus();
  expect(recordStatus).toBe('REGISTRADO');
});

Then('the traffic through APN6 is billed in bulk at rate of S\/. {float} per MB without IGV', async function (expectedRate) {
  await apn6Page.navigateToBillingModule();
  const billingType = await apn6Page.getBillingType();
  expect(billingType).toBe('GRANEL');
  const ratePerMB = await apn6Page.getRatePerMB();
  expect(ratePerMB).toBe(expectedRate);
  const includesIGV = await apn6Page.doesRateIncludeIGV();
  expect(includesIGV).toBeFalsy();
});