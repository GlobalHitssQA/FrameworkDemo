const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const NotificationAlertPage = require('../pages/NotificationAlertPage');

let notificationAlertPage;

Given('a test line is active on SOLD plan', async function () {
  notificationAlertPage = new NotificationAlertPage(this.page);
  await notificationAlertPage.navigateToLineManagement();
  await notificationAlertPage.verifyLineIsActiveOnSOLDPlan();
});

Given('the B2B2C 240GB package is configured in BSCS7 with cost 296.61 PEN without IGV', async function () {
  await notificationAlertPage.navigateToBSCS7Configuration();
  await notificationAlertPage.verifyPackageConfiguration('B2B2C 240GB', '296.61');
});

Given('the notification system is operational', async function () {
  await notificationAlertPage.navigateToNotificationSystem();
  await notificationAlertPage.verifyNotificationSystemStatus();
});

Given('the threshold detection mechanism is working correctly', async function () {
  await notificationAlertPage.verifyThresholdDetectionMechanism();
});

When('I activate a B2B2C 240GB package on the test line with 12 months validity', async function () {
  await notificationAlertPage.navigateToPackageActivation();
  await notificationAlertPage.selectPackage('B2B2C 240GB');
  await notificationAlertPage.setPackageValidity('12');
  await notificationAlertPage.confirmPackageActivation();
});

Then('the B2B2C 240GB package is activated with 240 GB capacity and cost 296.61 PEN and 360 days validity', async function () {
  const packageDetails = await notificationAlertPage.getActivatedPackageDetails();
  expect(packageDetails.name).toBe('B2B2C 240GB');
  expect(packageDetails.capacity).toBe('240 GB');
  expect(packageDetails.cost).toBe('296.61');
  expect(packageDetails.validityDays).toBe('360');
});

When('I simulate data consumption until reaching 80% of the package which is 192 GB of 240 GB', async function () {
  await notificationAlertPage.navigateToConsumptionSimulator();
  await notificationAlertPage.setSimulatedConsumption('192');
  await notificationAlertPage.executeConsumptionSimulation();
});

Then('the system registers accumulated consumption of 192 GB and detects the 80% threshold', async function () {
  const consumptionData = await notificationAlertPage.getConsumptionData();
  expect(consumptionData.accumulatedGB).toBe('192');
  expect(consumptionData.thresholdDetected).toBe('80%');
});

Then('the system automatically generates the 80% alert notification', async function () {
  await notificationAlertPage.waitForNotificationGeneration();
  const notificationGenerated = await notificationAlertPage.verifyAlertNotificationGenerated('80%');
  expect(notificationGenerated).toBeTruthy();
});

Then('the notification displays package name B2B2C 240GB and total capacity 240GB and current consumption 192GB and percentage 80% and remaining validity', async function () {
  const notificationContent = await notificationAlertPage.getNotificationContent();
  expect(notificationContent.packageName).toBe('B2B2C 240GB');
  expect(notificationContent.totalCapacity).toBe('240GB');
  expect(notificationContent.currentConsumption).toBe('192GB');
  expect(notificationContent.percentage).toBe('80%');
  expect(notificationContent.remainingValidity).toBeTruthy();
});

Then('the system stores the exact timestamp of notification generation for traceability and audit', async function () {
  const timestamp = await notificationAlertPage.getNotificationTimestamp();
  expect(timestamp).toBeTruthy();
  const isValidTimestamp = await notificationAlertPage.verifyTimestampFormat(timestamp);
  expect(isValidTimestamp).toBeTruthy();
});

Then('the system prevents duplicate notifications verifying no previous 80% notification exists for this active package', async function () {
  await notificationAlertPage.triggerDuplicateNotificationAttempt();
  const duplicateCount = await notificationAlertPage.countNotificationsForThreshold('80%');
  expect(duplicateCount).toBe(1);
});