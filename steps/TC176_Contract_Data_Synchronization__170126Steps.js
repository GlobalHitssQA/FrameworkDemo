const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');
const { expect } = require('@playwright/test');

let browser;
let contextUser1;
let contextUser2;
let pageUser1;
let pageUser2;
let contractPageUser1;
let contractPageUser2;
let initialValuesUser1;
let initialValuesUser2;
let updatedValuesUser1;
let updatedValuesUser2;

Before(async function () {
  browser = await chromium.launch({ headless: true });
});

After(async function () {
  if (contextUser1) await contextUser1.close();
  if (contextUser2) await contextUser2.close();
  if (browser) await browser.close();
});

Given('two different users are configured with access to the same contract', async function () {
  contextUser1 = await browser.newContext();
  contextUser2 = await browser.newContext();
  pageUser1 = await contextUser1.newPage();
  pageUser2 = await contextUser2.newPage();
  contractPageUser1 = new ContractValuePage(pageUser1);
  contractPageUser2 = new ContractValuePage(pageUser2);
});

Given('both users have query permissions on the contract', async function () {
  await contractPageUser1.navigateToLogin();
  await contractPageUser1.loginAsUser('user1@test.com', 'password123');
  await contractPageUser2.navigateToLogin();
  await contractPageUser2.loginAsUser('user2@test.com', 'password456');
});

When('user 1 accesses the contract value and composition component', async function () {
  await contractPageUser1.navigateToContractValue();
  await contractPageUser1.waitForContractValueComponentToLoad();
});

Then('current contract values are displayed for user 1', async function () {
  const isVisible = await contractPageUser1.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
  initialValuesUser1 = await contractPageUser1.getContractTotalValue();
  expect(initialValuesUser1).toBeTruthy();
});

When('user 2 accesses the same component of the same contract simultaneously', async function () {
  await contractPageUser2.navigateToContractValue();
  await contractPageUser2.waitForContractValueComponentToLoad();
});

Then('user 2 sees the same values that user 1 is viewing', async function () {
  const isVisible = await contractPageUser2.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
  initialValuesUser2 = await contractPageUser2.getContractTotalValue();
  expect(initialValuesUser2).toBe(initialValuesUser1);
});

When('an operation that modifies contract values is executed from an external session', async function () {
  await contractPageUser1.simulateBackendValueUpdate();
});

Then('the operation is processed and modifies values in the backend system', async function () {
  await contractPageUser1.waitForBackendProcessing();
});

When('the component is refreshed in both user sessions', async function () {
  await Promise.all([
    contractPageUser1.refreshContractValueComponent(),
    contractPageUser2.refreshContractValueComponent()
  ]);
});

Then('both users see the updated values in a synchronized and consistent manner', async function () {
  updatedValuesUser1 = await contractPageUser1.getContractTotalValue();
  updatedValuesUser2 = await contractPageUser2.getContractTotalValue();
  expect(updatedValuesUser1).toBe(updatedValuesUser2);
  const breakdownUser1 = await contractPageUser1.getContractBreakdownValues();
  const breakdownUser2 = await contractPageUser2.getContractBreakdownValues();
  expect(breakdownUser1).toEqual(breakdownUser2);
});