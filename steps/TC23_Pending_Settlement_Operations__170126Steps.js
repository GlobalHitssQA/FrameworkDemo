const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let backendOperations = [];
let expectedTotal = 0;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToLogin();
  await contractValuePage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  await contractValuePage.waitForDashboard();
});

Given('the user has selected a contract with multiple pending settlement operations', async function () {
  await contractValuePage.openContractSearch();
  await contractValuePage.searchContract(process.env.TEST_CONTRACT_ID);
  await contractValuePage.selectFirstContractResult();
  await contractValuePage.waitForContractValueComponent();
});

When('the user retrieves the pending settlement operations from the backend system', async function () {
  backendOperations = await contractValuePage.fetchPendingSettlementOperationsFromBackend();
  expect(backendOperations.length).toBeGreaterThan(0);
});

When('the user calculates the expected total from all pending operations', async function () {
  expectedTotal = contractValuePage.calculateTotalFromOperations(backendOperations);
  expect(expectedTotal).toBeGreaterThan(0);
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
  await contractValuePage.waitForBreakdownPopup();
});

Then('the Pending Settlement amount displayed should match the calculated total', async function () {
  const displayedAmount = await contractValuePage.getPendingSettlementAmount();
  const parsedDisplayedAmount = contractValuePage.parseMonetaryValue(displayedAmount);
  expect(parsedDisplayedAmount).toBeCloseTo(expectedTotal, 2);
  await contractValuePage.closeBreakdownPopup();
});