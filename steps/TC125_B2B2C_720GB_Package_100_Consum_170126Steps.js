const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageNotificationPage = require('../pages/PackageNotificationPage');

let packageNotificationPage;
let notificationData;
let packageData;

Given('a test line with SOLD plan is active', async function () {
  packageNotificationPage = new PackageNotificationPage(this.page);
  await packageNotificationPage.navigateToPackageManagement();
  await packageNotificationPage.verifyLineWithSOLDPlanIsActive();
});

Given('a B2B2C 720GB package is created with cost {float} PEN without tax and {int} months validity', async function (cost, months) {
  packageData = { cost, months, capacity: 720 };
  await packageNotificationPage.verifyPackageExistsInBSCS7('B2B2C 720GB', cost, months);
});

Given('the notification system is configured for {int}% and {int}% thresholds', async function (threshold1, threshold2) {
  await packageNotificationPage.verifyNotificationThresholdsConfigured([threshold1, threshold2]);
});

When('I activate the B2B2C 720GB package on the test line', async function () {
  await packageNotificationPage.activatePackage('B2B2C 720GB');
});

Then('the package should be activated with {int} GB capacity and {int} days validity', async function (capacity, days) {
  const isActivated = await packageNotificationPage.verifyPackageActivation(capacity, days);
  expect(isActivated).toBeTruthy();
});

When('I simulate data consumption until reaching exactly {int}% of the {int} GB total', async function (percentage, totalGB) {
  const consumptionGB = (totalGB * percentage) / 100;
  await packageNotificationPage.simulateDataConsumption(consumptionGB);
});

Then('the system should register the accumulated consumption of {int} GB', async function (consumptionGB) {
  const registeredConsumption = await packageNotificationPage.getRegisteredConsumption();
  expect(registeredConsumption).toBe(consumptionGB);
});

Then('the system should detect the {int}% threshold has been reached', async function (threshold) {
  const thresholdReached = await packageNotificationPage.verifyThresholdDetected(threshold);
  expect(thresholdReached).toBeTruthy();
});

When('I verify the automatic notification generation for {int}% depletion', async function (percentage) {
  notificationData = await packageNotificationPage.getNotificationForThreshold(percentage);
});

Then('an automatic notification should be generated informing the B2B2C 720GB package is completely consumed', async function () {
  const notificationExists = await packageNotificationPage.verifyNotificationGenerated('B2B2C 720GB', 100);
  expect(notificationExists).toBeTruthy();
});

Then('the notification should contain package name B2B2C 720GB', async function () {
  const packageName = await packageNotificationPage.getNotificationPackageName();
  expect(packageName).toBe('B2B2C 720GB');
});

Then('the notification should contain total capacity 720GB', async function () {
  const capacity = await packageNotificationPage.getNotificationTotalCapacity();
  expect(capacity).toBe('720GB');
});

Then('the notification should contain total consumption 720GB', async function () {
  const consumption = await packageNotificationPage.getNotificationTotalConsumption();
  expect(consumption).toBe('720GB');
});

Then('the notification should contain percentage {int}%', async function (percentage) {
  const notificationPercentage = await packageNotificationPage.getNotificationPercentage();
  expect(notificationPercentage).toBe(percentage);
});

Then('the notification should contain the depletion date', async function () {
  const depletionDate = await packageNotificationPage.getNotificationDepletionDate();
  expect(depletionDate).toBeTruthy();
});

When('I verify the notification generation timestamp', async function () {
  notificationData = await packageNotificationPage.getNotificationTimestampData();
});

Then('the system should register the complete timestamp for audit purposes', async function () {
  const hasTimestamp = await packageNotificationPage.verifyNotificationHasCompleteTimestamp();
  expect(hasTimestamp).toBeTruthy();
});

When('I validate no duplicate notifications are generated', async function () {
  await packageNotificationPage.checkForDuplicateNotifications('B2B2C 720GB', 100);
});

Then('the system should validate uniqueness and not generate duplicate notifications for the same depletion event', async function () {
  const hasDuplicates = await packageNotificationPage.hasDuplicateNotifications();
  expect(hasDuplicates).toBeFalsy();
});