const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SiacUnicoPage = require('../pages/SiacUnicoPage');

let siacUnicoPage;
let activationResult;
let transactionDetails;

Given('the BuyProduct API is available and functional', async function() {
  siacUnicoPage = new SiacUnicoPage(this.page);
  const apiStatus = await siacUnicoPage.verifyBuyProductAPIAvailability();
  expect(apiStatus).toBe(true);
});

Given('the SIAC Unico system is operational with configured typifications', async function() {
  await siacUnicoPage.navigateToSiacUnico();
  const isOperational = await siacUnicoPage.verifySiacUnicoOperational();
  expect(isOperational).toBe(true);
});

When('I activate a TRIAL 6GB package on a test line through the BuyProduct API', async function() {
  activationResult = await siacUnicoPage.activateTrialPackageViaAPI('TRIAL_6GB', this.testLine);
});

Then('the TRIAL 6GB package should be activated successfully in BSCS7 with 6GB capacity and cost S\/. 7.58 without IGV and 90 days validity', async function() {
  expect(activationResult.success).toBe(true);
  expect(activationResult.capacity).toBe('6GB');
  expect(activationResult.costWithoutIGV).toBe(7.58);
  expect(activationResult.validityDays).toBe(90);
});

Then('I query the purchase transaction in SIAC Unico', async function() {
  await siacUnicoPage.searchTransaction(this.testLine, 'TRIAL_6GB');
});

Then('the transaction should be registered with the corresponding package purchase typification', async function() {
  const isRegistered = await siacUnicoPage.verifyTransactionRegistered();
  expect(isRegistered).toBe(true);
  const typification = await siacUnicoPage.getTransactionTypification();
  expect(typification).toContain('COMPRA_PAQUETE');
});

Then('the record should include package code, name, date, time, user and associated line', async function() {
  transactionDetails = await siacUnicoPage.getTransactionDetails();
  expect(transactionDetails.packageCode).toBeTruthy();
  expect(transactionDetails.packageName).toContain('TRIAL 6GB');
  expect(transactionDetails.activationDate).toBeTruthy();
  expect(transactionDetails.activationTime).toBeTruthy();
  expect(transactionDetails.associatedLine).toBe(this.testLine);
  expect(transactionDetails.user).toBeTruthy();
});

Then('the typification should follow the existing GM package typification standard in SIAC Unico', async function() {
  const typificationFormat = await siacUnicoPage.getTypificationFormat();
  const isStandardCompliant = await siacUnicoPage.validateGMTypificationStandard(typificationFormat);
  expect(isStandardCompliant).toBe(true);
});

When('I access the transaction detail for complete traceability', async function() {
  await siacUnicoPage.clickTransactionDetail();
});

Then('the system should display complete transaction details for auditing and tracking', async function() {
  const detailVisible = await siacUnicoPage.isTransactionDetailVisible();
  expect(detailVisible).toBe(true);
  const auditInfo = await siacUnicoPage.getAuditInformation();
  expect(auditInfo.timestamp).toBeTruthy();
  expect(auditInfo.traceId).toBeTruthy();
  expect(auditInfo.systemSource).toBeTruthy();
});

Then('the typification should clearly differentiate TRIAL 6GB from other B2B2C packages', async function() {
  const packageIdentifier = await siacUnicoPage.getPackageIdentifier();
  expect(packageIdentifier).toContain('TRIAL');
  expect(packageIdentifier).not.toContain('B2B2C');
  const isDifferentiated = await siacUnicoPage.verifyPackageDifferentiation('TRIAL_6GB', 'B2B2C');
  expect(isDifferentiated).toBe(true);
});