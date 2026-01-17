const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with a selected contract', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToMainScreen();
  await contractValuePage.verifyUserIsAuthenticated();
  await contractValuePage.verifyContractIsSelected();
});

When('the user identifies the vertical position of the total contract value component', async function () {
  await contractValuePage.identifyTotalContractValuePosition();
});

Then('the total contract value component should be visible on the main screen', async function () {
  const isVisible = await contractValuePage.isTotalContractValueVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValue();
});

Then('the system displays the popup with the breakdown of items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the breakdown popup should be vertically aligned with the total contract value component', async function () {
  const isAligned = await contractValuePage.verifyPopupVerticalAlignment();
  expect(isAligned).toBe(true);
});