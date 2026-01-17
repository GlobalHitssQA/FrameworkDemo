const { expect } = require('@playwright/test');

class TrafficDetailPage {
  constructor(page) {
    this.page = page;
    
    this.invoiceSystemUrl = '/invoice/system';
    this.trafficDetailSection = '[data-testid="traffic-detail-sold-section"]';
    this.inPool10MBSummary = '[data-testid="in-pool-10mb-summary"]';
    this.assignedPoolField = '[data-testid="assigned-pool-value"]';
    this.activeLineCountDisplay = '[data-testid="active-sold-line-count"]';
    this.billingCycleStatus = '[data-testid="billing-cycle-status"]';
    this.inPoolShellStatus = '[data-testid="in-pool-shell-status"]';
    this.packageConfigStatus = '[data-testid="in-pool-10mb-config-status"]';
    this.totalLinesInCalculation = '[data-testid="total-lines-in-pool-calculation"]';
    this.calculationDetailsPanel = '[data-testid="pool-calculation-details"]';
    this.allLinesIncludedIndicator = '[data-testid="all-sold-lines-included"]';
    this.ratePlanFilter = '[data-testid="rateplan-filter-sold"]';
    this.invoiceDetailTab = '[data-testid="invoice-detail-tab"]';
    this.trafficDetailTab = '[data-testid="traffic-detail-tab"]';
  }

  async navigateToInvoiceSystem() {
    await this.page.goto(this.invoiceSystemUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyInPoolShellExecuted() {
    await this.page.waitForSelector(this.inPoolShellStatus);
    const statusText = await this.page.textContent(this.inPoolShellStatus);
    return statusText.toLowerCase().includes('executed') || statusText.toLowerCase().includes('completed');
  }

  async verifyInPool10MBPackageConfigured() {
    await this.page.waitForSelector(this.packageConfigStatus);
    const configStatus = await this.page.textContent(this.packageConfigStatus);
    return configStatus.toLowerCase().includes('configured') || configStatus.toLowerCase().includes('active');
  }

  async verifyBillingCycleClosed() {
    await this.page.waitForSelector(this.billingCycleStatus);
    const cycleStatus = await this.page.textContent(this.billingCycleStatus);
    return cycleStatus.toLowerCase().includes('closed') || cycleStatus.toLowerCase().includes('cerrado');
  }

  async getActiveSOLDLineCount() {
    await this.page.waitForSelector(this.activeLineCountDisplay);
    const countText = await this.page.textContent(this.activeLineCountDisplay);
    return parseInt(countText.replace(/[^0-9]/g, ''), 10);
  }

  async navigateToTrafficDetailSOLDSection() {
    await this.page.click(this.trafficDetailTab);
    await this.page.waitForSelector(this.trafficDetailSection);
    await this.page.click(this.ratePlanFilter);
    await this.page.waitForLoadState('networkidle');
  }

  async accessInPool10MBSummary() {
    await this.page.waitForSelector(this.inPool10MBSummary);
    await this.page.click(this.inPool10MBSummary);
    await this.page.waitForLoadState('networkidle');
  }

  async getAssignedPoolValue() {
    await this.page.waitForSelector(this.assignedPoolField);
    const poolValueText = await this.page.textContent(this.assignedPoolField);
    const numericValue = poolValueText.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue);
  }

  async getTotalLinesIncludedInPoolCalculation() {
    await this.page.waitForSelector(this.totalLinesInCalculation);
    const totalText = await this.page.textContent(this.totalLinesInCalculation);
    return parseInt(totalText.replace(/[^0-9]/g, ''), 10);
  }

  async verifyAllSOLDLinesIncluded() {
    await this.page.waitForSelector(this.calculationDetailsPanel);
    const allIncludedElement = await this.page.$(this.allLinesIncludedIndicator);
    const isVisible = await allIncludedElement?.isVisible();
    const detailsText = await this.page.textContent(this.calculationDetailsPanel);
    return {
      allLinesIncluded: isVisible || detailsText.toLowerCase().includes('all lines included'),
      details: detailsText
    };
  }
}

module.exports = TrafficDetailPage;