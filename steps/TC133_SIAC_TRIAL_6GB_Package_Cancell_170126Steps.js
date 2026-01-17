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

Given('there is an active TRIAL 6GB package on a SOLD plan line', async function () {
  await siacPage.searchActiveLine();
  const hasActivePackage = await siacPage.verifyTrial6GBPackageActive();
  expect(hasActivePackage).toBeTruthy();
});

When('the user cancels the TRIAL 6GB package from GM platform', async function () {
  await siacPage.navigateToGMPlatform();
  await siacPage.selectTrial6GBPackage();
  await siacPage.cancelPackage();
  const isCancellationSuccessful = await siacPage.verifyCancellationSuccess();
  expect(isCancellationSuccessful).toBeTruthy();
});

When('the user queries the cancellation typification in SIAC Unico', async function () {
  await siacPage.navigateToTypificationSection();
  await siacPage.searchCancellationRecord();
});

Then('the system displays the TRIAL 6GB package cancellation record', async function () {
  const isCancellationRecordVisible = await siacPage.isCancellationRecordVisible();
  expect(isCancellationRecordVisible).toBeTruthy();
});

Then('the typification shows date, time, user, package code and associated line', async function () {
  const hasDate = await siacPage.isTypificationDateVisible();
  const hasTime = await siacPage.isTypificationTimeVisible();
  const hasUser = await siacPage.isTypificationUserVisible();
  const hasPackageCode = await siacPage.isTypificationPackageCodeVisible();
  const hasAssociatedLine = await siacPage.isTypificationLineVisible();
  
  expect(hasDate).toBeTruthy();
  expect(hasTime).toBeTruthy();
  expect(hasUser).toBeTruthy();
  expect(hasPackageCode).toBeTruthy();
  expect(hasAssociatedLine).toBeTruthy();
});