const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user opens Acticenter application in Firefox browser', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
});

Given('the user is authenticated in the system', async function () {
  await contractValuePage.verifyUserIsAuthenticated();
});

When('the user selects a previously registered contract', async function () {
  await contractValuePage.selectContract();
});

Then('the contract value and composition component is displayed', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the component to expand the contract value breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the breakdown popup is displayed with all corresponding items', async function () {
  const isVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isVisible).toBe(true);
});

Then('the breakdown shows Purchasing power MXN item', async function () {
  const isVisible = await contractValuePage.isBreakdownItemVisible('purchasing-power-mxn');
  expect(isVisible).toBe(true);
});

Then('the breakdown shows Cash MXN item', async function () {
  const isVisible = await contractValuePage.isBreakdownItemVisible('cash-mxn');
  expect(isVisible).toBe(true);
});

Then('the breakdown shows Cash USD item', async function () {
  const isVisible = await contractValuePage.isBreakdownItemVisible('cash-usd');
  expect(isVisible).toBe(true);
});

Then('the breakdown shows Pending settlement item', async function () {
  const isVisible = await contractValuePage.isBreakdownItemVisible('pending-settlement');
  expect(isVisible).toBe(true);
});

Then('the breakdown shows Funds item', async function () {
  const isVisible = await contractValuePage.isBreakdownItemVisible('funds');
  expect(isVisible).toBe(true);
});

Then('the breakdown shows Cedes and promissory notes item', async function () {
  const isVisible = await contractValuePage.isBreakdownItemVisible('cedes-promissory-notes');
  expect(isVisible).toBe(true);
});

Then('the breakdown shows Money market item', async function () {
  const isVisible = await contractValuePage.isBreakdownItemVisible('money-market');
  expect(isVisible).toBe(true);
});

Then('the breakdown shows Capital market item', async function () {
  const isVisible = await contractValuePage.isBreakdownItemVisible('capital-market');
  expect(isVisible).toBe(true);
});

Then('all visual elements are correctly aligned without distortions', async function () {
  const hasDistortions = await contractValuePage.checkForVisualDistortions();
  expect(hasDistortions).toBe(false);
});

Then('monetary values are right-aligned', async function () {
  const isRightAligned = await contractValuePage.areMonetaryValuesRightAligned();
  expect(isRightAligned).toBe(true);
});

Then('the list items are vertically aligned', async function () {
  const isVerticallyAligned = await contractValuePage.areListItemsVerticallyAligned();
  expect(isVerticallyAligned).toBe(true);
});