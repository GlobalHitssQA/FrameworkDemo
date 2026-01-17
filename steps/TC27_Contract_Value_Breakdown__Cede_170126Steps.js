const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticateUser();
});

Given('the user has selected a contract with Cedes and Pagares investments', async function () {
  await contractValuePage.selectContractWithCedesAndPagares();
  const isContractDisplayed = await contractValuePage.isContractValueComponentVisible();
  expect(isContractDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the contract value breakdown popup is displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Cedes and Pagares section is visible in the breakdown list', async function () {
  const isSectionVisible = await contractValuePage.isCedesAndPagaresSectionVisible();
  expect(isSectionVisible).toBeTruthy();
});

Then('the Cedes and Pagares section displays the accumulated monetary value on the right side', async function () {
  const monetaryValue = await contractValuePage.getCedesAndPagaresMonetaryValue();
  expect(monetaryValue).toBeTruthy();
  const isValidMonetaryFormat = await contractValuePage.isValidMonetaryFormat(monetaryValue);
  expect(isValidMonetaryFormat).toBeTruthy();
});