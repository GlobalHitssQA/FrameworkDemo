const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ShellExecutionPage = require('../pages/ShellExecutionPage');

let shellExecutionPage;

Given('the BSCS7 system is available and the Shell sh_BSCS_ProcesoFacturaGM is deployed', async function () {
  shellExecutionPage = new ShellExecutionPage(this.page);
  await shellExecutionPage.navigateToShellConsole();
  await shellExecutionPage.verifyBSCS7SystemAvailable();
  await shellExecutionPage.verifyShellDeployed('sh_BSCS_ProcesoFacturaGM');
});

Given('at least one active General Motors account exists in the system', async function () {
  const gmAccountsExist = await shellExecutionPage.verifyActiveGMAccountsExist();
  expect(gmAccountsExist).toBeTruthy();
});

When('I execute the Shell sh_BSCS_ProcesoFacturaGM in the test environment', async function () {
  await shellExecutionPage.executeShell('sh_BSCS_ProcesoFacturaGM');
});

Then('the Shell starts and registers the process in the control table with a unique identifier', async function () {
  const processRegistered = await shellExecutionPage.verifyProcessRegisteredInControlTable();
  expect(processRegistered).toBeTruthy();
  const uniqueId = await shellExecutionPage.getProcessUniqueIdentifier();
  expect(uniqueId).not.toBeNull();
});

When('I verify the Shell queries the CUSTOMER_ID contract table for General Motors accounts', async function () {
  await shellExecutionPage.navigateToQueryLogs();
  await shellExecutionPage.filterByCustomerIdTable();
});

Then('the SQL query returns only CUSTOMER_IDs corresponding to General Motors accounts', async function () {
  const queryResults = await shellExecutionPage.getCustomerIdQueryResults();
  const allGMAccounts = await shellExecutionPage.verifyAllResultsAreGMAccounts(queryResults);
  expect(allGMAccounts).toBeTruthy();
});

Then('the Shell excludes accounts that do not belong to General Motors', async function () {
  const nonGMAccountsExcluded = await shellExecutionPage.verifyNonGMAccountsExcluded();
  expect(nonGMAccountsExcluded).toBeTruthy();
});

Then('the system does not process any account different from General Motors filtering correctly by corporate client identifier', async function () {
  const processedAccounts = await shellExecutionPage.getProcessedAccounts();
  const onlyGMProcessed = await shellExecutionPage.verifyOnlyCorporateGMIdentifier(processedAccounts);
  expect(onlyGMProcessed).toBeTruthy();
});

When('I query the Shell execution log to verify the number of GM accounts identified', async function () {
  await shellExecutionPage.navigateToExecutionLogs();
  await shellExecutionPage.filterLogsByCurrentExecution();
});

Then('the log shows the exact number of General Motors accounts processed and matches the total active GM accounts in the system', async function () {
  const loggedGMCount = await shellExecutionPage.getLoggedGMAccountCount();
  const activeGMCount = await shellExecutionPage.getTotalActiveGMAccountsInSystem();
  expect(loggedGMCount).toBe(activeGMCount);
});