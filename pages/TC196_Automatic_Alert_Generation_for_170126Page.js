const { expect } = require('@playwright/test');

class AlertMonitoringPage {
  constructor(page) {
    this.page = page;
    
    // Locators for alert configuration
    this.alertConfigSection = '[data-testid="alert-configuration-section"]';
    this.alertRulesList = '[data-testid="alert-rules-list"]';
    this.alertRuleItem = '[data-testid="alert-rule-item"]';
    this.criticalConditionIndicator = '[data-testid="critical-condition-indicator"]';
    
    // Locators for notification channels
    this.notificationChannelsSection = '[data-testid="notification-channels-section"]';
    this.channelItem = '[data-testid="channel-item"]';
    this.channelStatusIndicator = '[data-testid="channel-status-indicator"]';
    this.channelActiveStatus = '[data-testid="channel-active-status"]';
    
    // Locators for anomaly simulation
    this.anomalySimulatorPanel = '[data-testid="anomaly-simulator-panel"]';
    this.simulateAnomalyButton = '[data-testid="simulate-anomaly-button"]';
    this.anomalyTypeSelector = '[data-testid="anomaly-type-selector"]';
    this.anomalyDetectionStatus = '[data-testid="anomaly-detection-status"]';
    
    // Locators for alert monitoring
    this.alertMonitoringDashboard = '[data-testid="alert-monitoring-dashboard"]';
    this.alertGeneratedIndicator = '[data-testid="alert-generated-indicator"]';
    this.alertDetailPanel = '[data-testid="alert-detail-panel"]';
    this.alertTimestamp = '[data-testid="alert-timestamp"]';
    this.alertErrorType = '[data-testid="alert-error-type"]';
    this.alertAffectedComponent = '[data-testid="alert-affected-component"]';
    this.alertSeverity = '[data-testid="alert-severity"]';
    this.alertChannelDeliveryStatus = '[data-testid="alert-channel-delivery-status"]';
    this.alertReceivedTimestamp = '[data-testid="alert-received-timestamp"]';
  }

  async navigateToAlertConfiguration() {
    await this.page.goto(process.env.MONITORING_URL || 'https://monitoring.example.com/alerts');
    await this.page.waitForLoadState('networkidle');
  }

  async isAlertConfigurationAccessible() {
    try {
      await this.page.waitForSelector(this.alertConfigSection, { timeout: 10000 });
      return await this.page.isVisible(this.alertConfigSection);
    } catch (error) {
      return false;
    }
  }

  async getConfiguredAlertRules() {
    await this.page.waitForSelector(this.alertRulesList, { timeout: 10000 });
    const rules = await this.page.locator(this.alertRuleItem).all();
    return rules;
  }

  async verifyCriticalConditionRulesExist() {
    const criticalIndicators = await this.page.locator(this.criticalConditionIndicator).count();
    return criticalIndicators > 0;
  }

  async getNotificationChannels() {
    await this.page.waitForSelector(this.notificationChannelsSection, { timeout: 10000 });
    const channels = await this.page.locator(this.channelItem).all();
    return channels;
  }

  async isChannelActive(channelElement) {
    const statusIndicator = await channelElement.locator(this.channelActiveStatus);
    const statusText = await statusIndicator.textContent();
    return statusText.toLowerCase().includes('active') || statusText.toLowerCase().includes('activo');
  }

  async simulateCriticalAnomaly(anomalyType) {
    await this.page.waitForSelector(this.anomalySimulatorPanel, { timeout: 10000 });
    await this.page.click(this.anomalyTypeSelector);
    await this.page.selectOption(this.anomalyTypeSelector, anomalyType);
    await this.page.click(this.simulateAnomalyButton);
    await this.page.waitForTimeout(2000);
    return true;
  }

  async waitForAnomalyDetection() {
    try {
      await this.page.waitForSelector(this.anomalyDetectionStatus, { timeout: 30000 });
      const statusText = await this.page.textContent(this.anomalyDetectionStatus);
      return statusText.toLowerCase().includes('detected') || statusText.toLowerCase().includes('detectado');
    } catch (error) {
      return false;
    }
  }

  async waitForAlertGeneration() {
    try {
      await this.page.waitForSelector(this.alertGeneratedIndicator, { timeout: 60000 });
      return await this.page.isVisible(this.alertGeneratedIndicator);
    } catch (error) {
      return false;
    }
  }

  async verifyAlertSentToChannels() {
    const deliveryStatuses = await this.page.locator(this.alertChannelDeliveryStatus).all();
    for (const status of deliveryStatuses) {
      const statusText = await status.textContent();
      if (!statusText.toLowerCase().includes('sent') && !statusText.toLowerCase().includes('enviado')) {
        return false;
      }
    }
    return deliveryStatuses.length > 0;
  }

  async getAlertDetails() {
    await this.page.waitForSelector(this.alertDetailPanel, { timeout: 10000 });
    
    const timestamp = await this.page.textContent(this.alertTimestamp);
    const errorType = await this.page.textContent(this.alertErrorType);
    const affectedComponent = await this.page.textContent(this.alertAffectedComponent);
    const severity = await this.page.textContent(this.alertSeverity);
    
    return {
      timestamp: timestamp?.trim() || null,
      errorType: errorType?.trim() || null,
      affectedComponent: affectedComponent?.trim() || null,
      severity: severity?.trim() || null
    };
  }

  async getAlertReceivedTimestamp() {
    const timestampText = await this.page.textContent(this.alertReceivedTimestamp);
    return new Date(timestampText).getTime();
  }
}

module.exports = AlertMonitoringPage;