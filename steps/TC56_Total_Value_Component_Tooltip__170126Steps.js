const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TotalValuePage = require('../pages/TotalValuePage');

let totalValuePage;

Given('the user is authenticated in Acticenter with a selected contract', async function () {
  totalValuePage = new TotalValuePage(this.page);
  await totalValuePage.navigateToApplication();
  await totalValuePage.authenticateUser();
  await totalValuePage.selectContract();
  const isVisible = await totalValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user hovers over the total value component', async function () {
  await totalValuePage.hoverOverTotalValueComponent();
});

Then('a descriptive tooltip should be displayed', async function () {
  const isTooltipVisible = await totalValuePage.isTooltipVisible();
  expect(isTooltipVisible).toBeTruthy();
});

Then('the tooltip text should contain relevant distribution information', async function () {
  const tooltipText = await totalValuePage.getTooltipText();
  expect(tooltipText).toBeTruthy();
  const hasRelevantContent = await totalValuePage.tooltipContainsDistributionInfo();
  expect(hasRelevantContent).toBeTruthy();
});

When('the user moves the cursor away from the total value component', async function () {
  await totalValuePage.moveMouseAwayFromComponent();
});

Then('the tooltip should be hidden', async function () {
  const isTooltipHidden = await totalValuePage.isTooltipHidden();
  expect(isTooltipHidden).toBeTruthy();
});