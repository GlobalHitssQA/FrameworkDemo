const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RollbackPlanPage = require('../pages/RollbackPlanPage');

let rollbackPlanPage;

Given('the rollback plan documentation is available', async function () {
  rollbackPlanPage = new RollbackPlanPage(this.page);
  await rollbackPlanPage.navigateToRollbackDashboard();
  const isDocAvailable = await rollbackPlanPage.isRollbackDocumentationAvailable();
  expect(isDocAvailable).toBeTruthy();
});

Given('a backup of the current component version exists', async function () {
  const backupExists = await rollbackPlanPage.verifyBackupVersionExists();
  expect(backupExists).toBeTruthy();
});

When('I review the rollback plan documentation', async function () {
  await rollbackPlanPage.openRollbackPlanDocumentation();
});

Then('the plan should contain clear and detailed steps', async function () {
  const hasDetailedSteps = await rollbackPlanPage.verifyPlanContainsDetailedSteps();
  expect(hasDetailedSteps).toBeTruthy();
});

When('I create a complete backup of the current component and its data', async function () {
  await rollbackPlanPage.createComponentBackup();
});

Then('the backup should be generated successfully with all necessary information', async function () {
  const backupStatus = await rollbackPlanPage.getBackupStatus();
  expect(backupStatus).toBe('success');
  const backupComplete = await rollbackPlanPage.verifyBackupContainsAllData();
  expect(backupComplete).toBeTruthy();
});

When('I simulate a critical failure in the new component version', async function () {
  await rollbackPlanPage.simulateCriticalFailure();
});

Then('the failure should be detected and rollback process should be triggered', async function () {
  const failureDetected = await rollbackPlanPage.isFailureDetected();
  expect(failureDetected).toBeTruthy();
  const rollbackTriggered = await rollbackPlanPage.isRollbackProcessTriggered();
  expect(rollbackTriggered).toBeTruthy();
});

When('I execute the rollback procedure following the documented plan', async function () {
  await rollbackPlanPage.executeRollbackProcedure();
});

Then('the rollback procedure should complete successfully without errors', async function () {
  const rollbackStatus = await rollbackPlanPage.getRollbackExecutionStatus();
  expect(rollbackStatus).toBe('completed');
  const hasErrors = await rollbackPlanPage.hasRollbackErrors();
  expect(hasErrors).toBeFalsy();
});

Then('the component should return to its previous version with all data intact', async function () {
  const currentVersion = await rollbackPlanPage.getCurrentComponentVersion();
  const previousVersion = await rollbackPlanPage.getPreviousComponentVersion();
  expect(currentVersion).toBe(previousVersion);
  const dataIntact = await rollbackPlanPage.verifyAllDataIntact();
  expect(dataIntact).toBeTruthy();
});

Then('users should be able to access the component without interruptions', async function () {
  const componentAccessible = await rollbackPlanPage.isComponentAccessibleToUsers();
  expect(componentAccessible).toBeTruthy();
  const componentFunctional = await rollbackPlanPage.verifyComponentFunctionality();
  expect(componentFunctional).toBeTruthy();
});