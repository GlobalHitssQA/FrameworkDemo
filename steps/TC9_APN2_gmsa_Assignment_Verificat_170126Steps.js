const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InstantLinkPage = require('../pages/InstantLinkPage');

let instantLinkPage;

Given('the user has access to INSTANT LINK with query permissions', async function () {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  await instantLinkPage.verifyQueryPermissions();
});

Given('the productive Rate Plans are created', async function () {
  await instantLinkPage.verifyRatePlansExist();
});

Given('APN2 gmsa is configured in the network', async function () {
  await instantLinkPage.verifyApn2GmsaConfiguration();
});

When('the user provisions a line in Rate Plan TESTING', async function () {
  await instantLinkPage.provisionLine('TESTING');
});

Then('the system should display APN2 Gmsapp assigned in pre-productive mode', async function () {
  const apnInfo = await instantLinkPage.getAssignedApnInfo();
  expect(apnInfo.apnName).toBe('Gmsapp');
  expect(apnInfo.mode).toBe('pre-productive');
});

When('the user provisions a line in Rate Plan MANUFACTURE', async function () {
  await instantLinkPage.provisionLine('MANUFACTURE');
});

Then('the system should display APN2 gmsa assigned for Internet navigation FOTA and infotainment', async function () {
  const apnInfo = await instantLinkPage.getAssignedApnInfo();
  expect(apnInfo.apnName).toBe('gmsa');
  expect(apnInfo.classification).toBe('productive');
  expect(apnInfo.services).toContain('Internet');
  expect(apnInfo.services).toContain('FOTA');
  expect(apnInfo.services).toContain('infotainment');
});

When('the user provisions a line in Rate Plan UNSOLD NOT IN SHOWROOM', async function () {
  await instantLinkPage.provisionLine('UNSOLD NOT IN SHOWROOM');
});

Then('the system should display APN2 gmsa correctly assigned and active', async function () {
  const apnInfo = await instantLinkPage.getAssignedApnInfo();
  expect(apnInfo.apnName).toBe('gmsa');
  expect(apnInfo.status).toBe('active');
});

When('the user provisions a line in Rate Plan UNSOLD SHOWROOM', async function () {
  await instantLinkPage.provisionLine('UNSOLD SHOWROOM');
});

When('the user provisions a line in Rate Plan SOLD', async function () {
  await instantLinkPage.provisionLine('SOLD');
});

Then('the system should display APN2 gmsa assigned with bulk modality without In Pool participation', async function () {
  const apnInfo = await instantLinkPage.getAssignedApnInfo();
  expect(apnInfo.apnName).toBe('gmsa');
  expect(apnInfo.billingModality).toBe('bulk');
  expect(apnInfo.inPoolParticipation).toBe(false);
});

When('the user provisions a line in Rate Plan DORMANT', async function () {
  await instantLinkPage.provisionLine('DORMANT');
});

When('the user verifies bulk billing configuration for APN2 gmsa', async function () {
  await instantLinkPage.navigateToBillingConfiguration();
  await instantLinkPage.selectApn2GmsaBilling();
});

Then('the system should display bulk billing configuration with package assignment enabled', async function () {
  const billingConfig = await instantLinkPage.getBillingConfiguration();
  expect(billingConfig.type).toBe('bulk');
  expect(billingConfig.packageAssignmentEnabled).toBe(true);
});