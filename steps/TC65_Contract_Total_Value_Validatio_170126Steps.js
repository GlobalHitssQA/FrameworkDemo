const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let recordedTotalValue;
let calculatedSum;

Given('I am authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.login();
});

Given('I have selected an active contract', async function () {
  await contractValuePage.selectActiveContract();
});

When('I view the contract screen with the total value component', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('I record the total value displayed in the main component', async function () {
  recordedTotalValue = await contractValuePage.getTotalContractValue();
  expect(recordedTotalValue).not.toBeNull();
});

When('I click on the component to display the breakdown popup', async function () {
  await contractValuePage.clickTotalValueComponent();
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('I calculate the sum of all breakdown items', async function () {
  calculatedSum = await contractValuePage.calculateBreakdownItemsSum();
  expect(calculatedSum).toBeGreaterThanOrEqual(0);
});

Then('the total value should match exactly the sum of all breakdown items', async function () {
  const tolerance = 0.01;
  const difference = Math.abs(recordedTotalValue - calculatedSum);
  expect(difference).toBeLessThanOrEqual(tolerance);
});

Then('items with zero value should be displayed as zero', async function () {
  const zeroItemsDisplayedCorrectly = await contractValuePage.verifyZeroValueItemsDisplay();
  expect(zeroItemsDisplayedCorrectly).toBeTruthy();
});