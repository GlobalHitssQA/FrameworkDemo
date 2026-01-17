const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SapServiceFailurePage = require('../pages/SapServiceFailurePage');

let sapServiceFailurePage;

Given('the user is authenticated in Acticenter', async function () {
  sapServiceFailurePage = new SapServiceFailurePage(this.page);
  await sapServiceFailurePage.navigateToActicenter();
  await sapServiceFailurePage.authenticateUser();
});

Given('the SAP service is simulated as unavailable', async function () {
  await sapServiceFailurePage.simulateSapServiceUnavailability();
});

When('the user selects a Bank contract for Legal Entity with Mexdolar account', async function () {
  await sapServiceFailurePage.selectBankContractLegalEntityMexdolar();
});

Then('the system attempts to invoke the SAP service for Mexdolar balance', async function () {
  const sapInvocationAttempted = await sapServiceFailurePage.verifySapServiceInvocationAttempt();
  expect(sapInvocationAttempted).toBeTruthy();
});

Then('the system displays an error message or shows USD Cash field as $0.00 with appropriate indication', async function () {
  const errorHandled = await sapServiceFailurePage.verifyErrorHandlingForMexdolar();
  expect(errorHandled).toBeTruthy();
});

Then('the remaining breakdown fields not dependent on SAP display their corresponding values correctly', async function () {
  const nonSapFieldsDisplayed = await sapServiceFailurePage.verifyNonSapDependentFieldsDisplayed();
  expect(nonSapFieldsDisplayed).toBeTruthy();
});