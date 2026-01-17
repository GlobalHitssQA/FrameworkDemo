const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter with Private Banking profile', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.loginWithPrivateBankingProfile();
  const isMainScreenVisible = await contractBreakdownPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Casa de Bolsa contract with pending settlement operations', async function () {
  await contractBreakdownPage.searchContract();
  await contractBreakdownPage.selectCasaDeBolsaContract();
  const isContractValueComponentVisible = await contractBreakdownPage.isContractValueComponentVisible();
  expect(isContractValueComponentVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isBreakdownPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isBreakdownPopupVisible).toBeTruthy();
});

Then('the Pending Settlements item is visible in the breakdown list', async function () {
  const isPendingSettlementsVisible = await contractBreakdownPage.isPendingSettlementsItemVisible();
  expect(isPendingSettlementsVisible).toBeTruthy();
});

Then('the Pending Settlements item shows the correct monetary accumulated value on the right side', async function () {
  const monetaryValue = await contractBreakdownPage.getPendingSettlementsMonetaryValue();
  expect(monetaryValue).not.toBeNull();
  const isValidMonetaryFormat = await contractBreakdownPage.isValidMonetaryFormat(monetaryValue);
  expect(isValidMonetaryFormat).toBeTruthy();
});