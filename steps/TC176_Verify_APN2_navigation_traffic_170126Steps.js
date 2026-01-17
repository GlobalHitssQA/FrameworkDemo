const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SoldPlanPage = require('../pages/SoldPlanPage');

let soldPlanPage;

Given('a line is provisioned in SOLD plan with APN2 configured for Internet and FOTA navigation', async function() {
  soldPlanPage = new SoldPlanPage(this.page);
  await soldPlanPage.navigateToLineProvisioning();
  await soldPlanPage.selectSoldPlan();
  await soldPlanPage.configureApn2ForInternetAndFota();
  await soldPlanPage.provisionLine();
  const isProvisioned = await soldPlanPage.verifyLineProvisionedWithApn2();
  expect(isProvisioned).toBeTruthy();
});

Given('the user is authenticated in the system', async function() {
  await soldPlanPage.verifyUserAuthenticated();
});

When('the line generates 200 MB of traffic through APN2 for Internet navigation during the billing cycle', async function() {
  await soldPlanPage.navigateToTrafficSimulator();
  await soldPlanPage.generateApn2Traffic(200);
  await soldPlanPage.confirmTrafficGeneration();
});

Then('the system records the 200 MB consumption in UDR_LT_01 table', async function() {
  await soldPlanPage.navigateToUdrTable();
  const consumptionRecorded = await soldPlanPage.verifyConsumptionInUdrTable(200);
  expect(consumptionRecorded).toBeTruthy();
});

Then('the APN2 traffic is charged at bulk rate and excluded from In Pool calculation', async function() {
  await soldPlanPage.navigateToBillingDetails();
  const isExcludedFromInPool = await soldPlanPage.verifyTrafficExcludedFromInPool();
  expect(isExcludedFromInPool).toBeTruthy();
  const isBulkCharged = await soldPlanPage.verifyBulkRateApplied();
  expect(isBulkCharged).toBeTruthy();
});

Then('the system generates a charge of S\/. 40.66 without IGV for 200 MB at S\/. 0.2033 per MB', async function() {
  const chargeAmount = await soldPlanPage.getApn2ChargeAmount();
  expect(chargeAmount).toBe('40.66');
  const ratePerMb = await soldPlanPage.getBulkRatePerMb();
  expect(ratePerMb).toBe('0.2033');
});

Then('the APN2 traffic is displayed in Additional Services section with Plan field showing SOLD', async function() {
  await soldPlanPage.navigateToInvoice();
  await soldPlanPage.expandAdditionalServicesSection();
  const isDisplayedInAdditionalServices = await soldPlanPage.verifyApn2InAdditionalServices();
  expect(isDisplayedInAdditionalServices).toBeTruthy();
  const planFieldValue = await soldPlanPage.getPlanFieldInAdditionalServices();
  expect(planFieldValue).toBe('SOLD');
});

Then('the APN2 traffic is displayed in Traffic Detail section with Plan field showing SOLD', async function() {
  await soldPlanPage.expandTrafficDetailSection();
  const isDisplayedInTrafficDetail = await soldPlanPage.verifyApn2InTrafficDetail();
  expect(isDisplayedInTrafficDetail).toBeTruthy();
  const planFieldValue = await soldPlanPage.getPlanFieldInTrafficDetail();
  expect(planFieldValue).toBe('SOLD');
});