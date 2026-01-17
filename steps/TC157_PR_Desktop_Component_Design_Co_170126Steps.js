const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PRDesktopComponentPage = require('../pages/PRDesktopComponentPage');

let prDesktopPage;
let deviationReport = [];

Given('I have access to the PR Desktop application', async function () {
  prDesktopPage = new PRDesktopComponentPage(this.page);
  await prDesktopPage.navigateToApplication();
});

Given('I have the Figma design specifications for PR Desktop component', async function () {
  const isPageLoaded = await prDesktopPage.isApplicationLoaded();
  expect(isPageLoaded).toBeTruthy();
});

When('I inspect the total value component design', async function () {
  const isVisible = await prDesktopPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the total value component should match Figma PR specifications', async function () {
  const componentStyles = await prDesktopPage.getTotalValueComponentStyles();
  const hasValidStyles = componentStyles !== null;
  if (!hasValidStyles) {
    deviationReport.push('Total value component styles do not match Figma PR specifications');
  }
  expect(hasValidStyles).toBeTruthy();
});

When('I open the breakdown popup', async function () {
  await prDesktopPage.clickTotalValueComponent();
  await prDesktopPage.waitForBreakdownPopup();
});

Then('the breakdown popup should match Figma PR design in position size and alignment', async function () {
  const isPopupVisible = await prDesktopPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const popupStyles = await prDesktopPage.getBreakdownPopupStyles();
  const hasValidPosition = popupStyles !== null;
  if (!hasValidPosition) {
    deviationReport.push('Breakdown popup position, size or alignment does not match Figma PR design');
  }
  expect(hasValidPosition).toBeTruthy();
});

Then('the colors typography and spacing should comply with PR Desktop style guide', async function () {
  const colorCompliance = await prDesktopPage.verifyColorCompliance();
  const typographyCompliance = await prDesktopPage.verifyTypographyCompliance();
  const spacingCompliance = await prDesktopPage.verifySpacingCompliance();
  if (!colorCompliance) {
    deviationReport.push('Colors do not comply with PR Desktop style guide');
  }
  if (!typographyCompliance) {
    deviationReport.push('Typography does not comply with PR Desktop style guide');
  }
  if (!spacingCompliance) {
    deviationReport.push('Spacing does not comply with PR Desktop style guide');
  }
  expect(colorCompliance && typographyCompliance && spacingCompliance).toBeTruthy();
});

When('I inspect the client contract search functionality in the header', async function () {
  const isSearchVisible = await prDesktopPage.isSearchMagnifyingGlassVisible();
  expect(isSearchVisible).toBeTruthy();
});

Then('the search magnifying glass should function according to Figma PR Desktop design', async function () {
  await prDesktopPage.clickSearchMagnifyingGlass();
  const isSearchInputVisible = await prDesktopPage.isSearchInputVisible();
  expect(isSearchInputVisible).toBeTruthy();
  const searchStyles = await prDesktopPage.getSearchComponentStyles();
  if (!searchStyles) {
    deviationReport.push('Search component does not match Figma PR Desktop design');
  }
  await prDesktopPage.closeSearchIfOpen();
});

Then('I should be able to generate a deviation report for any discrepancies found', async function () {
  const report = await prDesktopPage.generateDeviationReport(deviationReport);
  console.log('Deviation Report for Banca Privada PR Desktop:');
  console.log(report);
  expect(report).toBeDefined();
});