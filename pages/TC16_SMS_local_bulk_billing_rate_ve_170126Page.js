class SmsBillingPage {
  constructor(page) {
    this.page = page;
    
    // Line Configuration Locators
    this.lineConfigurationMenu = '[data-testid="menu-line-configuration"]';
    this.lifeCyclePlanDropdown = '[data-testid="dropdown-life-cycle-plan"]';
    this.bulkSmsBillingCheckbox = '[data-testid="checkbox-bulk-sms-billing"]';
    this.saveConfigurationButton = '[data-testid="btn-save-configuration"]';
    this.configurationSuccessMessage = '[data-testid="msg-configuration-success"]';
    
    // Consumption Registration Locators
    this.consumptionRegistrationMenu = '[data-testid="menu-consumption-registration"]';
    this.localSmsCountInput = '[data-testid="input-local-sms-count"]';
    this.confirmRegistrationButton = '[data-testid="btn-confirm-sms-registration"]';
    this.registeredSmsCountLabel = '[data-testid="label-registered-sms-count"]';
    
    // Billing Process Locators
    this.billingProcessMenu = '[data-testid="menu-billing-process"]';
    this.billingCycleDropdown = '[data-testid="dropdown-billing-cycle"]';
    this.currentCycleOption = '[data-testid="option-current-cycle"]';
    this.executeBillingButton = '[data-testid="btn-execute-billing"]';
    this.billingProgressIndicator = '[data-testid="indicator-billing-progress"]';
    this.billingCompletedStatus = '[data-testid="status-billing-completed"]';
    
    // Invoice Details Locators
    this.invoiceDetailsMenu = '[data-testid="menu-invoice-details"]';
    this.bulkServicesSection = '[data-testid="section-servicios-in-pool-granel"]';
    this.localSmsChargeWithoutIgv = '[data-testid="charge-sms-local-sin-igv"]';
    this.localSmsChargeWithIgv = '[data-testid="charge-sms-local-con-igv"]';
    this.trafficDetailSection = '[data-testid="section-detalle-trafico"]';
    this.planFieldInTrafficDetail = '[data-testid="field-plan-detalle-trafico"]';
  }

  async navigateToLineConfiguration() {
    await this.page.click(this.lineConfigurationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectLifeCyclePlan() {
    await this.page.click(this.lifeCyclePlanDropdown);
    await this.page.waitForSelector('[data-testid="option-life-cycle-plan"]');
    await this.page.click('[data-testid="option-life-cycle-plan"]');
  }

  async enableBulkSmsBilling() {
    const isChecked = await this.page.isChecked(this.bulkSmsBillingCheckbox);
    if (!isChecked) {
      await this.page.click(this.bulkSmsBillingCheckbox);
    }
  }

  async saveLineConfiguration() {
    await this.page.click(this.saveConfigurationButton);
    await this.page.waitForSelector(this.configurationSuccessMessage);
  }

  async isLineConfiguredSuccessfully() {
    return await this.page.isVisible(this.configurationSuccessMessage);
  }

  async navigateToConsumptionRegistration() {
    await this.page.click(this.consumptionRegistrationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async enterLocalSmsCount(count) {
    await this.page.fill(this.localSmsCountInput, count);
  }

  async confirmSmsRegistration() {
    await this.page.click(this.confirmRegistrationButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getRegisteredSmsCount() {
    return await this.page.textContent(this.registeredSmsCountLabel);
  }

  async navigateToBillingProcess() {
    await this.page.click(this.billingProcessMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectCurrentBillingCycle() {
    await this.page.click(this.billingCycleDropdown);
    await this.page.click(this.currentCycleOption);
  }

  async executeBillingProcess() {
    await this.page.click(this.executeBillingButton);
  }

  async waitForBillingCompletion() {
    await this.page.waitForSelector(this.billingCompletedStatus, { timeout: 60000 });
  }

  async navigateToInvoiceDetails() {
    await this.page.click(this.invoiceDetailsMenu);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.bulkServicesSection);
  }

  async getLocalSmsChargeWithoutIgv() {
    return await this.page.textContent(this.localSmsChargeWithoutIgv);
  }

  async getLocalSmsChargeWithIgv() {
    return await this.page.textContent(this.localSmsChargeWithIgv);
  }
}

module.exports = SmsBillingPage;