class ManufacturePlanPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning locators
    this.provisioningMenuLink = page.locator('[data-testid="menu-provisioning"]');
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.manufacturePlanOption = page.locator('[data-testid="plan-option-manufacture"]');
    this.provisionLineButton = page.locator('[data-testid="btn-provision-line"]');
    this.lineStatusIndicator = page.locator('[data-testid="line-status-indicator"]');
    this.includedVoiceValue = page.locator('[data-testid="included-voice-value"]');
    this.includedSmsValue = page.locator('[data-testid="included-sms-value"]');
    this.includedDataValue = page.locator('[data-testid="included-data-value"]');
    
    // Consumption simulator locators
    this.consumptionSimulatorLink = page.locator('[data-testid="menu-consumption-simulator"]');
    this.smsQuantityInput = page.locator('[data-testid="input-sms-quantity"]');
    this.confirmConsumptionButton = page.locator('[data-testid="btn-confirm-consumption"]');
    this.consumptionSuccessMessage = page.locator('[data-testid="consumption-success-message"]');
    
    // Balance inquiry locators
    this.balanceInquiryLink = page.locator('[data-testid="menu-balance-inquiry"]');
    this.smsBalanceOption = page.locator('[data-testid="option-sms-balance"]');
    this.remainingSmsDisplay = page.locator('[data-testid="remaining-sms-value"]');
    this.totalIncludedSmsDisplay = page.locator('[data-testid="total-included-sms-value"]');
    
    // Invoice locators
    this.invoiceSectionLink = page.locator('[data-testid="menu-invoice"]');
    this.currentBillingCycleTab = page.locator('[data-testid="tab-current-billing-cycle"]');
    this.smsChargesField = page.locator('[data-testid="sms-charges-amount"]');
    this.smsConsumedDetail = page.locator('[data-testid="sms-consumed-count"]');
    this.smsChargedDetail = page.locator('[data-testid="sms-charged-count"]');
    this.smsIncludedUsedDetail = page.locator('[data-testid="sms-included-used-count"]');
  }

  async navigateToProvisioning() {
    await this.provisioningMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectManufacturePlan() {
    await this.planSelector.click();
    await this.manufacturePlanOption.click();
  }

  async provisionLine() {
    await this.provisionLineButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActive() {
    const status = await this.lineStatusIndicator.textContent();
    return status.toLowerCase().includes('active') || status.toLowerCase().includes('activa');
  }

  async getIncludedServices() {
    const voice = await this.includedVoiceValue.textContent();
    const sms = await this.includedSmsValue.textContent();
    const data = await this.includedDataValue.textContent();
    return { voice: voice.trim(), sms: sms.trim(), data: data.trim() };
  }

  async navigateToConsumptionSimulator() {
    await this.consumptionSimulatorLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async simulateSmsConsumption(quantity) {
    await this.smsQuantityInput.clear();
    await this.smsQuantityInput.fill(quantity.toString());
  }

  async confirmConsumption() {
    await this.confirmConsumptionButton.click();
    await this.consumptionSuccessMessage.waitFor({ state: 'visible' });
  }

  async navigateToBalanceInquiry() {
    await this.balanceInquiryLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectSmsBalanceOption() {
    await this.smsBalanceOption.click();
  }

  async getRemainingSmsBalance() {
    const text = await this.remainingSmsDisplay.textContent();
    return parseInt(text.trim(), 10);
  }

  async getTotalIncludedSms() {
    const text = await this.totalIncludedSmsDisplay.textContent();
    return parseInt(text.trim(), 10);
  }

  async navigateToInvoiceSection() {
    await this.invoiceSectionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openCurrentBillingCycle() {
    await this.currentBillingCycleTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getSmsChargesFromInvoice() {
    const text = await this.smsChargesField.textContent();
    const numericValue = text.replace(/[^0-9.-]/g, '');
    return parseFloat(numericValue) || 0;
  }

  async getSmsConsumptionDetail() {
    const consumed = await this.smsConsumedDetail.textContent();
    const charged = await this.smsChargedDetail.textContent();
    const includedUsed = await this.smsIncludedUsedDetail.textContent();
    return {
      consumed: parseInt(consumed.trim(), 10),
      charged: parseInt(charged.trim(), 10),
      includedUsed: parseInt(includedUsed.trim(), 10)
    };
  }
}

module.exports = ManufacturePlanPage;