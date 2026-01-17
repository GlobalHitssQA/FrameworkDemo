const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FuPackPage = require('../pages/FuPackPage');

let fuPackPage;

Given('the user is logged into BSCS7 system with read permissions', async function () {
  fuPackPage = new FuPackPage(this.page);
  await fuPackPage.navigateToBSCS7();
  await fuPackPage.loginWithReadPermissions();
});

When('the user executes a query on SYSADM.FU_PACK table filtering by GM packages', async function () {
  await fuPackPage.openQueryEditor();
  await fuPackPage.executeGMPackagesQuery();
});

Then('the table displays FU_PACK_ID, SHORT_NAME, LONG_NAME, DESCRIPTION and package status fields', async function () {
  const columnsVisible = await fuPackPage.verifyRequiredColumnsVisible();
  expect(columnsVisible).toBeTruthy();
});

Then('a Free Units package exists for MANUFACTURE plan with {int} min voice, {int} SMS and {int} MB data', async function (minutes, sms, dataMB) {
  const packageExists = await fuPackPage.verifyManufacturePlanPackage(minutes, sms, dataMB);
  expect(packageExists).toBeTruthy();
});

Then('a Free Units package exists for UNSOLD NOT IN SHOWROOM plan with identical values to MANUFACTURE', async function () {
  const packageExists = await fuPackPage.verifyUnsoldNotInShowroomPackage();
  expect(packageExists).toBeTruthy();
});

Then('a Free Units package exists for UNSOLD SHOWROOM plan with {int} min voice, {int} SMS and {int} GB data', async function (minutes, sms, dataGB) {
  const packageExists = await fuPackPage.verifyUnsoldShowroomPackage(minutes, sms, dataGB);
  expect(packageExists).toBeTruthy();
});

Then('plans TESTING, SOLD, DORMANT and PURGED have no active Free Units packages or packages with zero values', async function () {
  const noActivePackages = await fuPackPage.verifyNoActivePackagesForExcludedPlans();
  expect(noActivePackages).toBeTruthy();
});