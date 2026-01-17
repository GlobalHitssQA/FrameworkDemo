const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToMainScreen();
});

Given('a contract is previously selected', async function () {
  await contractValuePage.ensureContractIsSelected();
});

Given('the contract total value component is visible on the main screen', async function () {
  const isVisible = await contractValuePage.isContractTotalValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the contract total value component', async function () {
  await contractValuePage.clickContractTotalValueComponent();
});

Then('a pop-up is displayed with the detailed breakdown of all applicable items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  
  const hasItems = await contractValuePage.hasBreakdownItems();
  expect(hasItems).toBe(true);
});

Then('each item shows its monetary value on the right side', async function () {
  const allItemsHaveValues = await contractValuePage.allItemsHaveMonetaryValues();
  expect(allItemsHaveValues).toBe(true);
});