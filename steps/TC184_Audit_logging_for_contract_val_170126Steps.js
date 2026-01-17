const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');
const AuditSystemPage = require('../pages/AuditSystemPage');

let contractValuePage;
let auditSystemPage;
let currentUser;
let selectedContract;
let queryTimestamp;

Given('the user is authenticated in the system with valid credentials', async function () {
  contractValuePage = new ContractValuePage(this.page);
  auditSystemPage = new AuditSystemPage(this.page);
  currentUser = await contractValuePage.authenticateUser();
  const isLoggedIn = await contractValuePage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Given('the audit system is configured and operational', async function () {
  const isAuditOperational = await auditSystemPage.verifyAuditSystemStatus();
  expect(isAuditOperational).toBeTruthy();
});

When('the user selects a contract and views the value and composition component', async function () {
  selectedContract = await contractValuePage.selectFirstAvailableContract();
  await contractValuePage.waitForValueComponentToLoad();
  const isComponentVisible = await contractValuePage.isValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user clicks on the component to display the value breakdown', async function () {
  queryTimestamp = new Date();
  await contractValuePage.clickValueComponentToShowBreakdown();
  const isBreakdownVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
});

Then('the audit system should register the query with user data, date, time, contract consulted and action performed', async function () {
  await auditSystemPage.navigateToAuditLogs();
  const auditRecord = await auditSystemPage.findAuditRecordForQuery({
    user: currentUser,
    contract: selectedContract,
    timestamp: queryTimestamp,
    action: 'VIEW_CONTRACT_COMPOSITION'
  });
  
  expect(auditRecord).toBeTruthy();
  expect(auditRecord.userId).toBe(currentUser.id);
  expect(auditRecord.contractId).toBe(selectedContract.id);
  expect(auditRecord.action).toBe('VIEW_CONTRACT_COMPOSITION');
  expect(auditRecord.timestamp).toBeDefined();
  expect(auditRecord.date).toBeDefined();
});