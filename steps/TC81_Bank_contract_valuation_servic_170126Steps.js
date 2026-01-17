const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToActicenter();
  await contractValuationPage.verifyUserIsAuthenticated();
});

Given('a Bank contract is active and available', async function () {
  await contractValuationPage.verifyBankContractIsAvailable();
});

Given('the contract valuation service is available', async function () {
  await contractValuationPage.verifyValuationServiceIsAvailable();
});

When('the user selects a Bank contract for Physical or Moral Person', async function () {
  await contractValuationPage.selectBankContract();
});

Then('the system loads the selected contract', async function () {
  const isLoaded = await contractValuationPage.isContractLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user accesses the Contract Value and Composition component', async function () {
  await contractValuationPage.accessContractValueComponent();
});

Then('the system invokes the contract valuation service for Bank', async function () {
  const serviceInvoked = await contractValuationPage.isValuationServiceInvoked();
  expect(serviceInvoked).toBeTruthy();
});

Then('the component displays the total contract value', async function () {
  const totalValueVisible = await contractValuationPage.isTotalContractValueVisible();
  expect(totalValueVisible).toBeTruthy();
});

Then('the component displays the itemized breakdown with valuation service data', async function () {
  const breakdownVisible = await contractValuationPage.isItemizedBreakdownVisible();
  expect(breakdownVisible).toBeTruthy();
  const breakdownItems = await contractValuationPage.getBreakdownItems();
  expect(breakdownItems.length).toBeGreaterThan(0);
});