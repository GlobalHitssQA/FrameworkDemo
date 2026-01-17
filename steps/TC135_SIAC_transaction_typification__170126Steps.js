const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SiacTypificationPage = require('../pages/SiacTypificationPage');

let siacPage;
let authenticatedUser;
let transactionTimestamp;

Given('the user is authenticated in SIAC Unico system', async function() {
  siacPage = new SiacTypificationPage(this.page);
  authenticatedUser = await siacPage.loginToSiac(process.env.SIAC_USER, process.env.SIAC_PASSWORD);
  const isLoggedIn = await siacPage.isUserAuthenticated();
  expect(isLoggedIn).toBeTruthy();
});

When('the user performs a TRIAL 6GB package purchase transaction from GM platform', async function() {
  transactionTimestamp = new Date();
  await siacPage.navigateToGMPlatform();
  await siacPage.selectPackage('TRIAL 6GB');
  await siacPage.confirmPackagePurchase();
  const purchaseSuccess = await siacPage.isPurchaseSuccessful();
  expect(purchaseSuccess).toBeTruthy();
});

When('the user queries the transaction typification in SIAC immediately', async function() {
  await siacPage.navigateToTypificationSection();
  await siacPage.searchRecentTransaction();
  const transactionFound = await siacPage.isTransactionRecordVisible();
  expect(transactionFound).toBeTruthy();
});

Then('the typification date should match the current system date', async function() {
  const registeredDate = await siacPage.getTypificationDate();
  const currentDate = new Date().toLocaleDateString('es-ES');
  expect(registeredDate).toBe(currentDate);
});

Then('the typification time should match the transaction execution time within 1 minute margin', async function() {
  const registeredTime = await siacPage.getTypificationTime();
  const timeDifferenceMinutes = siacPage.calculateTimeDifferenceInMinutes(transactionTimestamp, registeredTime);
  expect(timeDifferenceMinutes).toBeLessThanOrEqual(1);
});

Then('the registered user should match the authenticated user who performed the transaction', async function() {
  const registeredUser = await siacPage.getTypificationUser();
  expect(registeredUser).toBe(authenticatedUser);
});