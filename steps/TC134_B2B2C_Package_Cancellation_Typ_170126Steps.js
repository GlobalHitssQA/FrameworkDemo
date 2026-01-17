const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SiacPage = require('../pages/SiacPage');

let siacPage;

Given('the user is authenticated in SIAC Unico system', async function () {
  siacPage = new SiacPage(this.page);
  await siacPage.navigateToSiac();
  await siacPage.login();
  const isMainScreenVisible = await siacPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

Given('there is an active B2B2C package on a SOLD plan line', async function () {
  await siacPage.navigateToPackageSection();
  await siacPage.searchSoldPlanLine();
  const hasActiveB2B2C = await siacPage.verifyActiveB2B2CPackage();
  expect(hasActiveB2B2C).toBeTruthy();
});

When('the user cancels the B2B2C package from GM platform', async function () {
  await siacPage.navigateToGMPlatform();
  await siacPage.selectB2B2CPackageForCancellation();
  await siacPage.confirmPackageCancellation();
  const isCancellationSuccessful = await siacPage.verifyCancellationSuccess();
  expect(isCancellationSuccessful).toBeTruthy();
});

When('the user queries the cancellation typification in SIAC Unico', async function () {
  await siacPage.navigateToTypificationSection();
  await siacPage.searchCancellationRecord();
});

Then('the system displays the B2B2C package cancellation record', async function () {
  const isRecordDisplayed = await siacPage.isCancellationRecordVisible();
  expect(isRecordDisplayed).toBeTruthy();
});

Then('the typification shows date, time, user, B2B2C package code, capacity, validity and associated line', async function () {
  const typificationData = await siacPage.getTypificationDetails();
  expect(typificationData.date).toBeTruthy();
  expect(typificationData.time).toBeTruthy();
  expect(typificationData.user).toBeTruthy();
  expect(typificationData.packageCode).toBeTruthy();
  expect(typificationData.capacity).toBeTruthy();
  expect(typificationData.validity).toBeTruthy();
  expect(typificationData.associatedLine).toBeTruthy();
});