const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let baselineMemory;
let finalMemory;

Given('the user is authenticated in Acticenter with an active contract selected', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.waitForContractComponentToLoad();
});

Given('the browser developer tools are open with memory monitor active', async function () {
  await contractBreakdownPage.enablePerformanceMonitoring();
});

When('I record the baseline memory consumption with the component closed', async function () {
  await contractBreakdownPage.ensureBreakdownComponentIsClosed();
  await contractBreakdownPage.forceGarbageCollection();
  baselineMemory = await contractBreakdownPage.getCurrentMemoryUsage();
});

When('I perform 50 consecutive open and close operations on the breakdown component', async function () {
  const iterations = 50;
  for (let i = 0; i < iterations; i++) {
    await contractBreakdownPage.openBreakdownComponent();
    await contractBreakdownPage.waitForBreakdownPopupToBeVisible();
    await contractBreakdownPage.closeBreakdownComponent();
    await contractBreakdownPage.waitForBreakdownPopupToBeHidden();
  }
});

When('I manually trigger garbage collection in the browser', async function () {
  await contractBreakdownPage.forceGarbageCollection();
  await contractBreakdownPage.waitForMemoryStabilization();
  finalMemory = await contractBreakdownPage.getCurrentMemoryUsage();
});

Then('the final memory consumption should not exceed 10 percent of the baseline', async function () {
  const memoryIncreasePercentage = ((finalMemory - baselineMemory) / baselineMemory) * 100;
  const maxAllowedIncreasePercentage = 10;
  
  console.log(`Baseline Memory: ${(baselineMemory / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Final Memory: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Memory Increase: ${memoryIncreasePercentage.toFixed(2)}%`);
  
  expect(memoryIncreasePercentage).toBeLessThanOrEqual(maxAllowedIncreasePercentage);
});