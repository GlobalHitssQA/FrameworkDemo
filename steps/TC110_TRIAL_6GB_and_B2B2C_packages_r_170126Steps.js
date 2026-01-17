const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageConfigurationPage = require('../pages/PackageConfigurationPage');

let packagePage;

Given('a test line with SOLD plan is available in the system', async function() {
  packagePage = new PackageConfigurationPage(this.page);
  await packagePage.navigateToPackageManagement();
  await packagePage.verifySOLDPlanLineAvailable();
});

When('I activate a TRIAL 6GB package on the line', async function() {
  await packagePage.selectTestLine();
  await packagePage.activatePackage('TRIAL 6GB');
});

Then('the system registers the TRIAL 6GB package activation with local only coverage attribute without Roaming', async function() {
  const coverageAttribute = await packagePage.getPackageCoverageAttribute();
  expect(coverageAttribute).toBe('LOCAL_ONLY');
  const roamingStatus = await packagePage.getRoamingStatus();
  expect(roamingStatus).toBe('No');
});

When('I simulate a data consumption attempt in Roaming mode for the line with TRIAL 6GB package', async function() {
  await packagePage.navigateToTrafficSimulator();
  await packagePage.simulateRoamingDataConsumption('TRIAL 6GB');
});

Then('the PCRF system blocks data traffic in Roaming and only allows local navigation', async function() {
  const roamingBlocked = await packagePage.isRoamingTrafficBlocked();
  expect(roamingBlocked).toBe(true);
  const localNavigationAllowed = await packagePage.isLocalNavigationAllowed();
  expect(localNavigationAllowed).toBe(true);
});

When('I activate a B2B2C package on a line with SOLD plan', async function() {
  await packagePage.navigateToPackageManagement();
  await packagePage.selectTestLine();
  await packagePage.activatePackage('B2B2C');
});

Then('the system registers the B2B2C package activation with local only coverage attribute without Roaming', async function() {
  const coverageAttribute = await packagePage.getPackageCoverageAttribute();
  expect(coverageAttribute).toBe('LOCAL_ONLY');
  const roamingStatus = await packagePage.getRoamingStatus();
  expect(roamingStatus).toBe('No');
});

When('I simulate a data consumption attempt in Roaming mode for the line with B2B2C package', async function() {
  await packagePage.navigateToTrafficSimulator();
  await packagePage.simulateRoamingDataConsumption('B2B2C');
});

Then('the PCRF system blocks data traffic in Roaming for B2B2C and only allows local navigation', async function() {
  const roamingBlocked = await packagePage.isRoamingTrafficBlocked();
  expect(roamingBlocked).toBe(true);
  const localNavigationAllowed = await packagePage.isLocalNavigationAllowed();
  expect(localNavigationAllowed).toBe(true);
});

When('I verify the package configuration table for TRIAL 6GB and B2B2C packages', async function() {
  await packagePage.navigateToPackageConfigurationTable();
  await packagePage.searchPackage('TRIAL 6GB');
  await packagePage.searchPackage('B2B2C');
});

Then('the system shows that TRIAL 6GB and B2B2C packages have Roaming parameter set to No', async function() {
  const trial6GBRoaming = await packagePage.getPackageRoamingParameter('TRIAL 6GB');
  expect(trial6GBRoaming).toBe('No');
  const b2b2cRoaming = await packagePage.getPackageRoamingParameter('B2B2C');
  expect(b2b2cRoaming).toBe('No');
});