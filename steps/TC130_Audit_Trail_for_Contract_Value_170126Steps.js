const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AuditTrailPage = require('../pages/AuditTrailPage');

let auditTrailPage;
let auditLogs = [];

Given('the audit and logging system is configured and active', async function () {
  auditTrailPage = new AuditTrailPage(this.page);
  await auditTrailPage.configureAuditSystem();
  const isActive = await auditTrailPage.isAuditSystemActive();
  expect(isActive).toBeTruthy();
});

Given('a user with valid credentials exists in the system', async function () {
  const userExists = await auditTrailPage.verifyUserCredentialsExist();
  expect(userExists).toBeTruthy();
});

Given('an active contract is available in the system', async function () {
  const contractAvailable = await auditTrailPage.verifyActiveContractExists();
  expect(contractAvailable).toBeTruthy();
});

When('the user accesses the Acticenter module and logs in', async function () {
  await auditTrailPage.navigateToActicenter();
  await auditTrailPage.performLogin();
});

Then('the system should log the login event with user, date and time', async function () {
  const loginEventLogged = await auditTrailPage.verifyLoginEventLogged();
  expect(loginEventLogged).toBeTruthy();
});

When('the user selects a Casa de Bolsa contract', async function () {
  await auditTrailPage.selectCasaDeBolsaContract();
});

Then('the system should log the contract selection event with user, selected contract and timestamp', async function () {
  const selectionEventLogged = await auditTrailPage.verifyContractSelectionEventLogged();
  expect(selectionEventLogged).toBeTruthy();
});

When('the user clicks on the component to display the breakdown popup', async function () {
  await auditTrailPage.clickContractValueComponent();
});

Then('the system should log the popup open event with user, contract, timestamp and action performed', async function () {
  const popupOpenEventLogged = await auditTrailPage.verifyPopupOpenEventLogged();
  expect(popupOpenEventLogged).toBeTruthy();
});

When('the user closes the popup by clicking outside the component', async function () {
  await auditTrailPage.closePopupByClickingOutside();
});

Then('the system should log the popup close event with the same contextual information', async function () {
  const popupCloseEventLogged = await auditTrailPage.verifyPopupCloseEventLogged();
  expect(popupCloseEventLogged).toBeTruthy();
});

When('the administrator queries the system audit logs', async function () {
  auditLogs = await auditTrailPage.queryAuditLogs();
});

Then('all performed events should be registered chronologically with complete information', async function () {
  const eventsValid = await auditTrailPage.verifyEventsRegisteredChronologically(auditLogs);
  expect(eventsValid).toBeTruthy();
});

Then('it should be possible to reconstruct the complete sequence of user actions from the audit logs', async function () {
  const canReconstruct = await auditTrailPage.verifySessionTraceability(auditLogs);
  expect(canReconstruct).toBeTruthy();
});