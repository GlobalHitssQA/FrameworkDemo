const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCompositionPage = require('../pages/ContractCompositionPage');

let contractPage;

Given('the user is authenticated and on the contract consultation module', async function () {
  contractPage = new ContractCompositionPage(this.page);
  await contractPage.navigateToConsultationModule();
});

When('the user selects a contract without hedge fund investments', async function () {
  await contractPage.selectContractWithoutHedgeFunds();
});

Then('the system displays the selected contract', async function () {
  const isDisplayed = await contractPage.isContractDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value to expand the breakdown', async function () {
  await contractPage.clickTotalContractValue();
});

Then('the popup opens showing all applicable sections for the contract', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user locates the hedge funds section in the breakdown', async function () {
  await contractPage.locateHedgeFundsSection();
});

Then('the hedge funds section displays the monetary value {string}', async function (expectedValue) {
  const actualValue = await contractPage.getHedgeFundsValue();
  expect(actualValue).toBe(expectedValue);
});

Then('the hedge funds section format is consistent with other sections', async function () {
  const isFormatConsistent = await contractPage.isHedgeFundsSectionFormatConsistent();
  expect(isFormatConsistent).toBeTruthy();
});