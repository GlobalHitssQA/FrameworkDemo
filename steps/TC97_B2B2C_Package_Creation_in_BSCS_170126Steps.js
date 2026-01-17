const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/BSCS7PackagePage');

let packagePage;

Given('I am logged into BSCS7 system with authorized user credentials', async function () {
  packagePage = new BSCS7PackagePage(this.page);
  await packagePage.navigateToSystem();
  await packagePage.login();
});

Given('the main package configuration screen is displayed', async function () {
  const isDisplayed = await packagePage.isPackageConfigurationScreenDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('I navigate to the B2B2C package creation module', async function () {
  await packagePage.navigateToB2B2CModule();
});

When('I select the option to create a new package', async function () {
  await packagePage.clickCreateNewPackage();
});

Then('the package creation form is displayed with capacity, cost, validity and classification fields', async function () {
  const isFormDisplayed = await packagePage.isPackageCreationFormDisplayed();
  expect(isFormDisplayed).toBeTruthy();
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

Then('the system validates and accepts the entered data', async function () {
  const isDataValid = await packagePage.isDataValidated();
  expect(isDataValid).toBeTruthy();
});

When('I configure the restriction for local consumption only', async function () {
  await packagePage.selectLocalConsumptionOnly();
});

When('I disable roaming option', async function () {
  await packagePage.disableRoaming();
});

When('I enable queuing option', async function () {
  await packagePage.enableQueuing();
});

Then('the system registers the coverage and queuing restrictions correctly', async function () {
  const areRestrictionsRegistered = await packagePage.areRestrictionsRegistered();
  expect(areRestrictionsRegistered).toBeTruthy();
});

When('I save the B2B2C 72GB package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('the system displays a successful creation confirmation message', async function () {
  const confirmationMessage = await packagePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('exitosa');
});

Then('the B2B2C 72GB package appears in the available packages list for SOLD plan', async function () {
  const isPackageInList = await packagePage.isPackageInSOLDPlanList('B2B2C 72GB');
  expect(isPackageInList).toBeTruthy();
});

Then('the package displays all configured data correctly', async function () {
  const packageData = await packagePage.getPackageDetails('B2B2C 72GB');
  expect(packageData.capacity).toBe('72GB');
  expect(packageData.validity).toBe('720');
  expect(packageData.classification).toBe('B2B2C');
});