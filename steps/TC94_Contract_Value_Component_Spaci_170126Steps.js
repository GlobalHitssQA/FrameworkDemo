const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and has a contract selected', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToContractView();
  await contractValuePage.waitForAuthentication();
});

Given('the contract value and composition component is displayed', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user inspects the internal spacing between component elements', async function () {
  await contractValuePage.openBreakdownPopup();
  await contractValuePage.captureComponentStyles();
});

Then('the padding of the total value container should match design specifications', async function () {
  const padding = await contractValuePage.getTotalValueContainerPadding();
  expect(padding.top).toBe('16px');
  expect(padding.right).toBe('24px');
  expect(padding.bottom).toBe('16px');
  expect(padding.left).toBe('24px');
});

Then('the margin between breakdown items should be consistent', async function () {
  const margins = await contractValuePage.getBreakdownItemsMargins();
  const expectedMargin = '8px';
  margins.forEach((margin) => {
    expect(margin).toBe(expectedMargin);
  });
});

Then('the breakdown list should be vertically aligned with the total value component', async function () {
  const isAligned = await contractValuePage.verifyVerticalAlignment();
  expect(isAligned).toBeTruthy();
});

Then('all spacing values should comply with the design system standards', async function () {
  const complianceResult = await contractValuePage.verifyDesignSystemCompliance();
  expect(complianceResult.isCompliant).toBeTruthy();
});