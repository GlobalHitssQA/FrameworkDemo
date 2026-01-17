const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const NotificationThresholdsPage = require('../pages/NotificationThresholdsPage');

let notificationPage;

Given('the notification thresholds are configured at 80% and 100% for TRIAL 6GB and B2B2C packages', async function() {
  notificationPage = new NotificationThresholdsPage(this.page);
  await notificationPage.navigateToThresholdConfiguration();
  await notificationPage.configureThreshold('TRIAL_6GB', 80);
  await notificationPage.configureThreshold('TRIAL_6GB', 100);
  await notificationPage.configureThreshold('B2B2C', 80);
  await notificationPage.configureThreshold('B2B2C', 100);
  await notificationPage.saveThresholdConfiguration();
  const isConfigured = await notificationPage.verifyThresholdsConfigured();
  expect(isConfigured).toBeTruthy();
});

Given('the notification system is operational with available communication channels', async function() {
  await notificationPage.navigateToNotificationSystem();
  const isOperational = await notificationPage.verifyNotificationSystemOperational();
  expect(isOperational).toBeTruthy();
  const channelsAvailable = await notificationPage.verifyCommunicationChannelsAvailable();
  expect(channelsAvailable).toBeTruthy();
});

When('I activate TRIAL 6GB and B2B2C packages on test lines', async function() {
  await notificationPage.navigateToPackageActivation();
  await notificationPage.activatePackage('TRIAL_6GB', 'test_line_001');
  await notificationPage.activatePackage('TRIAL_6GB', 'test_line_002');
  await notificationPage.activatePackage('B2B2C', 'test_line_003');
  await notificationPage.activatePackage('B2B2C', 'test_line_004');
});

Then('the packages are activated and associated with configured notification rules', async function() {
  const packagesActivated = await notificationPage.verifyPackagesActivated();
  expect(packagesActivated).toBeTruthy();
  const rulesAssociated = await notificationPage.verifyNotificationRulesAssociated();
  expect(rulesAssociated).toBeTruthy();
});

When('I simulate gradual data consumption until reaching 80% threshold on multiple lines', async function() {
  await notificationPage.navigateToConsumptionSimulator();
  await notificationPage.simulateConsumption('test_line_001', 80);
  await notificationPage.simulateConsumption('test_line_002', 80);
  await notificationPage.simulateConsumption('test_line_003', 80);
  await notificationPage.simulateConsumption('test_line_004', 80);
});

Then('the system automatically detects when each line reaches 80% and generates notification without manual intervention', async function() {
  const detectionAutomatic = await notificationPage.verifyAutomaticDetection(80);
  expect(detectionAutomatic).toBeTruthy();
  const notificationsGenerated = await notificationPage.verifyNotificationsGenerated(80);
  expect(notificationsGenerated).toBe(4);
  const noManualIntervention = await notificationPage.verifyNoManualInterventionRequired();
  expect(noManualIntervention).toBeTruthy();
});

When('I continue simulating consumption until reaching 100% threshold on the same lines', async function() {
  await notificationPage.simulateConsumption('test_line_001', 100);
  await notificationPage.simulateConsumption('test_line_002', 100);
  await notificationPage.simulateConsumption('test_line_003', 100);
  await notificationPage.simulateConsumption('test_line_004', 100);
});

Then('the system automatically detects 100% threshold and generates the second notification automatically', async function() {
  const detectionAutomatic = await notificationPage.verifyAutomaticDetection(100);
  expect(detectionAutomatic).toBeTruthy();
  const notificationsGenerated = await notificationPage.verifyNotificationsGenerated(100);
  expect(notificationsGenerated).toBe(4);
});

Then('the notifications are sent through configured communication channels without manual action', async function() {
  const notificationsSent = await notificationPage.verifyNotificationsSentThroughChannels();
  expect(notificationsSent).toBeTruthy();
  const channelsUsed = await notificationPage.getUsedCommunicationChannels();
  expect(channelsUsed.length).toBeGreaterThan(0);
});

Then('the detection and sending process occurs in real time upon reaching each threshold', async function() {
  const realTimeProcessing = await notificationPage.verifyRealTimeProcessing();
  expect(realTimeProcessing).toBeTruthy();
  const processingDelay = await notificationPage.getNotificationProcessingDelay();
  expect(processingDelay).toBeLessThan(5000);
});