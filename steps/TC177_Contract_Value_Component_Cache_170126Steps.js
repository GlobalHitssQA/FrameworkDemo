const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let initialLoadTime;
let secondLoadTime;
let initialNetworkRequests;
let secondNetworkRequests;

Given('the user is authenticated in Acticenter with an active contract', async function() {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.login();
  await contractValuePage.selectActiveContract();
});

Given('network monitoring tools are available', async function() {
  await contractValuePage.enableNetworkMonitoring();
});

When('the user accesses the contract value and composition component for the first time', async function() {
  await contractValuePage.clearNetworkLogs();
  const startTime = Date.now();
  await contractValuePage.openContractValueComponent();
  await contractValuePage.waitForComponentToLoad();
  initialLoadTime = Date.now() - startTime;
  initialNetworkRequests = await contractValuePage.captureBackendRequests();
});

Then('the system should query backend services and store data in cache', async function() {
  const backendCallsMade = await contractValuePage.verifyBackendCallsWereMade(initialNetworkRequests);
  expect(backendCallsMade).toBeTruthy();
});

Then('the initial load time should be recorded as baseline', async function() {
  expect(initialLoadTime).toBeGreaterThan(0);
  await contractValuePage.recordLoadTimeMetric('initial', initialLoadTime);
});

When('the user closes and reopens the component without contract changes', async function() {
  await contractValuePage.closeContractValueComponent();
  await contractValuePage.waitForComponentToBeClosed();
  await contractValuePage.clearNetworkLogs();
  const startTime = Date.now();
  await contractValuePage.openContractValueComponent();
  await contractValuePage.waitForComponentToLoad();
  secondLoadTime = Date.now() - startTime;
  secondNetworkRequests = await contractValuePage.captureBackendRequests();
});

Then('the system should retrieve data from cache without querying backend services again', async function() {
  const cacheWasUsed = await contractValuePage.verifyCacheWasUsed(secondNetworkRequests);
  expect(cacheWasUsed).toBeTruthy();
});

Then('the second load time should be significantly less than the initial load time', async function() {
  const performanceImprovement = ((initialLoadTime - secondLoadTime) / initialLoadTime) * 100;
  expect(secondLoadTime).toBeLessThan(initialLoadTime);
  expect(performanceImprovement).toBeGreaterThan(30);
  await contractValuePage.recordLoadTimeMetric('second', secondLoadTime);
  await contractValuePage.recordPerformanceImprovement(performanceImprovement);
});

Then('no redundant backend service calls should be detected in network monitoring', async function() {
  const redundantCalls = await contractValuePage.detectRedundantBackendCalls(initialNetworkRequests, secondNetworkRequests);
  expect(redundantCalls.length).toBe(0);
});