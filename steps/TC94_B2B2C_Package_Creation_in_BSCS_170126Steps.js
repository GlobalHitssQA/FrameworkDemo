const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/BSCS7PackagePage');

let packagePage;

Given('I am logged into BSCS7 system with authorized credentials', async function () {
  packagePage = new BSCS7PackagePage(this.page);
  await packagePage.navigateToSystem();
  await packagePage.login();
});

Given('I can see the main package configuration screen', async function () {
  const isVisible = await packagePage.isPackageConfigurationScreenVisible();
  expect(isVisible).toBeTruthy();
});

When('I navigate to the B2B2C package creation module', async function () {
  await packagePage.navigateToB2B2CModule();
});

When('I select the option to create a new package', async function () {
  await packagePage.clickCreateNewPackage();
});

Then('I should see the package creation form with capacity, cost, validity and classification fields', async function () {
  const isFormVisible = await packagePage.isPackageFormVisible();
  expect(isFormVisible).toBeTruthy();
});

When('I enter the package capacity as {string}', async function (capacity) {
  await packagePage.enterCapacity(capacity);
});

When('I enter the cost without IGV as {string}', async function (cost) {
  await packagePage.enterCostWithoutIGV(cost);
});

When('I enter the validity as {string} days', async function (days) {
  await packagePage.enterValidityDays(days);
});

When('I select the classification as {string}', async function (classification) {
  await packagePage.selectClassification(classification);
});

Then('the system should validate and accept the entered data', async function () {
  const isDataValid = await packagePage.isDataValidated();
  expect(isDataValid).toBeTruthy();
});

When('I configure the restriction for local consumption only', async function () {
  await packagePage.enableLocalConsumptionOnly();
});

When('I disable roaming option', async function () {
  await packagePage.disableRoaming();
});

When('I enable the queuing option', async function () {
  await packagePage.enableQueuing();
});

Then('the system should register the coverage and queuing restrictions correctly', async function () {
  const areRestrictionsSet = await packagePage.areRestrictionsConfigured();
  expect(areRestrictionsSet).toBeTruthy();
});

When('I save the B2B2C 60GB package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('I should see a confirmation message for successful package creation', async function () {
  const confirmationMessage = await packagePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('exitosa');
});

Then('the B2B2C 60GB package should appear in the available packages list for SOLD plan', async function () {
  const isPackageInList = await packagePage.isPackageInSOLDPlanList('B2B2C 60GB');
  expect(isPackageInList).toBeTruthy();
});

Then('the package should display all configured data correctly', async function () {
  const packageData = await packagePage.getPackageDetails('B2B2C 60GB');
  expect(packageData.capacity).toBe('60GB');
  expect(packageData.validity).toBe('360');
  expect(packageData.classification).toBe('B2B2C');
});