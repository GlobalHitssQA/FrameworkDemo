const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCachePage = require('../pages/ContractCachePage');

let contractCachePage;
let initialContractValues;
let networkRequests = [];

Given('the user is authenticated and has an active contract with available balance', async function () {
  contractCachePage = new ContractCachePage(this.page);
  await contractCachePage.navigateToApplication();
  await contractCachePage.authenticateUser();
  await contractCachePage.selectActiveContract();
});

Given('the value and composition component is loaded with cached data', async function () {
  await contractCachePage.waitForValueComponentToLoad();
  initialContractValues = await contractCachePage.getContractTotalValue();
  await contractCachePage.startNetworkMonitoring((request) => {
    networkRequests.push(request);
  });
  expect(initialContractValues).toBeTruthy();
});

When('the user executes an operation that modifies a contract item', async function () {
  networkRequests = [];
  await contractCachePage.openFundOperationsPanel();
  await contractCachePage.executeFundPurchaseOperation();
  const operationSuccess = await contractCachePage.waitForOperationConfirmation();
  expect(operationSuccess).toBe(true);
});

When('the user refreshes or reloads the value and composition component', async function () {
  networkRequests = [];
  await contractCachePage.refreshValueComponent();
  await contractCachePage.waitForValueComponentToLoad();
});

Then('the system should invalidate the previous cache and fetch new values from backend', async function () {
  const cacheInvalidated = await contractCachePage.verifyCacheInvalidation(networkRequests);
  expect(cacheInvalidated).toBe(true);
});

Then('the displayed values should reflect the changes from the executed operation', async function () {
  const updatedContractValues = await contractCachePage.getContractTotalValue();
  const valuesUpdated = await contractCachePage.verifyValuesChanged(initialContractValues, updatedContractValues);
  expect(valuesUpdated).toBe(true);
});

Then('the backend service calls should confirm a new data request was made', async function () {
  const backendCallMade = await contractCachePage.verifyBackendServiceCallMade(networkRequests);
  expect(backendCallMade).toBe(true);
});