const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const NotificationPage = require('../pages/NotificationPage');

let notificationPage;

Given('a user has an active GM line with SOLD plan', async function () {
  notificationPage = new NotificationPage(this.page);
  await notificationPage.navigateToLineManagement();
  await notificationPage.verifyActiveGMLineWithSOLDPlan();
});

Given('the TRIAL 6GB package is configured', async function () {
  await notificationPage.verifyTrial6GBPackageConfigured();
});

Given('the notification system at 80% is configured and operational', async function () {
  await notificationPage.verifyNotificationSystemAt80Percent();
});

When('I activate a TRIAL 6GB package on the SOLD plan line', async function () {
  await notificationPage.activateTrial6GBPackage();
});

Then('the TRIAL 6GB package should be activated with 6GB available', async function () {
  const availableData = await notificationPage.getAvailableDataGB();
  expect(availableData).toBe('6');
  const packageStatus = await notificationPage.getPackageActivationStatus();
  expect(packageStatus).toContain('activo');
});

When('I consume 4.7GB of the TRIAL 6GB package', async function () {
  await notificationPage.simulateDataConsumption('4.7');
});

Then('the package should register 4.7GB consumption without triggering threshold notification', async function () {
  const consumedData = await notificationPage.getConsumedDataGB();
  expect(consumedData).toBe('4.7');
  const notificationTriggered = await notificationPage.isThresholdNotificationTriggered();
  expect(notificationTriggered).toBe(false);
});

When('I consume an additional 0.1GB to reach exactly 4.8GB consumed', async function () {
  await notificationPage.simulateDataConsumption('0.1');
});

Then('the system should detect that 80% consumption threshold was reached', async function () {
  const thresholdReached = await notificationPage.isThreshold80PercentReached();
  expect(thresholdReached).toBe(true);
});

Then('the system should generate and send automatic notification about 80% consumption', async function () {
  const notificationSent = await notificationPage.isAutomaticNotificationSent();
  expect(notificationSent).toBe(true);
  const notificationContent = await notificationPage.getNotificationContent();
  expect(notificationContent).toContain('80%');
});

Then('the notification should display TRIAL 6GB package name and 80% consumed percentage', async function () {
  const notificationContent = await notificationPage.getNotificationContent();
  expect(notificationContent).toContain('TRIAL 6GB');
  expect(notificationContent).toContain('80%');
});

Then('the system should log audit record with date time and notification details', async function () {
  await notificationPage.navigateToAuditLog();
  const auditRecord = await notificationPage.getLatestAuditRecord();
  expect(auditRecord.date).toBeTruthy();
  expect(auditRecord.time).toBeTruthy();
  expect(auditRecord.details).toContain('TRIAL 6GB');
  expect(auditRecord.details).toContain('80%');
});