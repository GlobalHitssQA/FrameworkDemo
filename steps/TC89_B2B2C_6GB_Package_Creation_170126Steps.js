const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageConfigurationPage = require('../pages/PackageConfigurationPage');

let packagePage;

Given('I am logged into BSCS7 with configuration permissions', async function () {
  packagePage = new PackageConfigurationPage(this.page);
  await packagePage.navigateToLogin();
  await packagePage.loginWithConfigPermissions();
});

Given('I access the package configuration module', async function () {
  await packagePage.navigateToPackageConfigurationModule();
});

Then('the system displays the package administration interface', async function () {
  const isVisible = await packagePage.isPackageAdminInterfaceVisible();
  expect(isVisible).toBeTruthy();
});

When('I create a new package with code {string}', async function (packageCode) {
  await packagePage.clickCreateNewPackage();
  await packagePage.enterPackageCode(packageCode);
});

Then('the system allows entering the B2B2C 6GB package code', async function () {
  const codeEntered = await packagePage.isPackageCodeEntered();
  expect(codeEntered).toBeTruthy();
});

When('I configure the package parameters with capacity {string} GB and validity {string} days and cost {string} without IGV and type {string}', async function (capacity, validity, cost, type) {
  await packagePage.setPackageCapacity(capacity);
  await packagePage.setPackageValidity(validity);
  await packagePage.setPackageCost(cost);
  await packagePage.setPackageType(type);
});

Then('the system accepts all corporate-consumer package attributes', async function () {
  const attributesAccepted = await packagePage.arePackageAttributesAccepted();
  expect(attributesAccepted).toBeTruthy();
});

When('I associate the package to corporate accounts with SOLD plan', async function () {
  await packagePage.openCorporateAccountAssociation();
  await packagePage.selectSOLDPlan();
  await packagePage.confirmAccountAssociation();
});

Then('the package is linked to B2B2C model for General Motors', async function () {
  const isLinked = await packagePage.isPackageLinkedToGM();
  expect(isLinked).toBeTruthy();
});

When('I configure local navigation only without roaming coverage', async function () {
  await packagePage.openCoverageSettings();
  await packagePage.enableLocalNavigationOnly();
  await packagePage.disableRoamingCoverage();
});

Then('the system sets the restriction for local network use only', async function () {
  const restrictionSet = await packagePage.isLocalOnlyRestrictionSet();
  expect(restrictionSet).toBeTruthy();
});

When('I set queueing rules with one active package at a time and unlimited activations', async function () {
  await packagePage.openQueueingRulesSection();
  await packagePage.setMaxActivePackages('1');
  await packagePage.setUnlimitedActivations();
});

Then('the consumption and activation rules are configured correctly', async function () {
  const rulesConfigured = await packagePage.areQueueingRulesConfigured();
  expect(rulesConfigured).toBeTruthy();
});

When('I save and verify the package registration in BSCS7 tables', async function () {
  await packagePage.savePackageConfiguration();
  await packagePage.waitForSaveConfirmation();
});

Then('the B2B2C 6GB package is stored and available for provisioning', async function () {
  const isStored = await packagePage.isPackageStoredInDatabase();
  const isAvailable = await packagePage.isPackageAvailableForProvisioning();
  expect(isStored).toBeTruthy();
  expect(isAvailable).toBeTruthy();
});

When('I validate the package is accessible from GM APIs via BuyProduct', async function () {
  await packagePage.navigateToAPIValidation();
  await packagePage.searchPackageInBuyProductAPI();
});

Then('the package appears in the list of products available for API purchase', async function () {
  const isInAPIList = await packagePage.isPackageVisibleInAPIProductList();
  expect(isInAPIList).toBeTruthy();
});