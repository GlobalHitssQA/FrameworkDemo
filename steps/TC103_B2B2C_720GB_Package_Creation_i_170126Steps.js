const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PackagePage = require('../pages/BSCS7PackagePage');

let bscs7PackagePage;

Given('the user is authenticated in BSCS7 with package configuration permissions', async function () {
  bscs7PackagePage = new BSCS7PackagePage(this.page);
  await bscs7PackagePage.navigateToLogin();
  await bscs7PackagePage.loginWithConfigurationPermissions();
});

Given('the SOLD plan is configured in the system', async function () {
  const isConfigured = await bscs7PackagePage.verifySoldPlanConfigured();
  expect(isConfigured).toBeTruthy();
});

When('the user accesses the package administration module', async function () {
  await bscs7PackagePage.accessPackageAdministrationModule();
  const isModuleVisible = await bscs7PackagePage.isPackageModuleVisible();
  expect(isModuleVisible).toBeTruthy();
});

When('the user enters the B2B2C 720GB package data with capacity {int} GB and cost {float} without IGV and validity {int} days', async function (capacity, cost, validity) {
  await bscs7PackagePage.openNewPackageForm();
  await bscs7PackagePage.enterPackageName('B2B2C 720GB');
  await bscs7PackagePage.enterPackageCapacity(capacity);
  await bscs7PackagePage.enterPackageCost(cost);
  await bscs7PackagePage.enterPackageValidity(validity);
  await bscs7PackagePage.selectIndividualMode();
  await bscs7PackagePage.selectLocalCoverageWithoutRoaming();
});

Then('the system registers the package with individual mode and local coverage without Roaming', async function () {
  await bscs7PackagePage.savePackage();
  const confirmationMessage = await bscs7PackagePage.getConfirmationMessage();
  expect(confirmationMessage).toContain('registrado');
});

When('the user associates the B2B2C 720GB package to the SOLD plan RatePlan3', async function () {
  await bscs7PackagePage.navigateToPlanAssociation();
  await bscs7PackagePage.selectPackageForAssociation('B2B2C 720GB');
  await bscs7PackagePage.selectPlanForAssociation('SOLD');
  await bscs7PackagePage.confirmAssociation();
});

Then('the system confirms the package association to the SOLD plan', async function () {
  const associationMessage = await bscs7PackagePage.getAssociationConfirmation();
  expect(associationMessage).toContain('asociado');
});

Then('the package is available for activation', async function () {
  const isAvailable = await bscs7PackagePage.isPackageAvailableForActivation('B2B2C 720GB');
  expect(isAvailable).toBeTruthy();
});

When('the user queries the availability of B2B2C 720GB package for SOLD plan', async function () {
  await bscs7PackagePage.navigateToPackageQuery();
  await bscs7PackagePage.searchPackageByName('B2B2C 720GB');
  await bscs7PackagePage.filterByPlan('SOLD');
});

Then('the system displays the B2B2C 720GB package with {int} months validity and cost {float} without IGV associated to SOLD plan', async function (months, cost) {
  const packageDetails = await bscs7PackagePage.getPackageDetails();
  expect(packageDetails.name).toBe('B2B2C 720GB');
  expect(packageDetails.validity).toBe(months * 30);
  expect(packageDetails.cost).toBe(cost);
  expect(packageDetails.plan).toBe('SOLD');
});