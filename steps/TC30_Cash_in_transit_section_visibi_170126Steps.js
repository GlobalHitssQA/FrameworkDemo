const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticateUser();
});

Given('the user selects a Bank type contract', async function () {
  await contractValuePage.selectBankContract();
});

Then('the system displays the selected contract with the total value component', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the system displays the popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Cash in transit section is visible in the breakdown list', async function () {
  const isVisible = await contractValuePage.isCashInTransitVisible();
  expect(isVisible).toBeTruthy();
});

Then('the Cash in transit value matches the SAP prenotes service data', async function () {
  const value = await contractValuePage.getCashInTransitValue();
  expect(value).toBeTruthy();
  const isValidMonetaryFormat = await contractValuePage.isValidMonetaryValue(value);
  expect(isValidMonetaryFormat).toBeTruthy();
});

When('the user selects a Brokerage House type contract', async function () {
  await contractValuePage.closeBreakdownPopup();
  await contractValuePage.selectBrokerageHouseContract();
});

Then('the Cash in transit section is not visible in the breakdown list', async function () {
  const isVisible = await contractValuePage.isCashInTransitVisible();
  expect(isVisible).toBeFalsy();
});