const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageActivationPage = require('../pages/PackageActivationPage');

let packageActivationPage;

Given('a GM user has an active line with SOLD plan', async function () {
  packageActivationPage = new PackageActivationPage(this.page);
  await packageActivationPage.navigateToPackageManagement();
  await packageActivationPage.verifyUserHasActiveSOLDPlan();
});

Given('the BuyProduct API is functional through HUB APIGEE', async function () {
  await packageActivationPage.verifyAPIConnectivity();
});

When('the user activates a TRIAL 6GB package on the line', async function () {
  await packageActivationPage.selectPackageType('TRIAL_6GB');
  await packageActivationPage.clickActivatePackageButton();
});

Then('the TRIAL 6GB package should be activated successfully', async function () {
  const isActivated = await packageActivationPage.verifyPackageActivationSuccess('TRIAL_6GB');
  expect(isActivated).toBeTruthy();
});

When('the user activates a second TRIAL 6GB package immediately after', async function () {
  await packageActivationPage.selectPackageType('TRIAL_6GB');
  await packageActivationPage.clickActivatePackageButton();
});

Then('the second TRIAL 6GB package should be activated and queued correctly', async function () {
  const isQueued = await packageActivationPage.verifyPackageQueued('TRIAL_6GB');
  expect(isQueued).toBeTruthy();
});

When('the user activates 5 B2B2C packages with different capacities successively', async function () {
  const b2b2cCapacities = ['1GB', '2GB', '3GB', '5GB', '10GB'];
  for (const capacity of b2b2cCapacities) {
    await packageActivationPage.selectB2B2CPackageWithCapacity(capacity);
    await packageActivationPage.clickActivatePackageButton();
  }
});

Then('all 5 B2B2C packages should be activated and queued correctly', async function () {
  const queuedCount = await packageActivationPage.getQueuedB2B2CPackagesCount();
  expect(queuedCount).toBe(5);
});

Then('no error message or restriction for activation quantity should be displayed', async function () {
  const hasError = await packageActivationPage.isErrorMessageVisible();
  expect(hasError).toBeFalsy();
  const hasRestriction = await packageActivationPage.isActivationRestrictionVisible();
  expect(hasRestriction).toBeFalsy();
});

When('the user queries the total active and queued packages on the line', async function () {
  await packageActivationPage.clickViewPackageSummaryButton();
});

Then('the system should show 1 active package and 6 queued packages', async function () {
  const activeCount = await packageActivationPage.getActivePackagesCount();
  const queuedCount = await packageActivationPage.getTotalQueuedPackagesCount();
  expect(activeCount).toBe(1);
  expect(queuedCount).toBe(6);
});