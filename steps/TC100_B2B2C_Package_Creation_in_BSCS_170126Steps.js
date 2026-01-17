const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/BSCS7PackagePage');

let packagePage;

Given('I am logged into BSCS7 system with authorized user', async function () {
  packagePage = new BSCS7PackagePage(this.page);
  await packagePage.navigateToSystem();
  await packagePage.login();
});

Given('I can see the main package configuration screen', async function () {
  const isVisible = await packagePage.isPackageConfigurationScreenVisible();
  expect(isVisible).toBeTruthy();
});

When('I navigate to B2B2C package creation module', async function () {
  await packagePage.navigateToB2B2CModule();
});

When('I select the option to create a new package', async function () {
  await packagePage.clickCreateNewPackage();
});

Then('I should see the package creation form with capacity, cost, validity and classification fields', async function () {
  const isFormVisible = await packagePage.isPackageFormVisible();
  expect(isFormVisible).toBeTruthy();
});

When('I enter package capacity as {string}', async function (capacity) {
  await packagePage.fillPackageCapacity(capacity);
});

When('I enter package cost without IGV as {string}', async function (cost) {
  await packagePage.fillPackageCost(cost);
});

When('I enter package validity as {string} days', async function (days) {
  await packagePage.fillPackageValidity(days);
});

When('I select classification as {string}', async function (classification) {
  await packagePage.selectPackageClassification(classification);
});

Then('the system should validate and accept the entered data', async function () {
  const isValid = await packagePage.isFormDataValid();
  expect(isValid).toBeTruthy();
});

When('I configure restriction for local consumption only', async function () {
  await packagePage.selectLocalConsumptionOnly();
});

When('I disable roaming option', async function () {
  await packagePage.disableRoaming();
});

When('I enable queuing option', async function () {
  await packagePage.enableQueuing();
});

Then('the system should register coverage and queuing restrictions correctly', async function () {
  const restrictionsApplied = await packagePage.areRestrictionsApplied();
  expect(restrictionsApplied).toBeTruthy();
});

When('I save the B2B2C 36GB package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('I should see a successful creation confirmation message', async function () {
  const confirmationMessage = await packagePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('exitosa');
});

Then('the B2B2C 36GB package should appear in the SOLD plan available packages list', async function () {
  const isPackageInList = await packagePage.isPackageInSOLDPlanList('B2B2C 36GB');
  expect(isPackageInList).toBeTruthy();
});

Then('the package should display all configured data correctly', async function () {
  const packageData = await packagePage.getPackageDetails('B2B2C 36GB');
  expect(packageData.capacity).toBe('36GB');
  expect(packageData.validity).toBe('1080');
  expect(packageData.classification).toBe('B2B2C');
});