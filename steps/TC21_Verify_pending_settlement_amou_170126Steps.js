const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with Patrimonial Banking profile', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginWithPatrimonialBankingProfile();
  const isMainScreenVisible = await contractValuePage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Bank type contract with pending settlement operations', async function () {
  await contractValuePage.searchBankContractWithPendingSettlement();
  await contractValuePage.selectBankContract();
  const isContractValueComponentVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isContractValueComponentVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isBreakdownPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isBreakdownPopupVisible).toBeTruthy();
});

Then('the user locates the Pending Settlement item in the breakdown list', async function () {
  const isPendingSettlementItemVisible = await contractValuePage.isPendingSettlementItemVisible();
  expect(isPendingSettlementItemVisible).toBeTruthy();
});

Then('the Pending Settlement item displays the correct monetary accumulated value', async function () {
  const pendingSettlementValue = await contractValuePage.getPendingSettlementValue();
  expect(pendingSettlementValue).not.toBeNull();
  const isValidMonetaryFormat = await contractValuePage.isValidMonetaryFormat(pendingSettlementValue);
  expect(isValidMonetaryFormat).toBeTruthy();
});