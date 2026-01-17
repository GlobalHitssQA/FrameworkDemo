class BulkDataBillingPage {
  constructor(page) {
    this.page = page;
    
    // Line Configuration Locators
    this.lineConfigurationMenu = '[data-testid="line-configuration-menu"]';
    this.soldPlanOption = '[data-testid="plan-option-sold"]';
    this.apnConfigurationSection = '[data-testid="apn-configuration-section"]';
    this.apnCheckbox = (apnName) => `[data-testid="apn-checkbox-${apnName.toLowerCase()}"]`;
    this.bulkBillingToggle = '[data-testid="bulk-billing-toggle"]';
    this.saveConfigurationButton = '[data-testid="save-configuration-btn"]';
    this.lineStatusIndicator = '[data-testid="line-status-sold"]';
    
    // Consumption Registration Locators
    this.consumptionRegistrationMenu = '[data-testid="consumption-registration-menu"]';
    this.apnSelector = '[data-testid="apn-selector"]';
    this.apnOption = (apnName) => `[data-testid="apn-option-${apnName.toLowerCase()}"]`;
    this.dataConsumptionInput = '[data-testid="data-consumption-input"]';
    this.navigationTypeSelector = '[data-testid="navigation-type-selector"]';
    this.navigationTypeOption = (type) => `[data-testid="navigation-type-${type.toLowerCase()}"]`;
    this.submitConsumptionButton = '[data-testid="submit-consumption-btn"]';
    this.registeredConsumptionDisplay = '[data-testid="registered-consumption-value"]';
    
    // Billing Process Locators
    this.billingProcessMenu = '[data-testid="billing-process-menu"]';
    this.billingCycleSelector = '[data-testid="billing-cycle-selector"]';
    this.currentCycleOption = '[data-testid="current-billing-cycle"]';
    this.executeBillingButton = '[data-testid="execute-billing-btn"]';
    this.billingProgressIndicator = '[data-testid="billing-progress-indicator"]';
    this.billingCompleteStatus = '[data-testid="billing-complete-status"]';
    
    // Invoice Details Locators
    this.invoiceDetailsMenu = '[data-testid="invoice-details-menu"]';
    this.bulkDataSection = '[data-testid="bulk-data-section"]';
    this.bulkDataChargeWithoutIGV = '[data-testid="bulk-data-charge-without-igv"]';
    this.bulkDataChargeWithIGV = '[data-testid="bulk-data-charge-with-igv"]';
    this.inPoolBulkServicesSection = '[data-testid="in-pool-bulk-services-section"]';
    this.trafficDetailSection = '[data-testid="traffic-detail-sold-section"]';
  }

  async navigateToLineConfiguration() {
    await this.page.click(this.lineConfigurationMenu);
    await this.page.waitForSelector(this.apnConfigurationSection);
  }

  async selectSOLDPlan() {
    await this.page.click(this.soldPlanOption);
  }

  async configureBulkBillingAPNs(apnList) {
    for (const apn of apnList) {
      await this.page.click(this.apnCheckbox(apn));
    }
    await this.page.click(this.bulkBillingToggle);
    await this.page.click(this.saveConfigurationButton);
  }

  async verifyLineConfiguredWithSOLDPlan() {
    return await this.page.isVisible(this.lineStatusIndicator);
  }

  async navigateToConsumptionRegistration() {
    await this.page.click(this.consumptionRegistrationMenu);
    await this.page.waitForSelector(this.apnSelector);
  }

  async selectAPN(apnName) {
    await this.page.click(this.apnSelector);
    await this.page.click(this.apnOption(apnName));
  }

  async enterDataConsumption(megabytes) {
    await this.page.fill(this.dataConsumptionInput, megabytes.toString());
  }

  async selectNavigationType(type) {
    await this.page.click(this.navigationTypeSelector);
    await this.page.click(this.navigationTypeOption(type));
  }

  async submitConsumptionRegistration() {
    await this.page.click(this.submitConsumptionButton);
  }

  async getRegisteredConsumption() {
    const consumptionText = await this.page.textContent(this.registeredConsumptionDisplay);
    return parseInt(consumptionText, 10);
  }

  async navigateToBillingProcess() {
    await this.page.click(this.billingProcessMenu);
    await this.page.waitForSelector(this.billingCycleSelector);
  }

  async selectCurrentBillingCycle() {
    await this.page.click(this.billingCycleSelector);
    await this.page.click(this.currentCycleOption);
  }

  async executeBillingProcess() {
    await this.page.click(this.executeBillingButton);
  }

  async waitForBillingProcessCompletion() {
    await this.page.waitForSelector(this.billingCompleteStatus, { timeout: 60000 });
  }

  async navigateToInvoiceDetails() {
    await this.page.click(this.invoiceDetailsMenu);
    await this.page.waitForSelector(this.bulkDataSection);
  }

  async getBulkDataChargeWithoutIGV() {
    const chargeText = await this.page.textContent(this.bulkDataChargeWithoutIGV);
    return parseFloat(chargeText.replace(/[^\d.]/g, ''));
  }

  async getBulkDataChargeWithIGV() {
    const chargeText = await this.page.textContent(this.bulkDataChargeWithIGV);
    return parseFloat(chargeText.replace(/[^\d.]/g, ''));
  }
}

module.exports = BulkDataBillingPage;