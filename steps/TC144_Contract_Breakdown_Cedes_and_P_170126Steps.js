const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('I am logged into Acticenter as an authorized user', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.login(process.env.ACTICENTER_USER, process.env.ACTICENTER_PASSWORD);
  await contractBreakdownPage.verifyMainInterfaceIsDisplayed();
});

When('I select a contract that contains Cedes and Pagares investments', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.searchAndSelectContractWithCedesAndPagares();
  await contractBreakdownPage.verifyTotalContractValueComponentIsVisible();
});

When('I click on the total contract value component to open the breakdown', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('I should see the breakdown popup with all items listed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const areItemsListed = await contractBreakdownPage.areBreakdownItemsListed();
  expect(areItemsListed).toBeTruthy();
});

Then('the Cedes and Pagares item should display the correct accumulated monetary value', async function () {
  const isCedesAndPagaresVisible = await contractBreakdownPage.isCedesAndPagaresItemVisible();
  expect(isCedesAndPagaresVisible).toBeTruthy();
  const monetaryValue = await contractBreakdownPage.getCedesAndPagaresMonetaryValue();
  expect(monetaryValue).not.toBeNull();
  expect(monetaryValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});