const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.authenticateUser();
});

Given('the user has selected an active contract', async function () {
  await contractBreakdownPage.selectActiveContract();
});

Given('the contract value and composition component is visible', async function () {
  const isVisible = await contractBreakdownPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractBreakdownPage.clickContractValueComponent();
});

Then('the breakdown opens showing the list of contract items', async function () {
  const isBreakdownVisible = await contractBreakdownPage.isBreakdownListVisible();
  expect(isBreakdownVisible).toBeTruthy();
});

When('the user clicks outside the expanded component to close it', async function () {
  this.transitionStartTime = Date.now();
  await contractBreakdownPage.clickOutsideBreakdown();
});

Then('the component closes collapsing the breakdown', async function () {
  const isClosed = await contractBreakdownPage.isBreakdownClosed();
  expect(isClosed).toBeTruthy();
});

Then('the visual transition is smooth without jumps or interruptions', async function () {
  const transitionMetrics = await contractBreakdownPage.measureCloseTransition();
  expect(transitionMetrics.isSmooth).toBeTruthy();
  expect(transitionMetrics.hasNoJumps).toBeTruthy();
  expect(transitionMetrics.durationMs).toBeGreaterThan(100);
  expect(transitionMetrics.durationMs).toBeLessThan(1000);
});

When('the user repeats the close action multiple times', async function () {
  this.transitionResults = [];
  const iterations = 5;
  
  for (let i = 0; i < iterations; i++) {
    await contractBreakdownPage.clickContractValueComponent();
    await contractBreakdownPage.waitForBreakdownOpen();
    
    const metrics = await contractBreakdownPage.measureCloseTransition();
    this.transitionResults.push(metrics);
    
    await contractBreakdownPage.clickOutsideBreakdown();
    await contractBreakdownPage.waitForBreakdownClose();
  }
});

Then('all close transitions execute smoothly and consistently', async function () {
  for (const result of this.transitionResults) {
    expect(result.isSmooth).toBeTruthy();
    expect(result.hasNoJumps).toBeTruthy();
  }
  
  const durations = this.transitionResults.map(r => r.durationMs);
  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  const variance = durations.map(d => Math.abs(d - avgDuration));
  const maxVariance = Math.max(...variance);
  
  expect(maxVariance).toBeLessThan(200);
});