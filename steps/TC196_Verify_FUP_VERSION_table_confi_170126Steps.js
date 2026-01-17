const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FupVersionPage = require('../pages/FupVersionPage');

let fupVersionPage;

Given('the user is connected to the BSCS7 database', async function() {
  fupVersionPage = new FupVersionPage(this.page);
  await fupVersionPage.navigateToDatabaseConsole();
  await fupVersionPage.connectToDatabase('BSCS7');
});

When('the user queries the SYSADM.FUP_VERSION table', async function() {
  await fupVersionPage.executeQuery('SELECT FU_PACK_ID, FUP_VERSION, VALID_FROM, WORK_STATE, REC_VERSION FROM SYSADM.FUP_VERSION');
});

Then('the table displays columns FU_PACK_ID, FUP_VERSION, VALID_FROM, WORK_STATE and REC_VERSION', async function() {
  const columns = await fupVersionPage.getTableColumns();
  expect(columns).toContain('FU_PACK_ID');
  expect(columns).toContain('FUP_VERSION');
  expect(columns).toContain('VALID_FROM');
  expect(columns).toContain('WORK_STATE');
  expect(columns).toContain('REC_VERSION');
});

Then('each FU_PACK created for GM plans has at least one active version registered', async function() {
  const gmPackages = ['MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM'];
  for (const packageName of gmPackages) {
    const hasActiveVersion = await fupVersionPage.verifyPackageHasActiveVersion(packageName);
    expect(hasActiveVersion).toBeTruthy();
  }
});

Then('the VALID_FROM field contains dates equal to or after the Life Cycle implementation date', async function() {
  const implementationDate = new Date('2024-01-01');
  const validFromDates = await fupVersionPage.getValidFromDates();
  for (const dateStr of validFromDates) {
    const date = new Date(dateStr);
    expect(date.getTime()).toBeGreaterThanOrEqual(implementationDate.getTime());
  }
});

Then('the FUP_VERSION field has sequential numeric values starting from 1 for each FU_PACK_ID', async function() {
  const versionsByPackage = await fupVersionPage.getVersionsByPackageId();
  for (const [packId, versions] of Object.entries(versionsByPackage)) {
    const sortedVersions = versions.sort((a, b) => a - b);
    expect(sortedVersions[0]).toBe(1);
    for (let i = 1; i < sortedVersions.length; i++) {
      expect(sortedVersions[i]).toBe(sortedVersions[i - 1] + 1);
    }
  }
});

Then('the WORK_STATE indicates active production status for productive plan packages', async function() {
  const productivePackages = await fupVersionPage.getProductivePackagesWorkState();
  for (const workState of productivePackages) {
    const isActiveProduction = await fupVersionPage.isWorkStateActiveProduction(workState);
    expect(isActiveProduction).toBeTruthy();
  }
});