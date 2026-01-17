const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageAdministrationPage = require('../pages/PackageAdministrationPage');

let packagePage;

Given('I am logged into the BSCS7 package administration module', async function () {
  packagePage = new PackageAdministrationPage(this.page);
  await packagePage.navigateToPackageAdministration();
  await packagePage.verifyPackageInterfaceDisplayed();
});

When('I create a new package with identifier {string}', async function (packageId) {
  await packagePage.clickCreateNewPackage();
  await packagePage.enterPackageIdentifier(packageId);
  await packagePage.verifyPackageFormEnabled();
});

When('I set the package capacity to {string} GB', async function (capacity) {
  await packagePage.setPackageCapacity(capacity);
});

When('I set the package validity to {string} days', async function (days) {
  await packagePage.setPackageValidity(days);
});

When('I set the package cost to {string} without taxes', async function (cost) {
  await packagePage.setPackageCostWithoutTax(cost);
});

When('I set the package category to {string}', async function (category) {
  await packagePage.setPackageCategory(category);
});

When('I link the package to General Motors corporate accounts with {string} plan', async function (plan) {
  await packagePage.linkToCorporateAccounts('General Motors', plan);
  await packagePage.verifyPackageLinkSuccess();
});

When('I configure usage restriction to local navigation only without roaming', async function () {
  await packagePage.setLocalNavigationOnly();
  await packagePage.disableRoaming();
  await packagePage.verifyGeographicRestrictionApplied();
});

When('I configure consumption rules with queuing enabled and unlimited activations', async function () {
  await packagePage.enableQueuing();
  await packagePage.setSimultaneousPackages('1');
  await packagePage.setUnlimitedActivations();
  await packagePage.verifyConsumptionRulesRegistered();
});

When('I save the package configuration', async function () {
  await packagePage.savePackageConfiguration();
});

Then('the package {string} should be stored in the BSCS7 parametric tables', async function (packageName) {
  const isStored = await packagePage.verifyPackageStoredInDatabase(packageName);
  expect(isStored).toBeTruthy();
});

Then('the package should be available through the BuyProduct API', async function () {
  const isAvailable = await packagePage.verifyPackageAvailableInBuyProductAPI();
  expect(isAvailable).toBeTruthy();
});

Then('the package should be available through the GetInternetBalance API', async function () {
  const isAvailable = await packagePage.verifyPackageAvailableInGetInternetBalanceAPI();
  expect(isAvailable).toBeTruthy();
});