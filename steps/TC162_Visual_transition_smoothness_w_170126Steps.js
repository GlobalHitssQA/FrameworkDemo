const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.performAuthentication();
});

Given('the user has selected an active contract', async function () {
  await contractBreakdownPage.selectActiveContract();
});

Given('the contract value and composition component is visible in collapsed state', async function () {
  const isVisible = await contractBreakdownPage.isContractComponentVisible();
  expect(isVisible).toBe(true);
  const isCollapsed = await contractBreakdownPage.isComponentCollapsed();
  expect(isCollapsed).toBe(true);
});

When('the user clicks on the component to expand the breakdown', async function () {
  this.transitionStartTime = Date.now();
  await contractBreakdownPage.clickToExpandBreakdown();
  this.transitionEndTime = Date.now();
});

Then('the component should expand showing the itemized breakdown list', async function () {
  const isExpanded = await contractBreakdownPage.isBreakdownExpanded();
  expect(isExpanded).toBe(true);
  const isListVisible = await contractBreakdownPage.isItemizedListVisible();
  expect(isListVisible).toBe(true);
});

Then('the visual transition should be smooth without jumps or interruptions', async function () {
  const transitionDuration = this.transitionEndTime - this.transitionStartTime;
  const hasTransitionProperty = await contractBreakdownPage.hasTransitionCSSProperty();
  expect(hasTransitionProperty).toBe(true);
  const isTransitionSmooth = await contractBreakdownPage.verifyTransitionSmoothness();
  expect(isTransitionSmooth).toBe(true);
  expect(transitionDuration).toBeGreaterThan(100);
  expect(transitionDuration).toBeLessThan(2000);
});

When('the user repeats the expand action from different contracts', async function () {
  this.transitionResults = [];
  const contractCount = 3;
  for (let i = 0; i < contractCount; i++) {
    await contractBreakdownPage.collapseBreakdown();
    await contractBreakdownPage.selectContractByIndex(i);
    const startTime = Date.now();
    await contractBreakdownPage.clickToExpandBreakdown();
    const endTime = Date.now();
    const isSmooth = await contractBreakdownPage.verifyTransitionSmoothness();
    this.transitionResults.push({
      duration: endTime - startTime,
      isSmooth: isSmooth
    });
  }
});

Then('the visual transition should be smooth and consistent in all cases', async function () {
  for (const result of this.transitionResults) {
    expect(result.isSmooth).toBe(true);
    expect(result.duration).toBeGreaterThan(100);
    expect(result.duration).toBeLessThan(2000);
  }
  const durations = this.transitionResults.map(r => r.duration);
  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  for (const duration of durations) {
    const deviation = Math.abs(duration - avgDuration);
    expect(deviation).toBeLessThan(500);
  }
});