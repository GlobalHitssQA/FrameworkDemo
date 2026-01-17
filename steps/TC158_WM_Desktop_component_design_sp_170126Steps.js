const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const WMDesktopComponentPage = require('../pages/WMDesktopComponentPage');

let wmDesktopPage;

Given('the user has access to Figma design specifications for WM Desktop', async function () {
  wmDesktopPage = new WMDesktopComponentPage(this.page);
  await wmDesktopPage.navigateToApplication();
});

Given('the value and composition component is implemented in WM Desktop view', async function () {
  const isComponentVisible = await wmDesktopPage.isValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user compares the total value component design with Figma WM Desktop specifications', async function () {
  await wmDesktopPage.captureComponentScreenshot('total-value-component');
});

Then('the total value component matches pixel-perfect with Figma WM design', async function () {
  const componentStyles = await wmDesktopPage.getTotalValueComponentStyles();
  expect(componentStyles).not.toBeNull();
});

When('the user compares the breakdown popup design with Figma WM Desktop specifications', async function () {
  await wmDesktopPage.clickOnTotalValueComponent();
  await wmDesktopPage.waitForBreakdownPopupVisible();
});

Then('the breakdown popup matches Figma WM design in position size and alignment', async function () {
  const popupStyles = await wmDesktopPage.getBreakdownPopupStyles();
  expect(popupStyles.position).toBeDefined();
  expect(popupStyles.size).toBeDefined();
  expect(popupStyles.alignment).toBeDefined();
});

When('the user verifies colors typography and spacing against WM Desktop style guide', async function () {
  await wmDesktopPage.inspectVisualStyles();
});

Then('all visual elements comply with Wealth Management style guide', async function () {
  const styleCompliance = await wmDesktopPage.verifyStyleGuideCompliance();
  expect(styleCompliance.colorsMatch).toBeTruthy();
  expect(styleCompliance.typographyMatch).toBeTruthy();
  expect(styleCompliance.spacingMatch).toBeTruthy();
});

When('the user verifies the distribution tooltip presentation', async function () {
  await wmDesktopPage.hoverOnDistributionLink();
  await wmDesktopPage.waitForTooltipVisible();
});

Then('the tooltip displays with text and behavior defined in Figma WM', async function () {
  const tooltipText = await wmDesktopPage.getTooltipText();
  const isTooltipVisible = await wmDesktopPage.isTooltipVisible();
  expect(isTooltipVisible).toBeTruthy();
  expect(tooltipText).not.toBeEmpty();
});

Then('any deviations between implementation and Figma WM design are documented', async function () {
  const deviations = await wmDesktopPage.collectDesignDeviations();
  await wmDesktopPage.generateDeviationReport(deviations);
});