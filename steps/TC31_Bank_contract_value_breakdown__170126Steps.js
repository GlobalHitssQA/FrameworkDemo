const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the advisor user is authenticated in Acticenter system', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.loginAsAdvisor();
  await contractBreakdownPage.verifyMainScreenDisplayed();
});

When('the user selects a Bank type contract from the query screen', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectBankTypeContract();
});

Then('the system displays the contract information with the total value component', async function () {
  const isDisplayed = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isDisplayed).toBeTruthy();
});

When('the user clicks on the value and composition component to expand the breakdown', async function () {
  await contractBreakdownPage.clickValueCompositionComponent();
});

Then('the system displays the popup with breakdown showing Cash in transit item', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasCashInTransit = await contractBreakdownPage.isCashInTransitItemVisible();
  expect(hasCashInTransit).toBeTruthy();
});

When('the user closes the breakdown and selects a Casa de Bolsa type contract', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectCasaDeBolsaTypeContract();
});

Then('the system displays the Casa de Bolsa contract information', async function () {
  const isDisplayed = await contractBreakdownPage.isContractInformationVisible();
  expect(isDisplayed).toBeTruthy();
});

Then('the system displays the popup with breakdown without showing Cash in transit item', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasCashInTransit = await contractBreakdownPage.isCashInTransitItemVisible();
  expect(hasCashInTransit).toBeFalsy();
});