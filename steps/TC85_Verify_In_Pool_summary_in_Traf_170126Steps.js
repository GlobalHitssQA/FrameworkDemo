const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TrafficDetailPage = require('../pages/TrafficDetailPage');

let trafficDetailPage;
let activeLineCount;
let expectedAssignedPool;

Given('I have active lines in SOLD RatePlan during the billing cycle', async function () {
  trafficDetailPage = new TrafficDetailPage(this.page);
  await trafficDetailPage.navigateToInvoiceSystem();
});

Given('the In Pool calculation shell has been executed before pre-billing', async function () {
  const shellStatus = await trafficDetailPage.verifyInPoolShellExecuted();
  expect(shellStatus).toBeTruthy();
});

Given('the In Pool 10 MB package is configured', async function () {
  const packageConfigured = await trafficDetailPage.verifyInPool10MBPackageConfigured();
  expect(packageConfigured).toBeTruthy();
});

Given('the billing cycle is closed', async function () {
  const cycleStatus = await trafficDetailPage.verifyBillingCycleClosed();
  expect(cycleStatus).toBeTruthy();
});

When('I identify the count of active lines in SOLD RatePlan during the billing cycle', async function () {
  activeLineCount = await trafficDetailPage.getActiveSOLDLineCount();
  expect(activeLineCount).toBeGreaterThan(0);
});

When('I calculate the expected assigned pool as number of lines multiplied by 10 MB', async function () {
  expectedAssignedPool = activeLineCount * 10;
});

When('I access the In Pool 10 MB summary in the Traffic Detail SOLD section of the invoice', async function () {
  await trafficDetailPage.navigateToTrafficDetailSOLDSection();
  await trafficDetailPage.accessInPool10MBSummary();
});

Then('the Assigned Pool field should display the correctly calculated value', async function () {
  const displayedAssignedPool = await trafficDetailPage.getAssignedPoolValue();
  expect(displayedAssignedPool).toBe(expectedAssignedPool);
});

Then('the calculation should include all lines that were in SOLD Rate Plan during the cycle regardless of consumption', async function () {
  const totalLinesInCalculation = await trafficDetailPage.getTotalLinesIncludedInPoolCalculation();
  expect(totalLinesInCalculation).toBe(activeLineCount);
  const calculationDetails = await trafficDetailPage.verifyAllSOLDLinesIncluded();
  expect(calculationDetails.allLinesIncluded).toBeTruthy();
});