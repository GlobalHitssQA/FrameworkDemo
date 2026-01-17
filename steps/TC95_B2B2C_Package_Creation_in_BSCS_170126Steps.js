const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/bscs7-package.page');

let packagePage;

Given('I am logged into BSCS7 system with authorized credentials', async function () {
  packagePage = new BSCS7PackagePage(this.page);
  await packagePage.navigateToLogin();
  await packagePage.login(process.env.BSCS7_USER, process.env.BSCS7_PASSWORD);
});

Given('I can see the main package configuration screen', async function () {
  const isVisible = await packagePage.isMainConfigurationScreenVisible();
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

When('I enter the package capacity as {string} GB', async function (capacity) {
  await packagePage.enterCapacity(capacity);
});

When('I enter the cost without IGV as {string} soles', async function (cost) {
  await packagePage.enterCostWithoutIGV(cost);
});

When('I select the validity as {string} months', async function (months) {
  await packagePage.selectValidity(months);
});

When('I select the classification as {string}', async function (classification) {
  await packagePage.selectClassification(classification);
});

Then('the system should validate and accept the entered data', async function () {
  const isValid = await packagePage.isDataValidated();
  expect(isValid).toBeTruthy();
});

When('I configure the restriction for local consumption only', async function () {
  await packagePage.enableLocalConsumptionOnly();
});

When('I disable roaming for the package', async function () {
  await packagePage.disableRoaming();
});

When('I enable queuing for the package', async function () {
  await packagePage.enableQueuing();
});

Then('the system should register the coverage and queuing restrictions correctly', async function () {
  const restrictionsSet = await packagePage.areRestrictionsConfigured();
  expect(restrictionsSet).toBeTruthy();
});

When('I save the B2B2C 240GB package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('I should see a successful creation confirmation message', async function () {
  const message = await packagePage.getConfirmationMessage();
  expect(message).toContain('exitosa');
});

When('I navigate to the available packages list for SOLD plan', async function () {
  await packagePage.navigateToSOLDPackageList();
});

Then('I should see the B2B2C 240GB package with 12 months validity in the catalog', async function () {
  const isPackageVisible = await packagePage.isPackageInCatalog('B2B2C', '240GB', '12');
  expect(isPackageVisible).toBeTruthy();
});

Then('the package should display all configured data correctly', async function () {
  const packageData = await packagePage.getPackageDetails('B2B2C', '240GB');
  expect(packageData.capacity).toBe('240GB');
  expect(packageData.cost).toBe('296.61');
  expect(packageData.validity).toBe('12 meses');
  expect(packageData.classification).toBe('B2B2C');
  expect(packageData.localOnly).toBe(true);
  expect(packageData.roamingDisabled).toBe(true);
  expect(packageData.queuingEnabled).toBe(true);
});