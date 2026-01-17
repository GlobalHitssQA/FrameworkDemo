const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the previous system version is identified as pre-Release 2.7', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToLegacyEnvironment();
  const version = await contractValuePage.getSystemVersion();
  expect(version).toMatch(/^2\.[0-6]/);
});

Given('the component is deployed in the legacy environment', async function () {
  const isComponentVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('I search for a contract using the search functionality', async function () {
  await contractValuePage.clickSearchButton();
  await contractValuePage.enterContractNumber('TEST-CONTRACT-001');
  await contractValuePage.submitSearch();
});

When('I view the total contract value', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  expect(totalValue).toBeTruthy();
});

When('I expand the contract breakdown popup', async function () {
  await contractValuePage.clickContractValueComponent();
  await contractValuePage.waitForBreakdownPopup();
});

Then('all main functionalities should operate without errors', async function () {
  const breakdownItems = await contractValuePage.getBreakdownItemsCount();
  expect(breakdownItems).toBeGreaterThan(0);
  
  const isPoderCompraVisible = await contractValuePage.isBreakdownItemVisible('Poder de compra MXN');
  const isEfectivoMXNVisible = await contractValuePage.isBreakdownItemVisible('Efectivo MXN');
  const isEfectivoUSDVisible = await contractValuePage.isBreakdownItemVisible('Efectivo USD');
  
  expect(isPoderCompraVisible || isEfectivoMXNVisible || isEfectivoUSDVisible).toBeTruthy();
  
  await contractValuePage.closeBreakdownPopup();
});

Then('the backend services should respond correctly', async function () {
  const networkErrors = await contractValuePage.getNetworkErrors();
  expect(networkErrors.length).toBe(0);
  
  const serviceResponseStatus = await contractValuePage.validateServiceResponses();
  expect(serviceResponseStatus).toBeTruthy();
});

Then('no compatibility errors should be present in system logs', async function () {
  const consoleErrors = await contractValuePage.getConsoleErrors();
  const compatibilityErrors = consoleErrors.filter(error => 
    error.includes('compatibility') || 
    error.includes('deprecated') || 
    error.includes('version mismatch')
  );
  expect(compatibilityErrors.length).toBe(0);
});