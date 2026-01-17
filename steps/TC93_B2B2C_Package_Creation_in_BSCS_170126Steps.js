const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/BSCS7PackagePage');

let packagePage;

Given('I am logged into BSCS7 system with an authorized user', async function () {
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
  const isFormDisplayed = await packagePage.isPackageFormDisplayed();
  expect(isFormDisplayed).toBeTruthy();
});

When('I enter the package capacity as {string} GB', async function (capacity) {
  await packagePage.enterPackageCapacity(capacity);
});

When('I enter the cost without IGV as {string} soles', async function (cost) {
  await packagePage.enterPackageCost(cost);
});

When('I enter the validity as {string} months', async function (validity) {
  await packagePage.enterPackageValidity(validity);
});

When('I select the classification as {string}', async function (classification) {
  await packagePage.selectClassification(classification);
});

Then('the system validates and accepts the entered data', async function () {
  const isValid = await packagePage.isDataValidated();
  expect(isValid).toBeTruthy();
});

When('I configure the restriction for local consumption only', async function () {
  await packagePage.configureLocalConsumptionOnly();
});

When('I disable roaming for the package', async function () {
  await packagePage.disableRoaming();
});

When('I enable queuing for the package', async function () {
  await packagePage.enableQueuing();
});

Then('the system registers the coverage and queuing restrictions correctly', async function () {
  const areRestrictionsRegistered = await packagePage.areRestrictionsRegistered();
  expect(areRestrictionsRegistered).toBeTruthy();
});

When('I save the B2B2C 36GB package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('the system displays a successful creation confirmation message', async function () {
  const confirmationMessage = await packagePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('exitosa');
});

Then('the B2B2C 36GB package with 12 months validity appears in the available packages list for SOLD plan', async function () {
  const isPackageInList = await packagePage.isPackageInSOLDPlanList('B2B2C', '36GB', '12');
  expect(isPackageInList).toBeTruthy();
});

Then('all configured data is displayed correctly in the package catalog', async function () {
  const packageData = await packagePage.getPackageDataFromCatalog('B2B2C 36GB');
  expect(packageData.capacity).toBe('36GB');
  expect(packageData.cost).toBe('63.56');
  expect(packageData.validity).toBe('12 meses');
  expect(packageData.classification).toBe('B2B2C');
});