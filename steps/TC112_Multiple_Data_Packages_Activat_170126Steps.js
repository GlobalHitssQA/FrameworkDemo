const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageActivationPage = require('../pages/PackageActivationPage');

let packageActivationPage;

Given('a user with an active GM line on SOLD plan', async function () {
  packageActivationPage = new PackageActivationPage(this.page);
  await packageActivationPage.navigateToPackageManagement();
  await packageActivationPage.selectActiveGMLine();
});

Given('multiple TRIAL 6GB and B2B2C packages available for activation', async function () {
  const packagesAvailable = await packageActivationPage.verifyPackagesAvailable();
  expect(packagesAvailable).toBeTruthy();
});

Given('BSCS7 system configured with queuing rules', async function () {
  const bscs7Configured = await packageActivationPage.verifyBSCS7Configuration();
  expect(bscs7Configured).toBeTruthy();
});

When('the user activates a first B2B2C 6GB package on the SOLD plan line', async function () {
  await packageActivationPage.selectPackageType('B2B2C');
  await packageActivationPage.selectPackageSize('6GB');
  await packageActivationPage.clickActivatePackage();
});

Then('the B2B2C 6GB package is activated and remains in active status for consumption', async function () {
  const packageStatus = await packageActivationPage.getPackageStatus('B2B2C', '6GB');
  expect(packageStatus).toBe('active');
});

When('the user activates a second B2B2C 10GB package on the same line while the first is active', async function () {
  await packageActivationPage.selectPackageType('B2B2C');
  await packageActivationPage.selectPackageSize('10GB');
  await packageActivationPage.clickActivatePackage();
});

Then('the second B2B2C 10GB package is activated but remains in queued status', async function () {
  const packageStatus = await packageActivationPage.getPackageStatus('B2B2C', '10GB');
  expect(packageStatus).toBe('queued');
});

When('the user verifies in BSCS7 the status of both activated packages', async function () {
  await packageActivationPage.navigateToBSCS7Console();
  await packageActivationPage.queryPackageStatuses();
});

Then('the system shows the first package as active and the second as queued', async function () {
  const firstPackageStatus = await packageActivationPage.getBSCS7PackageStatus(1);
  const secondPackageStatus = await packageActivationPage.getBSCS7PackageStatus(2);
  expect(firstPackageStatus).toBe('active');
  expect(secondPackageStatus).toBe('queued');
});

When('the user activates a third TRIAL 6GB package on the same line', async function () {
  await packageActivationPage.navigateToPackageManagement();
  await packageActivationPage.selectPackageType('TRIAL');
  await packageActivationPage.selectPackageSize('6GB');
  await packageActivationPage.clickActivatePackage();
});

Then('the third TRIAL 6GB package is activated and remains in queued status', async function () {
  const packageStatus = await packageActivationPage.getPackageStatus('TRIAL', '6GB');
  expect(packageStatus).toBe('queued');
});

When('the user queries the package queue associated with the line', async function () {
  await packageActivationPage.openPackageQueueView();
});

Then('the system correctly shows 3 packages: 1 active and 2 queued in activation order', async function () {
  const queueSummary = await packageActivationPage.getPackageQueueSummary();
  expect(queueSummary.totalPackages).toBe(3);
  expect(queueSummary.activeCount).toBe(1);
  expect(queueSummary.queuedCount).toBe(2);
  const queueOrder = await packageActivationPage.verifyQueueOrder();
  expect(queueOrder).toBeTruthy();
});