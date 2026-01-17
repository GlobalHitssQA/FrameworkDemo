class TestingPlanPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningSectionLink = '[data-testid="provisioning-section-link"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.testingPlanOption = '[data-testid="plan-option-testing"]';
    this.apnSelector = '[data-testid="apn-selector"]';
    this.apnInput = '[data-testid="apn-input"]';
    this.providerInput = '[data-testid="provider-input"]';
    this.provisionButton = '[data-testid="provision-line-button"]';
    this.provisionSuccessMessage = '[data-testid="provision-success-message"]';
    this.apnConfigurationLink = '[data-testid="apn-configuration-link"]';
    this.preproductiveAPNList = '[data-testid="preproductive-apn-list"]';
    this.productiveAPNItem = '[data-testid="productive-apn-item"]';
    this.trafficSimulationLink = '[data-testid="traffic-simulation-link"]';
    this.telemetryTrafficButton = '[data-testid="telemetry-traffic-button"]';
    this.apnTrafficSelector = '[data-testid="apn-traffic-selector"]';
    this.generateTrafficButton = '[data-testid="generate-traffic-button"]';
    this.trafficStatusIndicator = '[data-testid="traffic-status-indicator"]';
    this.udrTableLink = '[data-testid="udr-table-link"]';
    this.tableSearchInput = '[data-testid="table-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.bulkRateCell = '[data-testid="bulk-rate-cell"]';
    this.rateTypeCell = '[data-testid="rate-type-cell"]';
    this.trafficValidationLink = '[data-testid="traffic-validation-link"]';
    this.apnBlockedStatus = '[data-testid="apn-blocked-status"]';
  }

  async navigateToProvisioningSection() {
    await this.page.click(this.provisioningSectionLink);
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineInTestingPlan(apn, provider) {
    await this.page.click(this.planSelector);
    await this.page.click(this.testingPlanOption);
    await this.page.fill(this.apnInput, apn);
    await this.page.fill(this.providerInput, provider);
    await this.page.click(this.provisionButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineProvisionedSuccessfully() {
    return await this.page.isVisible(this.provisionSuccessMessage);
  }

  async navigateToAPNConfiguration() {
    await this.page.click(this.apnConfigurationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectTestingPlan() {
    await this.page.click(this.planSelector);
    await this.page.click(this.testingPlanOption);
  }

  async getConfiguredPreproductiveAPNs() {
    const apnElements = await this.page.locator(`${this.preproductiveAPNList} li`).allTextContents();
    return apnElements;
  }

  async isProductiveAPNVisible(apnName) {
    const selector = `${this.productiveAPNItem}[data-apn="${apnName}"]`;
    return await this.page.isVisible(selector);
  }

  async navigateToTrafficSimulation() {
    await this.page.click(this.trafficSimulationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async generateTelemetryTraffic(apn) {
    await this.page.click(this.apnTrafficSelector);
    await this.page.click(`[data-testid="apn-option-${apn.toLowerCase()}"]`);
    await this.page.click(this.generateTrafficButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getTrafficFlowStatus() {
    return await this.page.getAttribute(this.trafficStatusIndicator, 'data-status');
  }

  async navigateToUDRTable() {
    await this.page.click(this.udrTableLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchTrafficRecords(tableName) {
    await this.page.fill(this.tableSearchInput, tableName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getBulkRateFromTable() {
    return await this.page.textContent(this.bulkRateCell);
  }

  async getRateType() {
    return await this.page.textContent(this.rateTypeCell);
  }

  async navigateToTrafficValidation() {
    await this.page.click(this.trafficValidationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyAPNBlocked(apnName) {
    const selector = `${this.apnBlockedStatus}[data-apn="${apnName}"]`;
    const status = await this.page.getAttribute(selector, 'data-blocked');
    return status === 'true';
  }
}

module.exports = TestingPlanPage;