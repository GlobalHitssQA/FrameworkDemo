const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MonitoringDashboardPage = require('../pages/MonitoringDashboardPage');

let monitoringPage;

Given('the monitoring dashboard is accessible', async function () {
  monitoringPage = new MonitoringDashboardPage(this.page);
  await monitoringPage.navigateToDashboard();
  const isAccessible = await monitoringPage.isDashboardAccessible();
  expect(isAccessible).toBeTruthy();
});

Given('the monitoring tools are configured for the component', async function () {
  const isConfigured = await monitoringPage.areMonitoringToolsConfigured();
  expect(isConfigured).toBeTruthy();
});

When('I check the configured monitoring tools', async function () {
  await monitoringPage.openMonitoringToolsPanel();
});

Then('I should see active monitoring tools including logs dashboards and metrics systems', async function () {
  const hasLogs = await monitoringPage.isLogsMonitoringActive();
  const hasDashboards = await monitoringPage.isDashboardMonitoringActive();
  const hasMetrics = await monitoringPage.isMetricsSystemActive();
  expect(hasLogs).toBeTruthy();
  expect(hasDashboards).toBeTruthy();
  expect(hasMetrics).toBeTruthy();
});

When('I verify the component health metrics', async function () {
  await monitoringPage.navigateToHealthMetrics();
});

Then('the component should send heartbeat service status and performance metrics', async function () {
  const hasHeartbeat = await monitoringPage.isHeartbeatActive();
  const hasServiceStatus = await monitoringPage.isServiceStatusReporting();
  const hasPerformanceMetrics = await monitoringPage.arePerformanceMetricsAvailable();
  expect(hasHeartbeat).toBeTruthy();
  expect(hasServiceStatus).toBeTruthy();
  expect(hasPerformanceMetrics).toBeTruthy();
});

When('I review the monitoring dashboard', async function () {
  await monitoringPage.navigateToMainDashboard();
});

Then('the dashboard should display real-time metrics including availability response times and errors', async function () {
  const hasAvailability = await monitoringPage.isAvailabilityMetricVisible();
  const hasResponseTimes = await monitoringPage.isResponseTimeMetricVisible();
  const hasErrors = await monitoringPage.isErrorMetricVisible();
  expect(hasAvailability).toBeTruthy();
  expect(hasResponseTimes).toBeTruthy();
  expect(hasErrors).toBeTruthy();
});

When('I simulate an abnormal condition with high load', async function () {
  await monitoringPage.simulateHighLoadCondition();
});

Then('the monitoring systems should detect the anomaly and update metrics accordingly', async function () {
  await monitoringPage.waitForMetricsUpdate();
  const anomalyDetected = await monitoringPage.isAnomalyDetected();
  expect(anomalyDetected).toBeTruthy();
});

Then('the health metrics should accurately reflect the abnormal component state', async function () {
  const healthStatus = await monitoringPage.getComponentHealthStatus();
  const metricsReflectAbnormal = await monitoringPage.doMetricsReflectAbnormalState();
  expect(healthStatus).not.toBe('healthy');
  expect(metricsReflectAbnormal).toBeTruthy();
});