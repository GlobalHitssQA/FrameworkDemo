const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FupElementPage = require('../pages/FupElementPage');

let fupElementPage;

Given('the user is connected to BSCS7 database with query permissions', async function () {
  fupElementPage = new FupElementPage(this.page);
  await fupElementPage.navigateToDatabaseConsole();
  await fupElementPage.verifyDatabaseConnection();
});

When('the user executes a SELECT query on SYSADM.FUP_ELEMENT table filtering by GM packages', async function () {
  await fupElementPage.executeGMPackagesQuery();
});

Then('the table displays columns FU_PACK_ID, FUP_VERSION, FUP_ELEMENT, CHECK_ORDER and REC_VERSION', async function () {
  const columnsVisible = await fupElementPage.verifyRequiredColumnsDisplayed();
  expect(columnsVisible).toBe(true);
});

Then('the MANUFACTURE package has 3 elements defined for VOZ, SMS and DATOS services', async function () {
  const manufactureElements = await fupElementPage.getManufacturePackageElements();
  expect(manufactureElements.count).toBe(3);
  expect(manufactureElements.services).toContain('VOZ');
  expect(manufactureElements.services).toContain('SMS');
  expect(manufactureElements.services).toContain('DATOS');
});

Then('the UNSOLD SHOWROOM package has 3 elements defined for VOZ, SMS and DATOS services', async function () {
  const unsoldShowroomElements = await fupElementPage.getUnsoldShowroomPackageElements();
  expect(unsoldShowroomElements.count).toBe(3);
  expect(unsoldShowroomElements.services).toContain('VOZ');
  expect(unsoldShowroomElements.services).toContain('SMS');
  expect(unsoldShowroomElements.services).toContain('DATOS');
});

Then('the CHECK_ORDER field contains numeric values defining logical evaluation sequence', async function () {
  const checkOrderValid = await fupElementPage.validateCheckOrderSequence();
  expect(checkOrderValid).toBe(true);
});

Then('the FUP_VERSION values match active versions registered in SYSADM.FUP_VERSION table', async function () {
  const versionsMatch = await fupElementPage.validateFupVersionConsistency();
  expect(versionsMatch).toBe(true);
});