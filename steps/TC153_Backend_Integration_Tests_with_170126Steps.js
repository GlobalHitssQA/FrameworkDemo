const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const IntegrationTestPage = require('../pages/IntegrationTestPage');

let integrationTestPage;

Given('the test environment has backend services available', async function () {
  integrationTestPage = new IntegrationTestPage(this.page);
  await integrationTestPage.verifyBackendServicesAvailable();
});

Given('test data is configured in SAP', async function () {
  await integrationTestPage.verifySAPTestDataConfigured();
});

Given('service access credentials are configured', async function () {
  await integrationTestPage.verifyServiceCredentialsConfigured();
});

When('I execute integration tests with SAP services for contract data', async function () {
  await integrationTestPage.executeSAPContractIntegrationTests();
});

Then('the tests execute successfully and retrieve contract data correctly', async function () {
  const result = await integrationTestPage.getContractDataTestResult();
  expect(result.success).toBe(true);
  expect(result.contractsRetrieved).toBeGreaterThan(0);
});

When('I verify integration tests validate purchasing power service for Casa de Bolsa contracts', async function () {
  await integrationTestPage.executePurchasingPowerServiceTests();
});

Then('the tests confirm currentcash service returns correct data', async function () {
  const result = await integrationTestPage.getCurrentCashServiceTestResult();
  expect(result.success).toBe(true);
  expect(result.dataValid).toBe(true);
});

When('I verify integration tests validate cash service for Bank contracts', async function () {
  await integrationTestPage.executeBankCashServiceTests();
});

Then('the tests confirm cuenta eje service returns correct balance', async function () {
  const result = await integrationTestPage.getCuentaEjeServiceTestResult();
  expect(result.success).toBe(true);
  expect(result.balanceValid).toBe(true);
});

When('I verify integration tests validate Mexdolar accounts service for legal entities', async function () {
  await integrationTestPage.executeMexdolarAccountsTests();
});

Then('the tests confirm USD balance from Mexdolar accounts is obtained correctly', async function () {
  const result = await integrationTestPage.getMexdolarAccountsTestResult();
  expect(result.success).toBe(true);
  expect(result.usdBalanceValid).toBe(true);
});

When('I verify integration tests validate error handling when backend services fail', async function () {
  await integrationTestPage.executeErrorHandlingTests();
});

Then('the tests confirm 500 errors and timeouts are handled correctly', async function () {
  const result = await integrationTestPage.getErrorHandlingTestResult();
  expect(result.handles500Errors).toBe(true);
  expect(result.handlesTimeouts).toBe(true);
});

When('I review integration tests validate service response times', async function () {
  await integrationTestPage.executeResponseTimeTests();
});

Then('the tests confirm response times meet defined SLA requirements', async function () {
  const result = await integrationTestPage.getResponseTimeTestResult();
  expect(result.withinSLA).toBe(true);
});