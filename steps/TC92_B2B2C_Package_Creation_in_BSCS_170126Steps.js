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

Then('the system validates and accepts the entered data', async function () {
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

Then('the system registers the coverage and queuing restrictions correctly', async function () {
  const restrictionsRegistered = await packagePage.areRestrictionsRegistered();
  expect(restrictionsRegistered).toBeTruthy();
});

When('I save the B2B2C 12GB package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('the system displays a successful creation confirmation message', async function () {
  const confirmationMessage = await packagePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('exitosa');
});

Then('the B2B2C 12GB package with 12 months validity appears in the SOLD plan package catalog', async function () {
  const isPackageInCatalog = await packagePage.isPackageInSOLDCatalog('B2B2C 12GB', '12 meses');
  expect(isPackageInCatalog).toBeTruthy();
});

Then('all configured data is displayed correctly', async function () {
  const packageDetails = await packagePage.getPackageDetails('B2B2C 12GB');
  expect(packageDetails.capacity).toBe('12GB');
  expect(packageDetails.cost).toBe('29.66');
  expect(packageDetails.validity).toBe('360');
  expect(packageDetails.classification).toBe('B2B2C');
});