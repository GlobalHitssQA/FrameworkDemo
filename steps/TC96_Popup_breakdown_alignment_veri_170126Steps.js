const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BreakdownPopupPage = require('../pages/BreakdownPopupPage');

let breakdownPopupPage;

Given('the user is authenticated and has a contract with multiple value items selected', async function () {
  breakdownPopupPage = new BreakdownPopupPage(this.page);
  await breakdownPopupPage.navigateToContractView();
  await breakdownPopupPage.waitForContractLoaded();
});

When('the user clicks on the total value component to display the breakdown popup', async function () {
  await breakdownPopupPage.clickTotalValueComponent();
});

Then('the breakdown popup should be displayed with the list of items and their values', async function () {
  const isPopupVisible = await breakdownPopupPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const itemsCount = await breakdownPopupPage.getBreakdownItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

Then('all item names should be aligned to the left', async function () {
  const alignments = await breakdownPopupPage.getItemNamesTextAlign();
  for (const alignment of alignments) {
    expect(alignment).toBe('left');
  }
});

Then('all monetary values should be aligned to the right', async function () {
  const alignments = await breakdownPopupPage.getMonetaryValuesTextAlign();
  for (const alignment of alignments) {
    expect(alignment).toBe('right');
  }
});

Then('the alignment should be consistent for all displayed items', async function () {
  const namesAlignments = await breakdownPopupPage.getItemNamesTextAlign();
  const valuesAlignments = await breakdownPopupPage.getMonetaryValuesTextAlign();
  const allNamesLeftAligned = namesAlignments.every(align => align === 'left');
  const allValuesRightAligned = valuesAlignments.every(align => align === 'right');
  expect(allNamesLeftAligned).toBe(true);
  expect(allValuesRightAligned).toBe(true);
});

Then('the vertical spacing between items should be uniform', async function () {
  const spacings = await breakdownPopupPage.getVerticalSpacingsBetweenItems();
  if (spacings.length > 1) {
    const firstSpacing = spacings[0];
    const tolerance = 2;
    for (const spacing of spacings) {
      expect(Math.abs(spacing - firstSpacing)).toBeLessThanOrEqual(tolerance);
    }
  }
});