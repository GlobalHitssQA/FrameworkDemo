const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/BSCS7PackagePage');

let packagePage;

Given('the user is authenticated in BSCS7 with package configuration permissions', async function () {
  packagePage = new BSCS7PackagePage(this.page);
  await packagePage.navigateToLoginPage();
  await packagePage.loginWithAuthorizedUser();
  await packagePage.verifyMainScreenDisplayed();
});

Given('the SOLD plan is configured in the system', async function () {
  await packagePage.verifySOLDPlanConfigured();
});

When('the user navigates to the B2B2C package creation module', async function () {
  await packagePage.navigateToB2B2CPackageModule();
});

When('the user selects the option to create a new package', async function () {
  await packagePage.clickCreateNewPackage();
});

Then('the system displays the package creation form with capacity, cost, validity and classification fields', async function () {
  const isFormDisplayed = await packagePage.isPackageFormDisplayed();
  expect(isFormDisplayed).toBe(true);
  await packagePage.verifyFormFieldsPresent();
});

When('the user enters package data with capacity {string} cost {string} validity {string} months and classification {string}', async function (capacity, cost, validity, classification) {
  await packagePage.fillPackageCapacity(capacity);
  await packagePage.fillPackageCost(cost);
  await packagePage.fillPackageValidity(validity);
  await packagePage.selectPackageClassification(classification);
});

Then('the system validates and accepts the entered data', async function () {
  const isDataValid = await packagePage.isPackageDataValid();
  expect(isDataValid).toBe(true);
});

When('the user configures restrictions with local consumption only without roaming and queuing enabled', async function () {
  await packagePage.selectLocalConsumptionOnly();
  await packagePage.disableRoaming();
  await packagePage.enableQueuing();
});

Then('the system registers the coverage and queuing restrictions correctly', async function () {
  const areRestrictionsRegistered = await packagePage.areRestrictionsRegistered();
  expect(areRestrictionsRegistered).toBe(true);
});

When('the user saves the B2B2C 480GB package configuration', async function () {
  await packagePage.clickSavePackage();
});

Then('the system creates the package and displays a successful creation confirmation message', async function () {
  const confirmationMessage = await packagePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('exitosa');
});

When('the user verifies the package in the available packages list for SOLD plan', async function () {
  await packagePage.navigateToPackagesList();
  await packagePage.filterBySOLDPlan();
});

Then('the system displays the B2B2C 480GB package with 24 months validity in the catalog with all configured data', async function () {
  const isPackageVisible = await packagePage.isPackageVisibleInCatalog('B2B2C', '480GB', '24');
  expect(isPackageVisible).toBe(true);
  await packagePage.verifyPackageDataInCatalog('480GB', '550.85', '24', 'B2B2C');
});