const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MigrationPage = require('../pages/MigrationPage');

let migrationPage;
let preUpgradeData;
let postUpgradeData;

Given('the system has test data in the current version', async function() {
  migrationPage = new MigrationPage(this.page);
  await migrationPage.navigateToSystem();
  const hasData = await migrationPage.verifyTestDataExists();
  expect(hasData).toBeTruthy();
});

Given('the current data structure is documented', async function() {
  const isDocumented = await migrationPage.verifyDataStructureDocumented();
  expect(isDocumented).toBeTruthy();
});

Given('a backup of the data is available', async function() {
  const backupAvailable = await migrationPage.verifyBackupAvailable();
  expect(backupAvailable).toBeTruthy();
});

When('I identify the stored data including contracts values and configurations', async function() {
  preUpgradeData = await migrationPage.identifyStoredData();
  expect(preUpgradeData).toBeDefined();
  expect(preUpgradeData.contracts).toBeDefined();
  expect(preUpgradeData.values).toBeDefined();
  expect(preUpgradeData.configurations).toBeDefined();
});

When('I document the current component data structure', async function() {
  const structureDocumented = await migrationPage.documentCurrentDataStructure();
  expect(structureDocumented).toBeTruthy();
});

When('I execute the component upgrade process to the new version', async function() {
  await migrationPage.executeUpgradeProcess();
});

Then('the upgrade process should complete successfully without errors', async function() {
  const upgradeStatus = await migrationPage.getUpgradeStatus();
  expect(upgradeStatus).toBe('success');
});

Then('all existing data should be available in the new version', async function() {
  postUpgradeData = await migrationPage.getAllDataAfterUpgrade();
  expect(postUpgradeData).toBeDefined();
});

Then('contract data and total values should be displayed correctly', async function() {
  const contractsVisible = await migrationPage.verifyContractsDisplayed();
  const totalValuesVisible = await migrationPage.verifyTotalValuesDisplayed();
  expect(contractsVisible).toBeTruthy();
  expect(totalValuesVisible).toBeTruthy();
});

Then('breakdown information should be preserved', async function() {
  const breakdownPreserved = await migrationPage.verifyBreakdownPreserved();
  expect(breakdownPreserved).toBeTruthy();
});

When('I compare data values before and after the upgrade', async function() {
  await migrationPage.comparePreAndPostUpgradeData(preUpgradeData, postUpgradeData);
});

Then('the values should be identical with no data loss', async function() {
  const dataIntegrity = await migrationPage.verifyDataIntegrity(preUpgradeData, postUpgradeData);
  expect(dataIntegrity.isIdentical).toBeTruthy();
  expect(dataIntegrity.dataLoss).toBe(0);
});

Then('the migration logs should not contain critical errors', async function() {
  const criticalErrors = await migrationPage.checkMigrationLogsForCriticalErrors();
  expect(criticalErrors.length).toBe(0);
});