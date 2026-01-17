const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SiacPage = require('../pages/SiacPage');
const GmPlatformPage = require('../pages/GmPlatformPage');

let siacPage;
let gmPlatformPage;
let transactionData;

Given('the user is logged into SIAC Unico with valid credentials', async function () {
  siacPage = new SiacPage(this.page);
  await siacPage.navigate();
  await siacPage.login(process.env.SIAC_USERNAME, process.env.SIAC_PASSWORD);
  const isMainScreenVisible = await siacPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user purchases a B2B2C 6GB package from GM platform for a SOLD plan line', async function () {
  gmPlatformPage = new GmPlatformPage(this.page);
  await gmPlatformPage.navigate();
  await gmPlatformPage.selectLineWithSOLDPlan(process.env.TEST_LINE_NUMBER);
  await gmPlatformPage.selectB2B2CPackage6GB();
  await gmPlatformPage.confirmPurchase();
  const isPurchaseSuccessful = await gmPlatformPage.isPurchaseConfirmationDisplayed();
  expect(isPurchaseSuccessful).toBeTruthy();
  transactionData = await gmPlatformPage.getTransactionDetails();
});

When('the user queries the transaction typification in SIAC Unico', async function () {
  await siacPage.navigate();
  await siacPage.openTypificationSearch();
  await siacPage.searchTransactionByLine(process.env.TEST_LINE_NUMBER);
});

Then('the system displays the B2B2C 6GB package purchase record', async function () {
  const isRecordDisplayed = await siacPage.isPackageRecordDisplayed('B2B2C 6GB');
  expect(isRecordDisplayed).toBeTruthy();
});

Then('the typification shows the date, time and user who performed the operation', async function () {
  const typificationDetails = await siacPage.getTypificationDetails();
  expect(typificationDetails.date).toBeTruthy();
  expect(typificationDetails.time).toBeTruthy();
  expect(typificationDetails.user).toBeTruthy();
});

Then('the typification shows the B2B2C 6GB package code and associated line number', async function () {
  const typificationDetails = await siacPage.getTypificationDetails();
  expect(typificationDetails.packageCode).toContain('B2B2C');
  expect(typificationDetails.lineNumber).toBe(process.env.TEST_LINE_NUMBER);
});