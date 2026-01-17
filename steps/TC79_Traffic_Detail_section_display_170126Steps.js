const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TrafficDetailPage = require('../pages/TrafficDetailPage');

let trafficDetailPage;
let lineIdentifier;
let expectedPlanAtClose;

Given('the user is authenticated in BSCS7 system', async function () {
  trafficDetailPage = new TrafficDetailPage(this.page);
  await trafficDetailPage.navigateToLogin();
  await trafficDetailPage.login(process.env.BSCS7_USER, process.env.BSCS7_PASSWORD);
  await trafficDetailPage.verifyUserIsAuthenticated();
});

Given('there is a line that changed plan during the billing cycle from MANUFACTURE to SOLD', async function () {
  lineIdentifier = await trafficDetailPage.identifyLineWithPlanChange('MANUFACTURE', 'SOLD');
  expectedPlanAtClose = 'SOLD';
  expect(lineIdentifier).toBeTruthy();
});

When('the billing process is executed with cutoff on day 28', async function () {
  await trafficDetailPage.executeBillingProcess(28);
  await trafficDetailPage.waitForBillingProcessCompletion();
});

When('the user navigates to the Traffic Detail section for the line', async function () {
  await trafficDetailPage.navigateToTrafficDetail(lineIdentifier);
  await trafficDetailPage.verifyTrafficDetailSectionIsVisible();
});

Then('the Plan field displays the RATEPLAN active at cycle close day 28', async function () {
  const displayedPlan = await trafficDetailPage.getPlanFieldValue();
  expect(displayedPlan).toBe(expectedPlanAtClose);
});

Then('the plan shown corresponds to the plan active on day 28 not previous plans', async function () {
  const planHistory = await trafficDetailPage.getPlanHistoryForLine(lineIdentifier);
  const displayedPlan = await trafficDetailPage.getPlanFieldValue();
  const planAtDay28 = await trafficDetailPage.getPlanAtSpecificDate(lineIdentifier, 28);
  expect(displayedPlan).toBe(planAtDay28);
  expect(displayedPlan).not.toBe(planHistory.previousPlan);
});

Then('the consumption displayed includes all traffic from the complete cycle', async function () {
  const displayedConsumption = await trafficDetailPage.getTotalConsumption();
  const expectedTotalConsumption = await trafficDetailPage.calculateExpectedCycleConsumption(lineIdentifier);
  expect(displayedConsumption).toBe(expectedTotalConsumption);
  await trafficDetailPage.verifyConsumptionIncludesAllCycleDays();
});