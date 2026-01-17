const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ConsumptionAlertPage = require('../pages/ConsumptionAlertPage');

let consumptionAlertPage;

Given('a user with an active line on SOLD plan exists', async function () {
  consumptionAlertPage = new ConsumptionAlertPage(this.page);
  await consumptionAlertPage.navigateToUserManagement();
  await consumptionAlertPage.verifyUserWithSOLDPlanExists();
});

Given('the B2B2C 6GB package is configured in BSCS7 with cost 16.95 PEN without VAT', async function () {
  await consumptionAlertPage.navigateToPackageConfiguration();
  await consumptionAlertPage.verifyB2B2CPackageConfiguration('6GB', '16.95');
});

Given('the notification system is operational and configured for 80% and 100% thresholds', async function () {
  await consumptionAlertPage.navigateToNotificationSettings();
  await consumptionAlertPage.verifyNotificationThresholdsConfigured(['80', '100']);
});

When('I activate a B2B2C 6GB package on the test line with 1 month validity', async function () {
  await consumptionAlertPage.navigateToPackageActivation();
  await consumptionAlertPage.selectPackage('B2B2C 6GB');
  await consumptionAlertPage.setPackageValidity('30');
  await consumptionAlertPage.confirmPackageActivation();
});

Then('the B2B2C 6GB package is activated with 6GB capacity and 30 days validity', async function () {
  const packageDetails = await consumptionAlertPage.getActivatedPackageDetails();
  expect(packageDetails.name).toContain('B2B2C 6GB');
  expect(packageDetails.capacity).toBe('6GB');
  expect(packageDetails.validity).toBe('30');
  expect(packageDetails.cost).toBe('16.95');
});

When('I simulate data consumption until reaching exactly 80% of the package which is 4.8GB', async function () {
  await consumptionAlertPage.navigateToConsumptionSimulator();
  await consumptionAlertPage.inputConsumptionAmount('4.8');
  await consumptionAlertPage.executeConsumptionSimulation();
});

Then('the system registers 4.8GB consumption and detects the 80% threshold reached', async function () {
  const consumptionStatus = await consumptionAlertPage.getConsumptionStatus();
  expect(consumptionStatus.consumed).toBe('4.8GB');
  expect(consumptionStatus.percentage).toBe('80%');
  expect(consumptionStatus.thresholdReached).toBe(true);
});

Then('the system automatically generates the 80% consumption alert notification', async function () {
  await consumptionAlertPage.waitForNotificationGeneration();
  const notificationGenerated = await consumptionAlertPage.verifyAlertNotificationExists('80%');
  expect(notificationGenerated).toBe(true);
});

Then('the notification displays package name B2B2C 6GB with capacity 6GB and current consumption 4.8GB at 80%', async function () {
  const notificationContent = await consumptionAlertPage.getNotificationContent();
  expect(notificationContent.packageName).toContain('B2B2C 6GB');
  expect(notificationContent.capacity).toBe('6GB');
  expect(notificationContent.currentConsumption).toBe('4.8GB');
  expect(notificationContent.percentage).toBe('80%');
});

Then('the system records the exact date and time of notification generation', async function () {
  const notificationTimestamp = await consumptionAlertPage.getNotificationTimestamp();
  expect(notificationTimestamp.date).toBeTruthy();
  expect(notificationTimestamp.time).toBeTruthy();
  expect(notificationTimestamp.isValid).toBe(true);
});

Then('the system validates no duplicate notifications are generated for the same 80% consumption event', async function () {
  const duplicateCheck = await consumptionAlertPage.checkForDuplicateNotifications('80%');
  expect(duplicateCheck.count).toBe(1);
  expect(duplicateCheck.hasDuplicates).toBe(false);
});