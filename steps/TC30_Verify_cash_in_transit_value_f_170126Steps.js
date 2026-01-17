const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let sapPrenotesValue;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('the SAP prenotes service is available and functional', async function () {
  const isServiceAvailable = await contractValuePage.verifySAPPrenotesServiceAvailability();
  expect(isServiceAvailable).toBe(true);
});

When('the user selects an active Bank contract', async function () {
  await contractValuePage.selectBankContract();
});

Then('the system displays the total contract value component', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user retrieves the expected cash in transit value from SAP prenotes service', async function () {
  sapPrenotesValue = await contractValuePage.getCashInTransitFromSAPService();
  expect(sapPrenotesValue).toBeDefined();
});

When('the user clicks on the total contract value component to expand the breakdown', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays the popup with detailed contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

When('the user locates the cash in transit item in the breakdown list', async function () {
  await contractValuePage.locateCashInTransitItem();
});

Then('the cash in transit item is visible in the breakdown', async function () {
  const isVisible = await contractValuePage.isCashInTransitItemVisible();
  expect(isVisible).toBe(true);
});

Then('the displayed cash in transit value matches exactly the SAP prenotes service value with correct thousand separators and decimal format', async function () {
  const displayedValue = await contractValuePage.getCashInTransitDisplayedValue();
  const formattedSAPValue = await contractValuePage.formatCurrencyValue(sapPrenotesValue);
  expect(displayedValue).toBe(formattedSAPValue);
});