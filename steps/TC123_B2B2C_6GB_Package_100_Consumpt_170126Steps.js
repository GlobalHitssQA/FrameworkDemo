const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ConsumptionNotificationPage = require('../pages/ConsumptionNotificationPage');

let consumptionPage;

Given('a test line with SOLD plan is available in the system', async function() {
  consumptionPage = new ConsumptionNotificationPage(this.page);
  await consumptionPage.navigateToLineManagement();
  const isAvailable = await consumptionPage.verifySOLDPlanLineAvailable();
  expect(isAvailable).toBeTruthy();
});

Given('the B2B2C 6GB package is configured in BSCS7', async function() {
  const isConfigured = await consumptionPage.verifyB2B2CPackageInBSCS7();
  expect(isConfigured).toBeTruthy();
});

Given('the notification system is properly configured', async function() {
  await consumptionPage.navigateToNotificationSettings();
  const isConfigured = await consumptionPage.verifyNotificationSystemStatus();
  expect(isConfigured).toBeTruthy();
});

When('I activate the B2B2C 6GB package on the test line', async function() {
  await consumptionPage.navigateToPackageActivation();
  await consumptionPage.selectB2B2C6GBPackage();
  await consumptionPage.confirmPackageActivation();
});

Then('the package should be activated with 6GB capacity and cost of S\/. 16.95 without IGV', async function() {
  const packageDetails = await consumptionPage.getActivatedPackageDetails();
  expect(packageDetails.capacity).toBe('6GB');
  expect(packageDetails.cost).toBe('16.95');
});

Then('the package validity should be 1 month or 30 days', async function() {
  const validity = await consumptionPage.getPackageValidity();
  expect(validity).toMatch(/30 días|1 mes|30 days|1 month/);
});

When('I simulate data consumption until reaching exactly 100% of the 6GB package', async function() {
  await consumptionPage.navigateToConsumptionSimulator();
  await consumptionPage.setConsumptionAmount('6144');
  await consumptionPage.executeConsumptionSimulation();
});

Then('the system should register the total consumption of 6GB', async function() {
  const consumption = await consumptionPage.getTotalConsumption();
  expect(consumption).toBe('6GB');
});

Then('the system should detect that 100% threshold was reached', async function() {
  const thresholdReached = await consumptionPage.verifyThresholdDetection('100');
  expect(thresholdReached).toBeTruthy();
});

When('I verify the automatic notification generation for 100% consumption', async function() {
  await consumptionPage.navigateToNotificationLog();
  await consumptionPage.filterNotificationsByPercentage('100');
});

Then('an automatic notification should be generated indicating the B2B2C 6GB package is fully consumed', async function() {
  const notification = await consumptionPage.getLatestNotification();
  expect(notification.exists).toBeTruthy();
  expect(notification.message).toContain('100%');
});

Then('the notification should contain package name B2B2C 6GB', async function() {
  const notificationContent = await consumptionPage.getNotificationContent();
  expect(notificationContent).toContain('B2B2C 6GB');
});

Then('the notification should contain total capacity 6GB', async function() {
  const notificationContent = await consumptionPage.getNotificationContent();
  expect(notificationContent).toMatch(/capacidad.*6GB|capacity.*6GB|6GB.*total/);
});

Then('the notification should contain consumption 6GB and percentage 100%', async function() {
  const notificationContent = await consumptionPage.getNotificationContent();
  expect(notificationContent).toContain('6GB');
  expect(notificationContent).toContain('100%');
});

When('I verify the notification timestamp in the system', async function() {
  await consumptionPage.openNotificationDetails();
});

Then('the system should store the notification generation date and time for audit', async function() {
  const timestamp = await consumptionPage.getNotificationTimestamp();
  expect(timestamp.date).toBeTruthy();
  expect(timestamp.time).toBeTruthy();
});

When('I validate that no duplicate notifications are generated for the same 100% event', async function() {
  await consumptionPage.searchDuplicateNotifications();
});

Then('the system should prevent duplicate notification generation', async function() {
  const duplicateCount = await consumptionPage.getDuplicateNotificationCount();
  expect(duplicateCount).toBe(0);
});

Then('the system should validate no previous record exists for this event', async function() {
  const hasPreviousRecord = await consumptionPage.checkPreviousNotificationRecord();
  expect(hasPreviousRecord).toBeFalsy();
});