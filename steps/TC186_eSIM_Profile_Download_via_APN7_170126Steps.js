const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ESIMProfilePage = require('../pages/ESIMProfilePage');

let esimProfilePage;

Given('GM lines are provisioned in MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD and DORMANT plans with APN7 configured', async function() {
  esimProfilePage = new ESIMProfilePage(this.page);
  await esimProfilePage.navigateToProvisioningSection();
  await esimProfilePage.provisionLinesWithAPN7([
    'MANUFACTURE',
    'UNSOLD NOT IN SHOWROOM',
    'UNSOLD SHOWROOM',
    'SOLD',
    'DORMANT'
  ]);
  const provisioningStatus = await esimProfilePage.getProvisioningStatus();
  expect(provisioningStatus).toBe('success');
});

When('I initiate eSIM profile download process from devices in each plan using APN7', async function() {
  await esimProfilePage.navigateToESIMDownloadSection();
  await esimProfilePage.initiateESIMDownloadForAllPlans();
  const connectionStatus = await esimProfilePage.getAPN7ConnectionStatus();
  expect(connectionStatus).toBe('connected');
});

When('I complete the eSIM profile download for each line', async function() {
  await esimProfilePage.completeESIMDownloadProcess();
  await esimProfilePage.waitForDownloadCompletion();
});

Then('the eSIM profile should download successfully without errors for all lines', async function() {
  const downloadResults = await esimProfilePage.getDownloadResultsForAllLines();
  for (const result of downloadResults) {
    expect(result.status).toBe('success');
    expect(result.errors).toHaveLength(0);
  }
});

Then('I verify in BSCS7 that APN7 traffic has zero cost in UDR_LT_01 table', async function() {
  await esimProfilePage.navigateToBSCS7Console();
  await esimProfilePage.queryUDRLT01Table();
  const trafficRecords = await esimProfilePage.getAPN7TrafficRecords();
  for (const record of trafficRecords) {
    expect(record.cost).toBe(0);
  }
});

Then('the consolidated GM invoice should not include charges for eSIM profile downloads', async function() {
  await esimProfilePage.navigateToInvoiceSection();
  await esimProfilePage.openConsolidatedGMInvoice();
  const apn7Charges = await esimProfilePage.getAPN7ChargesFromInvoice();
  expect(apn7Charges).toBe(0);
  const hasESIMDownloadCharges = await esimProfilePage.hasESIMDownloadCharges();
  expect(hasESIMDownloadCharges).toBe(false);
});