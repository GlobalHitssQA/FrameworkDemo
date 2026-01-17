const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/bscs7-package.page');

let packagePage;

Given('I am logged into BSCS7 system with authorized user credentials', async function () {
  packagePage = new BSCS7PackagePage(this.page);
  await packagePage.navigateToLoginPage();
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
  const isFormVisible = await packagePage.isPackageCreationFormVisible();
  expect(isFormVisible).toBeTruthy();
});

When('I enter the package capacity as {string} GB', async function (capacity) {
  await packagePage.enterPackageCapacity(capacity);
});

When('I enter the cost without IGV as {string} soles', async function (cost) {
  await packagePage.enterCostWithoutIGV(cost);
});

When('I enter the validity as {string} days', async function (days) {
  await packagePage.enterValidityDays(days);
});

When('I select the classification as {string}', async function (classification) {
  await packagePage.selectClassification(classification);
});

Then('the system should validate and accept the entered data', async function () {
  const isValid = await packagePage.isDataValidated();
  expect(isValid).toBeTruthy();
});

When('I configure the restriction for local consumption only', async function () {
  await packagePage.configureLocalConsumptionOnly();
});

When('I configure roaming as disabled', async function () {
  await packagePage.disableRoaming();
});

When('I enable queuing', async function () {
  await packagePage.enableQueuing();
});

Then('the system should register the coverage and queuing restrictions correctly', async function () {
  const areRestrictionsRegistered = await packagePage.areRestrictionsConfigured();
  expect(areRestrictionsRegistered).toBeTruthy();
});

When('I save the B2B2C 24GB package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('I should see a confirmation message for successful package creation', async function () {
  const confirmationMessage = await packagePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('exitosa');
});

When('I verify the package in the available packages list for SOLD plan', async function () {
  await packagePage.navigateToPackageListForSOLDPlan();
});

Then('I should see the B2B2C 24GB package with 24 months validity in the catalog', async function () {
  const isPackageVisible = await packagePage.isPackageVisibleInCatalog('B2B2C', '24GB', '24');
  expect(isPackageVisible).toBeTruthy();
});

Then('all configured data should be displayed correctly', async function () {
  const packageDetails = await packagePage.getPackageDetails();
  expect(packageDetails.capacity).toBe('24GB');
  expect(packageDetails.cost).toBe('46.61');
  expect(packageDetails.validity).toBe('720');
  expect(packageDetails.classification).toBe('B2B2C');
  expect(packageDetails.localOnly).toBe(true);
  expect(packageDetails.roamingDisabled).toBe(true);
  expect(packageDetails.queuingEnabled).toBe(true);
});