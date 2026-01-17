const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter as an advisor', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.loginAsAdvisor();
  await contractBreakdownPage.verifyMainScreenDisplayed();
});

When('the user selects a contract from the query screen', async function () {
  await contractBreakdownPage.selectContractFromQueryScreen();
  await contractBreakdownPage.verifyTotalValueComponentDisplayed();
});

When('the user clicks on the value and composition component to display the breakdown', async function () {
  await contractBreakdownPage.clickValueCompositionComponent();
  await contractBreakdownPage.verifyBreakdownPopupDisplayed();
});

Then('the breakdown list should be vertically aligned with the total contract value component', async function () {
  const isAligned = await contractBreakdownPage.verifyVerticalAlignment();
  expect(isAligned).toBeTruthy();
});