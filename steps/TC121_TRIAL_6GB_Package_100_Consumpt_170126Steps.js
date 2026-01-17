const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TrialPackagePage = require('../pages/TrialPackagePage');

let trialPackagePage;

Given('a user has an active line with SOLD plan', async function () {
  trialPackagePage = new TrialPackagePage(this.page);
  await trialPackagePage.navigateToLineManagement();
  await trialPackagePage.verifyActiveLineWithSOLDPlan();
});

Given('the TRIAL 6GB package is configured in BSCS7', async function () {
  await trialPackagePage.navigateToBSCS7Configuration();
  await trialPackagePage.verifyTrialPackageConfigured();
});

Given('the notification system is configured for 80% and 100% thresholds', async function () {
  await trialPackagePage.navigateToNotificationSettings();
  await trialPackagePage.verifyNotificationThresholdsConfigured();
});

When('I activate a TRIAL 6GB package on a test line with SOLD plan', async function () {
  await trialPackagePage.selectTestLine();
  await trialPackagePage.activateTrialPackage();
});

Then('the TRIAL 6GB package is activated successfully with 6 GB capacity and 90 days validity', async function () {
  const packageDetails = await trialPackagePage.getActivatedPackageDetails();
  expect(packageDetails.name).toContain('TRIAL 6GB');
  expect(packageDetails.capacity).toBe('6 GB');
  expect(packageDetails.validity).toBe('90 días');
});

When('I simulate data consumption until reaching exactly 100% of the 6 GB package', async function () {
  await trialPackagePage.navigateToConsumptionSimulator();
  await trialPackagePage.setConsumptionPercentage(100);
  await trialPackagePage.executeConsumptionSimulation();
});

Then('the system registers the complete 6 GB consumption and detects the 100% threshold reached', async function () {
  const consumptionStatus = await trialPackagePage.getConsumptionStatus();
  expect(consumptionStatus.consumed).toBe('6 GB');
  expect(consumptionStatus.percentage).toBe('100%');
  expect(consumptionStatus.thresholdReached).toBe(true);
});

Then('the system automatically generates a 100% consumption notification', async function () {
  await trialPackagePage.navigateToNotificationsPanel();
  const notificationGenerated = await trialPackagePage.verifyNotificationGenerated('100%');
  expect(notificationGenerated).toBe(true);
});

Then('the notification contains the package name TRIAL 6GB and capacity 6GB and 100% consumption', async function () {
  const notificationDetails = await trialPackagePage.getLatestNotificationDetails();
  expect(notificationDetails.packageName).toContain('TRIAL 6GB');
  expect(notificationDetails.capacity).toBe('6GB');
  expect(notificationDetails.consumptionPercentage).toBe('100%');
});

Then('the notification is registered with generation date and time for auditing', async function () {
  const notificationAudit = await trialPackagePage.getNotificationAuditInfo();
  expect(notificationAudit.generationDate).toBeTruthy();
  expect(notificationAudit.generationTime).toBeTruthy();
  expect(notificationAudit.registeredInSystem).toBe(true);
});