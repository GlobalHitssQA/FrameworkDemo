const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageActivationPage = require('../pages/PackageActivationPage');

let packageActivationPage;

Given('a user has an active GM line with SOLD plan', async function () {
  packageActivationPage = new PackageActivationPage(this.page);
  await packageActivationPage.navigateToPackageManagement();
  await packageActivationPage.verifyUserHasActiveSOLDPlan();
});

Given('the provisioning system is operational', async function () {
  await packageActivationPage.verifyProvisioningSystemStatus();
});

When('the user activates a TRIAL 6GB package on the test line', async function () {
  await packageActivationPage.selectPackageType('TRIAL_6GB');
  await packageActivationPage.clickActivatePackage();
});

Then('the TRIAL 6GB package should be activated successfully', async function () {
  const isActivated = await packageActivationPage.verifyPackageActivationStatus('TRIAL_6GB');
  expect(isActivated).toBeTruthy();
});

When('the user simulates data consumption in international roaming mode with TRIAL 6GB package', async function () {
  await packageActivationPage.navigateToRoamingSimulator();
  await packageActivationPage.selectRoamingMode('international');
  await packageActivationPage.simulateDataConsumption();
});

Then('the system should block roaming data consumption and prevent navigation', async function () {
  const isBlocked = await packageActivationPage.verifyRoamingBlocked();
  expect(isBlocked).toBeTruthy();
  const errorMessage = await packageActivationPage.getRoamingBlockedMessage();
  expect(errorMessage).toContain('roaming');
});

When('the user activates a B2B2C package on the test line', async function () {
  await packageActivationPage.navigateToPackageManagement();
  await packageActivationPage.selectPackageType('B2B2C');
  await packageActivationPage.clickActivatePackage();
});

Then('the B2B2C package should be activated successfully', async function () {
  const isActivated = await packageActivationPage.verifyPackageActivationStatus('B2B2C');
  expect(isActivated).toBeTruthy();
});

When('the user simulates data consumption in international roaming mode with B2B2C package', async function () {
  await packageActivationPage.navigateToRoamingSimulator();
  await packageActivationPage.selectRoamingMode('international');
  await packageActivationPage.simulateDataConsumption();
});

Then('both TRIAL 6GB and B2B2C packages should only allow local consumption without roaming access', async function () {
  await packageActivationPage.navigateToPackageManagement();
  const trial6gbLocalOnly = await packageActivationPage.verifyPackageLocalOnlyRestriction('TRIAL_6GB');
  const b2b2cLocalOnly = await packageActivationPage.verifyPackageLocalOnlyRestriction('B2B2C');
  expect(trial6gbLocalOnly).toBeTruthy();
  expect(b2b2cLocalOnly).toBeTruthy();
});