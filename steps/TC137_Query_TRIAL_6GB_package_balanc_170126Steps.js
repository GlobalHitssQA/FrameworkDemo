const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BalanceQueryPage = require('../pages/BalanceQueryPage');

let balanceQueryPage;
let initialBalance;
let updatedBalance;
let packageValidity;

Given('a line with SOLD plan has an active TRIAL 6GB package', async function () {
  balanceQueryPage = new BalanceQueryPage(this.page);
  await balanceQueryPage.navigateToGMPlatform();
  await balanceQueryPage.activateTrial6GBPackage();
  const activationStatus = await balanceQueryPage.getPackageActivationStatus();
  expect(activationStatus).toBe('active');
});

When('I query the internet balance using GetInternetBalance API', async function () {
  initialBalance = await balanceQueryPage.executeGetInternetBalanceAPI();
});

Then('the API should return a balance of 6GB or 6144MB', async function () {
  const balanceInMB = balanceQueryPage.convertBalanceToMB(initialBalance);
  expect(balanceInMB).toBe(6144);
});

When('I consume 2GB of data through configured APNs', async function () {
  await balanceQueryPage.simulateDataConsumption(2048);
  await balanceQueryPage.waitForConsumptionRegistration();
});

When('I query the internet balance again using GetInternetBalance API', async function () {
  updatedBalance = await balanceQueryPage.executeGetInternetBalanceAPI();
});

Then('the API should return an updated balance of 4GB or 4096MB', async function () {
  const balanceInMB = balanceQueryPage.convertBalanceToMB(updatedBalance);
  expect(balanceInMB).toBe(4096);
});

Then('the package validity should be 90 days from activation date', async function () {
  packageValidity = await balanceQueryPage.getPackageValidity();
  expect(packageValidity.days).toBe(90);
});