const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const VersioningPage = require('../pages/VersioningPage');

let versioningPage;

Given('the system is currently on Release {float}', async function(releaseVersion) {
  versioningPage = new VersioningPage(this.page);
  await versioningPage.navigateToVersioningConfig();
  const currentRelease = await versioningPage.getCurrentSystemRelease();
  expect(currentRelease).toContain(releaseVersion.toString());
});

When('I query the current version of the contract value and composition component', async function() {
  await versioningPage.queryComponentVersion();
});

Then('the system should display the current component version as Release {float}', async function(expectedVersion) {
  const displayedVersion = await versioningPage.getDisplayedComponentVersion();
  expect(displayedVersion).toContain(expectedVersion.toString());
});

Then('the component should include version metadata in its source code or configuration', async function() {
  const hasMetadata = await versioningPage.verifyVersionMetadataExists();
  expect(hasMetadata).toBeTruthy();
  const metadataInfo = await versioningPage.getVersionMetadataInfo();
  expect(metadataInfo.version).toBeDefined();
  expect(metadataInfo.buildDate).toBeDefined();
  expect(metadataInfo.componentId).toBeDefined();
});

When('I simulate or review the update process to a future release version', async function() {
  await versioningPage.navigateToUpdateSimulation();
  await versioningPage.selectFutureReleaseVersion();
  await versioningPage.executeUpdateSimulation();
});

Then('the system should maintain compatibility and update the component version correctly', async function() {
  const compatibilityStatus = await versioningPage.getCompatibilityStatus();
  expect(compatibilityStatus).toBe('compatible');
  const updateStatus = await versioningPage.getUpdateStatus();
  expect(updateStatus).toBe('success');
});

Then('the new component version should be identifiable in system logs or metadata', async function() {
  await versioningPage.navigateToSystemLogs();
  const versionInLogs = await versioningPage.findVersionInLogs();
  expect(versionInLogs).toBeTruthy();
  const newVersionMetadata = await versioningPage.getUpdatedVersionMetadata();
  expect(newVersionMetadata.version).toBeDefined();
  expect(parseFloat(newVersionMetadata.version)).toBeGreaterThan(2.7);
});