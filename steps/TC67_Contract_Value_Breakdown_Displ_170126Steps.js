const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

When('the user selects a contract from Bank or Brokerage House', async function () {
  await contractValuePage.selectContract();
});

Then('the system displays the operation screen with the total contract value component', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the user locates the Pending Settlement section in the breakdown list', async function () {
  const isSectionVisible = await contractValuePage.isPendingSettlementSectionVisible();
  expect(isSectionVisible).toBeTruthy();
});

Then('the section name displays as Pendientes por liquidar according to Look and Feel specifications', async function () {
  const sectionName = await contractValuePage.getPendingSettlementSectionName();
  expect(sectionName).toBe('Pendientes por liquidar');
});