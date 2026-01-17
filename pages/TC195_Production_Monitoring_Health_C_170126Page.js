class MonitoringDashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardUrl = process.env.MONITORING_DASHBOARD_URL || '/monitoring/dashboard';
    
    this.dashboardContainer = '[data-testid="monitoring-dashboard"]';
    this.monitoringToolsPanel = '[data-testid="monitoring-tools-panel"]';
    this.logsMonitoringIndicator = '[data-testid="logs-monitoring-status"]';
    this.dashboardMonitoringIndicator = '[data-testid="dashboard-monitoring-status"]';
    this.metricsSystemIndicator = '[data-testid="metrics-system-status"]';
    this.healthMetricsSection = '[data-testid="health-metrics-section"]';
    this.heartbeatIndicator = '[data-testid="heartbeat-indicator"]';
    this.serviceStatusIndicator = '[data-testid="service-status-indicator"]';
    this.performanceMetricsPanel = '[data-testid="performance-metrics-panel"]';
    this.availabilityMetric = '[data-testid="availability-metric"]';
    this.responseTimeMetric = '[data-testid="response-time-metric"]';
    this.errorMetric = '[data-testid="error-metric"]';
    this.simulateLoadButton = '[data-testid="simulate-high-load-btn"]';
    this.anomalyAlert = '[data-testid="anomaly-alert"]';
    this.componentHealthStatus = '[data-testid="component-health-status"]';
    this.abnormalStateIndicator = '[data-testid="abnormal-state-indicator"]';
    this.configuredToolsList = '[data-testid="configured-tools-list"]';
    this.mainDashboardTab = '[data-testid="main-dashboard-tab"]';
    this.healthMetricsTab = '[data-testid="health-metrics-tab"]';
  }

  async navigateToDashboard() {
    await this.page.goto(this.dashboardUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isDashboardAccessible() {
    return await this.page.locator(this.dashboardContainer).isVisible();
  }

  async areMonitoringToolsConfigured() {
    const toolsList = this.page.locator(this.configuredToolsList);
    return await toolsList.isVisible();
  }

  async openMonitoringToolsPanel() {
    await this.page.locator(this.monitoringToolsPanel).click();
    await this.page.waitForTimeout(500);
  }

  async isLogsMonitoringActive() {
    const indicator = this.page.locator(this.logsMonitoringIndicator);
    const status = await indicator.getAttribute('data-status');
    return status === 'active';
  }

  async isDashboardMonitoringActive() {
    const indicator = this.page.locator(this.dashboardMonitoringIndicator);
    const status = await indicator.getAttribute('data-status');
    return status === 'active';
  }

  async isMetricsSystemActive() {
    const indicator = this.page.locator(this.metricsSystemIndicator);
    const status = await indicator.getAttribute('data-status');
    return status === 'active';
  }

  async navigateToHealthMetrics() {
    await this.page.locator(this.healthMetricsTab).click();
    await this.page.waitForSelector(this.healthMetricsSection);
  }

  async isHeartbeatActive() {
    const heartbeat = this.page.locator(this.heartbeatIndicator);
    const status = await heartbeat.getAttribute('data-status');
    return status === 'active' || status === 'sending';
  }

  async isServiceStatusReporting() {
    const serviceStatus = this.page.locator(this.serviceStatusIndicator);
    return await serviceStatus.isVisible();
  }

  async arePerformanceMetricsAvailable() {
    const metricsPanel = this.page.locator(this.performanceMetricsPanel);
    return await metricsPanel.isVisible();
  }

  async navigateToMainDashboard() {
    await this.page.locator(this.mainDashboardTab).click();
    await this.page.waitForSelector(this.dashboardContainer);
  }

  async isAvailabilityMetricVisible() {
    return await this.page.locator(this.availabilityMetric).isVisible();
  }

  async isResponseTimeMetricVisible() {
    return await this.page.locator(this.responseTimeMetric).isVisible();
  }

  async isErrorMetricVisible() {
    return await this.page.locator(this.errorMetric).isVisible();
  }

  async simulateHighLoadCondition() {
    await this.page.locator(this.simulateLoadButton).click();
    await this.page.waitForTimeout(2000);
  }

  async waitForMetricsUpdate() {
    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(this.anomalyAlert, { timeout: 10000 });
  }

  async isAnomalyDetected() {
    return await this.page.locator(this.anomalyAlert).isVisible();
  }

  async getComponentHealthStatus() {
    const statusElement = this.page.locator(this.componentHealthStatus);
    return await statusElement.textContent();
  }

  async doMetricsReflectAbnormalState() {
    const abnormalIndicator = this.page.locator(this.abnormalStateIndicator);
    return await abnormalIndicator.isVisible();
  }
}

module.exports = MonitoringDashboardPage;