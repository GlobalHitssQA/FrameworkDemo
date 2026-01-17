const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const NotificationPage = require('../pages/NotificationPage');

let notificationPage;
let activatedPackages = [];
let notifications80 = [];
let notifications100 = [];

Given('multiple TRIAL 6GB and B2B2C packages are configured in the system', async function () {
  notificationPage = new NotificationPage(this.page);
  await notificationPage.navigateToPackageConfiguration();
  const packagesConfigured = await notificationPage.verifyPackagesConfigured();
  expect(packagesConfigured).toBeTruthy();
});

Given('the notification system is operational with active communication channels', async function () {
  await notificationPage.navigateToNotificationSettings();
  const systemOperational = await notificationPage.verifyNotificationSystemOperational();
  const channelsActive = await notificationPage.verifyActiveCommunicationChannels();
  expect(systemOperational).toBeTruthy();
  expect(channelsActive).toBeTruthy();
});

When('I activate different package types on test lines', async function () {
  await notificationPage.navigateToPackageActivation();
  activatedPackages = await notificationPage.activateMultiplePackageTypes();
});

Then('the packages are activated correctly with complete information including name, capacity, cost and validity', async function () {
  for (const pkg of activatedPackages) {
    const packageInfo = await notificationPage.getPackageActivationDetails(pkg.id);
    expect(packageInfo.name).toBeTruthy();
    expect(packageInfo.capacity).toBeTruthy();
    expect(packageInfo.cost).toBeTruthy();
    expect(packageInfo.validity).toBeTruthy();
    expect(packageInfo.status).toBe('active');
  }
});

When('I simulate consumption until reaching 80% on at least 3 packages of different capacities', async function () {
  await notificationPage.navigateToConsumptionSimulator();
  const packagesToSimulate = activatedPackages.slice(0, 3);
  for (const pkg of packagesToSimulate) {
    await notificationPage.simulateConsumptionToPercentage(pkg.id, 80);
  }
});

Then('the system generates 80% notifications for each package with specific characteristics', async function () {
  await notificationPage.navigateToNotificationHistory();
  notifications80 = await notificationPage.getNotificationsByThreshold(80);
  expect(notifications80.length).toBeGreaterThanOrEqual(3);
});

Then('each 80% notification contains package name, total capacity, current consumption in GB and exact percentage', async function () {
  for (const notification of notifications80) {
    const content = await notificationPage.getNotificationContent(notification.id);
    expect(content.packageName).toBeTruthy();
    expect(content.totalCapacity).toBeTruthy();
    expect(content.currentConsumptionGB).toBeTruthy();
    expect(content.percentage).toBe(80);
  }
});

When('I simulate consumption until reaching 100% on the same packages', async function () {
  await notificationPage.navigateToConsumptionSimulator();
  const packagesToSimulate = activatedPackages.slice(0, 3);
  for (const pkg of packagesToSimulate) {
    await notificationPage.simulateConsumptionToPercentage(pkg.id, 100);
  }
});

Then('the system generates 100% notifications with complete package depletion information', async function () {
  await notificationPage.navigateToNotificationHistory();
  notifications100 = await notificationPage.getNotificationsByThreshold(100);
  expect(notifications100.length).toBeGreaterThanOrEqual(3);
});

Then('each 100% notification includes all required package and consumption information', async function () {
  for (const notification of notifications100) {
    const content = await notificationPage.getNotificationContent(notification.id);
    expect(content.packageName).toBeTruthy();
    expect(content.totalCapacity).toBeTruthy();
    expect(content.totalConsumption).toBeTruthy();
    expect(content.percentage).toBe(100);
  }
});

Then('all notification information is accurate, readable and matches the actual package data', async function () {
  const allNotifications = [...notifications80, ...notifications100];
  for (const notification of allNotifications) {
    const content = await notificationPage.getNotificationContent(notification.id);
    const packageData = await notificationPage.getPackageRealData(content.packageId);
    expect(content.packageName).toBe(packageData.name);
    expect(content.totalCapacity).toBe(packageData.capacity);
    const isReadable = await notificationPage.verifyNotificationReadability(notification.id);
    expect(isReadable).toBeTruthy();
  }
});