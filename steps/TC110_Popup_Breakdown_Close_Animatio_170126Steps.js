const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BreakdownPopupPage = require('../pages/BreakdownPopupPage');

let breakdownPopupPage;

Given('the user is authenticated in Acticenter', async function () {
  breakdownPopupPage = new BreakdownPopupPage(this.page);
  await breakdownPopupPage.navigateToActicenter();
  await breakdownPopupPage.performAuthentication();
});

Given('an active contract is available', async function () {
  await breakdownPopupPage.verifyActiveContractAvailable();
});

Given('the user is on the Acticenter main page', async function () {
  await breakdownPopupPage.verifyOnMainPage();
});

When('the user clicks on the total contract value component', async function () {
  await breakdownPopupPage.clickTotalContractValueComponent();
});

Then('the breakdown popup should be displayed showing the breakdown items', async function () {
  const isVisible = await breakdownPopupPage.isBreakdownPopupVisible();
  expect(isVisible).toBeTruthy();
  const hasItems = await breakdownPopupPage.hasBreakdownItems();
  expect(hasItems).toBeTruthy();
});

When('the user clicks outside the popup component', async function () {
  this.animationStartTime = Date.now();
  await breakdownPopupPage.clickOutsidePopup();
});

Then('the popup should close with a smooth animation without visual jumps', async function () {
  await breakdownPopupPage.waitForPopupCloseAnimation();
  const isClosed = await breakdownPopupPage.isBreakdownPopupClosed();
  expect(isClosed).toBeTruthy();
  const animationDuration = await breakdownPopupPage.getLastAnimationDuration();
  expect(animationDuration).toBeGreaterThan(100);
  expect(animationDuration).toBeLessThan(1000);
});

When('the user clicks on the total contract value component again', async function () {
  await breakdownPopupPage.clickTotalContractValueComponent();
  await breakdownPopupPage.waitForPopupOpenAnimation();
});

When('the user presses the Escape key', async function () {
  this.escapeAnimationStartTime = Date.now();
  await breakdownPopupPage.pressEscapeKey();
});

Then('the popup should close with the same smooth animation', async function () {
  await breakdownPopupPage.waitForPopupCloseAnimation();
  const isClosed = await breakdownPopupPage.isBreakdownPopupClosed();
  expect(isClosed).toBeTruthy();
  const animationDuration = await breakdownPopupPage.getLastAnimationDuration();
  expect(animationDuration).toBeGreaterThan(100);
  expect(animationDuration).toBeLessThan(1000);
});

When('the user opens and closes the popup multiple times using different methods', async function () {
  this.animationDurations = [];
  for (let i = 0; i < 3; i++) {
    await breakdownPopupPage.clickTotalContractValueComponent();
    await breakdownPopupPage.waitForPopupOpenAnimation();
    if (i === 0) {
      await breakdownPopupPage.clickOutsidePopup();
    } else if (i === 1) {
      await breakdownPopupPage.pressEscapeKey();
    } else {
      await breakdownPopupPage.clickCloseButton();
    }
    await breakdownPopupPage.waitForPopupCloseAnimation();
    const duration = await breakdownPopupPage.getLastAnimationDuration();
    this.animationDurations.push(duration);
  }
});

Then('the close animation should be consistent across all executions with uniform duration and effect', async function () {
  const durations = this.animationDurations;
  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  const tolerance = 150;
  for (const duration of durations) {
    expect(Math.abs(duration - avgDuration)).toBeLessThan(tolerance);
  }
});