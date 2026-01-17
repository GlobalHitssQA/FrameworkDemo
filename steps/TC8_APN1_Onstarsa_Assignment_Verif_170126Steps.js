const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InstantLinkPage = require('../pages/InstantLinkPage');

let instantLinkPage;

Given('the user has access to INSTANT LINK with query permissions', async function () {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  await instantLinkPage.verifyQueryPermissions();
});

Given('all Life Cycle Rate Plans are created', async function () {
  await instantLinkPage.verifyRatePlansExist();
});

Given('APN1 Onstarsa is configured in the network', async function () {
  await instantLinkPage.verifyApnConfiguration();
});

When('the user provisions a line in Rate Plan TESTING', async function () {
  await instantLinkPage.provisionLine('TESTING');
});

When('the user provisions a line in Rate Plan MANUFACTURE', async function () {
  await instantLinkPage.provisionLine('MANUFACTURE');
});

When('the user provisions a line in Rate Plan UNSOLD NOT IN SHOWROOM', async function () {
  await instantLinkPage.provisionLine('UNSOLD NOT IN SHOWROOM');
});

When('the user provisions a line in Rate Plan UNSOLD SHOWROOM', async function () {
  await instantLinkPage.provisionLine('UNSOLD SHOWROOM');
});

When('the user provisions a line in Rate Plan SOLD', async function () {
  await instantLinkPage.provisionLine('SOLD');
});

When('the user provisions a line in Rate Plan DORMANT', async function () {
  await instantLinkPage.provisionLine('DORMANT');
});

When('the user provisions a line in Rate Plan PURGED', async function () {
  await instantLinkPage.provisionLine('PURGED');
});

Then('the system displays APN1 Onstarsa assigned to the line in pre-productive mode', async function () {
  const apnAssigned = await instantLinkPage.getAssignedApn();
  const apnMode = await instantLinkPage.getApnMode();
  expect(apnAssigned).toBe('Onstarsa');
  expect(apnMode).toBe('pre-productive');
});

Then('the system displays APN1 Onstarsa assigned with productive classification for telemetry', async function () {
  const apnAssigned = await instantLinkPage.getAssignedApn();
  const apnClassification = await instantLinkPage.getApnClassification();
  const apnUsage = await instantLinkPage.getApnUsage();
  expect(apnAssigned).toBe('Onstarsa');
  expect(apnClassification).toBe('productive');
  expect(apnUsage).toBe('telemetry');
});

Then('the system displays APN1 Onstarsa correctly assigned and active', async function () {
  const apnAssigned = await instantLinkPage.getAssignedApn();
  const apnStatus = await instantLinkPage.getApnStatus();
  expect(apnAssigned).toBe('Onstarsa');
  expect(apnStatus).toBe('active');
});

Then('the system displays APN1 Onstarsa assigned with In Pool configuration active', async function () {
  const apnAssigned = await instantLinkPage.getAssignedApn();
  const inPoolConfig = await instantLinkPage.getInPoolConfiguration();
  expect(apnAssigned).toBe('Onstarsa');
  expect(inPoolConfig).toBe('active');
});

Then('the system displays no APN assigned to the line', async function () {
  const apnAssigned = await instantLinkPage.getAssignedApn();
  expect(apnAssigned).toBeNull();
});