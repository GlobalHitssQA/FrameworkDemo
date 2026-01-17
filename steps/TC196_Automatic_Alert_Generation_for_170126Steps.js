const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AlertMonitoringPage = require('../pages/AlertMonitoringPage');

let alertMonitoringPage;
let alertStartTime;
let detectedAnomaly;
let receivedAlert;

Given('the alert configuration system is accessible', async function () {
  alertMonitoringPage = new AlertMonitoringPage(this.page);
  await alertMonitoringPage.navigateToAlertConfiguration();
  const isAccessible = await alertMonitoringPage.isAlertConfigurationAccessible();
  expect(isAccessible).toBeTruthy();
});

Given('alert rules are configured for critical component conditions', async function () {
  const alertRules = await alertMonitoringPage.getConfiguredAlertRules();
  expect(alertRules.length).toBeGreaterThan(0);
  const hasCriticalRules = await alertMonitoringPage.verifyCriticalConditionRulesExist();
  expect(hasCriticalRules).toBeTruthy();
});

When('I verify the notification channels are configured and active', async function () {
  const channels = await alertMonitoringPage.getNotificationChannels();
  expect(channels.length).toBeGreaterThan(0);
  for (const channel of channels) {
    const isActive = await alertMonitoringPage.isChannelActive(channel);
    expect(isActive).toBeTruthy();
  }
});

When('I simulate a critical anomaly in the component', async function () {
  alertStartTime = Date.now();
  detectedAnomaly = await alertMonitoringPage.simulateCriticalAnomaly('error_500');
  expect(detectedAnomaly).toBeTruthy();
});

Then('the monitoring system should detect the anomaly', async function () {
  const isDetected = await alertMonitoringPage.waitForAnomalyDetection();
  expect(isDetected).toBeTruthy();
});

Then('an automatic alert should be sent to configured channels', async function () {
  receivedAlert = await alertMonitoringPage.waitForAlertGeneration();
  expect(receivedAlert).toBeTruthy();
  const alertSentToChannels = await alertMonitoringPage.verifyAlertSentToChannels();
  expect(alertSentToChannels).toBeTruthy();
});

Then('the alert should contain timestamp error type affected component and severity', async function () {
  const alertDetails = await alertMonitoringPage.getAlertDetails();
  expect(alertDetails.timestamp).toBeTruthy();
  expect(alertDetails.errorType).toBeTruthy();
  expect(alertDetails.affectedComponent).toBeTruthy();
  expect(alertDetails.severity).toBeTruthy();
});

Then('the responsible team should receive the notification within 5 minutes', async function () {
  const alertReceivedTime = await alertMonitoringPage.getAlertReceivedTimestamp();
  const responseTimeMs = alertReceivedTime - alertStartTime;
  const responseTimeMinutes = responseTimeMs / 60000;
  expect(responseTimeMinutes).toBeLessThanOrEqual(5);
});