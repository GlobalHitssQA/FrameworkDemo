class SoldPlanPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningSection = '[data-testid="provisioning-section"]';
    this.soldPlanSelector = '[data-testid="plan-selector-sold"]';
    this.apn5ConfigCheckbox = '[data-testid="apn5-config-checkbox"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.apn5ActiveBadge = '[data-testid="apn5-active-badge"]';
    
    this.trafficSimulatorLink = '[data-testid="traffic-simulator-link"]';
    this.trafficAmountInput = '[data-testid="traffic-amount-input"]';
    this.apn5TrafficOption = '[data-testid="apn5-traffic-option"]';
    this.generateTrafficButton = '[data-testid="generate-traffic-button"]';
    this.processingSpinner = '[data-testid="processing-spinner"]';
    
    this.udrTableLink = '[data-testid="udr-table-link"]';
    this.udrConsumptionCell = '[data-testid="udr-consumption-value"]';
    this.udrTableName = '[data-testid="udr-table-name"]';
    
    this.billingDetailsLink = '[data-testid="billing-details-link"]';
    this.inPoolExclusionIndicator = '[data-testid="in-pool-exclusion-indicator"]';
    this.bulkRateIndicator = '[data-testid="bulk-rate-indicator"]';
    this.totalChargeValue = '[data-testid="total-charge-without-tax"]';
    this.ratePerMbValue = '[data-testid="rate-per-mb"]';
    
    this.invoiceLink = '[data-testid="invoice-link"]';
    this.additionalServicesSection = '[data-testid="additional-services-section"]';
    this.additionalServicesExpander = '[data-testid="additional-services-expander"]';
    this.additionalServicesPlanField = '[data-testid="additional-services-plan-field"]';
    this.additionalServicesApn5Row = '[data-testid="additional-services-apn5-row"]';
    
    this.trafficDetailSection = '[data-testid="traffic-detail-section"]';
    this.trafficDetailExpander = '[data-testid="traffic-detail-expander"]';
    this.trafficDetailPlanField = '[data-testid="traffic-detail-plan-field"]';
    this.trafficDetailApn5Row = '[data-testid="traffic-detail-apn5-row"]';
    
    this.saveButton = '[data-testid="save-button"]';
    this.confirmButton = '[data-testid="confirm-button"]';
  }

  async navigateToProvisioningSection() {
    await this.page.locator(this.provisioningSection).click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithSoldPlan() {
    await this.page.locator(this.soldPlanSelector).click();
    await this.page.locator(this.confirmButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async configureApn5ForNavigation() {
    await this.page.locator(this.apn5ConfigCheckbox).check();
    await this.page.locator(this.saveButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineProvisionedWithApn5() {
    const statusVisible = await this.page.locator(this.lineStatusIndicator).isVisible();
    const apn5Active = await this.page.locator(this.apn5ActiveBadge).isVisible();
    return statusVisible && apn5Active;
  }

  async navigateToTrafficSimulator() {
    await this.page.locator(this.trafficSimulatorLink).click();
    await this.page.waitForLoadState('networkidle');
  }

  async generateApn5Traffic(mbAmount) {
    await this.page.locator(this.apn5TrafficOption).click();
    await this.page.locator(this.trafficAmountInput).fill(mbAmount.toString());
    await this.page.locator(this.generateTrafficButton).click();
  }

  async waitForTrafficProcessing() {
    await this.page.locator(this.processingSpinner).waitFor({ state: 'hidden', timeout: 60000 });
  }

  async navigateToUdrTable() {
    await this.page.locator(this.udrTableLink).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRecordedConsumptionFromUdr() {
    return await this.page.locator(this.udrConsumptionCell).textContent();
  }

  async navigateToBillingDetails() {
    await this.page.locator(this.billingDetailsLink).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTrafficExcludedFromInPool() {
    return await this.page.locator(this.inPoolExclusionIndicator).isVisible();
  }

  async verifyBulkRateApplied() {
    return await this.page.locator(this.bulkRateIndicator).isVisible();
  }

  async getTotalChargeWithoutTax() {
    return await this.page.locator(this.totalChargeValue).textContent();
  }

  async getRatePerMb() {
    return await this.page.locator(this.ratePerMbValue).textContent();
  }

  async navigateToInvoice() {
    await this.page.locator(this.invoiceLink).click();
    await this.page.waitForLoadState('networkidle');
  }

  async expandAdditionalServicesSection() {
    await this.page.locator(this.additionalServicesExpander).click();
    await this.page.locator(this.additionalServicesSection).waitFor({ state: 'visible' });
  }

  async getPlanValueFromAdditionalServices() {
    return await this.page.locator(this.additionalServicesPlanField).textContent();
  }

  async verifyApn5InAdditionalServices() {
    return await this.page.locator(this.additionalServicesApn5Row).isVisible();
  }

  async expandTrafficDetailSection() {
    await this.page.locator(this.trafficDetailExpander).click();
    await this.page.locator(this.trafficDetailSection).waitFor({ state: 'visible' });
  }

  async getPlanValueFromTrafficDetail() {
    return await this.page.locator(this.trafficDetailPlanField).textContent();
  }

  async verifyApn5InTrafficDetail() {
    return await this.page.locator(this.trafficDetailApn5Row).isVisible();
  }
}

module.exports = SoldPlanPage;