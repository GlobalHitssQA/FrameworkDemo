const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a Banco Persona Moral contract with associated Mexdolar account exists', async function () {
  await contractBreakdownPage.verifyMexdolarContractExists();
});

When('the user selects the Banco Persona Moral contract with Mexdolar account', async function () {
  await contractBreakdownPage.openSearchPanel();
  await contractBreakdownPage.searchForBancoPersonaMoralContract();
  await contractBreakdownPage.selectMexdolarContract();
});

Then('the system loads the selected contract', async function () {
  const isLoaded = await contractBreakdownPage.isContractLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user expands the contract value breakdown', async function () {
  await contractBreakdownPage.clickContractValueComponent();
  await contractBreakdownPage.waitForBreakdownPopup();
});

Then('the system invokes SAP service to retrieve Mexdolar account balance', async function () {
  const sapServiceInvoked = await contractBreakdownPage.verifySAPServiceCall();
  expect(sapServiceInvoked).toBeTruthy();
});

Then('the USD Cash field displays the Mexdolar balance from SAP', async function () {
  const usdCashValue = await contractBreakdownPage.getUSDCashFieldValue();
  expect(usdCashValue).not.toBeNull();
  expect(usdCashValue).toMatch(/^\$?[\d,]+\.?\d*\s*USD$/);
});

Then('the balance is displayed in USD without MXN conversion', async function () {
  const currencyLabel = await contractBreakdownPage.getUSDCashCurrencyLabel();
  expect(currencyLabel).toContain('USD');
  expect(currencyLabel).not.toContain('MXN');
  await contractBreakdownPage.closeBreakdownPopup();
});