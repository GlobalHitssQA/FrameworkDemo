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

When('the user enters the B2B2C 180GB package data with capacity 180GB and cost 254.24 without IGV and validity 1080 days', async function () {
  await bscs7PackagePage.enterPackageData({
    name: 'B2B2C 180GB',
    capacity: '180',
    cost: '254.24',
    validity: '1080'
  });
});

Then('the system registers the package with individual mode and local coverage without Roaming', async function () {
  await bscs7PackagePage.selectIndividualMode();
  await bscs7PackagePage.selectLocalCoverageWithoutRoaming();
  await bscs7PackagePage.savePackage();
  const confirmation = await bscs7PackagePage.getPackageRegistrationConfirmation();
  expect(confirmation).toContain('B2B2C 180GB');
});

When('the user associates the B2B2C 180GB package to the SOLD plan RatePlan3', async function () {
  await bscs7PackagePage.associatePackageToPlan('B2B2C 180GB', 'SOLD');
});

Then('the system confirms the package association to SOLD plan', async function () {
  const associationConfirmed = await bscs7PackagePage.isPackageAssociationConfirmed();
  expect(associationConfirmed).toBeTruthy();
});

When('the user queries the availability of B2B2C 180GB package for SOLD plan', async function () {
  await bscs7PackagePage.queryPackageAvailability('B2B2C 180GB', 'SOLD');
});

Then('the package B2B2C 180GB is displayed with 36 months validity and cost 254.24 without IGV associated to SOLD plan', async function () {
  const packageDetails = await bscs7PackagePage.getPackageDetails();
  expect(packageDetails.name).toBe('B2B2C 180GB');
  expect(packageDetails.validity).toBe('1080');
  expect(packageDetails.cost).toBe('254.24');
  expect(packageDetails.plan).toBe('SOLD');
});