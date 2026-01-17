const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractAccessibilityPage = require('../pages/ContractAccessibilityPage');

let contractPage;

Given('the user is authenticated in Acticenter', async function () {
  contractPage = new ContractAccessibilityPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.authenticateUser();
});

Given('the user has an active contract selected', async function () {
  await contractPage.selectActiveContract();
});

When('the user views the contract value and composition component', async function () {
  await contractPage.waitForContractComponentVisible();
});

Then('the main component text should have a contrast ratio of at least 4.5:1 with its background', async function () {
  const contrastRatio = await contractPage.getMainComponentTextContrastRatio();
  expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
});

When('the user opens the breakdown popup', async function () {
  await contractPage.openBreakdownPopup();
});

Then('all section titles should have sufficient contrast with the background', async function () {
  const sectionTitlesContrast = await contractPage.getSectionTitlesContrastRatios();
  for (const ratio of sectionTitlesContrast) {
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  }
});

Then('all monetary values should have sufficient contrast with the background', async function () {
  const monetaryValuesContrast = await contractPage.getMonetaryValuesContrastRatios();
  for (const ratio of monetaryValuesContrast) {
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  }
});

When('the user hovers over a section item', async function () {
  await contractPage.hoverOverFirstSectionItem();
});

Then('the hover state should maintain WCAG AA contrast standards', async function () {
  const hoverContrastRatio = await contractPage.getHoveredItemContrastRatio();
  expect(hoverContrastRatio).toBeGreaterThanOrEqual(4.5);
});

When('the user selects a section item', async function () {
  await contractPage.selectFirstSectionItem();
});

Then('the selected state should maintain WCAG AA contrast standards', async function () {
  const selectedContrastRatio = await contractPage.getSelectedItemContrastRatio();
  expect(selectedContrastRatio).toBeGreaterThanOrEqual(4.5);
});