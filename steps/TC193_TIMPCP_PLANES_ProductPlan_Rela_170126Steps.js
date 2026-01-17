const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DatabaseQueryPage = require('../pages/DatabaseQueryPage');

let databaseQueryPage;

Given('the user has access to BSCS7 database with query permissions', async function () {
  databaseQueryPage = new DatabaseQueryPage(this.page);
  await databaseQueryPage.navigateToDatabaseConsole();
  await databaseQueryPage.verifyUserHasQueryPermissions();
});

Given('the database connection is established successfully', async function () {
  await databaseQueryPage.connectToDatabase('BSCS7');
  const isConnected = await databaseQueryPage.isDatabaseConnected();
  expect(isConnected).toBeTruthy();
});

When('the user executes a SELECT query on TIM.PCP_PLANES table', async function () {
  const query = 'SELECT CCO_PRCO, TMCODE, VERSION, CAT_PRCO, FECHA_IN_VIG, FECHA_FIN_VIG, ID_USU_PRCO FROM TIM.PCP_PLANES';
  await databaseQueryPage.executeQuery(query);
});

Then('the table displays columns CCO_PRCO, TMCODE, VERSION, CAT_PRCO, FECHA_IN_VIG, FECHA_FIN_VIG and ID_USU_PRCO', async function () {
  const expectedColumns = ['CCO_PRCO', 'TMCODE', 'VERSION', 'CAT_PRCO', 'FECHA_IN_VIG', 'FECHA_FIN_VIG', 'ID_USU_PRCO'];
  const displayedColumns = await databaseQueryPage.getDisplayedColumns();
  for (const column of expectedColumns) {
    expect(displayedColumns).toContain(column);
  }
});

When('the user filters records by GM product using CCO_PRCO field', async function () {
  await databaseQueryPage.applyFilterByProduct('GM');
});

Then('all records associated with Auto Conectado GM product are displayed', async function () {
  const records = await databaseQueryPage.getFilteredRecords();
  expect(records.length).toBeGreaterThan(0);
  const allRecordsAreGM = await databaseQueryPage.verifyAllRecordsBelongToProduct('GM');
  expect(allRecordsAreGM).toBeTruthy();
});

Then('there are relationships for all 7 Life Cycle plans TESTING, MANUFACTURE, UNSOLD_NOT_IN_SHOWROOM, UNSOLD_SHOWROOM, SOLD, DORMANT and PURGED', async function () {
  const expectedPlans = ['TESTING', 'MANUFACTURE', 'UNSOLD_NOT_IN_SHOWROOM', 'UNSOLD_SHOWROOM', 'SOLD', 'DORMANT', 'PURGED'];
  const plansFound = await databaseQueryPage.getDistinctPlans();
  for (const plan of expectedPlans) {
    expect(plansFound).toContain(plan);
  }
});

Then('each plan has a record linked to GM product via corresponding TMCODE', async function () {
  const planTmcodeRelations = await databaseQueryPage.getPlanTmcodeRelations();
  expect(planTmcodeRelations.length).toBe(7);
  for (const relation of planTmcodeRelations) {
    expect(relation.tmcode).toBeDefined();
    expect(relation.tmcode).not.toBeNull();
  }
});

Then('the VERSION field contains correct product version for each plan', async function () {
  const versionData = await databaseQueryPage.getVersionDataForPlans();
  for (const record of versionData) {
    expect(record.version).toBeDefined();
    expect(record.version).not.toBeNull();
  }
});

Then('the CAT_PRCO field indicates correct product category', async function () {
  const categoryData = await databaseQueryPage.getCategoryDataForPlans();
  for (const record of categoryData) {
    expect(record.catPrco).toBeDefined();
    expect(record.catPrco).not.toBeNull();
  }
});

Then('the FECHA_IN_VIG dates are configured for all plans', async function () {
  const startDates = await databaseQueryPage.getStartDatesForPlans();
  for (const dateRecord of startDates) {
    expect(dateRecord.fechaInVig).toBeDefined();
    expect(dateRecord.fechaInVig).not.toBeNull();
  }
});

Then('the FECHA_FIN_VIG dates are NULL or future dates for active production plans', async function () {
  const endDates = await databaseQueryPage.getEndDatesForPlans();
  const currentDate = new Date();
  for (const dateRecord of endDates) {
    const isValidEndDate = dateRecord.fechaFinVig === null || new Date(dateRecord.fechaFinVig) > currentDate;
    expect(isValidEndDate).toBeTruthy();
  }
});