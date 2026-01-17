const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractPage;
let referenceValue;

Given('the user is authenticated in Acticenter', async function () {
  contractPage = new ContractBreakdownPage(this.page);
  await contractPage.navigateToLogin();
  await contractPage.login(process.env.ACTICENTER_USER, process.env.ACTICENTER_PASSWORD);
});

Given('the user selects a contract with known investments in Cedes and Pagares', async function () {
  await contractPage.searchContract(process.env.TEST_CONTRACT_ID);
  await contractPage.selectContractFromResults();
});

Given('the system loads the contract and displays the main information', async function () {
  const isLoaded = await contractPage.isContractInformationVisible();
  expect(isLoaded).toBeTruthy();
});

When('the user obtains the reference value for Cedes and Pagares from the source system', async function () {
  referenceValue = process.env.CEDES_PAGARES_REFERENCE_VALUE || '0.00';
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await contractPage.clickTotalContractValue();
});

Then('the system displays the popup with the detailed breakdown', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the monetary value shown in Cedes and Pagares section matches the reference value', async function () {
  const displayedValue = await contractPage.getCedesPagaresValue();
  const normalizedDisplayed = contractPage.normalizeMonetaryValue(displayedValue);
  const normalizedReference = contractPage.normalizeMonetaryValue(referenceValue);
  expect(normalizedDisplayed).toBe(normalizedReference);
});

Then('the value is displayed with currency format and aligned to the right', async function () {
  const hasCorrectFormat = await contractPage.hasCurrencyFormat();
  expect(hasCorrectFormat).toBeTruthy();
  const isRightAligned = await contractPage.isCedesPagaresValueRightAligned();
  expect(isRightAligned).toBeTruthy();
});