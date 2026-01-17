const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let initialValue;
let initialTimestamp;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.performLogin();
});

Given('the user has selected an active contract with multiple investments', async function () {
  await contractValuePage.searchAndSelectActiveContract();
  const isComponentVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user records the initial total value and timestamp', async function () {
  initialValue = await contractValuePage.getTotalContractValue();
  initialTimestamp = await contractValuePage.getCurrentTimestamp();
  expect(initialValue).not.toBeNull();
  expect(initialTimestamp).not.toBeNull();
});

When('the user waits for the configured refresh interval without interaction', async function () {
  const refreshIntervalMs = await contractValuePage.getConfiguredRefreshInterval();
  await contractValuePage.waitForRefreshInterval(refreshIntervalMs);
});

Then('the contract component should automatically refresh the values', async function () {
  const hasRefreshed = await contractValuePage.waitForValueRefresh(initialValue);
  expect(hasRefreshed).toBeTruthy();
});

Then('the updated values should be displayed without manual page reload', async function () {
  const currentValue = await contractValuePage.getTotalContractValue();
  const currentTimestamp = await contractValuePage.getCurrentTimestamp();
  const wasPageReloaded = await contractValuePage.checkIfPageWasReloaded();
  
  expect(wasPageReloaded).toBeFalsy();
  expect(currentTimestamp).not.toEqual(initialTimestamp);
  const valueChanged = currentValue !== initialValue;
  expect(valueChanged || await contractValuePage.isLastUpdateTimestampRecent()).toBeTruthy();
});