const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/BSCS7PackagePage');

let packagePage;

Given('I am logged into BSCS7 system with authorized user', async function () {
  packagePage = new BSCS7PackagePage(this.page);
  await packagePage.navigateToLogin();
  await packagePage.login();
});

Given('the main package configuration screen is displayed', async function () {
  const isDisplayed = await packagePage.isPackageConfigurationScreenDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('I navigate to B2B2C package creation module', async function () {
  await packagePage.navigateToB2B2CModule();
});

When('I select the option to create a new package', async function () {
  await packagePage.clickCreateNewPackage();
});

Then('the package creation form is displayed with capacity, cost, validity and classification fields', async function () {
  const isFormDisplayed = await packagePage.isPackageCreationFormDisplayed();
  expect(isFormDisplayed).toBeTruthy();
});

When('I enter package capacity as {string}', async function (capacity) {
  await packagePage.enterPackageCapacity(capacity);
});

When('I enter package cost without IGV as {string}', async function (cost) {
  await packagePage.enterPackageCost(cost);
});

When('I enter package validity as {string} days', async function (days) {
  await packagePage.enterPackageValidity(days);
});

When('I select classification as {string}', async function (classification) {
  await packagePage.selectClassification(classification);
});

Then('the system validates and accepts the entered data', async function () {
  const isValid = await packagePage.isDataValidated();
  expect(isValid).toBeTruthy();
});

When('I configure restriction for local consumption only', async function () {
  await packagePage.configureLocalConsumptionOnly();
});

When('I configure restriction to disallow roaming', async function () {
  await packagePage.disableRoaming();
});

When('I enable queuing option', async function () {
  await packagePage.enableQueuing();
});

Then('the system registers coverage and queuing restrictions correctly', async function () {
  const areRestrictionsSet = await packagePage.areRestrictionsConfigured();
  expect(areRestrictionsSet).toBeTruthy();
});

When('I save the B2B2C 20GB package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('the system displays a successful creation confirmation message', async function () {
  const message = await packagePage.getConfirmationMessage();
  expect(message).toContain('exitosa');
});

Then('the B2B2C 20GB package appears in the available packages list for SOLD plan', async function () {
  const isPackageVisible = await packagePage.isPackageInSOLDPlanList('B2B2C 20GB');
  expect(isPackageVisible).toBeTruthy();
});

Then('all configured data is displayed correctly in the package catalog', async function () {
  const packageData = await packagePage.getPackageDataFromCatalog('B2B2C 20GB');
  expect(packageData.capacity).toBe('20GB');
  expect(packageData.cost).toBe('38.14');
  expect(packageData.validity).toBe('30');
  expect(packageData.classification).toBe('B2B2C');
});