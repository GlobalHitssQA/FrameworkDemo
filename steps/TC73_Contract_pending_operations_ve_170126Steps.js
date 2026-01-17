const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('I am authenticated in the system', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.performLogin();
});

Given('I have access to a contract without pending operations to settle', async function () {
  await contractBreakdownPage.verifyContractSearchIsAvailable();
});

When('I select the contract without pending operations', async function () {
  await contractBreakdownPage.searchAndSelectContractWithoutPendingOperations();
});

Then('the system loads the selected contract', async function () {
  const isLoaded = await contractBreakdownPage.isContractLoaded();
  expect(isLoaded).toBeTruthy();
});

When('I click on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the popup with the contract value breakdown is displayed correctly', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('I locate the pending to settle item in the list', async function () {
  await contractBreakdownPage.scrollToPendingToSettleItem();
});

Then('the pending to settle item shows a value of zero', async function () {
  const pendingValue = await contractBreakdownPage.getPendingToSettleValue();
  expect(pendingValue).toBe('$0.00');
});

Then('the total contract value matches the sum of other items without including pending operations', async function () {
  const totalValue = await contractBreakdownPage.getTotalContractValue();
  const sumOfOtherItems = await contractBreakdownPage.calculateSumOfNonPendingItems();
  expect(totalValue).toBe(sumOfOtherItems);
});