const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DatabasePlanesPage = require('../pages/DatabasePlanesPage');

let databasePlanesPage;

Given('the user has access to the BSCS7 database with valid permissions', async function () {
  databasePlanesPage = new DatabasePlanesPage(this.page);
  await databasePlanesPage.navigateToDatabaseConsole();
  await databasePlanesPage.loginWithValidCredentials();
  await databasePlanesPage.verifyDatabaseConnection();
});

When('the user queries the TIM.CSPP_PLANES table', async function () {
  await databasePlanesPage.executeQueryOnTable('TIM.CSPP_PLANES');
  await databasePlanesPage.waitForQueryResults();
});

Then('the table structure should display fields TMCODE, LIZOP_KN_C, SPCODE, FEC_CAD, FEC_VIG and LABEL', async function () {
  const expectedFields = ['TMCODE', 'LIZOP_KN_C', 'SPCODE', 'FEC_CAD', 'FEC_VIG', 'LABEL'];
  const isStructureValid = await databasePlanesPage.verifyTableStructure(expectedFields);
  expect(isStructureValid).toBeTruthy();
});

Then('the seven Life Cycle plans should be registered with unique TMCODE codes', async function () {
  const planCount = await databasePlanesPage.getLifeCyclePlansCount();
  expect(planCount).toBe(7);
  const areCodesUnique = await databasePlanesPage.verifyUniqueTMCodes();
  expect(areCodesUnique).toBeTruthy();
});

Then('the plans TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD, DORMANT and PURGED should exist', async function () {
  const expectedPlans = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT', 'PURGED'];
  const allPlansExist = await databasePlanesPage.verifyPlansExist(expectedPlans);
  expect(allPlansExist).toBeTruthy();
});

Then('each plan should have correct validity dates with production plans having NULL indefinite validity', async function () {
  const areDatesValid = await databasePlanesPage.verifyValidityDates();
  expect(areDatesValid).toBeTruthy();
});

Then('the LABEL field should contain the correct commercial description for each plan', async function () {
  const areLabelsCorrect = await databasePlanesPage.verifyPlanLabels();
  expect(areLabelsCorrect).toBeTruthy();
});

Then('all Life Cycle GM plans should be associated with the Auto Conectado service SPCODE', async function () {
  const areSPCodesCorrect = await databasePlanesPage.verifyAutoConectadoSPCode();
  expect(areSPCodesCorrect).toBeTruthy();
});