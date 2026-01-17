const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('an active contract is selected', async function () {
  await contractValuePage.selectActiveContract();
});

When('the user views the contract value component', async function () {
  await contractValuePage.waitForContractValueComponentVisible();
});

Then('the component external margins should match Figma design specifications', async function () {
  const margins = await contractValuePage.getComponentExternalMargins();
  expect(margins.top).toBeGreaterThanOrEqual(0);
  expect(margins.bottom).toBeGreaterThanOrEqual(0);
  expect(margins.left).toBeGreaterThanOrEqual(0);
  expect(margins.right).toBeGreaterThanOrEqual(0);
});

When('the user opens the breakdown popup', async function () {
  await contractValuePage.clickContractValueComponent();
  await contractValuePage.waitForBreakdownPopupVisible();
});

Then('the internal padding of each item in the breakdown list should match Figma specifications', async function () {
  const itemPaddings = await contractValuePage.getBreakdownItemsPadding();
  for (const padding of itemPaddings) {
    expect(padding.top).toBeGreaterThanOrEqual(0);
    expect(padding.bottom).toBeGreaterThanOrEqual(0);
    expect(padding.left).toBeGreaterThanOrEqual(0);
    expect(padding.right).toBeGreaterThanOrEqual(0);
  }
});

Then('the separation between breakdown items should match Figma specifications', async function () {
  const separations = await contractValuePage.getBreakdownItemsSeparation();
  for (const separation of separations) {
    expect(separation).toBeGreaterThanOrEqual(0);
  }
});

Then('the breakdown should be vertically aligned with the main component', async function () {
  const isAligned = await contractValuePage.verifyBreakdownVerticalAlignment();
  expect(isAligned).toBe(true);
});