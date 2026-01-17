const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageConfigurationPage = require('../pages/PackageConfigurationPage');

let packagePage;

Given('the user is logged into BSCS7 package configuration module', async function () {
  packagePage = new PackageConfigurationPage(this.page);
  await packagePage.navigateToPackageConfiguration();
  const isVisible = await packagePage.isPackageManagementInterfaceVisible();
  expect(isVisible).toBeTruthy();
});

When('the user creates a new package with code {string}', async function (packageCode) {
  await packagePage.clickCreateNewPackage();
  await packagePage.enterPackageCode(packageCode);
});

When('the user configures the package with capacity {string} GB and validity {string} days', async function (capacity, validity) {
  await packagePage.enterPackageCapacity(capacity);
  await packagePage.enterPackageValidity(validity);
});

When('the user sets the package cost to {string} PEN without tax and type {string}', async function (cost, packageType) {
  await packagePage.enterPackageCost(cost);
  await packagePage.selectPackageType(packageType);
});

When('the user associates the package to {string} rate plan with local navigation only', async function (ratePlan) {
  await packagePage.selectRatePlan(ratePlan);
  await packagePage.disableRoaming();
});

When('the user configures queuing with single consumption and unlimited activations', async function () {
  await packagePage.configureSingleConsumption();
  await packagePage.enableUnlimitedActivations();
});

When('the user saves the package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('the package {string} should be registered in BSCS7 tables', async function (packageCode) {
  const isRegistered = await packagePage.isPackageRegistered(packageCode);
  expect(isRegistered).toBeTruthy();
});

Then('the package should be available in BuyProduct API for GM provisioning', async function () {
  const isAvailableInApi = await packagePage.isPackageVisibleInBuyProductApi();
  expect(isAvailableInApi).toBeTruthy();
});