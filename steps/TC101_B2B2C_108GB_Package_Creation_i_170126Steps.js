const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/BSCS7PackagePage');

let bscs7PackagePage;

Given('the user is authenticated in BSCS7 with package configuration permissions', async function () {
  bscs7PackagePage = new BSCS7PackagePage(this.page);
  await bscs7PackagePage.login();
});

When('the user navigates to the package administration module', async function () {
  await bscs7PackagePage.navigateToPackageAdministration();
});

Then('the package administration module is displayed', async function () {
  const isVisible = await bscs7PackagePage.isPackageAdministrationModuleVisible();
  expect(isVisible).toBeTruthy();
});

When('the user enters the B2B2C 108GB package data with capacity {int}GB and cost {float} and validity {int} days', async function (capacity, cost, validity) {
  await bscs7PackagePage.enterPackageData({
    name: 'B2B2C 108GB',
    capacity: capacity,
    cost: cost,
    validityDays: validity
  });
});

Then('the system registers the package with individual mode and local coverage without roaming', async function () {
  const packageDetails = await bscs7PackagePage.getRegisteredPackageDetails();
  expect(packageDetails.mode).toBe('individual');
  expect(packageDetails.coverage).toBe('local');
  expect(packageDetails.roaming).toBe(false);
});

When('the user associates the B2B2C 108GB package to the SOLD plan RatePlan3', async function () {
  await bscs7PackagePage.associatePackageToPlan('B2B2C 108GB', 'SOLD', 'RatePlan3');
});

Then('the system confirms the package association to SOLD plan', async function () {
  const confirmationMessage = await bscs7PackagePage.getAssociationConfirmationMessage();
  expect(confirmationMessage).toContain('SOLD');
});

When('the user queries the availability of B2B2C 108GB package for SOLD plan', async function () {
  await bscs7PackagePage.queryPackageAvailability('B2B2C 108GB', 'SOLD');
});

Then('the package B2B2C 108GB is displayed with {int} months validity and cost {float} associated to SOLD plan', async function (months, cost) {
  const packageInfo = await bscs7PackagePage.getPackageAvailabilityInfo();
  expect(packageInfo.name).toBe('B2B2C 108GB');
  expect(packageInfo.validityMonths).toBe(months);
  expect(packageInfo.cost).toBe(cost);
  expect(packageInfo.associatedPlan).toBe('SOLD');
});