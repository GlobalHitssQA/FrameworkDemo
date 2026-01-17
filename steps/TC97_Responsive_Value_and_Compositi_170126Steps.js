const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user is authenticated and has a contract selected', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToApplication();
  await valueCompositionPage.ensureUserAuthenticated();
  await valueCompositionPage.ensureContractSelected();
});

When('the user opens the component at desktop resolution 1920x1080', async function () {
  await valueCompositionPage.setViewportSize(1920, 1080);
  await valueCompositionPage.waitForComponentToLoad();
});

Then('the component should display correctly at desktop resolution', async function () {
  const isDisplayed = await valueCompositionPage.isValueCompositionComponentVisible();
  expect(isDisplayed).toBeTruthy();
  const hasOverflow = await valueCompositionPage.checkForOverflowIssues();
  expect(hasOverflow).toBeFalsy();
});

When('the user resizes the browser to 1366x768', async function () {
  await valueCompositionPage.setViewportSize(1366, 768);
  await valueCompositionPage.waitForComponentToStabilize();
});

Then('the component should adapt correctly maintaining all elements visible and functional', async function () {
  const allElementsVisible = await valueCompositionPage.areAllComponentElementsVisible();
  expect(allElementsVisible).toBeTruthy();
  const isFunctional = await valueCompositionPage.verifyComponentFunctionality();
  expect(isFunctional).toBeTruthy();
});

When('the user resizes the browser to 1024x768', async function () {
  await valueCompositionPage.setViewportSize(1024, 768);
  await valueCompositionPage.waitForComponentToStabilize();
});

Then('the component should continue displaying correctly with appropriate responsive adjustments', async function () {
  const isResponsive = await valueCompositionPage.verifyResponsiveLayout();
  expect(isResponsive).toBeTruthy();
  const elementsAccessible = await valueCompositionPage.areAllComponentElementsVisible();
  expect(elementsAccessible).toBeTruthy();
});

When('the user triggers the popup at each resolution', async function () {
  this.popupResults = [];
  const resolutions = [[1920, 1080], [1366, 768], [1024, 768]];
  for (const [width, height] of resolutions) {
    await valueCompositionPage.setViewportSize(width, height);
    await valueCompositionPage.waitForComponentToStabilize();
    await valueCompositionPage.clickValueCompositionComponent();
    const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
    this.popupResults.push({ resolution: `${width}x${height}`, success: isPopupVisible });
    await valueCompositionPage.closePopup();
  }
});

Then('the breakdown popup should deploy correctly at all tested resolutions', async function () {
  for (const result of this.popupResults) {
    expect(result.success).toBeTruthy();
  }
});

Then('all component elements should be visible and accessible without being cut off overlapped or out of view', async function () {
  const resolutions = [[1920, 1080], [1366, 768], [1024, 768]];
  for (const [width, height] of resolutions) {
    await valueCompositionPage.setViewportSize(width, height);
    await valueCompositionPage.waitForComponentToStabilize();
    const noElementsCutOff = await valueCompositionPage.verifyNoElementsCutOff();
    expect(noElementsCutOff).toBeTruthy();
    const noOverlapping = await valueCompositionPage.verifyNoOverlappingElements();
    expect(noOverlapping).toBeTruthy();
    const allInView = await valueCompositionPage.verifyAllElementsInViewport();
    expect(allInView).toBeTruthy();
  }
});