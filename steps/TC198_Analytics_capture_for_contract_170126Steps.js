const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AnalyticsPage = require('../pages/AnalyticsPage');

let analyticsPage;
let capturedEvents = [];

Given('the analytics system is configured and active', async function () {
  analyticsPage = new AnalyticsPage(this.page);
  const isActive = await analyticsPage.verifyAnalyticsSystemActive();
  expect(isActive).toBeTruthy();
});

When('the user opens the contract value breakdown popup', async function () {
  await analyticsPage.clickContractValueComponent();
  await analyticsPage.waitForBreakdownPopup();
  const event = await analyticsPage.captureAnalyticsEvent('click_breakdown_open');
  capturedEvents.push(event);
});

When('the user reviews the breakdown items', async function () {
  const items = await analyticsPage.getBreakdownItems();
  for (const item of items) {
    await analyticsPage.hoverBreakdownItem(item);
    const event = await analyticsPage.captureAnalyticsEvent('view_breakdown_item');
    capturedEvents.push(event);
  }
});

When('the user closes the breakdown component', async function () {
  await analyticsPage.clickCloseBreakdownButton();
  const event = await analyticsPage.captureAnalyticsEvent('click_breakdown_close');
  capturedEvents.push(event);
});

Then('each user action should generate analytics events', async function () {
  const eventsCount = await analyticsPage.getAnalyticsEventsCount();
  expect(eventsCount).toBeGreaterThan(0);
  expect(capturedEvents.length).toBeGreaterThan(0);
});

Then('specific events should be captured with timestamps including clicks and view duration', async function () {
  for (const event of capturedEvents) {
    const hasTimestamp = await analyticsPage.validateEventHasTimestamp(event);
    const hasEventType = await analyticsPage.validateEventHasType(event);
    expect(hasTimestamp).toBeTruthy();
    expect(hasEventType).toBeTruthy();
  }
  const viewDuration = await analyticsPage.getViewDurationMetric();
  expect(viewDuration).toBeGreaterThan(0);
});

Then('contextual data should be associated with each event including contract type and channel', async function () {
  for (const event of capturedEvents) {
    const contextData = await analyticsPage.getEventContextualData(event);
    expect(contextData.contractType).toBeDefined();
    expect(contextData.channel).toBeDefined();
    expect(contextData.device).toBeDefined();
  }
});

Then('the analytics report should show usage patterns and insights', async function () {
  const report = await analyticsPage.generateAnalyticsReport();
  expect(report.mostConsultedItems).toBeDefined();
  expect(report.averageInteractionTime).toBeGreaterThan(0);
  expect(report.totalInteractions).toBeGreaterThan(0);
});

Then('the analytics should comply with privacy policies and not capture sensitive user data', async function () {
  const complianceResult = await analyticsPage.validatePrivacyCompliance();
  expect(complianceResult.containsSensitiveData).toBeFalsy();
  expect(complianceResult.meetsPrivacyPolicy).toBeTruthy();
  expect(complianceResult.dataProtectionCompliant).toBeTruthy();
});