const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ShellExecutionPage = require('../pages/ShellExecutionPage');

let shellExecutionPage;

Given('the test environment is configured with shared tables between Shell In Pool and Shell IZZIPAY', async function () {
  shellExecutionPage = new ShellExecutionPage(this.page);
  await shellExecutionPage.navigateToShellManagement();
  await shellExecutionPage.verifySharedTablesConfiguration();
});

Given('the process control tables and temporary tables are available without active processes', async function () {
  const tablesAvailable = await shellExecutionPage.verifyTablesAvailableWithoutActiveProcesses();
  expect(tablesAvailable).toBe(true);
});

When('the user executes the Shell IZZIPAY in the test environment', async function () {
  await shellExecutionPage.executeShellIzzipay();
});

Then('the Shell IZZIPAY starts correctly and registers its process in the control table with a unique identifier', async function () {
  const processRegistered = await shellExecutionPage.verifyIzzipayProcessRegistered();
  expect(processRegistered).toBe(true);
  const hasUniqueId = await shellExecutionPage.verifyIzzipayHasUniqueIdentifier();
  expect(hasUniqueId).toBe(true);
});

When('the user attempts to execute the Shell In Pool while IZZIPAY is running', async function () {
  await shellExecutionPage.attemptExecuteShellInPool();
});

Then('the system detects that shared tables are in use and Shell In Pool does not execute showing a blocking or waiting message', async function () {
  const isBlocked = await shellExecutionPage.verifyInPoolExecutionBlocked();
  expect(isBlocked).toBe(true);
  const blockingMessageVisible = await shellExecutionPage.isBlockingMessageVisible();
  expect(blockingMessageVisible).toBe(true);
});

When('the user waits for Shell IZZIPAY to complete its execution', async function () {
  await shellExecutionPage.waitForIzzipayCompletion();
});

Then('the Shell IZZIPAY releases the shared tables and updates its status in the control table to finished', async function () {
  const tablesReleased = await shellExecutionPage.verifySharedTablesReleased();
  expect(tablesReleased).toBe(true);
  const statusFinished = await shellExecutionPage.verifyIzzipayStatusFinished();
  expect(statusFinished).toBe(true);
});

When('the user executes the Shell In Pool again after IZZIPAY has finished', async function () {
  await shellExecutionPage.executeShellInPool();
});

Then('the Shell In Pool executes correctly without detecting conflict with IZZIPAY on shared tables', async function () {
  const executedSuccessfully = await shellExecutionPage.verifyInPoolExecutedSuccessfully();
  expect(executedSuccessfully).toBe(true);
  const noConflictDetected = await shellExecutionPage.verifyNoConflictWithIzzipay();
  expect(noConflictDetected).toBe(true);
});