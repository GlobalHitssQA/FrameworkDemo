const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RatePlanPurgedPage = require('../pages/RatePlanPurgedPage');

let ratePlanPurgedPage;

Given('I am logged into the BSCS7 system with query permissions', async function () {
  ratePlanPurgedPage = new RatePlanPurgedPage(this.page);
  await ratePlanPurgedPage.navigateToSystem();
  await ratePlanPurgedPage.login();
});

When('I access the Rate Plan PURGED configuration', async function () {
  await ratePlanPurgedPage.accessRatePlanConfiguration('PURGED');
});

Then('the system displays Rate Plan PURGED as a new plan without prior homologation', async function () {
  const isNewPlan = await ratePlanPurgedPage.isNewPlanWithoutHomologation();
  expect(isNewPlan).toBe(true);
});

Then('the Rate Plan PURGED has no VOZ SMS or DATA services configured', async function () {
  const hasNoServices = await ratePlanPurgedPage.verifyNoServicesConfigured();
  expect(hasNoServices).toBe(true);
});

Then('the Rate Plan PURGED has no productive APNs assigned', async function () {
  const hasNoAPNs = await ratePlanPurgedPage.verifyNoAPNsAssigned();
  expect(hasNoAPNs).toBe(true);
});

Then('the VoLTE service is not enabled for Rate Plan PURGED', async function () {
  const volteDisabled = await ratePlanPurgedPage.verifyVoLTEDisabled();
  expect(volteDisabled).toBe(true);
});

Then('the SIM in Rate Plan PURGED is marked as inactive without available services', async function () {
  const simInactive = await ratePlanPurgedPage.verifySIMInactiveStatus();
  expect(simInactive).toBe(true);
});