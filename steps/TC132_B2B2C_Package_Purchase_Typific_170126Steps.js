const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SiacPage = require('../pages/SiacPage');

let siacPage;

Given('I am logged into SIAC Unico with valid credentials', async function () {
  siacPage = new SiacPage(this.page);
  await siacPage.navigate();
  await siacPage.login(process.env.SIAC_USERNAME, process.env.SIAC_PASSWORD);
  const isMainScreenVisible = await siacPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('I purchase a B2B2C 720GB package with 36 months validity from GM platform for a SOLD plan line', async function () {
  await siacPage.navigateToGMPlatform();
  await siacPage.selectSOLDPlanLine();
  await siacPage.selectB2B2CPackage('720GB');
  await siacPage.selectPackageValidity('36');
  await siacPage.confirmPurchase();
  const isSuccessful = await siacPage.isPurchaseSuccessful();
  expect(isSuccessful).toBeTruthy();
});

When('I query the transaction typification in SIAC Unico', async function () {
  await siacPage.navigateToTypificationSection();
  await siacPage.searchLatestTransaction();
});

Then('the system displays the B2B2C 720GB package purchase record', async function () {
  const recordVisible = await siacPage.isPackageRecordVisible('B2B2C 720GB');
  expect(recordVisible).toBeTruthy();
});

Then('the typification shows date, time and user who performed the operation', async function () {
  const hasDate = await siacPage.isTypificationDateVisible();
  const hasTime = await siacPage.isTypificationTimeVisible();
  const hasUser = await siacPage.isTypificationUserVisible();
  expect(hasDate).toBeTruthy();
  expect(hasTime).toBeTruthy();
  expect(hasUser).toBeTruthy();
});

Then('the typification shows the B2B2C 720GB package code, 36 months validity and associated line number', async function () {
  const packageCode = await siacPage.getPackageCode();
  const validity = await siacPage.getPackageValidity();
  const lineNumber = await siacPage.getAssociatedLineNumber();
  expect(packageCode).toContain('B2B2C');
  expect(packageCode).toContain('720GB');
  expect(validity).toBe('36');
  expect(lineNumber).toBeTruthy();
});