const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SiacUnicoPage = require('../pages/SiacUnicoPage');

let siacPage;
let identifiedLineNumber;
let identifiedPackageCode;

Given('the user is authenticated in SIAC Unico system', async function () {
  siacPage = new SiacUnicoPage(this.page);
  await siacPage.navigateToLogin();
  await siacPage.login(process.env.SIAC_USERNAME, process.env.SIAC_PASSWORD);
  const isMainScreenVisible = await siacPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

Given('a line with SOLD plan is identified', async function () {
  await siacPage.navigateToLineSearch();
  identifiedLineNumber = await siacPage.identifyLineWithSoldPlan();
  expect(identifiedLineNumber).toBeTruthy();
});

Given('the B2B2C 12GB package code is identified in BSCS7 configuration', async function () {
  await siacPage.navigateToPackageConfiguration();
  identifiedPackageCode = await siacPage.getB2B2C12GBPackageCode();
  expect(identifiedPackageCode).toBeTruthy();
});

When('the user purchases the B2B2C 12GB package for the identified line from GM platform', async function () {
  await siacPage.navigateToGMPlatform();
  await siacPage.selectLineForPurchase(identifiedLineNumber);
  await siacPage.selectPackage(identifiedPackageCode);
  await siacPage.confirmPurchase();
  const isTransactionSuccessful = await siacPage.isTransactionSuccessMessageVisible();
  expect(isTransactionSuccessful).toBeTruthy();
});

When('the user queries the transaction typification in SIAC Unico', async function () {
  await siacPage.navigateToTypificationQuery();
  await siacPage.searchTransactionByLine(identifiedLineNumber);
});

Then('the registered package code matches exactly the B2B2C 12GB package code', async function () {
  const registeredPackageCode = await siacPage.getRegisteredPackageCode();
  expect(registeredPackageCode).toBe(identifiedPackageCode);
});

Then('the registered line number matches exactly the line used for the transaction', async function () {
  const registeredLineNumber = await siacPage.getRegisteredLineNumber();
  expect(registeredLineNumber).toBe(identifiedLineNumber);
});