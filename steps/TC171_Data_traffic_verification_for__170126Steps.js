const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const UnsoldShowroomPage = require('../pages/UnsoldShowroomPage');

let unsoldShowroomPage;

Given('a line is provisioned in the UNSOLD - SHOWROOM plan with productive APNs', async function () {
  unsoldShowroomPage = new UnsoldShowroomPage(this.page);
  await unsoldShowroomPage.navigateToProvisioningSection();
  await unsoldShowroomPage.selectPlan('UNSOLD - SHOWROOM');
  await unsoldShowroomPage.configureProductiveAPNs(['APN1', 'APN2', 'APN4', 'APN5', 'APN6', 'APN7']);
  await unsoldShowroomPage.confirmProvisioning();
  const provisioningStatus = await unsoldShowroomPage.getProvisioningStatus();
  expect(provisioningStatus).toBe('Provisioned');
});

When('the line generates 150 MB of data traffic through productive APNs', async function () {
  await unsoldShowroomPage.navigateToTrafficSimulation();
  await unsoldShowroomPage.enterDataConsumption('150');
  await unsoldShowroomPage.selectAPNSource('productive');
  await unsoldShowroomPage.generateTraffic();
});

Then('the system records the consumption in the UDR_LT_01 table', async function () {
  await unsoldShowroomPage.navigateToUDRTable();
  const recordedConsumption = await unsoldShowroomPage.getRecordedConsumption();
  expect(recordedConsumption).toBe('150');
});

Then('the system discounts 100 MB included in the plan', async function () {
  const includedMBUsed = await unsoldShowroomPage.getIncludedMBUsed();
  expect(includedMBUsed).toBe('100');
});

Then('the system charges 50 MB excess at bulk rate of {float} per MB', async function (rate) {
  const excessMB = await unsoldShowroomPage.getExcessMB();
  const appliedRate = await unsoldShowroomPage.getAppliedBulkRate();
  expect(excessMB).toBe('50');
  expect(parseFloat(appliedRate)).toBeCloseTo(rate, 4);
});

Then('the total excess charge is {float} soles without IGV', async function (expectedCharge) {
  const totalCharge = await unsoldShowroomPage.getTotalExcessCharge();
  expect(parseFloat(totalCharge)).toBeCloseTo(expectedCharge, 2);
});