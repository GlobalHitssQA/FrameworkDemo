const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract selected', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticateUser();
  await contractValuePage.selectActiveContract();
});

Given('the total contract value component is visible on the screen', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('a popup with the contract value breakdown should be displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the popup should show all applicable items with their monetary values aligned to the right', async function () {
  const hasItems = await contractValuePage.hasBreakdownItems();
  expect(hasItems).toBe(true);
  
  const areValuesAlignedRight = await contractValuePage.areMonetaryValuesAlignedRight();
  expect(areValuesAlignedRight).toBe(true);
});

Then('the popup should be vertically aligned with the total contract value component', async function () {
  const isAligned = await contractValuePage.isPopupAlignedWithComponent();
  expect(isAligned).toBe(true);
});