const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('I am authenticated and viewing a contract with multiple investment items in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToContract();
  await contractValuePage.waitForContractToLoad();
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('I click on the total contract value component to display the breakdown', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('I should see a popup with the breakdown of all applicable items with their monetary values', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasBreakdownItems = await contractValuePage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});

Then('the total value displayed in the main component should match the sum of all breakdown items', async function () {
  const totalDisplayed = await contractValuePage.getTotalValueDisplayed();
  const sumOfBreakdownItems = await contractValuePage.calculateSumOfBreakdownItems();
  expect(totalDisplayed).toBeCloseTo(sumOfBreakdownItems, 2);
});