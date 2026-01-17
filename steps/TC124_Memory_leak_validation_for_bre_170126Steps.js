const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');
const { expect } = require('@playwright/test');

let browser;
let context;
let page;
let acticenterPage;
let initialMemory;
let finalMemory;

Before(async function () {
  browser = await chromium.launch({
    headless: false,
    args: ['--enable-precise-memory-info', '--js-flags=--expose-gc']
  });
  context = await browser.newContext();
  page = await context.newPage();
  acticenterPage = new ActicenterPage(page);
});

After(async function () {
  await browser.close();
});

Given('the browser is launched with developer tools and memory monitoring enabled', async function () {
  await acticenterPage.enableMemoryMonitoring();
});

Given('the user is authenticated in the Acticenter system', async function () {
  await acticenterPage.navigateToLogin();
  await acticenterPage.performLogin();
});

When('the user accesses the Acticenter module and selects an active contract', async function () {
  await acticenterPage.navigateToActicenterModule();
  await acticenterPage.selectActiveContract();
});

Then('the value and composition component should be displayed correctly', async function () {
  const isVisible = await acticenterPage.isValueCompositionComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user records the initial browser memory consumption', async function () {
  initialMemory = await acticenterPage.getMemoryUsage();
});

Then('the base memory value in MB should be captured', async function () {
  expect(initialMemory).toBeGreaterThan(0);
  console.log(`Initial memory consumption: ${initialMemory} MB`);
});

When('the user opens and closes the breakdown popup 50 consecutive times', async function () {
  await acticenterPage.openAndClosePopupMultipleTimes(50);
});

Then('the popup should open and close correctly on each iteration', async function () {
  const popupClosed = await acticenterPage.isBreakdownPopupClosed();
  expect(popupClosed).toBeTruthy();
});

When('the user forces garbage collection in the browser', async function () {
  await acticenterPage.forceGarbageCollection();
});

Then('the browser should execute memory cleanup', async function () {
  await acticenterPage.waitForMemoryCleanup();
});

When('the user records the final memory consumption and compares with initial value', async function () {
  finalMemory = await acticenterPage.getMemoryUsage();
  console.log(`Final memory consumption: ${finalMemory} MB`);
});

Then('the memory increase should be less than 10 percent of the initial value', async function () {
  const memoryIncrease = finalMemory - initialMemory;
  const percentageIncrease = (memoryIncrease / initialMemory) * 100;
  console.log(`Memory increase: ${memoryIncrease} MB (${percentageIncrease.toFixed(2)}%)`);
  expect(percentageIncrease).toBeLessThan(10);
});