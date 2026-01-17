const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LDIRoutingPage = require('../pages/LDIRoutingPage');

let ldiRoutingPage;

Given('a General Motors line is provisioned in a new Life Cycle RATEPLAN with voice service enabled', async function() {
  ldiRoutingPage = new LDIRoutingPage(this.page);
  await ldiRoutingPage.navigateToProvisioningSystem();
  await ldiRoutingPage.provisionGMLineWithVoiceService();
  const isProvisioned = await ldiRoutingPage.verifyLineProvisionedWithVoiceCapability();
  expect(isProvisioned).toBeTruthy();
});

Given('the RED routing system is operational', async function() {
  const isOperational = await ldiRoutingPage.verifyREDSystemOperational();
  expect(isOperational).toBeTruthy();
});

Given('LDI tariffs are configured in BSCS7', async function() {
  await ldiRoutingPage.navigateToBSCS7TariffConfiguration();
  const tariffsConfigured = await ldiRoutingPage.verifyLDITariffsConfigured();
  expect(tariffsConfigured).toBeTruthy();
});

When('the user makes a Long Distance International call to a valid international destination', async function() {
  await ldiRoutingPage.initiateLDICall();
});

Then('the RED routing system establishes the LDI call correctly', async function() {
  const callEstablished = await ldiRoutingPage.verifyCallEstablishedInRED();
  expect(callEstablished).toBeTruthy();
});

Then('the call is routed with the tariff of 0.07 PEN per minute according to the destination country', async function() {
  await ldiRoutingPage.navigateToREDLogs();
  const tariffApplied = await ldiRoutingPage.verifyTariffApplied('0.07');
  expect(tariffApplied).toBeTruthy();
});

When('the user checks the monthly invoice', async function() {
  await ldiRoutingPage.navigateToMonthlyInvoice();
});

Then('the LDI call appears in the Total Long Distance International Traffic section', async function() {
  const callInSection = await ldiRoutingPage.verifyCallInLDITrafficSection();
  expect(callInSection).toBeTruthy();
});

Then('the invoice shows the call details with duration destination and amount charged at 0.07 PEN per minute', async function() {
  const detailsCorrect = await ldiRoutingPage.verifyInvoiceCallDetails();
  expect(detailsCorrect).toBeTruthy();
});

When('a user attempts to make an LDI call from a line in PURGED RATEPLAN', async function() {
  await ldiRoutingPage.selectPurgedRatePlanLine();
  await ldiRoutingPage.attemptLDICallFromPurgedLine();
});

Then('the system does not allow the LDI call to be established', async function() {
  const callBlocked = await ldiRoutingPage.verifyCallBlockedForPurgedLine();
  expect(callBlocked).toBeTruthy();
});