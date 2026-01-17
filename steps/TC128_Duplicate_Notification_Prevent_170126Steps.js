const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const NotificationControlPage = require('../pages/NotificationControlPage');

let notificationControlPage;
let activatedPackageId;
let notificationRecords;

Given('a test line with SOLD plan is available for package activation', async function () {
  notificationControlPage = new NotificationControlPage(this.page);
  await notificationControlPage.navigateToPackageManagement();
  await notificationControlPage.verifyTestLineWithSOLDPlanAvailable();
});

Given('the notification control system is initialized without previous records', async function () {
  await notificationControlPage.verifyNotificationControlSystemInitialized();
  await notificationControlPage.clearPreviousNotificationRecords();
});

When('I activate a TRIAL 6GB package on the test line', async function () {
  activatedPackageId = await notificationControlPage.activateTrial6GBPackage();
});

Then('the package should be activated successfully', async function () {
  const isActivated = await notificationControlPage.verifyPackageActivationStatus(activatedPackageId);
  expect(isActivated).toBe(true);
});

Then('the notification controls should be initialized without previous records', async function () {
  const hasNoRecords = await notificationControlPage.verifyNoExistingNotificationRecords(activatedPackageId);
  expect(hasNoRecords).toBe(true);
});

When('I simulate data consumption until reaching exactly 80% of the package quota', async function () {
  await notificationControlPage.simulateDataConsumption(activatedPackageId, 80);
});

Then('the system should detect the 80% threshold', async function () {
  const thresholdDetected = await notificationControlPage.verifyThresholdDetection(80);
  expect(thresholdDetected).toBe(true);
});

Then('the system should generate a notification for 80% consumption', async function () {
  const notificationGenerated = await notificationControlPage.verifyNotificationGenerated(activatedPackageId, 80);
  expect(notificationGenerated).toBe(true);
});

Then('the event should be registered in the control table', async function () {
  const eventRegistered = await notificationControlPage.verifyEventInControlTable(activatedPackageId, 80);
  expect(eventRegistered).toBe(true);
});

When('I attempt to force the 80% consumption condition again for the same active package', async function () {
  await notificationControlPage.forceConsumptionCondition(activatedPackageId, 80);
});

Then('the system should validate that a 80% notification record already exists', async function () {
  const recordExists = await notificationControlPage.verifyExistingNotificationRecord(activatedPackageId, 80);
  expect(recordExists).toBe(true);
});

Then('the system should NOT generate a duplicate notification', async function () {
  const duplicateGenerated = await notificationControlPage.checkForDuplicateNotification(activatedPackageId, 80);
  expect(duplicateGenerated).toBe(false);
});

When('I verify the system records for 80% notifications', async function () {
  notificationRecords = await notificationControlPage.getNotificationRecords(activatedPackageId, 80);
});

Then('only one 80% notification should exist for the package', async function () {
  expect(notificationRecords.length).toBe(1);
});

Then('the audit logs should show no duplicates', async function () {
  const hasDuplicates = await notificationControlPage.checkAuditLogsForDuplicates(activatedPackageId, 80);
  expect(hasDuplicates).toBe(false);
});

When('I simulate consumption until reaching 100% of the package', async function () {
  await notificationControlPage.simulateDataConsumption(activatedPackageId, 100);
});

Then('the system should generate the 100% notification as a different event', async function () {
  const notificationGenerated = await notificationControlPage.verifyNotificationGenerated(activatedPackageId, 100);
  expect(notificationGenerated).toBe(true);
  const isDifferentEvent = await notificationControlPage.verifyDifferentNotificationEvent(activatedPackageId, 80, 100);
  expect(isDifferentEvent).toBe(true);
});

When('I attempt to force the 100% condition again for the same package', async function () {
  await notificationControlPage.forceConsumptionCondition(activatedPackageId, 100);
});

Then('the system should validate the existing 100% record', async function () {
  const recordExists = await notificationControlPage.verifyExistingNotificationRecord(activatedPackageId, 100);
  expect(recordExists).toBe(true);
});

Then('the system should prevent duplicate 100% notifications', async function () {
  const duplicateGenerated = await notificationControlPage.checkForDuplicateNotification(activatedPackageId, 100);
  expect(duplicateGenerated).toBe(false);
});

When('I validate the duplicate prevention mechanism for B2B2C package types', async function () {
  await notificationControlPage.validateDuplicatePreventionForB2B2CPackages();
});

Then('the duplicate control should operate correctly for all TRIAL and B2B2C package types', async function () {
  const controlOperational = await notificationControlPage.verifyDuplicateControlForAllPackageTypes();
  expect(controlOperational).toBe(true);
});

Then('no repeated notifications should be generated', async function () {
  const hasRepeatedNotifications = await notificationControlPage.checkForRepeatedNotificationsAllPackages();
  expect(hasRepeatedNotifications).toBe(false);
});