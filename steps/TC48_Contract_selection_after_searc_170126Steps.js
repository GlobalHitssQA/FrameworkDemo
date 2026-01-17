const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let contractPage;

Given('the user is authenticated in Acticenter', async function () {
  contractPage = new ActicenterContractPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.verifyUserIsAuthenticated();
});

Given('the client has multiple active contracts', async function () {
  await contractPage.verifyClientHasMultipleContracts();
});

When('the user clicks on the search magnifying glass icon', async function () {
  await contractPage.clickSearchMagnifyingGlass();
});

Then('the system displays the client general screen with available contracts', async function () {
  const isDisplayed = await contractPage.isClientGeneralScreenDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user views the list of contracts associated with the client', async function () {
  await contractPage.viewContractsList();
});

Then('the system shows all client contracts on the general screen', async function () {
  const contractsVisible = await contractPage.areAllContractsVisible();
  expect(contractsVisible).toBeTruthy();
});

When('the user selects a specific contract from the list', async function () {
  await contractPage.selectFirstAvailableContract();
});

Then('the system loads the selected contract and displays the value and composition component', async function () {
  const isLoaded = await contractPage.isContractValueComponentDisplayed();
  expect(isLoaded).toBeTruthy();
});

Then('the component presents the total value and allows access to the breakdown of the selected contract', async function () {
  const hasTotalValue = await contractPage.isTotalValueDisplayed();
  expect(hasTotalValue).toBeTruthy();
  const hasBreakdownAccess = await contractPage.isBreakdownAccessible();
  expect(hasBreakdownAccess).toBeTruthy();
});

Then('the system enables operation or consultation functions according to user permissions and contract type', async function () {
  const operationsEnabled = await contractPage.areOperationFunctionsEnabled();
  expect(operationsEnabled).toBeTruthy();
});