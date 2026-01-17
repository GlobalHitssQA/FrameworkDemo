const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const NotificationAuditPage = require('../pages/NotificationAuditPage');

let notificationAuditPage;
let activationTimestamp;
let notification80Timestamp;
let notification100Timestamp;

Given('a test line is available for package activation', async function () {
  notificationAuditPage = new NotificationAuditPage(this.page);
  await notificationAuditPage.navigateToPackageManagement();
  await notificationAuditPage.verifyTestLineAvailable();
});

Given('the audit system is operational with event logging enabled', async function () {
  await notificationAuditPage.navigateToAuditSystem();
  await notificationAuditPage.verifyAuditSystemOperational();
  await notificationAuditPage.verifyEventLoggingEnabled();
});

When('I activate a TRIAL 6GB package and record the activation timestamp', async function () {
  activationTimestamp = new Date();
  await notificationAuditPage.selectPackageType('TRIAL 6GB');
  await notificationAuditPage.activatePackage();
});

Then('the package is activated and the system records full timestamp format', async function () {
  const isActivated = await notificationAuditPage.verifyPackageActivated();
  expect(isActivated).toBeTruthy();
  const recordedTimestamp = await notificationAuditPage.getActivationTimestamp();
  expect(recordedTimestamp).toContain(activationTimestamp.toISOString().split('T')[0]);
});

When('I simulate consumption until reaching 80% threshold', async function () {
  await notificationAuditPage.navigateToConsumptionSimulator();
  await notificationAuditPage.setConsumptionPercentage(80);
  await notificationAuditPage.executeConsumptionSimulation();
});

Then('the system detects 80% threshold and generates notification at precise moment', async function () {
  notification80Timestamp = new Date();
  const notificationGenerated = await notificationAuditPage.verifyNotificationGenerated(80);
  expect(notificationGenerated).toBeTruthy();
});

When('I query the audit table for the 80% notification record', async function () {
  await notificationAuditPage.navigateToAuditLogs();
  await notificationAuditPage.filterByNotificationType('80%');
  await notificationAuditPage.searchAuditRecords();
});

Then('the system displays record with full date, exact time including seconds and timezone', async function () {
  const auditRecord = await notificationAuditPage.getLatestAuditRecord();
  const hasFullDate = await notificationAuditPage.verifyRecordHasFullDate(auditRecord);
  const hasSeconds = await notificationAuditPage.verifyRecordHasSeconds(auditRecord);
  const hasTimezone = await notificationAuditPage.verifyRecordHasTimezone(auditRecord);
  expect(hasFullDate).toBeTruthy();
  expect(hasSeconds).toBeTruthy();
  expect(hasTimezone).toBeTruthy();
});

When('I simulate consumption until reaching 100% of the package', async function () {
  await notificationAuditPage.navigateToConsumptionSimulator();
  await notificationAuditPage.setConsumptionPercentage(100);
  await notificationAuditPage.executeConsumptionSimulation();
});

Then('the system generates 100% notification with a different timestamp from the previous one', async function () {
  notification100Timestamp = new Date();
  const notificationGenerated = await notificationAuditPage.verifyNotificationGenerated(100);
  expect(notificationGenerated).toBeTruthy();
  const timestamp100 = await notificationAuditPage.getNotificationTimestamp(100);
  const timestamp80 = await notificationAuditPage.getNotificationTimestamp(80);
  expect(timestamp100).not.toEqual(timestamp80);
});

When('I verify the 100% notification record in the audit system', async function () {
  await notificationAuditPage.navigateToAuditLogs();
  await notificationAuditPage.filterByNotificationType('100%');
  await notificationAuditPage.searchAuditRecords();
});

Then('I find complete record with date, precise time and timezone for the second notification', async function () {
  const auditRecord = await notificationAuditPage.getLatestAuditRecord();
  const hasFullDate = await notificationAuditPage.verifyRecordHasFullDate(auditRecord);
  const hasPreciseTime = await notificationAuditPage.verifyRecordHasSeconds(auditRecord);
  const hasTimezone = await notificationAuditPage.verifyRecordHasTimezone(auditRecord);
  expect(hasFullDate).toBeTruthy();
  expect(hasPreciseTime).toBeTruthy();
  expect(hasTimezone).toBeTruthy();
});

Then('the registered timestamps allow complete traceability of package lifecycle', async function () {
  await notificationAuditPage.navigateToAuditLogs();
  await notificationAuditPage.filterByCurrentPackage();
  const lifecycleRecords = await notificationAuditPage.getPackageLifecycleRecords();
  const hasActivation = await notificationAuditPage.verifyRecordExists(lifecycleRecords, 'activation');
  const has80Alert = await notificationAuditPage.verifyRecordExists(lifecycleRecords, '80%');
  const has100Alert = await notificationAuditPage.verifyRecordExists(lifecycleRecords, '100%');
  expect(hasActivation).toBeTruthy();
  expect(has80Alert).toBeTruthy();
  expect(has100Alert).toBeTruthy();
  const isChronological = await notificationAuditPage.verifyChronologicalOrder(lifecycleRecords);
  expect(isChronological).toBeTruthy();
});

When('I repeat validation with B2B2C packages of different validity periods', async function () {
  await notificationAuditPage.navigateToPackageManagement();
  await notificationAuditPage.selectPackageType('B2B2C');
  await notificationAuditPage.activatePackage();
  await notificationAuditPage.navigateToConsumptionSimulator();
  await notificationAuditPage.setConsumptionPercentage(80);
  await notificationAuditPage.executeConsumptionSimulation();
  await notificationAuditPage.setConsumptionPercentage(100);
  await notificationAuditPage.executeConsumptionSimulation();
});

Then('the system consistently records date and time for all package types', async function () {
  await notificationAuditPage.navigateToAuditLogs();
  await notificationAuditPage.filterByPackageType('B2B2C');
  const b2b2cRecords = await notificationAuditPage.getPackageLifecycleRecords();
  for (const record of b2b2cRecords) {
    const hasFullDate = await notificationAuditPage.verifyRecordHasFullDate(record);
    const hasSeconds = await notificationAuditPage.verifyRecordHasSeconds(record);
    const hasTimezone = await notificationAuditPage.verifyRecordHasTimezone(record);
    expect(hasFullDate).toBeTruthy();
    expect(hasSeconds).toBeTruthy();
    expect(hasTimezone).toBeTruthy();
  }
});