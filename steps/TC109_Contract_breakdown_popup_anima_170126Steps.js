const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('an active contract is available', async function () {
  await contractBreakdownPage.verifyActiveContractAvailable();
});

When('the user accesses the contract value and composition component', async function () {
  await contractBreakdownPage.accessContractValueComponent();
});

Then('the contract value and composition component is displayed', async function () {
  const isDisplayed = await contractBreakdownPage.isContractValueComponentVisible();
  expect(isDisplayed).toBe(true);
});

When('the user clicks on the component to open the breakdown popup', async function () {
  await contractBreakdownPage.recordAnimationStartTime();
  await contractBreakdownPage.clickContractValueComponent();
});

Then('the popup opens with a smooth animation without visual jumps', async function () {
  const animationMetrics = await contractBreakdownPage.measurePopupAnimation();
  expect(animationMetrics.hasAnimation).toBe(true);
  expect(animationMetrics.isSmooth).toBe(true);
  expect(animationMetrics.durationMs).toBeGreaterThan(100);
  expect(animationMetrics.durationMs).toBeLessThan(1000);
});

Then('the popup is vertically aligned with the main component', async function () {
  const isAligned = await contractBreakdownPage.verifyPopupVerticalAlignment();
  expect(isAligned).toBe(true);
});

When('the user repeats the popup opening action multiple times', async function () {
  await contractBreakdownPage.repeatPopupOpeningMultipleTimes(3);
});

Then('the animation is consistent across all executions with uniform duration and effect', async function () {
  const consistencyResult = await contractBreakdownPage.verifyAnimationConsistency();
  expect(consistencyResult.isConsistent).toBe(true);
  expect(consistencyResult.durationVariance).toBeLessThan(100);
});